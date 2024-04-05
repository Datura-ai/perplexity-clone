'use client'
import { useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { signInWithEmail, signInWithGoogle } from '../services/auth';
import { SignInSchema } from '@/app/validation/auth';
import { authClient } from '@/lib/firebaseClient';
import { useAuth } from '@/app/contexts/authContext';

export default function SingIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setUser } = useAuth();

  const loginWithEmail = async () => {
    try {
      SignInSchema.parse({
        email,
        password,
      });
      await signInWithEmail(email, password);
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const signUpG = async () => {
    try {
      await signInWithGoogle();
      setUser(authClient.currentUser);
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      width='100vw'
      height='100vh'
      justifyContent='center'
      alignItems='center'
    >
      <Stack direction='column' spacing={4} align='center'>
        <Heading>Sign In</Heading>
        <Button variant='outline' onClick={signUpG}>
          Sing in with Google
        </Button>
        <Input
          isInvalid={false}
          errorBorderColor='crimson'
          placeholder='Email Address'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type='password'
          isInvalid={false}
          errorBorderColor='crimson'
          placeholder='Password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button onClick={loginWithEmail}>Sing In</Button>
        <Text>
          or{' '}
          <Link textDecor='underline' onClick={() => router.push('/signup')}>
            create account
          </Link>
        </Text>
      </Stack>
    </Flex>
  );
}
