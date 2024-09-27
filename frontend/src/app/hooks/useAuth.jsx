import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useUser } from './useUser';
import { useDispatch } from 'react-redux';
import { user } from '@/store/apps/chat/ChatSlice';

const useAuth = () => {
  const router = useRouter();
  const { updateUser } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const response = await axios.post('/auth/verifyUser');
        const { status, firstName, lastName, email, userId, profileImagePath, loggedIn } = response.data;
        if (status === 'authenticated' || loggedIn == true) {
          updateUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            userId: userId,
            profileImagePath: profileImagePath,
          });
          dispatch(
            user({
              firstName: firstName,
              lastName: lastName,
              email: email,
              userId: userId,
              profileImagePath: profileImagePath,
            }),
          );
          return true;
        } else {
          console.log('verification failed');
          return false;
        }
      } catch (error) {
        console.error('Error validating token:', error);
        return false;
      }
    };

    const checkUser = async () => {
      const tokenValue = await Cookies.get('userAuthToken');
      console.log(tokenValue);
      if (tokenValue) {
        const hasAuthToken = await checkAuthToken();
        console.log(hasAuthToken);
        if (!hasAuthToken) {
          router.push('/auth/login');
        }
      } else {
        router.push('/auth/login');
      }
    };

    // Call the async function inside useEffect
    checkUser();
  }, []);

  return;
};

export default useAuth;
