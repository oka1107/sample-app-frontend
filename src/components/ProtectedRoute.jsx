import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // 認証状態の確認中
  if (loading) {
    return <p>認証状態を確認しています...</p>;
  }

  // 未ログインの場合はログイン画面へ移動
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ログイン済みの場合はページを表示
  return children;
}

export default ProtectedRoute;
