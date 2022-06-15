import { useEffect, useState } from 'react';
import { doc, onSnapshot } from '@firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, firestore } from './firebase';
import { Unsubscribe } from '@firebase/util';

export default function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    if (user) {
      const docRef = doc(firestore, 'users', user.uid);
      unsubscribe = onSnapshot(docRef, (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}
