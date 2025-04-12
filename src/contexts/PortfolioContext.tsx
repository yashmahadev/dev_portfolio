import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import portfolioData from '@/data/portfolio-data.json';

// Define the structure of the portfolio data
export type PortfolioData = typeof portfolioData;

// Create a context with the portfolio data
type PortfolioContextType = {
  data: PortfolioData;
  loading: boolean;
  error: string | null;
};

const initialContextValue: PortfolioContextType = {
  data: portfolioData,
  loading: true,
  error: null,
};

const PortfolioContext = createContext<PortfolioContextType>(initialContextValue);

export const usePortfolio = () => useContext(PortfolioContext);

type PortfolioProviderProps = {
  children: ReactNode;
  customDataUrl?: string;
};

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ 
  children, 
  customDataUrl 
}) => {
  const [state, setState] = useState<PortfolioContextType>(initialContextValue);
  const isDev = import.meta.env.DEV;
  
  // Get the public data URL from environment variables
  const publicDataUrl = import.meta.env.VITE_PUBLIC_DATA_URL;

  useEffect(() => {
    const loadData = async () => {
      try {
        // First priority: Custom data URL from query parameter
        if (customDataUrl) {
          const response = await fetch(customDataUrl);
          if (!response.ok) {
            throw new Error(`Failed to fetch portfolio data: ${response.status}`);
          }
          const customData = await response.json();
          setState({ data: customData, loading: false, error: null });
          console.log('Using custom data URL from query parameter');
          return;
        }
        
        // Second priority: Environment variable data URL (for production)
        if (publicDataUrl && publicDataUrl.trim() !== '') {
          try {
            const response = await fetch(publicDataUrl);
            if (response.ok) {
              const remoteData = await response.json();
              setState({ data: remoteData, loading: false, error: null });
              console.log('Using public data URL from environment variables');
              return;
            }
          } catch (error) {
            console.warn('Failed to load from public data URL, falling back to bundled data');
            // Continue to use the imported data
          }
        }
        
        // Third priority: Bundled data
        console.log('Using bundled JSON data');
        setState({ data: portfolioData, loading: false, error: null });
      } catch (error) {
        console.error('Error loading portfolio data:', error);
        setState({ 
          data: portfolioData, // Fallback to static data
          loading: false, 
          error: error instanceof Error ? error.message : 'Failed to load portfolio data' 
        });
      }
    };

    loadData();
  }, [customDataUrl, publicDataUrl]);

  return (
    <PortfolioContext.Provider value={state}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioProvider; 