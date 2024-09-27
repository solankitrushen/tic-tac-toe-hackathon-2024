import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel';

export default function AuthForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/auth/forgotPassword', { email });
      console.log('Response:', response.data);
      if (response.status === 200) {
        alert('Password reset email sent successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
      alert('An error occurred while sending the password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack mt={4} spacing={2}>
          <CustomFormLabel htmlFor="reset-email">Email Address</CustomFormLabel>
          <CustomTextField
            id="reset-email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Forgot Password'}
          </Button>
          <Button color="primary" size="large" fullWidth component={Link} href="/auth/login">
            Back to Login
          </Button>
        </Stack>
      </form>
    </>
  );
}
