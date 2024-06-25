"use client"

import React, { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
import DaftarKegiatan from '@/feature/daftar-kegiatan';
import Pengaturan from '@/feature/pengaturan';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const MyComponent: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ bgcolor: "#fff", margin: "20px 0 20px 0" }}>
        <Container maxWidth="xl">
          <Box sx={{ padding: "10px 0 10px 0" }}>
            <Typography variant="h4" sx={{ fontWeight: 500 }}>
              HHH Timesheet
            </Typography>
          </Box>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Daftar Kegiatan" {...a11yProps(0)} />
            <Tab label="Pengaturan" {...a11yProps(1)} />
          </Tabs>
        </Container>
      </Box>
      <Container maxWidth="xl">
        
          <TabPanel value={value} index={0}>
            <DaftarKegiatan />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Pengaturan />
          </TabPanel>
      </Container>
    </>
  );
};

export default MyComponent;

