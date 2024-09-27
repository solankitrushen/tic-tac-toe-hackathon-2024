'use client'

import { Grid } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';



const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Cards',
  },
];

const WidgetCards = () => {
  return (
    <PageContainer title="Cards" description="this is Cards">
    {/* breadcrumb */}
    <Breadcrumb title="Cards" items={BCrumb} />
    {/* end breadcrumb */}
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TopCards />
      </Grid>
    
    
    
    </Grid>
    </PageContainer>
  );
};

export default WidgetCards;
