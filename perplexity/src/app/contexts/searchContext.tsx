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

type Context = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

export const SearchContext = createContext<Context>({
  text: '',
  setText: () => {},
});

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [text, setText] = useState<string>('');
  const value = useMemo(() => ({ text, setText }), [text]);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
