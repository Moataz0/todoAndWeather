import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    margin: "auto",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  temperature: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  description: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  link: {
    marginTop: theme.spacing(2),
    textDecoration: "none",
    color: theme.palette.primary.main,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
}));

const WeatherWidget = () => {
  const classes = useStyles();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Function to fetch weather data
    const fetchWeatherData = async (latitude, longitude) => {
      const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

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
  }, []);

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

  return (
    <Card className={classes.root}>
      <div onClick={() => navigate("/weather-details")}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current Weather
          </Typography>
          <Typography variant="h6" gutterBottom>
            Location: {weatherData.name}
          </Typography>
          <Typography variant="h4" className={classes.temperature}>
            {weatherData.main.temp} °C
          </Typography>
          <Typography variant="body2" className={classes.description}>
            {weatherData.weather[0].description}
          </Typography>

          {/* Link to navigate to detailed weather page */}
          {/* <Link to="/weather-details" className={classes.link}>
          See Detailed Weather
        </Link> */}
          <Typography variant="body2">See Detailed Weather</Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default WeatherWidget;
