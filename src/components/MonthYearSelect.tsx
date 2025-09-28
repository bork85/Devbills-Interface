import { ChevronLeft, ChevronRight } from "lucide-react";

const monthNames: readonly string[] = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
interface MonthYearSelectProps {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

const MonthYearSelect = ({ month, year, onMonthChange, onYearChange }: MonthYearSelectProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i); // array 5 anos pra trás até 5 anos pra frente

  const handleNextMonth = (): void => {
    if(month === 12) {
      onMonthChange(1);
      onYearChange(year + 1);
    }else {
      onMonthChange(month + 1);
    }
  }
    const handlePrevMonth = (): void => {
    if(month === 1) {
      onMonthChange(12);
      onYearChange(year - 1);
    }else {
      onMonthChange(month - 1);
    }
  }

 
  return (
    <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3 gap-2 border border-gray-700">
      <button
        type="button"
        onClick={handlePrevMonth}
        className="p-2 rounded-full hover:bg-gray-700 hover:text-primary-500 transition-colors cursor-pointer"
        aria-label="Mês anterior"
      >
        <ChevronLeft />
      </button>
      <div>
        <label htmlFor="month-select" className="sr-only">
          Mês
        </label>
        {/** biome-ignore lint/correctness/useUniqueElementIds: <false positive> */}
        <select
          id="month-select"
            value={month}
            onChange={(event) => onMonthChange(Number(event.target.value))}
          className="bg-gray-800 border border-gray-700 rounded-md py-1 px-3 text-sm font-medium focus: outline-none focus: ring-2 focus: ring-primary-500 cursor-pointer"
        >
          {monthNames.map((name, index) => (
            <option key={name} value={index + 1}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="year-select" className="sr-only">
          Ano
        </label>
        {/** biome-ignore lint/correctness/useUniqueElementIds: <false positive> */}
        <select
          id="year-select"
          value={year}
          onChange={(event) => onYearChange(Number(event.target.value))}
          className="bg-gray-800 border border-gray-700 rounded-md py-1 px-3 text-sm font-medium focus: outline-none focus: ring-2 focus: ring-primary-500  cursor-pointer"
        >
          {years.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleNextMonth}
        className="p-2 rounded-full hover:bg-gray-700 hover:text-primary-500 transition-colors  cursor-pointer"
        aria-label="Mês posterior"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default MonthYearSelect;
