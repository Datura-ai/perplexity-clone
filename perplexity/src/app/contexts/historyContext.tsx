'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { History } from "@/app/interfaces/history";

type Context = {
  historyData: History[];
  setHistory: Dispatch<SetStateAction<History[]>>;
};

export const HistoryContext = createContext<Context>({
  historyData: [],
  setHistory: () => {},
});

export const HistoryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [historyData, setHistory] = useState<History[]>([]);
  const value = useMemo(() => ({ historyData, setHistory }), [historyData]);

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
};

export const useHistoryContext = () => useContext(HistoryContext);
