import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { authClient, signInWithGooglePopup } from "@/lib/firebaseClient";

export const signInWithGoogle = async () => {
    try {
        await signInWithGooglePopup();
        return;
    } catch (err) {
        return null;
    }
};

export const signInWithEmail = (email: string, password: string) =>
    signInWithEmailAndPassword(authClient, email, password);

export const signUpWithEmail = (email: string, password: string) =>
    createUserWithEmailAndPassword(authClient, email, password);
