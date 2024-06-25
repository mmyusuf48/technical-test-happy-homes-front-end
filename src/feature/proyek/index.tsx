import React, {useState} from 'react'
import { Box, Typography, Button, IconButton, TextField, Link } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { PostDataProyek } from './hooks/usePostData';
import { showMessageError, showMessageSuccess } from '@/lib/sweet-alert';

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
    handleOpen: (value: boolean) => void
}

const CreateProjectFeature = ({handleOpen}: Props) => {
    const [projectName, setProjectName] = useState<string>('');

    const handleSuccessAndClose = () => {
        handleOpen(false);
        setProjectName('');
        showMessageSuccess('Proyek berhasil ditambahkan!'); 
    };

    const { mutate } = PostDataProyek(handleSuccessAndClose);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (projectName.trim() === '') {
        handleOpen(false)
        showMessageError('This is an error message!');
        return;
      }
      mutate({ name: projectName });
    };

    return (
        <Box sx={style}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #F7F8FB' }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Tambah Proyek Baru
                </Typography>
                <IconButton onClick={() => handleOpen(false)}>
                    <CloseOutlinedIcon />
                </IconButton>
            </Box>
            <Box sx={{ margin: '10px 0' }}>
                <form 
                     onSubmit={handleSubmit}
                >
                    <Typography color="initial" mb={1}>Nama Proyek <span style={{ color: 'red' }}>*</span></Typography>
                    <TextField
                        id="text"
                        type='text'
                        size="small"
                        fullWidth
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <Box sx={{ borderTop: '2px solid #F7F8FB', padding: '10px 0', display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Link onClick={() => handleOpen(false)} sx={{ color: '#FF0000', textDecoration: 'none', cursor: 'pointer' }}>Kembali</Link>
                            <Button type='submit' variant='contained' color="error">Simpan</Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default CreateProjectFeature
