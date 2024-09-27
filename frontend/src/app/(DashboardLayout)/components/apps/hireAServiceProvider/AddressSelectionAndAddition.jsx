'use client';

import { useEffect, useState } from 'react';
import { Grid, Box, Button, Typography } from '@mui/material';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import Select from 'react-select';
import { useTheme } from '@mui/material/styles';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import AddNewAddress from './AddNewAddress';
import axios from 'axios';
import { useUser } from '@/app/hooks/useUser';
import { ErrorMessage } from 'formik';
import CustomStar from '../../forms/theme-elements/CustomStar';

const AddressSelectionAndAddition = ({ values, setFieldValue }) => {
  const [addresses, setAddresses] = useState([]);
  const [showAddNewAddress, setShowAddNewAddress] = useState(false);
  const { user } = useUser();
  const theme = useTheme();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (user.userId) {
          const fetchedAddresses = await axios.get(`/fetchAddresses`);
          if (fetchedAddresses.status === 200 && fetchedAddresses.data.length > 0) {
            const addresses = fetchedAddresses?.data?.map((address) => {
              const newAddress = {};
              newAddress.value = address.fullAddress;
              newAddress.label = address.fullAddress;
              newAddress.addressId = address.addressId;
              console.log(newAddress);

              return newAddress;
            });

            console.log(addresses);
            setAddresses(addresses);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddresses();
  }, [user.userId]);

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
  const handleAddNewAddress = () => {
    try {
      setShowAddNewAddress(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showAddNewAddress && (
        <AddNewAddress
          setShowAddNewAddress={setShowAddNewAddress}
          showAddNewAddress={showAddNewAddress}
          setAddresses={setAddresses}
        />
      )}
      <Grid container spacing={2}>
        {/* Select Existing Address */}
        <Grid item xs={12} sm={12}>
          <Box>
            <CustomFormLabel>Select Existing Address</CustomFormLabel>
            <Select
              styles={reactSelectStyles}
              options={addresses}
              value={values.userAddress}
              onChange={(selectedOption) => {
                setFieldValue('userAddress', selectedOption);
              }}
            />
            <Typography
              variant="body1"
              sx={{
                textDecoration: 'none',
                marginTop: '5px',
              }}
            >
              {<CustomStar />} You can update Addresses from your Profile.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              <ErrorMessage name="userAddress" />
            </Typography>
          </Box>
        </Grid>

        {/* Add New Button */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddNewAddress}>
            Add New
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddressSelectionAndAddition;
