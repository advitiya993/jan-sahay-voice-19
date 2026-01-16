import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Camera, RotateCcw, Loader2 } from 'lucide-react';

const UploadDocument: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Initialize camera
  useEffect(() => {
    async function setupCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        console.error("Camera access denied", err);
      }
    }
    setupCamera();
    
    // Cleanup: Stop camera tracks when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsScanning(true);
    
    // 1. Capture frame from video feed
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context?.drawImage(videoRef.current, 0, 0);
    
    // Extract base64 (removing the data URL prefix)
    const base64Image = canvasRef.current.toDataURL('image/jpeg').split(',')[1];

    try {
      const response = await fetch('https://api.on-demand.io/chat/v1/sessions/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'MjzZyxbqkRYKVxw2uEEW4qxOnxUuHG31' 
        },
        body: JSON.stringify({
          pluginIds: [],
          externalPluginId: "media_api",
          modelId: "google/gemini-2.5-flash",
          messages: [{
            role: "user",
            content: [
              { 
                type: "text", 
                text: "Extract 'name', 'id_number', and 'dob' from this ID card. Return ONLY a valid JSON object. No preamble." 
              },
              { 
                type: "inline_data", 
                inline_data: { 
                  mime_type: "image/jpeg", 
                  data: base64Image 
                } 
              }
            ]
          }]
        })
      });

      const result = await response.json();
      
      // Attempt to find and parse JSON within the response string
      const rawAnswer = result.data?.answer || "";
      const jsonMatch = rawAnswer.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const extractedData = JSON.parse(jsonMatch[0]);
        // Navigate to the verification page defined in App.tsx
        navigate('/verify', { state: { data: extractedData } });
      } else {
        throw new Error("Invalid AI response format");
      }

    } catch (error) {
      console.error("Extraction error:", error);
      alert("Could not read ID card. Please ensure it is well-lit and try again.");
      setIsScanning(false);
    }
  };

  return (
    <Layout showBack showHome title="Scan Document">
      <div className="flex-1 flex flex-col">
        {/* Header Status */}
        <div className="bg-primary text-primary-foreground px-safe py-4 text-center">
          <p className="text-accessible font-medium">
            {isScanning ? "Agent is reading your card..." : "Position your ID card in the frame"}
          </p>
        </div>

        {/* Camera Viewport */}
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted
            className={`absolute inset-0 w-full h-full object-cover transition-opacity ${isScanning ? 'opacity-50' : 'opacity-80'}`}
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Framing Guide */}
          <div className={`relative w-[85%] max-w-sm aspect-[1.6/1] border-4 border-dashed rounded-2xl z-10 transition-colors ${isScanning ? 'border-primary' : 'border-white/40'}`}>
            {isScanning && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <span className="text-white mt-2 text-sm">Processing...</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="bg-background px-safe py-8 flex flex-col items-center gap-4">
          <Button
            variant="destructive"
            size="icon-xl"
            onClick={handleCapture}
            disabled={isScanning}
            className="rounded-full shadow-lg active:scale-95 transition-transform"
          >
            <Camera className="h-12 w-12" />
          </Button>
          <p className="text-muted-foreground text-sm">
            {isScanning ? "Communicating with AI..." : "Tap to capture and scan"}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default UploadDocument;