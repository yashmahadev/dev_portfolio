import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DataEditor from "./pages/DataEditor";

// Remove unused App.css import
// import './App.css'; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <PortfolioProvider>
        <TooltipProvider>
          <div className="relative">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/editor" element={<DataEditor />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </PortfolioProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
