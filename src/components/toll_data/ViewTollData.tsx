import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewTollData: any = () => {
  const [tollData, setTollData] = useState({
    id: "",
    entry_point: "",
    exit_point: "",
    day: "",
    number_plate: "",
    toll_paid: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData: any = async () => {
    const result = await axios.get("http://localhost:3001/tollData");
    setTollData(result.data);
  };

  const { id } = useParams();

  //load data see console
  useEffect(() => {
    loadTollData();
  }, []);

  const loadTollData: any = async () => {
    const result = await axios.get(`http://localhost:3001/tollData/${id}`);
    setTollData(result.data);
  };

  return (
    <TableContainer>
      <Table aria-label="Toll Data">
        <TableHead>
          <TableRow sx={{ fontWeight: "fontWeightBold" }}>
            <TableCell>Id</TableCell>
            <TableCell>Entry Point</TableCell>
            <TableCell>Exit Point</TableCell>
            <TableCell>Day of the week</TableCell>
            <TableCell>Vehicle Number Plate (LLL-NNN)</TableCell>
            <TableCell>Toll Paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>{id}</TableCell>
            <TableCell>{tollData.entry_point}</TableCell>
            <TableCell>{tollData.exit_point}</TableCell>
            <TableCell>{tollData.day}</TableCell>
            <TableCell>{tollData.number_plate}</TableCell>
            <TableCell>{tollData.toll_paid}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewTollData;
