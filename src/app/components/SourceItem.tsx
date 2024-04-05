import {
  Box,
  Divider,
  Image,
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import { Source } from '../interfaces/source';

export const SourceItem = ({ name, url, snippet, domain }: Source) => {
  return (
    <Box pt={4}>
      <LinkBox as='article' pb={2}>
        <Flex>
          <Box>
            <Flex justifyContent='flex-start' alignItems='center' pr={2} gap={3}>
              <Image
                src={`https://www.google.com/s2/favicons?domain=${domain}`}
                boxSize='5'
                alt=''
              />
              <Box>
                <LinkOverlay
                  suppressHydrationWarning
                  isExternal={true}
                  fontWeight={600}
                  fontSize='md'
                  href={url}
                >
                  {name}
                </LinkOverlay>
                <Text fontSize='sm' color='gray.500'>
                  {domain || url}
                </Text>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </LinkBox>
      <Text mb={2}>{snippet}</Text>
      <Divider />
    </Box>
  );
};
