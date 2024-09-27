'use client';
import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Charts',
  },
];

const WidgetCharts = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Charts" description="this is Charts">
      {/* breadcrumb */}
      <Breadcrumb title="Charts" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
          
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}></Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}></Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default WidgetCharts;
