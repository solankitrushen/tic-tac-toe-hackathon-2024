"use client";
import React from "react";
import { useEffect, useState } from "react";

import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components

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
        
          {/* column */}
      
          {/* column */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
            
              
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
      </Box>
    </PageContainer>
  );
}
