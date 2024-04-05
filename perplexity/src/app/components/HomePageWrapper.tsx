import { Box, Flex } from '@chakra-ui/react';
import { Sidebar } from './Sidebar';
import { ReactNode } from 'react';
import { Header } from '@/app/components/Header';

export const HomePageWrapper = ({
  children,
  setText,
  query,
  handleSubmit,
  setQuery
  }: {
    children: ReactNode;
    setText: (query: string) => void;
    query: string;
    handleSubmit: (event: any) => void;
    setQuery: (query: string) => void;
  }
)=> {
  return (
    <Box minH='100vh' width='100vw' overflow='hidden'>
      <Header
        query={query}
        setText={setText}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
      />
      <Flex as='main' overflow='hidden'>
        <Sidebar />
        {children}
      </Flex>
    </Box>
  );
};
