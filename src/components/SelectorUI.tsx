import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

interface SelectorUIProps {
    onCityChange: (city: string) => void;
}

export default function SelectorUI({ onCityChange }: SelectorUIProps) {
    const [cityInput, setCityInput] = useState('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setCityInput(event.target.value);
        onCityChange(event.target.value); // Notifica al padre
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="city-select-label">Ciudad</InputLabel>
            <Select
                labelId="city-select-label"
                id="city-simple-select"
                label="Ciudad"
                value={cityInput}
                onChange={handleChange}>
                <MenuItem disabled value=""><em>Seleccione una ciudad</em></MenuItem>
                <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
                <MenuItem value={"quito"}>Quito</MenuItem>
                <MenuItem value={"manta"}>Manta</MenuItem>
                <MenuItem value={"cuenca"}>Cuenca</MenuItem>
            </Select>
            {cityInput && (
                <p>
                    Información del clima en <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{cityInput}</span>
                </p>
            )}
        </FormControl>
    )
}