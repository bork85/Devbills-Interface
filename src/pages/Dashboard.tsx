import { ArrowDown, ArrowUp, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, MonthYearSelect } from "../components/";
import { getTransactionsSummary } from "../services/transactionsService";
import type { TransactionSummary } from "../types/transactions";
import { formatCurrency } from "../utils/formatters";

interface chartLabelProps {
  categoryName: string;
  percent: number;
}

const Dashboard = () => {
  const initialSummary: TransactionSummary = {
    totalIncomes: 0,
    totalExpenses: 0,
    balance: 0,
    expensesByCategory: [],
  };

  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [summary, setSummary] = useState<TransactionSummary>(initialSummary);

  useEffect(() => {
    async function loadSummary() {
      const response = await getTransactionsSummary(month, year);
      setSummary(response);
    }
    loadSummary();
  }, [month, year]);
  const renderPieChartLabel = ({ categoryName, percent }: chartLabelProps): string => {
    return `${categoryName}: ${(percent * 100).toFixed(1)}%`;
  };
  const formatToolTip = (value: number | string): string => {
    return formatCurrency(typeof value === "number" ? value : 0);
  };
  return (
    <div className="container-app py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card icon={<Wallet size={20} className="text-primary-500" />} title="Saldo">
          <p
            className={`text-2xl font-semibold mt-2
        ${summary.balance >= 0 ? "text-primary-500" : "text-red-500"}`}
          >
            {formatCurrency(summary.balance)}
          </p>
        </Card>
        <Card icon={<ArrowUp size={20} className="text-primary-500" />} title="Receitas">
          <p className="text-2xl font-semibold mt-2 text-primary-500">
            {formatCurrency(summary.totalIncomes)}
          </p>
        </Card>
        <Card icon={<ArrowDown size={20} className="text-red-500" />} title="Despesas">
          <p className="text-2xl font-semibold mt-2 text-red-500">
            {formatCurrency(summary.totalExpenses)}
          </p>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-3">
        <Card
          icon={<TrendingUp size={20} className="text-primary-500" />}
          title="Despesas por categoria"
          className="min-h-80"
        >
          {summary.expensesByCategory.length > 0 ? (
            <div className="h-200 mt-4">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={summary.expensesByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="amount"
                    nameKey="categoryName"
                    label={renderPieChartLabel}
                  >
                    {summary.expensesByCategory.map((entry) => (
                      <Cell key={entry.categoryId} fill={entry.categoryColor} />
                    ))}
                  </Pie>
                  <Tooltip formatter={formatToolTip} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div>Se dados!</div>
          )}
        </Card>
      </div>
    </div>
  );
};
export default Dashboard;
