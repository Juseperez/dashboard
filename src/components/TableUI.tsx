import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import DataFetcher from '/workspaces/dashboard/src/functions/DataFetcher.tsx';

function getRows(data: any) {
    if (
        !data ||
        !data.hourly ||
        !data.hourly.time ||
        !data.hourly.temperature_2m ||
        !data.hourly.wind_speed_10m
    ) {
        return [];
    }
    // Solo las primeras 24 horas
    return data.hourly.time.slice(0, 24).map((datetime: string, i: number) => {
        const [day, hour] = datetime.split('T');
        return {
            id: i,
            dia: day,
            hora: hour,
            temperatura: data.hourly.temperature_2m[i],
            viento: data.hourly.wind_speed_10m[i],
        };
    });
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'dia', headerName: 'Día', width: 110 },
    { field: 'hora', headerName: 'Hora', width: 90 },
    { field: 'temperatura', headerName: 'Temperatura 2m (°C)', width: 170 },
    { field: 'viento', headerName: 'Viento 10m (km/h)', width: 150 },
];

export default function TableUI() {
    const { data, loading, error } = DataFetcher();

    const rows = getRows(data);

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {!loading && !error && (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            )}
        </Box>
    );
}