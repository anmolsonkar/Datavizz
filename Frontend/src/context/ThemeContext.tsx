import { ReactNode, createContext, useContext, useState, useEffect, FC } from "react";

interface Insight {
  swot: any;
  _id: string;
  end_year: string | number;
  intensity: number;
  sector: string;
  topic: string;
  insight: string;
  url: string;
  region: string;
  start_year: string | number;
  impact: string;
  added: string;
  published: string;
  country: string;
  relevance: number;
  pestle: string;
  source: string;
  title: string;
  likelihood: number;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeContextValue {
  darkMode: boolean;
  toggleTheme: () => void;
  data: Insight[] | null; // Add data to the theme context
}

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const storedDarkMode = localStorage.getItem("dark");
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  const [data, setData] = useState<Insight[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData: Insight[] = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Cleanup function if needed
    return () => {
      // Cleanup logic here
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const themeContextValue: ThemeContextValue = {
    darkMode,
    toggleTheme,
    data, // Add data to the theme context value
  };

  return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
