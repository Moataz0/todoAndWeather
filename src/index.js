import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import todosReducer from "./features/todos/todosSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailedWeatherPage from "./components/DetailedWeatherPage";

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/weather-details" element={<DetailedWeatherPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
