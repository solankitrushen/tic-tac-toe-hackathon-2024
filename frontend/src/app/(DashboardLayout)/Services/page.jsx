'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ServiceProviderList from '@/app/(DashboardLayout)/components/apps/ecommerce/productGrid/ServiceProviderList';
import ProductSidebar from '@/app/(DashboardLayout)/components/apps/ecommerce/productGrid/ProductSidebar';
import AppCard from '@/app/(DashboardLayout)/components/shared/AppCard';
import useAuth from '@/app/hooks/useAuth';
import { CustomToaster } from '../components/forms/theme-elements/CustomToast';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Services',
  },
];
const Services = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(true);
  useAuth();

  return (
    <PageContainer title="Services" description="this is Services page">
      <CustomToaster />
      {/* breadcrumb */}
      <Breadcrumb title="Service Providers" items={BCrumb} />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}
        <ProductSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <Box p={3} flexGrow={1}>
          <ServiceProviderList onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)} />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Services;
