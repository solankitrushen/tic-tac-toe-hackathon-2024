'use client';

import { Grid } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Banner',
  },
];

const WidgetBanners = () => {
  return (
    <PageContainer title="Banners" description="this is Banners">
      {/* breadcrumb */}
      <Breadcrumb title="Banner" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}></Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}></Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default WidgetBanners;
