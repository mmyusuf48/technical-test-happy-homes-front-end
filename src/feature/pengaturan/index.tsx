import React, {useState} from 'react';
import { Box, Button, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import { showMessageError } from '@/lib/sweet-alert';
import { PostDataUserRate } from './hooks/usePostData';

const Pengaturan = () => {
    const [employeeName, setEmployeeName] = useState<string>('');
    const [rate, setRate] = useState<string>('');
    
    const handleDelete = () => {
        setEmployeeName('')
        setRate('')
    }
    const { mutate } = PostDataUserRate(handleDelete);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (employeeName.trim() === '') {
            showMessageError('Nama karyawan harus di isi!');
            return;
        }
        if (rate.trim() === '') {
            showMessageError('Rate harus di isi!');
            return;
        }
        
        mutate({ 
            name: employeeName,
            rate: +rate
        });
      };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
            <Box sx={{ width: '25%', bgcolor: "#fff", padding: "20px", borderRadius: "10px", marginTop: '100px' }}>
                <form onSubmit={handleSubmit}>
                    <Box my={2}>
                        <Typography color="initial" mb={1}>Nama Karyawan <span style={{ color: 'red' }}>*</span></Typography>
                        <TextField
                            id="text"
                            type='text'
                            size="small"
                            fullWidth
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                        />
                    </Box>
                    <Box my={2}>
                        <Typography color="initial" mb={1}>Rate <span style={{ color: 'red' }}>*</span></Typography>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            endAdornment={<InputAdornment position="end">/jam</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            size="small"
                            fullWidth
                            type='number'
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                        />
                    </Box>
                    <Box my={2} sx={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                        <Button onClick={handleDelete} size="small" fullWidth>Batalkan</Button>
                        <Button type='submit' variant='contained' size="small" fullWidth>Simpan</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default Pengaturan
