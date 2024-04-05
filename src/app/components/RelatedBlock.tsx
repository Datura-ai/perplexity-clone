import { Flex, Heading } from '@chakra-ui/react';
import { ListBullets } from '@phosphor-icons/react';
import { RelatedSearches } from '../interfaces/relatedSearches';
import { RelatedSearchesItem } from './RelatedSearchesItem';

export const RelatedBlock = ({
  relatedSearches,
  getRelatedSearch,
}: {
  relatedSearches: RelatedSearches[];
  getRelatedSearch: (text: string) => void;
}) => {
  return (
    <>
      <Flex alignItems='center' gap='2' pt={2}>
        <ListBullets size={24}  />
        <Heading size='md'>
          Related
        </Heading>
      </Flex>
      <>
        {relatedSearches.map((related: RelatedSearches) => (
          <RelatedSearchesItem
            key={related.webSearchUrl}
            {...related}
            onClick={getRelatedSearch}
          />
        ))}
      </>
    </>
  );
};
