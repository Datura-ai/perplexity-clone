import { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { SignOut } from '@phosphor-icons/react';
import { authClient } from '@/lib/firebaseClient';
import { History } from '../interfaces/history';
import {useHistoryContext} from "@/app/contexts/historyContext";
import {useSearchContext} from "@/app/contexts/searchContext";
import { useRouter } from 'next/navigation'
import { getHistory } from '@/app/services/history';
import { useAuth } from '@/app/contexts/authContext';

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { historyData, setHistory } = useHistoryContext();
  const { user, setUser } = useAuth();
  const router = useRouter()
  const searchContext = useSearchContext();
  const currentUser = authClient.currentUser;

  useEffect(() => {
    const unsubscribe = authClient.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const history = await getHistory();
        if (Array.isArray(history.data)) {
          setHistory(history.data.sort( (a: History, b: History) => b.timestamp - a.timestamp));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await authClient.signOut();
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const showHistory = () => setIsExpanded(isExpanded => !isExpanded);

  return (
    <Box h='full' mt={12} position='fixed' w={80}>
      <Flex
        pt={6}
        pl={6}
        justifyContent='space-between'
        alignItems='start'
        flexDirection='column'
      >
        <Stack direction='column' spacing={4} align='start'>
          {Boolean(user) && historyData && (
            <>
              <Heading pt={2} size='md'>
                History
              </Heading>
              <Stack
                align='start'
                maxHeight='50vh'
                overflowY='auto'
                pl={3}
                pr={1}
                spacing={0}
              >
                {historyData.slice(0, isExpanded ? historyData.length : 10).map((item: History) => (
                  <Button
                    borderLeft='1px'
                    borderColor='gray.700'
                    borderLeftRadius={0}
                    fontSize='sm'
                    key={item.timestamp}
                    minH={10}
                    pr={0}
                    textTransform='capitalize'
                    variant='ghost'
                    onClick={() => {
                      searchContext.setText(item.query);
                      return router.push(`/?${item.query}`);
                    }}
                  >
                    <Text isTruncated w={60} align='start'>
                      {item.query}
                    </Text>
                  </Button>
                ))}
                {historyData.length > 10 && (
                  <Button
                    variant='ghost'
                    size='xs'
                    alignSelf='center'
                    onClick={showHistory}
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                  </Button>
                )}
              </Stack>
            </>
          )}
          {Boolean(!user) && (
            <>
              <Button
                w={44}
                variant="solid"
                onClick={() => router.push('/signin')}
              >
                Sign In
              </Button>
              <Button
                w={44}
                variant='outline'
                onClick={() => router.push('/signup')}
              >
                Sign Up
              </Button>
            </>
          )}
          {Boolean(currentUser) && (
            <Button leftIcon={<SignOut size={18} />} variant='ghost' onClick={signOut}>
              Sign Out
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
