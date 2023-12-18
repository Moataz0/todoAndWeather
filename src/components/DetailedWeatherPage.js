import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import dayjs from "dayjs";
import Daily from "./DailyWeather";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    padding: 2,
    borderRadius: 4,
    boxShadow: 5,
    textAlign: "center",
    marginTop: 80,
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  hourlyForecast: {
    marginTop: 4,
  },
  dailyForecast: {
    marginTop: 4,
  },
}));

const DetailedWeatherPage = () => {
  const classes = useStyles();
  const { location } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
      // const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&cnt=5`;
      const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely&appid=${apiKey}`;

      try {
        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
      } catch (error) {
        setError(error.message || "Error fetching weather data");
      } finally {
        setLoading(false);
      }
    };

    // Fetch weather data when component mounts
    const fetchData = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            setError(error.message || "Error getting user location");
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser");
        setLoading(false);
      }
    };
    fetchData();
  }, [location]);

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" color="error">
            Error: {error}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return null;
  }

  const renderHourlyForecast = () => {
    const { hourly } = weatherData;

    return (
      <Grid container spacing={2} className={classes.hourlyForecast}>
        {hourly?.map((hour, index) => (
          <Grid item key={index} xs={2}>
            <Typography variant="body2">
              {new Date(hour?.dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
            <Typography variant="body2">{hour?.temp} °C</Typography>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Detailed Weather for {weatherData?.name}
        </Typography>
        <Typography variant="h4">
          Current Temperature: {weatherData?.main?.temp}
          °C
        </Typography>
        <Typography variant="body2">
          Description: {weatherData?.current?.weather[0].description}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Hourly Forecast
        </Typography>
        {renderHourlyForecast()}
        <Typography variant="h6" gutterBottom>
          5-Day Forecast
        </Typography>
        <Grid container spacing={2} className={classes.dailyForecast}>
          {weatherData &&
            weatherData.daily.slice(1, 6).map((day, index) => {
              return (
                <Daily
                  key={index}
                  dateNum={day.dt}
                  dayIcon={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  tempHigh={day.temp.max}
                />
              );
            })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailedWeatherPage;
