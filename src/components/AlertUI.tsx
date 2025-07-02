import Alert from '@mui/material/Alert';

interface AlertConfig {
    description: string;
    variant?: 'standard' | 'filled' | 'outlined'; // Opcional, permite elegir el tipo de alerta
    severity?: 'error' | 'warning' | 'info' | 'success'; // Opcional, permite elegir el nivel de alerta
}

export default function AlertUI({ description, variant = 'standard', severity = 'success' }: AlertConfig) {
    return (
        <Alert variant={variant} severity={severity}>
            {description}
        </Alert>
    )
}