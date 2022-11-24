import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  ButtonGroup,
  Link,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import axios from "axios";

const Home:any = () => {
  const [tollData, setTollData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData:any = async () => {
    const result = await axios.get("http://localhost:3001/tollData");
    setTollData(result.data);
  };

  const deleteTollData: any = async (id: any) => {
    await axios.delete(`http://localhost:3001/tollData/${id}`);
    loadData();
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
            <TableCell>Operations</TableCell>
            <TableCell>
              <Link href="/data/add" sx={{ textDecoration: "none" }}>
                <Button variant="outlined">Add Record</Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tollData.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell><Link href={`/data/detail/${row.id}`}>{row.id}</Link></TableCell>
              <TableCell>{row.entry_point}</TableCell>
              <TableCell>{row.exit_point}</TableCell>
              <TableCell>{row.day}</TableCell>
              <TableCell>{row.number_plate}</TableCell>
              <TableCell>{row.toll_paid}</TableCell>
              <TableCell>
                <ButtonGroup>
                  <Link href={`/data/edit/${row.id}`}>
                    <Button>
                      <EditIcon />
                    </Button>
                  </Link>
                  <Link>
                    <Button onClick={() => deleteTollData(row.id)}>
                      <DeleteIcon />
                    </Button>
                  </Link>
                  <Link href={`/data/view/${row.id}`}>
                    <Button>
                      <VisibilityIcon />
                    </Button>
                  </Link>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Home;
