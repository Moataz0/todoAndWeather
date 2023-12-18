import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Switch,
} from "@mui/material";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import WeatherWidget from "./components/Weather";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main">
        <CssBaseline />
        <h1>Todo App</h1>
        <Switch
          checked={darkMode}
          onChange={handleToggleDarkMode}
          color="primary"
          name="darkModeToggle"
        />
        <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
        <TodoForm />
        <TodoList />
        <WeatherWidget />
      </Container>
    </ThemeProvider>
  );
};

export default App;
