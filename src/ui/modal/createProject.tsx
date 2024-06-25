import * as React from 'react';
import { Box, Typography, Modal, Button, IconButton, TextField, Link } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

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

export default function CreateProjectUi({open, handleOpen} : Props)  {

  return (
    <div>
      <Modal
        open={open}
        onClose={() =>handleOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #F7F8FB' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Tambah Proyek Baru
            </Typography>
            <IconButton onClick={() =>handleOpen(false)}>
              <CloseOutlinedIcon/>
            </IconButton>
          </Box>
          <Box sx={{ margin: '10px 0' }}>
            <form>
                <Typography color="initial" mb={1}>Nama Proyek <span style={{ color: 'red' }}>*</span></Typography>
                <TextField
                    id="text"
                    type='text'
                    size="small"
                    fullWidth
                />
                <Box sx={{ borderTop: '2px solid #F7F8FB', padding: '10px 0', display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Link onClick={() =>handleOpen(false)} sx={{ color: '#FF0000', textDecoration: 'none', cursor: 'pointer' }}>Kembali</Link>
                        <Button variant='contained' color="error">Simpan</Button>
                    </Box>
                </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
