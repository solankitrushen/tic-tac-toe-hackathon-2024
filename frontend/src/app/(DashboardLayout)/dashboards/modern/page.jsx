"use client";
import React from "react";
import { useEffect, useState } from "react";

import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components
import YearlyBreakup from "@/app/(DashboardLayout)/components/dashboards/modern/YearlyBreakup";
import MonthlyEarnings from "@/app/(DashboardLayout)/components/dashboards/modern/MonthlyEarnings";
import TopCards from "@/app/(DashboardLayout)/components/dashboards/modern/TopCards";
import RevenueUpdates from "@/app/(DashboardLayout)/components/dashboards/modern/RevenueUpdates";
import Welcome from "@/app/(DashboardLayout)/layout/shared/welcome/Welcome";

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box >
        <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={12} lg={12}>
            <TopCards />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={8}>
            <RevenueUpdates isLoading={isLoading} />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={12}>
                <YearlyBreakup isLoading={isLoading} />
              </Grid>
              <Grid item xs={12} sm={6} lg={12}>
                <MonthlyEarnings isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
          {/* column */}
          {/* column */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
            </Grid>
          </Grid>
          {/* column */}
        
          {/* column */}
        
          {/* column */}
        </Grid>
        <Welcome />
      </Box>
    </PageContainer>
  );
}
