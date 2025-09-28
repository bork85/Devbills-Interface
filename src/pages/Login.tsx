import { useEffect } from "react";
import { useNavigate } from "react-router";
import { GoogleLoginButton } from "../components";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { signInWithGoogle, authState } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Erro ao realizar login", error);
    }
  };
  useEffect(() => {
    if (authState.user && !authState.isloading) {
      navigate("/dashboard");
    }
  }, [authState.user, authState.isloading, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <header>
          <h1 className="text-center text-3xl font-extrabold text-gray-50">DevBills</h1>
          <p className="mt-2 text-center text-sm text-gray-200">
            Gerencie suas finanças de forma simples e eficiente
          </p>
        </header>
        <main className="mt-8 bg-gray-200 py-8 px-4 shadow-md rounded-lg sm:px-10 space-y-6">
          <section>
            <h2 className="text-lg font-medium text-gray-900 text-center">
              Faça login para continuar
            </h2>
            <p className="mt-1 text-sm text-gray-600 text-center">
              Acesse sua conta para começar a gerenciar suas finanças
            </p>
          </section>
          <GoogleLoginButton onClick={handleLogin} isLoading={false} />
          {authState.error && (
            <div className="bg-red-50 text-center text-red-700 mt-4">
              <p>{authState.error}</p>
            </div>
          )}
          <footer className="mt-6">
            <p className="mt-1 text-sm text-gray-600 text-center">
              Ao fazer login, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};
export default Login;
