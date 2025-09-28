import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { firebaseAuth, googleAuthProvider } from "../config/firebase";
import type { AuthState } from "../types/auth";

interface AuthContextProps {
  authState: AuthState;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, SetAuthState] = useState<AuthState>({
    user: null,
    isloading: false,
    error: null,
  });

  const signInWithGoogle = async (): Promise<void> => {
    SetAuthState((prev) => ({ ...prev, isloading: true }));
    try {
      await signInWithPopup(firebaseAuth, googleAuthProvider);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao efetuar Login";
      SetAuthState((prev) => ({ ...prev, isloading: false, error: message }));
    }
  };

  const logout = async (): Promise<void> => {
    SetAuthState((prev) => ({ ...prev, isloading: true }));
    try {
      signOut(firebaseAuth);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao efetuar Login";
      SetAuthState((prev) => ({ ...prev, isloading: false, error: message }));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      (user) => {
        if (user) {
          //console.log(user);    //AQUI!
          SetAuthState({
            user: {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoUrl: user.photoURL,
            },
            isloading: false,
            error: null,
          });
        } else {
          SetAuthState({
            user: null,
            isloading: false,
            error: null,
          });
        }
      },
      (error) => {
        SetAuthState({
          user: null,
          isloading: false,
          error: error.message,
        });
        console.error("Erro na autenticação:", error);
      },
    );
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ authState, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
