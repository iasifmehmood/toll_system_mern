import React from "react";
import {
  Stack,
  Box,
  Button,
  Typography,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const AddTollData: any = () => {
  const [tollData, setTollData] = useState({
    entry_point: "",
    exit_point: "",
    day: "",
    number_plate: "",
    toll_paid: "0",
  });

  const { entry_point, exit_point, day, number_plate, toll_paid } = tollData; //const destructiong for accessing tollData.entry_point etc

  const onInputChange: any = (e: any) => {
    setTollData({ ...tollData, [e.target.name]: e.target.value });
  };

  let navigate: any = useNavigate();

  const handleFormSubmit: any = async (e: any) => {
    e.preventDefault();
    let response: any = await axios.post(
      "http://localhost:3001/tollData",
      tollData
    );
    if (response) {
      swal("Data Submitted!", "You are redirected to the Homepage!", "success");
    } else {
      swal("Data not submit! Please try Again");
    }
    navigate("/"); // to navigatoe to home page
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Toll Tax Calculation Starts From Here

  const perKmCharges: number = 0.2; //20% charges

  const interchange: any = {
    "Segregation Toll Plaza": 0,
    "Jharikas interchange": 25,
    "Kot Najeeb Ullah interchange": 75,
    "Khanpur Road Interchange": 140,
    "Shah Maqsood Interchange": 210,
    "Havelian Interchange": 260,
    "Abbottabad Interchange": 300,
  };

  const WEEKDAYS: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDay: any = WEEKDAYS[new Date(tollData.day).getDay()];

  const getMonthFromDate: any = () => {
    return new Date(tollData.day).toLocaleString("default", { month: "long" });
  };

  const getDate: any = () => {
    return new Date(tollData.day).getUTCDate();
  };

  const specialDay: any = getDate() + " " + getMonthFromDate();

  let entryValue: number = 0;
  let exitValue: number = 0;
  let entryPrice: number = 20;
  let exitPrice: number = 0;
  let normalPrice: any;
  let oneXPrice: any;
  let discountPrice: any;

  for (let x in interchange) {
    if (JSON.stringify(tollData.entry_point) === JSON.stringify(x)) {
      entryValue = interchange[x];
      tollData.toll_paid = entryPrice.toString();
    }
  }

  for (let x in interchange) {
    if (JSON.stringify(tollData.exit_point) === JSON.stringify(x)) {
      exitValue = interchange[x];
      exitPrice = parseFloat(
        (entryPrice + perKmCharges * Math.abs(exitValue - entryValue)).toFixed(
          2
        )
      ); //maths.abs to get positive value everytime
      tollData.toll_paid = exitPrice.toString();
      normalPrice = parseFloat(tollData.toll_paid);
    }
    if (
      JSON.stringify(tollData.exit_point) === JSON.stringify(x) &&
      ["Saturday", "Sunday"].includes(currentDay)
    ) {
      exitValue = interchange[x];
      exitPrice = parseFloat(
        (entryPrice + perKmCharges * Math.abs(exitValue - entryValue)).toFixed(
          2
        )
      ); //maths.abs to get positive value everytime
      tollData.toll_paid = (exitPrice * 1.5).toString(); //1.5x on weekend
      oneXPrice = parseFloat(tollData.toll_paid);
    }
    if (
      JSON.stringify(tollData.exit_point) === JSON.stringify(x) &&
      ["23 March", "14 August", "25 December"].includes(specialDay)
    ) {
      exitValue = interchange[x];
      exitPrice = parseFloat(
        (entryPrice + perKmCharges * Math.abs(exitValue - entryValue)).toFixed(
          2
        )
      ); //maths.abs to get positive value everytime
      tollData.toll_paid = (exitPrice * 0.5).toString(); //0.5 discount on special days
      discountPrice = parseFloat(tollData.toll_paid);
    }
  }

  // Toll Tax Calculation Starts From Here

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        margin: "auto",
        marginTop: "25px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "30%",
          height: "50%",
        }}
      >
        <form onSubmit={handleFormSubmit}>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <Typography variant="h5" textAlign="center">
                Enter Information
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Select Entry Point"
                fullWidth
                name="entry_point"
                value={entry_point}
                onChange={e => onInputChange(e)}
                required
                select
              >
                <MenuItem value="Segregation Toll Plaza">
                  Segregation Toll Plaza
                </MenuItem>
                <MenuItem value="Jharikas interchange">
                  Jharikas interchange
                </MenuItem>
                <MenuItem value="Kot Najeeb Ullah interchange">
                  Kot Najeeb Ullah interchange
                </MenuItem>
                <MenuItem value="Khanpur Road Interchange">
                  Khanpur Road Interchange
                </MenuItem>
                <MenuItem value="Shah Maqsood Interchange">
                  Shah Maqsood Interchange
                </MenuItem>
                <MenuItem value="Havelian Interchange">
                  Havelian Interchange
                </MenuItem>
                <MenuItem value="Abbottabad Interchange">
                  Abbottabad Interchange
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item>
              <TextField
                label="Select Exit Point"
                fullWidth
                name="exit_point"
                value={exit_point}
                onChange={e => onInputChange(e)}
                required
                select
              >
                <MenuItem value="Segregation Toll Plaza">
                  Segregation Toll Plaza
                </MenuItem>
                <MenuItem value="Jharikas interchange">
                  Jharikas interchange
                </MenuItem>
                <MenuItem value="Kot Najeeb Ullah interchange">
                  Kot Najeeb Ullah interchange
                </MenuItem>
                <MenuItem value="Khanpur Road Interchange">
                  Khanpur Road Interchange
                </MenuItem>
                <MenuItem value="Shah Maqsood Interchange">
                  Shah Maqsood Interchange
                </MenuItem>
                <MenuItem value="Havelian Interchange">
                  Havelian Interchange
                </MenuItem>
                <MenuItem value="Abbottabad Interchange">
                  Abbottabad Interchange
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item>
              <TextField
                label="Enter Car Number Plate"
                name="number_plate"
                onChange={e => onInputChange(e)}
                value={number_plate}
                fullWidth
                required
                inputProps={{ pattern: "[A-Z]{1,3}[-][1-9]{1,3}" }}
                helperText="Please Enter in this format LLL-NNN"
                placeholder="Use this format LLL-NNN"
              />
            </Grid>

            <Grid item>
              <TextField
                label=""
                name="day"
                value={day}
                onChange={(e: any) => onInputChange(e)}
                type="date"
                fullWidth
                helperText="Select Date"
              />
            </Grid>

            <Grid item>
              <TextField
                name="toll_paid"
                value={toll_paid}
                onChange={e => onInputChange(e)}
                required
                inputProps={{ readOnly: true, style: { textAlign: "center" } }}
                fullWidth
                helperText="Toll Tax Price"
                variant="outlined"
              />
            </Grid>

            <Grid item>
              <Stack sx={{ marginTop: "20px" }}>
                <Button
                  onChange={e => onInputChange(e)}
                  type="submit"
                  variant="contained"
                >
                  Add Data
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box
        sx={{
          width: "20%",
          height: "50%",
          display: "flex",
          marginTop: "200px",
          marginLeft: "25px",
        }}
      >
        <Box sx={{ border: 1 }}>
          <Typography variant="h6" align="center">
            Toll Tax Prices
          </Typography>
          <Typography>Normal Price is : {normalPrice || 0}</Typography>
          <Typography>1.5x Price On Weekends is : {oneXPrice || 0}</Typography>
          <Typography>
            0.5 % Discount on Special Day {discountPrice || 0}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default AddTollData;
