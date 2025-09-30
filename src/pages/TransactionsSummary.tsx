import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, MonthYearSelect } from "../components";

const TransactionsSummary = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());
  //const textToSearch = "";

 // function searchTrasactions(transactions, text) {  }

  return (
    <div className="flex flex-col items-center w-full gap-6 p-6">
      <div className="flex items-center justify-between p-3 w-full">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Transações</h1>
        <Button onClick={() => navigate("/nova-transacao")} className="h-9 text-xs">
          + Nova Transação
        </Button>
      </div>
      <MonthYearSelect month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
      <div className="h-14 flex items-center gap-5 p-10 pr-5 pl-5 border border-gray-500 bg-gray-700 rounded-xl w-full">
        <Search />
        <input
          placeholder="Buscar transação..."
          className="border-gray-500 h-10 w-full p-5 rounded-xl bg-gray-800"
        ></input>
      </div>
      <div className="min-h-50 flex items-center justify-center border border-gray-500 bg-gray-700 w-full rounded-xl">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Descrição</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell align="right">Valor</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
export default TransactionsSummary;
