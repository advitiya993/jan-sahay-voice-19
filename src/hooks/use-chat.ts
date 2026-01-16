import { useState, useCallback, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

// --- Interfaces (kept from your original) ---
interface ChatSession {
  id: string;
  externalUserId: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

interface QueryResponse {
  message: string;
  data: {
    answer: string;
    sessionId: string;
    messageId: string;
  };
}

// --- API Client ---
class OnDemandClient {
  private baseURL = 'https://api.on-demand.io/chat/v1';

  // We pull the API Key from environment variables inside the class or pass it in
  constructor(private apiKey: string) {}

  private async _request<T>(
    method: 'GET' | 'POST',
    endpoint: string,
    data?: any,
    params?: any
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url: `${this.baseURL}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.apiKey // Using the key from env
        },
        data,
        params
      });
      return response.data;
    } catch (error) {
      console.error(`Error [${method} ${endpoint}]:`, error);
      throw error;
    }
  }

  async createSession(externalUserId: string, pluginIds: string[] = []): Promise<{ data: ChatSession }> {
    return this._request('POST', '/sessions', { externalUserId, pluginIds });
  }

  async submitQuery(
    sessionId: string,
    query: string,
    endpointId = "predefined-openai-gpt4o",
    responseMode: 'sync' | 'stream' | 'webhook' = "sync"
  ): Promise<QueryResponse> {
    return this._request('POST', `/sessions/${sessionId}/query`, {
      endpointId,
      query,
      pluginIds: [],
      responseMode
    });
  }

  async getAllMessages(sessionId: string, limit = 20): Promise<{ data: any[] }> {
    return this._request('GET', `/sessions/${sessionId}/messages`, null, { limit });
  }
}

// --- The Hook ---
// We no longer require the apiKey as an argument because it's in .env
export const useChat = () => {
  // Use Vite or CRA environment variables
  const API_KEY = import.meta.env.VITE_ON_DEMAND_API_KEY || '';
  
  const [client] = useState(() => new OnDemandClient(API_KEY));
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Improved Session Creation
  const createSession = useCallback(async (externalUserId: string, pluginIds: string[] = []) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.createSession(externalUserId, pluginIds);
      setCurrentSession(response.data);
      // Optional: Save session ID to localStorage to persist chat on refresh
      localStorage.setItem('on_demand_session_id', response.data.id);
      return response.data;
    } catch (err) {
      setError('Failed to initialize chat session.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [client]);

  // 2. Send Message with Optimistic UI updates
  const sendMessage = useCallback(async (query: string) => {
    if (!currentSession) {
      setError('No active session.');
      return;
    }

    setIsLoading(true);
    
    // Add User message immediately (Optimistic UI)
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sessionId: currentSession.id,
      role: 'user',
      content: query,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      const response = await client.submitQuery(currentSession.id, query);
      
      const assistantMsg: ChatMessage = {
        id: response.data.messageId,
        sessionId: currentSession.id,
        role: 'assistant',
        content: response.data.answer,
        createdAt: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setError('Message failed to send.');
    } finally {
      setIsLoading(false);
    }
  }, [client, currentSession]);

  return {
    currentSession,
    messages,
    isLoading,
    error,
    createSession,
    sendMessage,
    clearSession: () => {
        setCurrentSession(null);
        setMessages([]);
        localStorage.removeItem('on_demand_session_id');
    }
  };
};  