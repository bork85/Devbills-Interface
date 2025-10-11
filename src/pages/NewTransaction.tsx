import { AlertCircle, Calendar, DollarSign, Save, Tag } from "lucide-react";
import { type ChangeEvent, type FormEvent, useEffect, useId, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Button, Card, Input, Select, TransactionTypeSelector } from "../components";
import { getCategories } from "../services/categoriesService";
import { createTransaction } from "../services/transactionsService";
import type { Category } from "../types/category";
import { type CreateTransactionDTO, TransactionType } from "../types/transactions";

interface FormData {
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  type: TransactionType;
}
const initialFormData = {
  description: "",
  amount: 0,
  date: "",
  categoryId: "",
  type: TransactionType.EXPENSE,
};

const NewTransaction = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const formId = useId();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      const response = await getCategories();
      setCategories(response);
    };
    fetchCategories();
  }, []);

  const handleTransactionType = (itemType: TransactionType): void => {
    setFormData((prev) => ({ ...prev, type: itemType }));
  };

  const filteredCategories = categories.filter((category) => category.type === formData.type);

  const validateForm = (): boolean => {
    if (
      !formData.amount ||
      !formData.categoryId ||
      !formData.date ||
      !formData.description ||
      !formData.type
    ) {
      setErro("Preencha todos os campos para prosseguir");
      return false;
    }
    if (formData.amount <= 0) {
      setErro("O campo valor deve ser maior que zero");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      setLoading(true);
      if (!validateForm()) {
        return;
      }
      const transactionData: CreateTransactionDTO = {
        description: formData.description,
        amount: formData.amount,
        date: `${formData.date}T12:00:00.000Z`,
        categoryId: formData.categoryId,
        type: formData.type,
      };
      console.log(transactionData);
      const transactionCreated = await createTransaction(transactionData);
      console.log(transactionCreated);
      toast.success(`transação ${formData.description} cadastrada com sucesso!`);
      navigate("/transacoes");
    } catch (error) {
      console.error(error);
      toast.error("Não foi possivel cadastrar a transação");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/transacoes");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container-app py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Nova Transação</h1>

        <Card>
          {erro && (
            <Card>
              <div className="flex items-center bg-red-300 border border-red-700 rounded-xl p-4 mb-6 gap-2">
                <AlertCircle className="w-5 h-5 text-red-700" />
                <p className="text-red-700">{erro}</p>
              </div>
            </Card>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex gap-2 flex-col">
              <label htmlFor={formId} className="text-sm font-medium text-gray-50">
                Tipo de Transação
              </label>
              <TransactionTypeSelector
                id={formId}
                value={formData.type}
                onChange={handleTransactionType}
              />
            </div>
            <Input
              label="Descrição"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ex: Supermercado, Restaurante, Salário, etc..."
            />
            <Input
              label="Valor"
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Ex: R$ 2000.00"
              icon={<DollarSign className="w-4 h-4" />}
            />
            <Input
              label="Data"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              icon={<Calendar className="w-4 h-4" />}
            />
            <Select
              label="Categoria"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              icon={<Tag className="w-4 h-4" />}
              options={[
                { value: "", label: "Selecione uma categoria" },
                ...filteredCategories.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                })),
              ]}
            />
            <div className="flex justify-end space-x-3 mt-2">
              <Button variant="outline" onClick={handleCancel} type="button" disabled={loading}>
                Cancelar
              </Button>
              <Button
                disabled={loading}
                type="submit"
                onClick={handleSubmit}
                variant={formData.type === TransactionType.EXPENSE ? "danger" : "success"}
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                
                Salvar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default NewTransaction;
