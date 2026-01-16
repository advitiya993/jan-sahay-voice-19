import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SelectScheme from "./pages/SelectScheme";
import UploadDocument from "./pages/UploadDocument";
import Verification from "./pages/Verification";
import Progress from "./pages/Progress";
import Success from "./pages/Success";
import Track from "./pages/Track";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/select-scheme" element={<SelectScheme />} />
          <Route path="/upload-document" element={<UploadDocument />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/success" element={<Success />} />
          <Route path="/track" element={<Track />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
