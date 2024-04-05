import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

// export function customInitApp() {
//   if (adminApp.getApps().length <= 0) {
//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount as any),
//     });
//   }
// }

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
} catch (error: any) {
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack)
  }
}

export const db = admin.firestore();
export const auth = admin.auth();

