import { Box, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

export const Header = (
  {
    setText,
    query,
    handleSubmit,
    setQuery
  }: {
    setText: (query: string) => void;
    query: string;
    handleSubmit: (event: any) => void;
    setQuery: (query: string) => void
  }
) => {

  return (
    <Box
      as='header'
      bgColor='rgb(39 39 42)'
      borderBottom='1px'
      borderColor='#3f3f46'
      pl={80}
      py={2}
      position='fixed'
      top={0}
      w='full'
      zIndex={1}
      suppressHydrationWarning
    >
      <Box maxW='64rem'>
        <form
          onSubmit={(event) => {
            setText(query);
            handleSubmit(event);
          }}
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              setText(query);
              handleSubmit(e);
            }
          }}
        >
          <InputGroup size='md'>
            <Input
              bg='rgb(229 231 235)'
              color='gray.900'
              _placeholder={{ color: 'gray.500' }}
              pr='4.5rem'
              placeholder='Ask anything...'
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
            <InputRightElement width='4.5rem'>
              <Button
                bg='#1A202C'
                _hover={{ bg: 'gray.600' }}
                h='1.75rem'
                size='sm'
                type='submit'
              >
                <ArrowForwardIcon/>
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
      </Box>
    </Box>
  );
};
