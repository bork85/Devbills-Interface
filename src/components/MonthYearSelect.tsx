
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

const MonthYearSelect = ({month, year, onMonthChange, onYearChange}:MonthYearSelectProps) =>{
    return (

    )
}