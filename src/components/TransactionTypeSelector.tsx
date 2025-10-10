import { TransactionType } from "../types/transactions";

interface TransactionTypeSelectorProps {
  value: TransactionType;
  id?: string;
  onChange: (type: TransactionType) => void;
}
const TransactionTypeSelector: React.FC<TransactionTypeSelectorProps> = ({
  value,
  id,
  onChange,
}) => {
  const transactionsTypeButtons = [
    {
      type: TransactionType.EXPENSE,
      label: "Despesas",
      activeClasses: "bg-red-500 border-red-500 text-red-50 font-medium",
      inactiveClasses: "bg-transparent border-red-300 text-red-500 hover:bg-red-50",
    },
    {
      type: TransactionType.INCOME,
      label: "Receitas",
      activeClasses: "bg-green-500 border-green-500 text-green-50 font-medium",
      inactiveClasses: "bg-transparent border-green-300 text-green-500 hover:bg-green-50",
    },
  ];

  return (
    <fieldset id={id} className="grid grid-cols-2 gap-5">
      {transactionsTypeButtons.map((item) => (
        <button
          key={item.type}
          type="button"
          onClick={() => onChange(item.type)}
          className={`flex items-center justify-center border rounded-md py-2 px-4 transiction-all
                ${value === item.type ? item.activeClasses : item.inactiveClasses}`}
        >
          {item.label}
        </button>
      ))}
    </fieldset>
  );
};

export default TransactionTypeSelector;
