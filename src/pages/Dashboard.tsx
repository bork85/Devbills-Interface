import { useEffect, useState } from "react";
import { api } from "../services/api";

const Dashboard = () => {
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());

  useEffect(() => {
    async function getTransactions() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await api.get("/transactions");
    }
    getTransactions();
  });

  return (
    <div className="container-app py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
        <MonthYearSelect month={month} year={year} setMonth={setMonth} setYear={setYear} />
      </div>
    </div>
  );
};
export default Dashboard;
