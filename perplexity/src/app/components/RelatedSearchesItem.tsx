import { Box, Link } from '@chakra-ui/react';
import { RelatedSearches } from '../interfaces/relatedSearches';

export const RelatedSearchesItem = ({
  text,
  onClick,
}: RelatedSearches & { onClick: (text: string) => void }) => {
  return (
    <Box p={2}>
      <Link fontWeight={600} onClick={() => onClick(text)}>
        {text}
      </Link>
    </Box>
  );
};
