import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import DataFetcher from '/workspaces/dashboard/src/functions/DataFetcher.tsx';

export default function ChartUI() {
  const { data, loading, error } = DataFetcher();

  let arrLabels: string[] = [];
  let arrValues1: number[] = [];
  let arrValues2: number[] = [];

  if (data && data.hourly && data.hourly.time && data.hourly.temperature_2m && data.hourly.wind_speed_10m) {
    for (let i = 0; i < Math.min(24, data.hourly.time.length); i++) {
      let hourString = data.hourly.time[i].split("T")[1];
      if (hourString.startsWith("0")) {
        hourString = hourString.substring(1);
      }
      arrLabels.push(hourString);
      arrValues1.push(data.hourly.temperature_2m[i]);
      arrValues2.push(data.hourly.wind_speed_10m[i]);
    }
  }

  return (
    <>
      <Typography variant="h5" component="div">
        Temperatura 2m y Viento 10m (últimas 24h)
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && (
        <LineChart
          height={300}
          series={[
            { data: arrValues1, label: 'Temperatura 2m (°C)' },
            { data: arrValues2, label: 'Viento 10m (km/h)' },
          ]}
          xAxis={[{ scaleType: 'point', data: arrLabels }]}
        />
      )}
    </>
  );
}