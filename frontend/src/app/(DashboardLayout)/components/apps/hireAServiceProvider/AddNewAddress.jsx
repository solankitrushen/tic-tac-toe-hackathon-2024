'use client';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button, Typography, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { IconCurrentLocation } from '@tabler/icons-react';
import Select from 'react-select';
import axios from 'axios';
import CustomFormLabel from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import CustomStar from '../../forms/theme-elements/CustomStar';
import CustomToast from '../../forms/theme-elements/CustomToast';
import { useUser } from '@/app/hooks/useUser';
import MapWithMarker from '../../map/Map';

const GetLocationButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetLocation = async () => {
    try {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // onLocationChange({ latitude, longitude });
          const { latitude, longitude } = position.coords;
          console.log({ latitude, longitude });
          // Make a request to Google Maps Geocoding API
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Replace with your API key
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
          );
          const data = await response.json();
          console.log('data', data);
          if (data.status === 'OK' && data.results.length > 0) {
            const address = data.results[0].formatted_address;
            console.log('Formatted Address:', address);
          } else {
            console.error('Error: No results found');
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <Box> */}
      <Button
        onClick={handleGetLocation}
        sx={{
          bgcolor: (theme) => theme.palette.success.light,
          color: (theme) => theme.palette.success.main,
          borderRadius: '8px',
          paddingY: '10px',
          width: '100%',
          marginTop: { sm: '54px' },
        }}
        // variant="contained"
        size="small"
        disabled={isLoading}
        // fullWidth
      >
        {/* {isLoading ? 'Loading...' : 'Get Current Location'} */}
        <IconCurrentLocation />
      </Button>
      {/* </Box> */}
    </>
  );
};

