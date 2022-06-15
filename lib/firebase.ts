import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  collection,
  where,
  query,
  limit,
  getDocs,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { QueryDocumentSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBasVW9VYt5T2i2vrYkqhKIPCh3PiWs7U4',
  authDomain: 'fireship-course-5a9cd.firebaseapp.com',
  projectId: 'fireship-course-5a9cd',
  storageBucket: 'fireship-course-5a9cd.appspot.com',
  messagingSenderId: '144836643004',
  appId: '1:144836643004:web:9235fcd5ac741278f028b9',
  measurementId: 'G-CDLM91LT1D',
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const authProvider = new GoogleAuthProvider();
export const firestore = getFirestore();
export const storage = getStorage();

export async function getUserWithUserName(username) {
  const usersRef = collection(firestore, 'users');
  const userQuery = query(
    usersRef,
    where('username', '==', username),
    limit(1)
  );
  const [userDoc] = (await getDocs(userQuery)).docs;

  return userDoc;
}

export function postToJson(doc: QueryDocumentSnapshot) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
