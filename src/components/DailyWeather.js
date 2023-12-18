import React from "react";
import { Typography, Grid } from "@mui/material";

const DailyWeather = ({ dateNum, dayIcon, tempHigh }) => {
  dateNum = new Date(dateNum * 1000);
  dateNum.getDay();
  let options = { weekday: "short" };
  dateNum = Intl.DateTimeFormat("en-US", options).format(dateNum);

  console.log("dateNum ", dateNum);
  return (
    <Grid item xs={4}>
      <img className="day-icon" alt="rohit" src={dayIcon} />
      <Typography variant="body2">{dateNum}</Typography>
      <Typography variant="body2">{tempHigh} °C</Typography>
    </Grid>
  );
};

export default DailyWeather;
