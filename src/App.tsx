import { useState } from 'react'
import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';


function App() {
  const [selectedCity, setSelectedCity] = useState('guayaquil'); // Valor inicial opcional

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const dataFetcherOutput = DataFetcher(selectedCity);

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">
      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}><HeaderUI /></Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }}
        container justifyContent="right" alignItems="center">

        <AlertUI
          description="No se preveen lluvias"
          variant="outlined"
          severity="info"
        /></Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI onCityChange={handleCityChange} />
      </Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }} >
        {/* Renderizado condicional de los datos obtenidos */}
        {dataFetcherOutput.loading && <p>Cargando datos...</p>}
        {!dataFetcherOutput.loading && !dataFetcherOutput.error && dataFetcherOutput.data && (
          <>
            {/* Indicadores con datos obtenidos */}
            <Grid size={{ xs: 12, md: 3 }} >
              <IndicatorUI
                title='Temperatura (2m)'
                description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Temperatura aparente'
                description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Velocidad del viento'
                description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Humedad relativa'
                description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
            </Grid>
          </>
        )}
        {dataFetcherOutput.error &&
          <p>Error: {dataFetcherOutput.error}</p>
        }
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
        <ChartUI city={selectedCity} />
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}><TableUI city={selectedCity} /></Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

    </Grid>
  )
}

export default App
