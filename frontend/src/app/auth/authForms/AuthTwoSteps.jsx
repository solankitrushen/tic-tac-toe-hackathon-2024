import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import CustomFormLabel from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';
import OtpInput from './OtpInput';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/hooks/useUser';

const AuthTwoSteps = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const onOtpSubmit = async (combinedOtp) => {
    try {
      console.log(combinedOtp);
      const body = { enteredOTP: combinedOtp, mobileNo: user?.mobileNo };
      console.log(body);
      if (combinedOtp && combinedOtp.length === 7) {
        setIsSubmitting(true);
        const verifiedOTP = await axios.post('/auth/verifySMS', body);
        console.log(verifiedOTP);
        if (verifiedOTP.status === 200) {
          toast.success('You registered successfully! verify your Mobile No.');
          router.push('/');
        }
      } else {
        toast.error('Enter OTP with all words!');
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error('You are not registered check your credentials!');
      }
      if (error.response.status === 401) {
        toast.error('User already registered!');
      }
      if (error.response.status === 404) {
        toast.error('Missing required fields!');
      }

      if (error.response.status === 500) {
        toast.error('Some internal server error!');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
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
      <Box mt={4}>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="code">Type your 7 digits security code</CustomFormLabel>
          <OtpInput onOtpSubmit={onOtpSubmit} />
        </Stack>
        <Button
          color="primary"
          disabled={isSubmitting}
          variant="contained"
          size="large"
          fullWidth
          onClick={onOtpSubmit}
        >
          {isSubmitting ? 'Verifying Your Account...' : 'Verify My Account'}
        </Button>

        <Stack direction="row" spacing={1} mt={3}>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            Didn&apos;t get the code?
          </Typography>
          <Typography
            // href="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Resend
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default AuthTwoSteps;
