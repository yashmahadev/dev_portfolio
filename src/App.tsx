import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DataEditor from "./pages/DataEditor";
import { useEffect, useState } from "react";

// Only show editor in development
const isDev = import.meta.env.DEV;

// Remove unused App.css import
// import './App.css'; 

const queryClient = new QueryClient();

// Portfolio wrapper to handle custom data URL
const PortfolioWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [customDataUrl, setCustomDataUrl] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    // Check for data URL in query param
    const params = new URLSearchParams(location.search);
    const dataUrl = params.get('dataUrl');
    
    if (dataUrl) {
      console.log('Found data URL in query parameters:', dataUrl);
      setCustomDataUrl(dataUrl);
    } else {
      // Check if data URL is set in environment variable
      const envDataUrl = import.meta.env.VITE_PUBLIC_DATA_URL;
      if (envDataUrl && envDataUrl.trim() !== '') {
        console.log('Using data URL from environment variables:', envDataUrl);
        setCustomDataUrl(envDataUrl);
      }
    }
  }, [location]);
  
  return (
    <PortfolioProvider customDataUrl={customDataUrl}>
      {children}
    </PortfolioProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BrowserRouter>
        <PortfolioWrapper>
          <TooltipProvider>
            <div className="relative">
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                {isDev && <Route path="/editor" element={<DataEditor />} />}
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </TooltipProvider>
        </PortfolioWrapper>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
