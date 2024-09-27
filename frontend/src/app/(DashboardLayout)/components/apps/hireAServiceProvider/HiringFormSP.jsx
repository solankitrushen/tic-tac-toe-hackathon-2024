'use client';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import DialogActions from '@mui/material/DialogActions';
import { Button, Typography, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import './Quill.css';
import { useSelector, useDispatch } from 'react-redux';

// import IconButton from '@mui/material/IconButton';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  },
);
import CustomFormLabel from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import CustomRadio from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomRadio';
import Select from 'react-select';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import axios from 'axios';
import CustomToast from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomToast';
import { useRouter } from 'next/navigation';
import CustomStar from '../../forms/theme-elements/CustomStar';
import moment from 'moment';
import AddressSelectionAndAddition from './AddressSelectionAndAddition';
import { useUser } from '@/app/hooks/useUser';
import { SelectChat } from '@/store/apps/chat/ChatSlice';

const HiringFormSP = ({ serviceProviderId }) => {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { user } = useUser();
  const initialValues = {
    firstName: '',
    lastName: '',
    middleName: '',
    userAddress: '',
    preferableTime: moment(),
    description: '',
  };

  const userAddress = Yup.object({
    label: Yup.string().required('Label is Required'),
    value: Yup.string().required('Value is Required'),
  });

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is Required'),
    lastName: Yup.string().required('Last name is Required'),
    userAddress: userAddress,
    description: Yup.string().required('Description is Required'),
    preferableTime: Yup.date()
      .min(moment(), 'Date & time must be after or equal to current date & time')
      .required('Date & time is required'),
  });
  const workerOptions = [
    { value: 'plumber', label: 'Plumber' },
    { value: 'electrician', label: 'Electrician' },
    { value: 'carpenter', label: 'Carpenter' },
    { value: 'painter', label: 'Painter' },
    { value: 'gardener', label: 'Gardener' },
    { value: 'mechanic', label: 'Mechanic' },
    { value: 'cleaner', label: 'Cleaner' },
    { value: 'chef', label: 'Chef' },
    { value: 'waiter', label: 'Waiter' },
    { value: 'tailor', label: 'Tailor' },
  ];

  // ======================= CONSTANTS END ======================= //

  const createChat = async (userId, serviceProviderId) => {
    try {
      console.log({ userId, serviceProviderId });
      const createChat = await axios.post('/chat/createChat', { userId, serviceProviderId });
      console.log(createChat.data);
      return createChat.data.chatId;
    } catch (error) {
      console.log(error);
    }
  };

  const createAddress = async (address) => {
    try {
      const addedAddress = await axios.post('/addAddress', address);
      console.log(addedAddress.data);
      CustomToast({
        message: 'Address updated successfully!!',
        status: 'success',
      });
      return addedAddress.data.addressId;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      values.serviceProviderId = serviceProviderId;
      values.userId = user.userId;

      if (values.userAddress.__isNew) {
        let addressBody = {};
        delete values.userAddress.__isNew;
        addressBody = values.userAddress;

        const addressId = await createAddress(addressBody);
        const chatId = await createChat(values.userId, values.serviceProviderId);
        values.chatId = chatId;

        const createAction = await axios.post('/action/createAction', values);
        console.log(createAction.data);
        if (createAction.status === 200) {
          dispatch(SelectChat(createAction.data.chatId));
          router.push('/chats');
          CustomToast({
            message: 'Request sent successfully to Service Provider it will reply soon',
            status: 'success',
          });
        }
      } else {
        const chatId = await createChat(values.userId, values.serviceProviderId);
        values.chatId = chatId;
        const createAction = await axios.post('/action/createAction', values);
        console.log(createAction.data.action.chatId);
        if (createAction.status === 200) {
          dispatch(SelectChat(createAction.data.action.chatId));
          router.push('/chats');
          CustomToast({
            message: 'Request sent successfully to Service Provider it will reply soon',
            status: 'success',
          });
        }
      }
    } catch (error) {
      console.log(error);

      if (error.response.status === 404) {
        CustomToast({
          message: 'Request to Service Provider is not sent successfully!!',
          status: 'error',
        });
      }
      if (error.response.status === 400) {
        CustomToast({
          message: 'Request to Service Provider is not sent successfully!!',
          status: 'error',
        });
      }

      if (error.response.status === 500) {
        CustomToast({ message: 'Some internal server error!', status: 'error' });
      }
    }

    // You can perform any actions with the form values here, like submitting to a server
  };
  return (
    <>
      <Box marginX="10px">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="" fullWidth>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box>
                    <CustomFormLabel htmlFor="firstName">
                      First Name{<CustomStar />}
                    </CustomFormLabel>
                    <Field
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter your First Name"
                      as={CustomTextField}
                      variant="outlined"
                      // style={{ color: theme?.palette?.background?.default }}
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
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box>
                    <CustomFormLabel htmlFor="middleName">Middle Name</CustomFormLabel>
                    <Field
                      id="middleName"
                      name="middleName"
                      type="text"
                      placeholder="Enter your Middle Name"
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
                      <ErrorMessage name="middleName" />
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box>
                    <CustomFormLabel htmlFor="lastName">Last Name {<CustomStar />}</CustomFormLabel>
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
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Box>
                    <CustomFormLabel htmlFor="preferableTime">
                      Preferable Date & Time {<CustomStar />}
                    </CustomFormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDateTimePicker
                        onChange={(newValue) => {
                          setFieldValue('preferableTime', newValue);
                        }}
                        minDateTime={new Date()}
                        renderInput={(inputProps) => (
                          <CustomTextField
                            variant="outlined"
                            size="large"
                            inputProps={{ 'aria-label': 'basic date picker' }}
                            {...inputProps}
                            fullWidth
                          />
                        )}
                        value={values.preferableTime}
                      />
                    </LocalizationProvider>
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      <ErrorMessage name="preferableTime" />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* <Grid container spacing={2}> */}
              <AddressSelectionAndAddition values={values} setFieldValue={setFieldValue} />
              {/* </Grid> */}

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box>
                    <CustomFormLabel htmlFor="description">
                      Description {<CustomStar />}
                    </CustomFormLabel>
                    <Paper className=" bg-inherit" variant="outlined">
                      <ReactQuill
                        value={values.description}
                        onChange={(value) => {
                          setFieldValue('description', value);
                        }}
                        placeholder="Type here what you want..."
                      />
                    </Paper>
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      <ErrorMessage name="description" />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <DialogActions className=" flex justify-end mt-2 ">
                <Box>
                  <Button
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={() => setShowCompleteProfile(false)}
                  >
                    Close
                  </Button>
                </Box>
                <Box>
                  <Button
                    sx={{
                      bgcolor: (theme) => theme.palette.success.light,
                      color: (theme) => theme.palette.success.main,
                      borderRadius: '8px',
                    }}
                    // variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    // disabled={isSubmitting}
                  >
                    {/* {isSubmitting ? 'Submitting...' : 'Submit'} */}
                    Hire a Service Provider
                  </Button>
                </Box>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default HiringFormSP;
