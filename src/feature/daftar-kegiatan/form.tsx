import React, { useState } from 'react'
import { Box, Button, Typography, IconButton, Grid, TextField, Select, MenuItem, SelectChangeEvent, Link } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import useActivityStore from '@/store/activityStore';
import { GetDataProyek } from '@/feature/proyek/hooks/useGetData';
import { PostDataActivity } from './hooks/usePostDate';

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
    handleOpen: (value: boolean) => void,
    userRateId: string,
    id?: string
}

const Form = ({ handleOpen, userRateId, id }: Props) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [activityTitle, setActivityTitle] = useState<string>('');
    const [project, setProject] = useState<string>('');
    const [errors, setErrors] = useState<any>({});
    
    const handleOpenModalProyek = useActivityStore((state) => state.handleOpenModalProyek);
    
    const handleProjectChange = (event: SelectChangeEvent) => {
        setProject(event.target.value as string);
    };
    const handleSuccessAndClose = () => {
        handleOpen(false);
        setStartDate(null);
        setEndDate(null);
        setStartTime('');
        setActivityTitle('');
        setProject('');
    };
    
    const { mutate } = PostDataActivity(handleSuccessAndClose);
    const { data : listProyek, isLoading } = GetDataProyek();

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        let validationErrors: any = {};

        if (startDate === null) {
            validationErrors.startDate = 'Tanggal mulai harus di isi!';
        }
        if (endDate === null) {
            validationErrors.endDate = 'Tanggal berakhir harus di isi!';
        }
        if (!startTime) {
            validationErrors.startTime = 'Jam mulai harus di isi!';
        }
        if (!endTime) {
            validationErrors.endTime = 'Jam berakhir harus di isi!';
        }
        if (!activityTitle.trim()) {
            validationErrors.activityTitle = 'Judul kegiatan harus di isi!';
        }
        if (!project) {
            validationErrors.project = 'Nama proyek harus di pilih!';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        mutate({ 
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            start_time: startTime,
            end_time: endTime,
            activity: activityTitle,
            project_id: project,
            user_rate_id: userRateId
        });

    };
    
    return (
        <Box sx={style}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #F7F8FB' }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Tambah Kegiatan Baru
                </Typography>
                <IconButton onClick={() => handleOpen(false)}>
                    <CloseOutlinedIcon />
                </IconButton>
            </Box>
            <Box sx={{ padding: "10px 0" }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Typography color="initial" mb={1}>Tanggal mulai <span style={{ color: 'red' }}>*</span></Typography>
                            <TextField
                                id="date"
                                type='date'
                                size="small"
                                value={startDate ? startDate.toISOString().split('T')[0] : ''}
                                onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                                error={!!errors.startDate}
                                helperText={errors.startDate}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography color="initial" mb={1}>Tanggal Berakhir <span style={{ color: 'red' }}>*</span></Typography>
                            <TextField
                                id="date"
                                type='date'
                                size="small"
                                value={endDate ? endDate.toISOString().split('T')[0] : ''}
                                onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                                error={!!errors.endDate}
                                helperText={errors.endDate}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography color="initial" mb={1}>Jam mulai <span style={{ color: 'red' }}>*</span></Typography>
                            <TextField
                                id="date"
                                type='time'
                                size="small"
                                fullWidth
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                error={!!errors.startTime}
                                helperText={errors.startTime}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography color="initial" mb={1}>Jam Berakhir <span style={{ color: 'red' }}>*</span></Typography>
                            <TextField
                                id="date"
                                type='time'
                                size="small"
                                fullWidth
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                error={!!errors.endTime}
                                helperText={errors.endTime}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color="initial" mb={1}>Judul Kegiatan <span style={{ color: 'red' }}>*</span></Typography>
                            <TextField
                                id="text"
                                type='text'
                                size="small"
                                fullWidth
                                value={activityTitle}
                                onChange={(e) => setActivityTitle(e.target.value)}
                                error={!!errors.activityTitle}
                                helperText={errors.activityTitle}
                            />
                        </Grid>
                            <Grid item xs={12}>
                                <Typography color="initial" mb={1}>Nama Proyek <span style={{ color: 'red' }}>*</span></Typography>
                                <Select
                                    labelId="project-select-label"
                                    id="project-select"
                                    value={project}
                                    onChange={handleProjectChange}
                                    fullWidth
                                    size="small"
                                    error={!!errors.project}
                                >
                                    <MenuItem onClick={() => handleOpenModalProyek(true)} sx={{ borderBottom: "2px solid #F7F8FB", color: 'red' }}>
                                        <AddCircleOutlineOutlinedIcon />
                                        Tambah Proyek
                                    </MenuItem>
                                    {!isLoading && listProyek?.map((proyek) => (
                                        <MenuItem key={proyek.id} value={proyek.id}>{proyek.name}</MenuItem>
                                    ))}
                                </Select>
                                {errors.project && <Typography color="error" variant="caption">{errors.project}</Typography>}
                            </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Link onClick={() => handleOpen(false)} sx={{ color: '#FF0000', textDecoration: 'none', cursor: 'pointer' }}>Kembali</Link>
                                <Button type='submit' variant='contained' color="error">Simpan</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    )
}

export default Form
