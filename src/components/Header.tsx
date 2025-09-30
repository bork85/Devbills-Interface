import { Activity, LogOut, Smile } from "lucide-react";
import { useNavigate } from "react-router";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-[1200]">
      <div className="flex p-3 gap-2.5 items-center">
        <Activity size={28} className="text-primary-500" />
        <h1 className="text-xl font-bold text-primary-500">DevBills</h1>
      </div>
      <div className="flex items-center gap-2.5">
        <Button
          variant="secondary"
          className="h-7 text-xs text-gray-800 hover:text-primary-500"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Button>
        <Button
          variant="secondary"
          className="h-7 text-xs hover:text-primary-500"
          onClick={() => navigate("/transacoes")}
        >
          Transações
        </Button>
      </div>
      <div className="flex items-center p-3 gap-2.5">
        <Smile />
        <p className="text-xs text-gray-200 ">Meu Nome</p>
        <LogOut />
      </div>
    </div>
  );
};
export default Header;
