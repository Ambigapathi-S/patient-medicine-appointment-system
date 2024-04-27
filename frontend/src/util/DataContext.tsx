import React, { createContext } from 'react';

interface DataContextProps {
  data?: string; // Define the type as optional string
  setData: (newData: string) => void;
}

const DataContext = createContext<DataContextProps>({ data: '', setData: () => {} });

const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ... other code ...

  return (
    <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataProvider };
