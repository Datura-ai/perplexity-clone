'use client';

import { ReactNode } from 'react';
import {
  ChakraBaseProvider,
  extendBaseTheme,
  StyleFunctionProps,
  theme as chakraTheme,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// Context
import { SearchContextProvider } from './contexts/searchContext';
import { HistoryContextProvider } from './contexts/historyContext';
import { AuthContextProvider } from './contexts/authContext';

const { Input, Button, Divider, Heading, Link } = chakraTheme.components;

const theme = extendBaseTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  components: {
    Input,
    Button,
    Divider,
    Heading,
    Link,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('gray.100', 'rgb(18 20 23)')(props),
      },
      '::-webkit-scrollbar': {
        w: '0.25rem',
        bgColor: 'gray.700',
      },
      '::-webkit-scrollbar-thumb': {
        bgColor: 'gray.500',
      },
      '*': {
        scrollbarColor: 'gray.500 gray.700',
      },
    }),
  }
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraBaseProvider theme={theme}>
      <AuthContextProvider>
        <SearchContextProvider>
          <HistoryContextProvider>{children}</HistoryContextProvider>
        </SearchContextProvider>
      </AuthContextProvider>
    </ChakraBaseProvider>
  );
}
