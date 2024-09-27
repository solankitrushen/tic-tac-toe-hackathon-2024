import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IconUserPlus, IconMenu2 } from '@tabler/icons-react';
// import AlertCart from '../serviceProviderCart/AlertCart';
import BlankCard from '../../../shared/BlankCard';
import Image from 'next/image';
import CustomToast from '../../../forms/theme-elements/CustomToast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LocationSearch from './SearchLocation';

const ServiceProviderList = ({ onClick }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [isLoading, setLoading] = React.useState(true);
  const [serviceProviders, setServiceProviders] = React.useState([]);
  const [coordinates, setCoordinates] = React.useState({});

  const getVisibleServiceProvider = (serviceProviders, sortBy, filters, search) => {
    if (filters.category !== 'All') {
      serviceProviders = serviceProviders.filter((_serviceProvider) =>
        _serviceProvider.profile.specializations.some(
          (specialization) => specialization.value === filters.category,
        ),
      );
    }

    //FILTER serviceProviderS BY Search
    if (search !== '') {
      serviceProviders = serviceProviders.filter((_serviceProvider) =>
        _serviceProvider.firstName.toLocaleLowerCase().includes(search?.toLocaleLowerCase()),
      );
    }
    if (sortBy != 5) {
      serviceProviders = serviceProviders.filter(
        (_serviceProvider) => _serviceProvider.profile.rating == sortBy,
      );
    }

    if (filters.exp != '15-20') {
      serviceProviders = serviceProviders.filter(
        (_serviceProvider) => _serviceProvider.profile?.workExperience?.value == filters.exp,
      );
    }

    return serviceProviders;
  };

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const body = {
          selectData: {
            serviceProviderId: 1,
            firstName: 1,
            lastName: 1,
            reviews: 1,
            gender: 1,
            profile: 1,
            profileImagePath: 1,
          },
        };
        if (coordinates?.latitude && coordinates?.longitude) {
          const serviceProviderData = await axios.post(
            `/serviceProvider/fetchServiceProviders?verificationStatus=approved&lat=${coordinates.latitude}&lng=${coordinates.longitude}`,
            body,
          );
          console.log('result result ', serviceProviderData.data);
          if (serviceProviderData.status === 200) {
            setServiceProviders(serviceProviderData.data);
          }
        } else {
          const serviceProviderData = await axios.post(
            `/serviceProvider/fetchServiceProviders?verificationStatus=approved`,
            body,
          );
          console.log(serviceProviderData.data);
          if (serviceProviderData.status === 200) {
            setServiceProviders(serviceProviderData.data);
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response?.status === 404) {
          CustomToast({
            message: 'Service Provider not found! Please try again',
            status: 'error',
          });
        }

        if (error.response?.status === 500) {
          CustomToast({ message: 'Some internal server error!', status: 'error' });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchServiceProviders();
  }, [coordinates]);

  const getServiceProviders = useSelector((state) =>
    getVisibleServiceProvider(
      serviceProviders,
      state.ecommerceReducer.sortBy,
      state.ecommerceReducer.filters,
      state.ecommerceReducer.serviceProviderSearch,
    ),
  );

  const handleHireServiceProvider = async (serviceProvider) => {
    try {
      console.log(serviceProvider);
      router.push(`/hireAServiceProvider/${serviceProvider.serviceProviderId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      {/* ------------------------------------------- */}
      {/* Header Detail page */}
      {/* ------------------------------------------- */}
      <Stack direction="row" justifyContent="space-between" pb={3}>
        {lgUp ? (
          <Typography variant="h5">Service Providers</Typography>
        ) : (
          <Fab onClick={onClick} color="primary" size="small">
            <IconMenu2 width="16" />
          </Fab>
        )}
        <Box>
          <LocationSearch setCoordinates={setCoordinates} />
        </Box>
        {/* <Box>
          <ServiceProviderSearch />
        </Box> */}
      </Stack>

      {/* ------------------------------------------- */}
      {/* Page Listing serviceProvider */}
      {/* ------------------------------------------- */}
      <Grid container spacing={3}>
        {getServiceProviders?.length > 0 ? (
          <>
            {getServiceProviders?.map((provider) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                display="flex"
                alignItems="stretch"
                key={provider.serviceProviderId}
              >
                {/* ------------------------------------------- */}
                {/* serviceProvider Card */}
                {/* ------------------------------------------- */}
                {isLoading ? (
                  <>
                    <Skeleton
                      variant="rectangular"
                      width={270}
                      height={300}
                      sx={{
                        borderRadius: (theme) => theme.shape.borderRadius / 5,
                      }}
                    ></Skeleton>
                  </>
                ) : (
                  <BlankCard className="hoverCard">
                    <Typography component={Link} href={``}>
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/serviceProvider/serviceProviderProfileImage/${provider?.profileImagePath}`}
                        // src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/serviceProvider/serviceProviderProfileImage/`}
                        // src={'/images/profile/user-1.jpg'}
                        alt="img"
                        width={100}
                        height={100}
                        style={{ width: '100%', height: '200px' }}
                      />
                    </Typography>

                    <Tooltip title="Hire a Service Provider">
                      <Fab
                        size="small"
                        color="primary"
                        onClick={() => {
                          handleHireServiceProvider(provider);
                        }}
                        sx={{
                          bottom: '93px',
                          right: '15px',
                          position: 'absolute',
                        }}
                      >
                        {/* <Typography variant="body2">10+</Typography> */}

                        <IconUserPlus size="16" />
                      </Fab>
                    </Tooltip>
                    <CardContent sx={{ p: 3, pt: 2 }}>
                      <Typography variant="h6">
                        {provider.firstName} {provider.lastName}
                      </Typography>
                      <Stack direction="column" justifyContent="start" mt={1}>
                        <Tooltip
                          title={
                            <SpecializationsList
                              isDark={true}
                              specializations={provider?.profile?.specializations}
                            />
                          }
                        >
                          <Stack direction="row" alignItems="center">
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              className="flex gap-2 truncate"
                            >
                              {provider?.profile?.specializations.map((specialization, index) => (
                                <Typography key={index} variant="body2" color="textPrimary">
                                  {specialization?.label}
                                  {index !== provider.profile.specializations.length - 1 && ','}
                                </Typography>
                              ))}
                            </Typography>
                          </Stack>
                        </Tooltip>
                        {/* <Typography variant="body2" className="pt-2" color="textPrimary">
                          Experience: 10+
                        </Typography> */}

                        <Rating
                          className="mt-2"
                          name="read-only"
                          size="small"
                          value={provider?.profile?.rating}
                          readOnly
                        />
                      </Stack>
                    </CardContent>
                  </BlankCard>
                )}
                {/* ------------------------------------------- */}
                {/* serviceProvider Card */}
                {/* ------------------------------------------- */}
              </Grid>
            ))}
          </>
        ) : (
          <>
            <Grid item xs={12} lg={12} md={12} sm={12}>
              <Box textAlign="center" mt={6} className="flex flex-col justify-center items-center">
                <Image
                  src="/images/products/empty-shopping-cart.svg"
                  alt="cart"
                  width={200}
                  height={100}
                />
                <Typography variant="h2">There is no Service Provider</Typography>
                <Typography variant="h6" mb={3} mt={1}>
                  The Service Provider you are searching is no longer available.
                </Typography>
                <Button variant="contained" onClick={() => dispatch(filterReset())}>
                  Try Again
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

const SpecializationsList = ({ specializations, isDark }) => {
  return (
    <Stack direction="column" spacing={1}>
      {!isDark
        ? specializations.map((specialization, index) => (
            <Typography key={index} variant="body2" color="textPrimary">
              {specialization.label}
            </Typography>
          ))
        : specializations.map((specialization, index) => (
            <Typography key={index} variant="body2" className=" bg-inherit ">
              {specialization.label}
            </Typography>
          ))}
    </Stack>
  );
};

export default ServiceProviderList;
