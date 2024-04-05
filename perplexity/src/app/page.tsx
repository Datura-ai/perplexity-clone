'use client';

import { useEffect, useState } from 'react';
import { useCompletion } from 'ai/react';
import {
  Flex,
  Image,
  Box,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import Skeleton from 'react-loading-skeleton';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ListBullets } from '@phosphor-icons/react';
import { RelatedBlock } from './components/RelatedBlock';
import { SourceItem } from './components/SourceItem';
import { CopyButton } from './components/CopyButton';
import { search } from './services/search';
import { getHistory } from './services/history';
import { Source } from './interfaces/source';
import { ImageResource } from './interfaces/imageResoirce';
import { RelatedSearches } from './interfaces/relatedSearches';

// Hooks
import { useSearchContext } from './contexts/searchContext';
import { useHistoryContext } from './contexts/historyContext';
import { HomePageWrapper } from '@/app/components/HomePageWrapper';

type IDataState = {
  sources: Source[];
  images: ImageResource[];
  relatedSearches: RelatedSearches[];
} | null;

export default function Home() {
  const { text, setText } = useSearchContext();
  const { setHistory } = useHistoryContext();
  const [query, setQuery] = useState<string>(text);
  const [data, setData] = useState<IDataState>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {
    completion,
    complete,
    isLoading,
    handleSubmit,
  } = useCompletion({
    api: '/api/chat',
  });

  const getData = async (text = query) => {
    if (text === '') {
      return;
    }
    setLoading(true);

    try {
      const { data } = await search(text);
      setData(data);
      const history = await getHistory();
      if (Array.isArray(history.data)) {
        setHistory(history.data.sort((a, b) => b.timestamp - a.timestamp));
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (text){
      getData(text);
      complete(text)
    }
  }, [text]);

  const getRelatedSearch = async (text: string) => {
    setQuery(text);
    setText(text);
  };

  return (
    <HomePageWrapper
      query={query}
      setText={setText}
      setQuery={setQuery}
      handleSubmit={handleSubmit}
    >
      <Flex
        alignItems='top'
        flex={1}
        overflowX='hidden'
        pl={80}
        pr={6}
        pt={20}
        w='100%'
      >
        <Box maxW='64rem'>
          {completion && (
            <Box
              bgColor='rgb(39 39 42)'
              border='1px'
              borderColor='#3f3f46'
              p='2'
              position="relative"
              mb='4'
              rounded='md'
            >
              <Flex alignItems='center' gap='2' pb={4}>
                <ListBullets size={24}  />
                <Heading size='sm'>
                  Answer
                </Heading>
              </Flex>
              <Box fontSize='sm'>
                {!completion && isLoading ? <Skeleton count={5} /> : (
                  <Markdown
                    // eslint-disable-next-line react/no-children-prop
                    children={completion || ''}
                    components={{
                      code(props) {
                        const {children, className, node, ...rest} = props
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                          <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            ref={null}
                            // eslint-disable-next-line react/no-children-prop
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                            style={a11yDark}
                          />
                        ) : (
                          <code {...rest} className={className}>
                            {children}
                          </code>
                        )
                      }
                    }}
                  />
                )}
              </Box>
              <CopyButton text={completion} />
            </Box>
          )}

          {data && (
            <>
              {data.relatedSearches.length > 0 && !loading && (
                <RelatedBlock
                  relatedSearches={data.relatedSearches}
                  getRelatedSearch={getRelatedSearch}
                />
              )}

              <Flex alignItems='center' gap='2'>
                <ListBullets size={24}  />
                <Heading size='sm'>
                  Sources
                </Heading>
              </Flex>
              <Box px={2}>
                {loading ? (
                  <Skeleton count={10} />
                ) : (
                  data.sources.map((source) => (
                    <SourceItem key={source.url} {...source} />
                  ))
                )}
              </Box>
            </>
          )}
        </Box>
        <Box pl={4} mt={16}>
          {data && loading && (
            <SimpleGrid columns={2} spacing={10}>
              <Skeleton height='120px' width='120px' />
              <Skeleton height='120px' width='120px' />
              <Skeleton height='80px' width='120px' />
              <Skeleton height='80px' width='120px' />
              <Skeleton height='120px' width='120px' />
              <Skeleton height='120px' width='120px' />
              <Skeleton height='80px' width='120px' />
              <Skeleton height='80px' width='120px' />
            </SimpleGrid>
          )}
          <SimpleGrid alignItems='center' columns={2} minW='280px' spacing={8}>
            {data &&
              !loading &&
              data.images
                .slice(0, 8)
                .map(({ contentUrl, name }) => (
                  <Image
                    alt={name}
                    cursor='pointer'
                    key={contentUrl}
                    src={contentUrl}
                    w='120px'
                    onClick={() => window.open(contentUrl, '_blank')}
                  />
                ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </HomePageWrapper>
  );
}
