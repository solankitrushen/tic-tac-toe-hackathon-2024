'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel';

export default function UpdatePassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { emailId, token } = useParams();
  const emailid = Array.isArray(emailId)
    ? decodeURIComponent(emailId[0])
    : decodeURIComponent(emailId || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setLoading(true);
    console.log('emailId:', emailid);
    console.log('token:', token);
    try {
      const response = await axios.post(`/auth/forgotPassword/verify/${emailid}/${token}`, {
        newPassword,
      });
      console.log('Response:', response.data);
      if (response.status === 200) {
        alert('Password updated successfully!');
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
      alert('An error occurred while updating the password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Update Password Page" description="this is Sample page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Typography
                color="textSecondary"
                textAlign="center"
                variant="subtitle2"
                fontWeight="400"
                mb={3}
              >
                Please enter your new password below to update your password.
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <CustomFormLabel htmlFor="new-password">New Password</CustomFormLabel>
                  <CustomTextField
                    id="new-password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />

                  <CustomFormLabel htmlFor="confirm-password">Confirm New Password</CustomFormLabel>
                  <CustomTextField
                    id="confirm-password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </Button>
                  {/* <Button
                    color="primary"
                    size="large"
                    fullWidth
                    component={Link}
                    href="/auth/login"
                  >
                    Back to Login
                  </Button> */}
                </Stack>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

UpdatePassword.layout = 'Blank';
