'use client';

import CustomSocialButton from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomSocialButton';
import { Stack } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

const AuthSocialButtons = ({ title }) => {
  const { data: session } = useSession();
  console.log('session', session);
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      if (session && session.user) {
        try {
          const body = {
            firstName: session?.user?.name.split(' ')[0],
            lastName: session?.user?.name.split(' ')[1],
            email: session?.user?.email,
            profileImage: session?.user?.image,
          };
          const registeredUser = await axios.post('/auth/nextAuthRegister', body);
          console.log('next Auth', registeredUser);

          if (registeredUser?.status === 200) {
            if (process.env.NEXT_PUBLIC_APP_DEPLOYED) {
              document.cookie = `userAuthToken=${registeredUser.data.token}; expires=${new Date(
                Date.now() + 15 * 24 * 60 * 60 * 1000,
              ).toUTCString()}; path=/; domain=.glitchastra.com; SameSite=None; Secure`;
              router.push('/');
            }
            document.cookie = `userAuthToken=${registeredUser.data.token}; expires=${new Date(
              Date.now() + 15 * 24 * 60 * 60 * 1000,
            ).toUTCString()}; path=/;`;
            router.push('/');
          }
        } catch (error) {
          console.log(error);
          if (error.response?.status === 400) {
            toast.error('You are not logged in please verify your email');
          }
          if (error.response?.status === 401) {
            toast.error('You are not logged in check your credentials!');
          }
          if (error.response?.status === 404) {
            toast.error('You are not logged in check your credentials!');
          }

          if (error.response?.status === 500) {
            toast.error('Some internal server error!');
          }
        }
      }
    };

    if (session) {
      console.log('working');
      handleAuth();
    }
  }, [session, router]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      <Stack mt={3}>
        <CustomSocialButton
          onClick={async () => {
            await signIn('google');
            handleSignUp();
          }}
        >
          <Avatar
            src={'/images/svgs/google-icon.svg'}
            alt={'icon1'}
            sx={{
              width: 16,
              height: 16,
              borderRadius: 0,
              mr: 1,
            }}
          />
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              whiteSpace: 'nowrap',
              mr: { sm: '3px' },
            }}
          >
            {title}{' '}
          </Box>{' '}
          Google
        </CustomSocialButton>
      </Stack>
    </>
  );
};

export default AuthSocialButtons;
