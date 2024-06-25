
import {Typography, Container, Box, Link } from '@mui/material'
import DaftarKegiatan from '../feature/daftar-kegiatan/index';
import Content from '@/feature/content';

export default function Home() {
  return (
    <main >
      <Box sx={{ bgcolor: "#fff" }}>
        <Container maxWidth="xl" sx={{ color: '#F15858', padding: "10px 0 10px 0" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            TimeSheet
          </Typography>
          <Typography variant="body2" sx={{ margin: '-12px 0 0 4px', fontWeight: 700}}>
            Management
          </Typography>
        </Container>
      </Box>
      <Content/>
    </main>
  );
}
