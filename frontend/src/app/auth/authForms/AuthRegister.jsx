'use client';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  password: Yup.string().required('Password is required'),
  cPassword: Yup.string().required('Confirm password is required'),
});

const AuthRegister = ({ title, subtitle, subtext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log(values);
      const body = values;
      if (values) {
        const registeredUser = await axios.post('/auth/register', body);
        console.log(registeredUser.data);
        if (registeredUser.status === 200) {
          toast.success('You registered successfully! Check your email to verify yourself.');
          resetForm();
          router.push('/auth/verify/loginVerification');
        }
      }
    } catch (error) {
      console.log(error);

      if (error.response.status === 400) {
        toast.error('User already registered!');
      }
      if (error.response.status === 404) {
        toast.error('Missing required fields!');
      }

      if (error.response.status === 500) {
        toast.error('Some internal server error!');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Sign Up with" />
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign up with
          </Typography>
        </Divider>
      </Box>

      <Formik
        initialValues={{ email: '', password: '', firstName: '', lastName: '', cPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack>
              <Box>
                <CustomFormLabel htmlFor="firstName">First Name</CustomFormLabel>
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your First Name"
                  as={CustomTextField}
                  variant="outlined"
                  fullWidth
                />
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  <ErrorMessage name="firstName" />
                </Typography>
              </Box>
              <Box>
                <CustomFormLabel htmlFor="lastName">Last Name</CustomFormLabel>
                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your Last Name"
                  as={CustomTextField}
                  variant="outlined"
                  fullWidth
                />
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  <ErrorMessage name="lastName" />
                </Typography>
              </Box>
              <Box>
                <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  as={CustomTextField}
                  variant="outlined"
                  fullWidth
                />
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  <ErrorMessage name="email" />
                </Typography>
              </Box>

              <Box>
                <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                <Field
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                  as={CustomTextField}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    ),
                  }}
                />
                <Typography
                  variant="body1"
                  className="mt-1"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  <ErrorMessage name="password" />
                </Typography>
              </Box>
              <Box>
                <CustomFormLabel htmlFor="cPassword">Confirm Password</CustomFormLabel>
                <Field
                  id="cPassword"
                  name="cPassword"
                  placeholder="Confirm your password"
                  type={showPassword ? 'text' : 'password'}
                  as={CustomTextField}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    ),
                  }}
                />
                <Typography
                  variant="body1"
                  className="mt-1"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  <ErrorMessage name="cPassword" />
                </Typography>
              </Box>
              <Stack justifyContent="end" direction="row" alignItems="center" my={2}>
                <Typography
                  component={Link}
                  href="/auth/forgot-password"
                  fontWeight="500"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  Forgot Password ?
                </Typography>
              </Stack>
            </Stack>
            <Box>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing up...' : 'Sign up'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {subtitle}
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
    </>
  );
};

export default AuthRegister;
