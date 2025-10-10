import { Calendar, DollarSign, Save, Tag } from "lucide-react";
import { type ChangeEvent, useEffect, useId, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card } from "../components";
import Input from "../components/Input";
import Select from "../components/Select";
import TransactionTypeSelector from "../components/TransactionTypeSelector";
import { getCategories } from "../services/categoriesService";
import type { Category } from "../types/category";
import { TransactionType } from "../types/transactions";

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

  const handleSubmit = () => {};

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
              required
            />
            <Input
              label="Valor"
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Ex: R$ 2000.00"
              icon={<DollarSign className="w-4 h-4" />}
              required
            />
            <Input
              label="Data"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              icon={<Calendar className="w-4 h-4" />}
              required
            />
            <Select
              label="Categoria"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              icon={<Tag className="w-4 h-4" />}
              required
              options={[
                { value: "", label: "Selecione uma categoria" },
                ...filteredCategories.map((cat) => ({
                  value: cat.name,
                  label: cat.name,
                })),
              ]}
            />
            <div className="flex justify-end space-x-3 mt-2">
              <Button variant="outline" onClick={handleCancel} type="button">
                Cancelar
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                <Save className="w-4 h-4 mr-2" />
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
