import { ArrowDown, ArrowUp, Calendar, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, MonthYearSelect } from "../components/";
import { getTransactionsMonthly, getTransactionsSummary } from "../services/transactionsService";
import type { MonthLyItem, TransactionSummary } from "../types/transactions";
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
  const [monthLyItemData, setMonthLyItemData] = useState<MonthLyItem[]>([]);

  useEffect(() => {
    async function loadSummary() {
      const response = await getTransactionsSummary(month, year);
      setSummary(response);
    }
    loadSummary();
  }, [month, year]);
  useEffect(() => {
    async function loadMonthlyData() {
      const response = await getTransactionsMonthly(month, year);
      setMonthLyItemData(response.history);
    }
    loadMonthlyData();
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
        <Card icon={<Wallet size={20} className="text-primary-500" />} title="Saldo" hover>
          <p
            className={`text-2xl font-semibold mt-2
        ${summary.balance >= 0 ? "text-primary-500" : "text-red-500"}`}
          >
            {formatCurrency(summary.balance)}
          </p>
        </Card>
        <Card icon={<ArrowUp size={20} className="text-primary-500" />} title="Receitas" hover>
          <p className="text-2xl font-semibold mt-2 text-primary-500">
            {formatCurrency(summary.totalIncomes)}
          </p>
        </Card>
        <Card icon={<ArrowDown size={20} className="text-red-500" />} title="Despesas" hover>
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
          hover
        >
          {summary.expensesByCategory.length > 0 ? (
            <div className="h-100 mt-4">
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
            <div className="flex items-center justify-center h-80 text-gray-500">
              Não há dados de transações!
            </div>
          )}
        </Card>
        <Card
          icon={<Calendar size={20} className="text-primary-500" />}
          title="Historico Mensal"
          className="min-h-80"
          hover
        >
          <div className="h-80 mt-4">
            {monthLyItemData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthLyItemData} margin={{left: 30, top: 50}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="name"
                    stroke="#94A3B8"
                    tick={{ style: { textTransform: "capitalize" } }}
                  />
                  <YAxis stroke="#94A3B8" tick={{ style: { fontSize: 12 } }} tickFormatter={formatCurrency}/>
                  <Tooltip formatter={formatCurrency} contentStyle={{
                    backgroundColor: '#1a1a1a',
                    borderColor: '#2a2a2a'
                  }}
                  labelStyle={{color: '#f8f8f8'}}/>
                  <Legend />
                  <Bar dataKey="expense" fill="#FF6384" />
                  <Bar dataKey="income" fill="#37E359" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-80 text-gray-500">
                Não há dados de transações!
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Dashboard;
