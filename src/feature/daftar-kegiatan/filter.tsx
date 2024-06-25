"use client"
import React, {useState} from 'react';
import { Box, Button, Typography, IconButton, Link, OutlinedInput, Chip, MenuItem } from '@mui/material';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

interface Props {
    handleOpen: (value: boolean) => void,
    userRateId: string,
    id?: string
}

const FilterFeature = ({ handleOpen, userRateId, id }: Props) => {
    const theme = useTheme();
    const [personName, setPersonName] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    }
    return (
        <Box sx={style}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    filter
                </Typography>
                <IconButton onClick={() => handleOpen(false)}>
                    <CloseOutlinedIcon />
                </IconButton>
            </Box>
            <Box sx={{ margin: '10px 0' }}>
                <form>
                    <Typography color="initial" mb={1}>Nama Proyek <span style={{ color: 'red' }}>*</span></Typography>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                        fullWidth
                        size="small"
                    >
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, personName, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                    <Box sx={{ borderTop: '2px solid #F7F8FB', padding: '10px 0', display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Link sx={{ color: '#FF0000', textDecoration: 'none', cursor: 'pointer' }}>Kembali</Link>
                            <Button variant='contained' color="error">Simpan</Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default FilterFeature
