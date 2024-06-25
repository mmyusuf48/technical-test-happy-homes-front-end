"use client"

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, Typography, Grid, Container, InputBase, Paper, IconButton, Select, MenuItem, SelectChangeEvent, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterUi from '../../ui/modal/filter';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ModalWrapUi from '@/ui/modal/wrap';
import Form from './form'
import useActivityStore from '@/store/activityStore';
import CreateProjectFeature from '@/feature/proyek'
import { GetDataUserRate } from '../pengaturan/hooks/useGetData';
import { showMessageError, showMessageWarning } from '@/lib/sweet-alert';
import { GetDataKegiatan } from './hooks/useGetData';
import { CalculateDuration } from '@/helper/calculate-duration';
import { CalculateTotalWorkingHours } from '@/helper/calculate-total-working-hours';
import { CalculateEarnings } from '@/helper/calculate-earnings';
import { useDeleteKegiatan } from './hooks/useDeleteData';

export default function DaftarKegiatan() {

  const { handleOpenModalProyek, isOpenModalProyek } = useActivityStore()
  const [openForm, setOpenForm] = useState(false);
  const deleteMutation = useDeleteKegiatan();

  const { data: listUserRate, isLoading } = GetDataUserRate();

  const [userRate, setUserRate] = useState<string>('');

  const handleUserRateChange = (event: SelectChangeEvent) => {
    setUserRate(event.target.value as string);
  };
  const { data: listKegiatan } = GetDataKegiatan(userRate);

  const dataKegiatan = listKegiatan?.map((kegiatan) => {
    if (!kegiatan.start_time || !kegiatan.end_time) {
      console.error('Start time or end time is undefined for kegiatan:', kegiatan);
      return kegiatan;
    }
    const duration = CalculateDuration(kegiatan.start_time, kegiatan.end_time)

    return {
      ...kegiatan,
      duration: duration,
    };
  })

  const [totalEarnings, setTotalEarnings] = useState<number>(0);

  useEffect(() => {
    if (listKegiatan && listKegiatan.length > 0) {
      const total = listKegiatan.reduce((acc, kegiatan) => acc + CalculateEarnings(kegiatan), 0);
      setTotalEarnings(total);
    } else {
      setTotalEarnings(0); 
    }
  }, [listKegiatan]);

  const totalJamKerja = listKegiatan ? CalculateTotalWorkingHours(listKegiatan) : "-";

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Box sx={{ bgcolor: "#fff", margin: "20px 0 20px 0", borderRadius: "10px" }}>
      <ModalWrapUi open={openForm && !isOpenModalProyek} handleOpen={setOpenForm}>
        {/* <Form
          handleOpen={setOpenForm}
          userRateId={userRate}
          dataEdit={{
            id: '3783807d-840a-46b6-82d4-b4f4b9e01a41'
          }}
        /> */}
        <Form
          handleOpen={setOpenForm}
          userRateId={userRate}
        />
      </ModalWrapUi>
      
      <ModalWrapUi open={!!isOpenModalProyek} handleOpen={() => handleOpenModalProyek(false)}>
        <CreateProjectFeature handleOpen={() => handleOpenModalProyek(false)} />
      </ModalWrapUi>
      <Box sx={{ padding: '16px', borderBottom: '2px #F7F8FB solid', marginBottom: '10px' }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="body2" color="textSecondary">
              Nama Karyawan
            </Typography>
            <Select
              labelId="project-select-label"
              id="project-select"
              value={userRate}
              onChange={handleUserRateChange}
              fullWidth
              size="small"
            >
              {!isLoading && listUserRate?.map((userRate) => (
                <MenuItem key={userRate.id} value={userRate.id}>{userRate.name}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" color="textSecondary">
              Rate
            </Typography>
            {listKegiatan && listKegiatan.length > 0 && (
              <Typography variant="body1">
                Rp {listKegiatan[0].user_rate.toLocaleString('id-ID')},- /jam
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: '6px' }}>
            <Typography variant="h6" color="initial">
              Daftar kegiatan
            </Typography>
            <Button onClick={() => {
              if (userRate) {
                setOpenForm(true);
              } else {
                showMessageWarning('silahkan pilih user terlebih dahulu');
              }
            }}>
              <AddCircleOutlineOutlinedIcon />
              Tambah Kegiatan
            </Button>
          </Box>
          <Box sx={{ display: 'flex', width: '300px', alignItems: 'center' }}>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search ...."
              />
            </Paper>
            <FilterUi />
          </Box>
        </Box>
        <TableContainer component={Paper} sx={{ marginBottom: '10px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontWeight: 'bold' }}>Judul Kegiatan</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Nama Proyek</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Tanggal Mulai</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Tanggal Berakhir</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Waktu Mulai</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Waktu Berakhir</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Durasi</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataKegiatan && dataKegiatan?.length > 0 ? (
                dataKegiatan.map((kegiatan) => (
                  <TableRow key={kegiatan.id}>
                    <TableCell>{kegiatan.activity}</TableCell>
                    <TableCell align="center">{kegiatan.project_name}</TableCell>
                    <TableCell align="center">{kegiatan.start_date}</TableCell>
                    <TableCell align="center">{kegiatan.end_date}</TableCell>
                    <TableCell align="center">{kegiatan.start_time}</TableCell>
                    <TableCell align="center">{kegiatan.end_time}</TableCell>
                    <TableCell align="center">{kegiatan.duration}</TableCell>
                    <TableCell align="center">
                    <Button onClick={() => handleDelete(kegiatan.id)} sx={{ color: 'red' }}>
                      <DeleteIcon />
                    </Button>
                    </TableCell>
                  </TableRow>
                ))

              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" style={{ textAlign: 'center', height: '50px', verticalAlign: 'middle' }}>
                    Belum ada kegiatan
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={7} sx={{ fontWeight: 'bold', color: '#2775EC' }}>Total Durasi</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#2775EC' }}>{totalJamKerja}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={7} sx={{ fontWeight: 'bold', color: '#2775EC' }}>Pendapatan</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#2775EC' }}>
                  {totalEarnings > 0 ? `Rp. ${totalEarnings.toLocaleString('id-ID')},-` : '-'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
