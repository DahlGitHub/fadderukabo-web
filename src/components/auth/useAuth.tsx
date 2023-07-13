// hooks/useAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../../firebase';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoading(false);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return loading;
};

export default useAuth;