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

  useEffect(() => {
    const loadData = async () => {
      try {
        // If a custom data URL is provided, fetch from that URL
        if (customDataUrl) {
          const response = await fetch(customDataUrl);
          if (!response.ok) {
            throw new Error(`Failed to fetch portfolio data: ${response.status}`);
          }
          const customData = await response.json();
          setState({ data: customData, loading: false, error: null });
        } else {
          // Otherwise, use the imported static JSON data
          setState({ data: portfolioData, loading: false, error: null });
        }
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
  }, [customDataUrl]);

  return (
    <PortfolioContext.Provider value={state}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioProvider; 