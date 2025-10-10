import { AlertCircle, ArrowDown, ArrowUp, Plus, Search, Trash2 } from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { Button, Card, MonthYearSelect } from "../components";
import Input from "../components/Input";
import { deleteTransaction, getTransactions } from "../services/transactionsService";
import { type Transaction, TransactionType } from "../types/transactions";
import { formatCurrency, formatDate } from "../utils/formatters";

const TransactionsSummary = () => {
  const currentDate = new Date();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [deletingId, setDeletingId] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const fetchTransactions = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      const data = await getTransactions({ month, year });
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      setError("Não foi possivel carregar as transações...");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <>
  useEffect(() => {
    fetchTransactions();
  }, [month, year]);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      setDeletingId(id);
      await deleteTransaction(id);
      toast.success("Transação excluída com sucesso!");
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      setFilteredTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Falha ao remover transação...");
    } finally {
      setDeletingId("");
    }
  };
  const confirmDelete = (id: string): void => {
    if (window.confirm("tem certeza que deseja deletar a transação?")) {
      handleDelete(id);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
    setFilteredTransactions(
      transactions.filter((transaction) =>
        transaction.description.toUpperCase().includes(event.target.value.toUpperCase()),
      ),
    );
  };

  return (
    <div className="container-app py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Transações</h1>
        <Link
          to="/nova-transacao"
          className="bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Transação
        </Link>
      </div>
      <Card className="mb-6">
        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        ></MonthYearSelect>
      </Card>
      <Card>
        <Input
          placeholder="Buscar transações..."
          icon={<Search className="w-4 h-4" />}
          fullWidth
          onChange={handleSearchChange}
          value={searchText}
        />
      </Card>
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="p-8 text-center flex flex-col items-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-sm">{error}</p>
            <Button onClick={fetchTransactions} className="mt-10">
              Tentar Novamente
            </Button>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Nenhuma transação encontrada!</p>
            <Link
              to="/nova-transacao"
              className="bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-all w-fit mx-auto mt-10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Transação
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="divide-y divide-gray-700 min-h-full w-full">
              <thead>
                <tr>
                  <th scope="col" className="p-3 text-left font-medium text-gray-400 uppercase">
                    Descrição
                  </th>
                  <th scope="col" className="p-3 text-center font-medium text-gray-400 uppercase">
                    Data
                  </th>
                  <th scope="col" className="p-3 text-center font-medium text-gray-400 uppercase">
                    Categoria
                  </th>
                  <th scope="col" className="p-3 text-center font-medium text-gray-400 uppercase">
                    Valor
                  </th>
                  <th
                    scope="col"
                    className="p-3 text-center font-medium text-gray-400 uppercase"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      <div className="flex items-center ">
                        <div className="mr-2">
                          {transaction.type === TransactionType.INCOME ? (
                            <ArrowUp className="w-4 h-4 text-primary-500" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <span className="text-sm text-center font-medium text-gray-50">
                          {transaction.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <div
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: transaction.category.color }}
                        />
                        <div>
                          <span className="text-gray-500 text-sm">{transaction.category.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500 whitespace-nowrap">
                      <span
                        className={`${transaction.type === TransactionType.INCOME ? "text-primary-500" : "text-red-500"}`}
                      >
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500 whitespace-nowrap">
                      <div>
                        <button
                          type="button"
                          onClick={() => confirmDelete(transaction.id)}
                          className="text-gray-500 hover:text-gray-400 cursor-pointer"
                          disabled={deletingId === transaction.id}
                        >
                          {deletingId === transaction.id ? (
                            <span className="inline-block w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TransactionsSummary;
