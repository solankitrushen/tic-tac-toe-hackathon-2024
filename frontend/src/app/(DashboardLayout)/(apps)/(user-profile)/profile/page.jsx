'use client';

import Grid from '@mui/material/Grid';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

import ProfileBanner from '@/app/(DashboardLayout)/components/apps/userprofile/profile/ProfileBanner';
import useAuth from '@/app/hooks/useAuth';

const UserProfile = () => {
  useAuth();
  return (
    <PageContainer title="Profile" description="this is Profile">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <ProfileBanner />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
