import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import EditProfile from '@/app/(DashboardLayout)/(apps)/(user-profile)/profile/EditProfile';
import { useUser } from '@/app/hooks/useUser';
import IconButton from '@mui/material/IconButton';
import {
  IconBrandFacebook,
  IconBrandYoutube,
  IconFileDescription,
  IconUserCheck,
  IconWorldStar,
  IconMilitaryRank,
  IconMilitaryAward,
} from '@tabler/icons-react';
import ProfileTab from './ProfileTab';
import BlankCard from '../../../shared/BlankCard';
import React, { useState } from 'react';
import Image from 'next/image';
const ProfileBanner = ({ serviceProvider }) => {
  const [showEditProfilePic, setShowEditProfilePic] = useState(false);
  const ProfileImage = styled(Box)(() => ({
    backgroundImage: 'linear-gradient(#50b2fc,#f44c66)',
    borderRadius: '50%',
    width: '110px',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const SmallEditIcon = styled(EditIcon)`
    font-size: 16px; /* Adjust the font size as needed */
  `;
  const { user } = useUser();
  const handleEditProfilePic = () => {
    // Add your logic to handle editing the profile picture
    console.log('Editing profile picture...');
    setShowEditProfilePic(true);
  };

  const EditButton = styled(IconButton)`
    position: absolute;
    bottom: 0px;
    right: 0px;
    background-color: #171c23;
    border: 2px solid white;
    &:hover {
      background-color: #333f55;
    }
  `;

  return (
    <>
      <BlankCard>
        <CardMedia
          component="img"
          image={'/images/backgrounds/profilebg.jpg'}
          alt={'profilecover'}
          width="100%"
          height="330px"
        />
        {showEditProfilePic && (
          <EditProfile
            showEditProfilePic={showEditProfilePic}
            setShowEditProfilePic={setShowEditProfilePic}
          />
        )}

        <Grid container spacing={0} justifyContent="center" alignItems="center">
          {/* Post | Followers | Following */}
          <Grid
            item
            lg={4}
            sm={12}
            md={5}
            xs={12}
            sx={{
              order: {
                xs: '2',
                sm: '2',
                lg: '1',
              },
            }}
          >
            {/* <Stack direction="row" textAlign="center" justifyContent="center" gap={6} m={3}>
              <Box>
                <Typography className="flex justify-center items-center" color="text.secondary">
                  <IconFileDescription width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  938
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Completed Work
                </Typography>
              </Box>
              <Box>
                <Typography className="flex justify-center items-center" color="text.secondary">
                  <IconWorldStar width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  {serviceProvider?.profile?.rating}
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Rating
                </Typography>
              </Box>
              <Box>
                <Typography className="flex justify-center items-center" color="text.secondary">
                  <IconUserCheck width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  2,659
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Reviews
                </Typography>
              </Box>
            </Stack> */}
          </Grid>
          {/* about profile */}
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: '1',
                sm: '1',
                lg: '2',
              },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              textAlign="center"
              justifyContent="center"
              sx={{
                mt: '-85px',
              }}
            >
              <Box>
                <ProfileImage className=" relative">
                  <Avatar
                    src={
                      serviceProvider
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}/userProfileImages/${serviceProvider?.profileImagePath}`
                        : `${process.env.NEXT_PUBLIC_BASE_URL}/userProfileImages/${user?.profileImagePath}`
                    }
                    alt="profileImage"
                    sx={{
                      borderRadius: '50%',
                      width: '100px',
                      height: '100px',
                      border: '4px solid #fff',
                    }}
                  />
                  {!serviceProvider ? (
                    <Tooltip title="Edit Profile Picture">
                      <EditButton onClick={handleEditProfilePic} className=" ">
                        <SmallEditIcon />
                      </EditButton>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <div className=" flex justify-center items-center gap-1">
                          <div className="text-lg">By</div>
                          <Image
                            src="/logos/Karymitra b.png"
                            alt="Badge From Karymitra"
                            width="70"
                            height="70"
                          />
                        </div>
                      }
                    >
                      <EditButton className="flex justify-center items-center">
                        <IconMilitaryAward />
                      </EditButton>
                    </Tooltip>
                  )}
                </ProfileImage>
                <Box mt={1}>
                  <Typography fontWeight={600} variant="h5">
                    {serviceProvider?.firstName}
                  </Typography>
                  <Typography color="textSecondary" variant="h6" fontWeight={400}>
                    {serviceProvider?.lastName}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* friends following buttons */}
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: '3',
                sm: '3',
                lg: '3',
              },
            }}
          >
            <Stack direction="row" textAlign="center" justifyContent="start" gap={6} m={3}>
              {/* <Box>
                <Typography className="flex justify-center items-center" color="text.secondary">
                  <IconMilitaryRank width="22" />
                </Typography>
                <Stack direction="row" alignItems="center">
                  {serviceProvider?.profile?.specializations.map((specialization, index) => (
                    <Typography key={index} variant="h6" color="textPrimary">
                      {specialization?.label}
                      {index !== serviceProvider.profile.specializations.length - 1 &&
                        `,${'\u00A0\u00A0'}`}
                    </Typography>
                  ))}
                </Stack>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Specializations
                </Typography>
              </Box> */}
            </Stack>
          </Grid>
        </Grid>
        {/**TabbingPart**/}
        {/* <ProfileTab serviceProvider={serviceProvider} /> */}
      </BlankCard>
    </>
  );
};

export default ProfileBanner;
