import React, { createContext, useState, useContext, ReactNode } from 'react';

type StageType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

const Stages = createContext<StageType | undefined>(undefined);

export const StageProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  return (
    <Stages.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </Stages.Provider>
  );
};

export const useStage = () => {
  const context = useContext(Stages);
  if (!context) throw new Error('error');
  return context;
};