function AddNewAddress({ setShowAddNewAddress, showAddNewAddress, setAddresses }) {
  const theme = useTheme();
  const { user } = useUser();
  const [addressComponents, setAddressComponents] = useState([]);
  const [initialValues, setInitialValues] = useState({
    apartmentNo: '',
    street: '',
    city: '',
    fullAddress: '',
    district: '',
    zipCode: '',
    landmark: '',
    addressType: { value: 'select Address', label: '--Select Address--' },
  });

  const addressSchema = Yup.object({
    label: Yup.string().required('addressType is Required'),
    value: Yup.string().required('addressType is Required'),
  });
  const validationSchema = Yup.object({
    fullAddress: Yup.string().required('Full Address is Required'),
    street: Yup.string().required('Street is Required'),
    city: Yup.string().required('City is Required'),
    district: Yup.string('District is Required'),
    zipCode: Yup.string().required('Zip code is Required'),
    addressType: addressSchema,
  });
  const reactSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: theme.palette.mode === 'dark' ? '#171c23' : 'white', // Adjust control background color
      border: '1px solid #455670',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? theme.palette.mode === 'dark'
          ? '#2e2e2e'
          : '#f0f0f0'
        : 'transparent', // Adjust option background color
      color: state.isSelected
        ? theme.palette.mode === 'dark'
          ? 'white'
          : 'black'
        : theme.palette.text.primary, // Adjust option text color
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme.palette.mode === 'dark' ? '#2e2e2e' : 'white', // Adjust menu background color
      zIndex: theme.zIndex.modal + 1,
    }),

    multiValue: (styles) => ({
      ...styles,
      backgroundColor: theme.palette.success.main, // Customize the background color of the selected chip
      color: theme.palette.success.main, // Customize the text color of the selected chip
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: theme.palette.primary.light, // Customize the color of the remove button
      ':hover': {
        backgroundColor: theme.palette.success.dark, // Customize the background color on hover
        color: theme.palette.background.default, // Customize the color on hover
      },
    }),

    singleValue: (styles) => ({
      ...styles,
      // backgroundColor: theme.palette.success.main, // Customize the background color of the selected chip
      color: theme.palette.success.main, // Customize the text color of the selected chip
    }),
  };

  useEffect(() => {
    if (addressComponents.length > 0) {
      const formattedAddress = {};
      formattedAddress.fullAddress = addressComponents
        .map((component) => component.long_name)
        .join(', ');

      addressComponents.forEach((component) => {
        if (component.types.includes('route')) {
          formattedAddress.street = component.long_name;
        } else if (component.types.includes('locality')) {
          formattedAddress.city = component.long_name;
        } else if (component.types.includes('administrative_area_level_1')) {
          formattedAddress.district = component.long_name;
        } else if (component.types.includes('postal_code')) {
          formattedAddress.zipCode = component.long_name;
        } else if (component.types.includes('landmark')) {
          formattedAddress.landmark = component.long_name;
        }
      });
      console.log(formattedAddress);
      setInitialValues(formattedAddress);
    }
  }, [addressComponents]);

  const handleSubmit = (values) => {
    try {
      console.log({ values });
      const address = {
        label: values.fullAddress,
        value: values.fullAddress,
        __isNew: true,
        ...values,
      };
      setAddresses((prevAddresses) => [...prevAddresses, address]);
      setShowAddNewAddress(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog
        maxWidth="lg"
        open={showAddNewAddress}
        onClose={() => setShowAddNewAddress(false)}
        sx={{ overflow: 'visible' }}
        fullWidth
      >
        <DialogTitle variant="subTitle2">Add new Address</DialogTitle>
        <DialogContent className="">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, isSubmitting, setFieldValue }) => (
              <Form className="" fullWidth>
                <div className="flex ">
                  <Grid container>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={11}>
                        <Box>
                          <CustomFormLabel htmlFor="fullAddress">
                            Full Address {<CustomStar />}
                          </CustomFormLabel>
                          <Field
                            id="fullAddress"
                            name="fullAddress"
                            type="text"
                            placeholder="Enter your Full Address"
                            as={CustomTextField}
                            variant="outlined"
                            // style={{ color: theme?.palette?.background?.default }}
                            fullWidth
                          />
                          <Typography
                            variant="body1"
                            sx={{
                              textDecoration: 'none',
                              marginTop: '7px',
                            }}
                          >
                            *Check the full address it can be wrong
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              textDecoration: 'none',
                              color: 'primary.main',
                            }}
                          >
                            <ErrorMessage name="fullAddress" />
                          </Typography>
                        </Box>
                      </Grid>
                      {/* <Grid item xs={12} sm={2} className="">
                        <GetLocationButton />
                      </Grid> */}
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={5.5}>
                        <Box>
                          <CustomFormLabel htmlFor="apartmentNo">Apartment No </CustomFormLabel>
                          <Field
                            id="apartmentNo"
                            name="apartmentNo"
                            type="text"
                            placeholder="Enter your apartment No"
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
                            <ErrorMessage name="apartmentNo" />
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={5.5}>
                        <Box>
                          <CustomFormLabel htmlFor="street">
                            Street {<CustomStar />}
                          </CustomFormLabel>
                          <Field
                            id="street"
                            name="street"
                            type="text"
                            placeholder="Enter your street"
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
                            <ErrorMessage name="street" />
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={5.5}>
                        <Box>
                          <CustomFormLabel htmlFor="city">City {<CustomStar />}</CustomFormLabel>
                          <Field
                            id="city"
                            name="city"
                            type="text"
                            placeholder="Enter your City Name"
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
                            <ErrorMessage name="city" />
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={5.5}>
                        <Box>
                          <CustomFormLabel htmlFor="district">
                            District {<CustomStar />}
                          </CustomFormLabel>
                          <Field
                            id="district"
                            name="district"
                            type="text"
                            placeholder="Enter your district Name"
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
                            <ErrorMessage name="district" />
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={5.5}>
                        <Box>
                          <CustomFormLabel htmlFor="zipCode">
                            Zip Code {<CustomStar />}
                          </CustomFormLabel>
                          <Field
                            id="zipCode"
                            name="zipCode"
                            type="text"
                            placeholder="Enter your Zip Code"
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
                            <ErrorMessage name="zipCode" />
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={5.5}>
                        <Box>
                          <CustomFormLabel htmlFor="landmark">Landmark</CustomFormLabel>
                          <Field
                            id="landmark"
                            name="landmark"
                            type="text"
                            placeholder="Enter your landmark"
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
                            <ErrorMessage name="landmark" />
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={11}>
                        <Box>
                          <CustomFormLabel htmlFor="addressType">
                            Address Type {<CustomStar />}
                          </CustomFormLabel>
                          <Select
                            id="addressType"
                            value={values.addressType}
                            name="addressType"
                            placeholder="Select Address Type"
                            options={[
                              { value: 'select Address', label: '--Select Address--' },
                              { value: 'home', label: 'Home' },
                              { value: "relative's house", label: "Relative's house" },
                              { value: 'work', label: 'Work' },
                              { value: 'other', label: 'Other' },
                            ]}
                            isSearchable={false}
                            onChange={(newValue) => {
                              setFieldValue('addressType', newValue);
                            }}
                            styles={reactSelectStyles}
                          />
                          <Typography
                            variant="body1"
                            sx={{
                              textDecoration: 'none',
                              color: 'primary.main',
                            }}
                          >
                            <ErrorMessage name="addressType" />
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <MapWithMarker setAddressComponents={setAddressComponents} />
                  </Grid>
                </div>

                <DialogActions className=" flex justify-end mt-7     ">
                  <Box>
                    <Button
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={() => setShowAddNewAddress(false)}
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
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </Box>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewAddress;
