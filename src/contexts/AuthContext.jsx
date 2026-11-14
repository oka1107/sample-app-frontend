import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// RenderのバックエンドURL
const API_URL = "https://sample-app-backend-java.onrender.com";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ログイン状態を確認する
  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("認証状態の確認に失敗しました", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // アプリ起動時にログイン状態を確認
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        checkAuth,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// useAuthをexportする
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
