import React, { useState } from 'react';
import { Box, Button, Typography, Modal, IconButton, Grid, TextField, Select, MenuItem, SelectChangeEvent, Link } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CreateProjectUi from './createProject';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 2,
};

interface Props {
  open: boolean,
  handleOpen: (value: boolean)=>void
}

export default function ModalUi({open, handleOpen} : Props) {

  const [project, setProject] = useState<string>('');

  const [createProjectOpen, setCreateProjectOpen] = useState(false);

  const handleCreateProjectOpen = () => {
    setCreateProjectOpen(true);
  };

  const handleProjectChange = (event: SelectChangeEvent) => {
    setProject(event.target.value as string);
  };

  return (
    <div>
      <Modal
        open={open && !createProjectOpen}
        onClose={() =>handleOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #F7F8FB' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Tambah Kegiatan Baru
            </Typography>
            <IconButton onClick={() =>handleOpen(false)}>
              <CloseOutlinedIcon/>
            </IconButton>
          </Box>
          <Box sx={{ padding: "10px 0" }}>
            <form action="">
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography color="initial" mb={1}>Tanggal mulai <span style={{ color: 'red' }}>*</span></Typography>
                <TextField
                  id="date"
                  type='date'
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <Typography color="initial" mb={1}>Tanggal Berakhir <span style={{ color: 'red' }}>*</span></Typography>
                <TextField
                  id="date"
                  type='date'
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <Typography color="initial" mb={1}>Jam mulai <span style={{ color: 'red' }}>*</span></Typography>
                <TextField
                  id="date"
                  type='time'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <Typography color="initial" mb={1}>Jam Berakhir <span style={{ color: 'red' }}>*</span></Typography>
                <TextField
                  id="date"
                  type='time'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography color="initial" mb={1}>Judul Kegiatan <span style={{ color: 'red' }}>*</span></Typography>
                <TextField
                  id="text"
                  type='text'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography color="initial" mb={1}>Nama Proyek <span style={{ color: 'red' }}>*</span></Typography>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={project}
                    onChange={handleProjectChange}
                    fullWidth
                    size="small"
                  >
                    <MenuItem onClick={handleCreateProjectOpen} sx={{ borderBottom: "2px solid #F7F8FB", color: 'red' }}>
                        <AddCircleOutlineOutlinedIcon/>
                        Tambah Proyek
                    </MenuItem>
                    <MenuItem value={10}>Twenty</MenuItem>
                    <MenuItem value={21}>Twenty one</MenuItem>
                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                  </Select>
                  
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Link onClick={() =>handleOpen(false)} sx={{ color: '#FF0000', textDecoration: 'none', cursor: 'pointer' }}>Kembali</Link>
                  <Button variant='contained' color="error">Simpan</Button>
                </Box>
              </Grid>
            </Grid>
            </form>
          </Box>
        </Box>
      </Modal>
      <CreateProjectUi 
        open={createProjectOpen}
        handleOpen={setCreateProjectOpen}
      />
    </div>
  );
}
