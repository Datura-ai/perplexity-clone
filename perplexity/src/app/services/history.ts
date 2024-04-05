import axios from 'axios';
import { authClient } from '@/lib/firebaseClient';

export const getHistory = async () => {
  let headers = {};

  if (authClient.currentUser) {
    try {
      const idToken = await authClient.currentUser.getIdToken();
      headers = {
        Authorization: idToken,
      };
    } catch (err) {
      console.log(err);
    }
  } else {
    throw Error('Forbidden.');
  }

  return await axios.get(`/api/history`, {
    headers,
  });
};
