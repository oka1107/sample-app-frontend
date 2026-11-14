import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();

  // AuthContextから認証状態の更新機能を取得
  const { checkAuth } = useAuth();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginId || !password) {
      setError("ログインIDとパスワードを入力してください。");
      return;
    }

    setError("");

   try {
  const API_URL = "https://sample-app-backend-java.onrender.com";

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      loginId: loginId,
      password: password,
    }),
  });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "ログインに失敗しました。");
        return;
      }

      // ログイン成功後、認証状態を更新
      await checkAuth();

      // ログイン状態を確認してから画面遷移
      navigate("/customers");
    } catch (err) {
      console.error("ログインエラー:", err);
      setError("API通信に失敗しました。");
    }
  };

  return (
    <div className="login-container">
      <h1>ログイン</h1>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>ログインID</label>
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            placeholder="ログインIDを入力してください"
          />
        </div>

        <div className="form-group">
          <label>パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力してください"
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="login-button">
          ログイン
        </button>
      </form>
    </div>
  );
}

export default Login;
