'use client'
import { useState } from 'react';
import { Button, Flex, Heading, Input, Stack } from '@chakra-ui/react';
import { SignUpSchema } from '../validation/auth';
import { signUpWithEmail } from '../services/auth';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/authContext';
import { authClient } from '@/lib/firebaseClient';

// type InputErrors = {
//   email: null;
//   password: null;
//   confirmPassword: null;
// };

export default function SingUp() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { setUser } = useAuth();
  // const [errors, setErrors] = useState<InputErrors>({
  //   email: null,
  //   password: null,
  //   confirmPassword: null,
  // });

  const signUp = async () => {
    try {
      SignUpSchema.parse({
        email,
        password,
        confirmPassword,
      });
      await signUpWithEmail(email, password);
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
        <Heading>Sign Up</Heading>
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
        <Input
          type='password'
          isInvalid={false}
          errorBorderColor='crimson'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <Button onClick={signUp}>Sing Up</Button>
      </Stack>
    </Flex>
  );
};
