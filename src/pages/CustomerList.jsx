import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkApiConnection, getClients } from "../api/client";
import { useAuth } from "../contexts/AuthContext";

function CustomerList() {
  const location = useLocation();
  const navigate = useNavigate();

  // AuthContextから認証状態の更新機能を取得
  const { setUser } = useAuth();

  console.log("一覧画面で受け取った情報:", location.state);

  const [customers, setCustomers] = useState([]);
  const [apiMessage, setApiMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage || "",
  );

  // バックエンドから顧客一覧を取得
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getClients();
        setCustomers(data);
      } catch (error) {
        console.error("顧客一覧取得エラー:", error);
        setErrorMessage("顧客一覧の取得に失敗しました。");
      }
    };

    fetchCustomers();
  }, []);

  // 成功メッセージを画面に保持し、履歴情報をクリア
  useEffect(() => {
    if (location.state?.successMessage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuccessMessage(location.state.successMessage);

      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [location.state, location.pathname, navigate]);

  // API通信確認
  const handleApiCheck = async () => {
    setApiMessage("API通信を確認しています...");

    try {
      await checkApiConnection();

      setApiMessage("API通信に成功しました！");
    } catch (error) {
      console.error("API通信エラー:", error);

      setApiMessage(
        "API通信に失敗しました。バックエンドの起動状態を確認してください。",
      );
    }
  };

  // ログアウト処理
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("ログアウトに失敗しました。");
      }

      // React側の認証状態を解除
      setUser(null);

      // ログイン画面へ移動
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("ログアウトエラー:", error);
      setErrorMessage("ログアウトに失敗しました。");
    }
  };

  return (
    <div className="login-container">
      {/* 画面タイトルとログアウトボタン */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          gap: "20px",
        }}
      >
        <h1
          style={{
            margin: "30px 0",
            whiteSpace: "nowrap",
            marginLeft: "120px",
          }}
        >
          顧客一覧
        </h1>

        <button
          onClick={handleLogout}
          style={{
            whiteSpace: "nowrap",
            flexShrink: 0,
            width: "auto",
            padding: "10px 20px",
          }}
        >
          ログアウト
        </button>
      </div>
      {/* 登録・更新・削除成功メッセージ */}
      {successMessage && (
        <p style={{ color: "green" }} role="status">
          {successMessage}
        </p>
      )}

      <button onClick={handleApiCheck}>API通信確認</button>

      {apiMessage && <p>{apiMessage}</p>}

      {errorMessage && (
        <p style={{ color: "red" }} role="alert">
          {errorMessage}
        </p>
      )}

      <table>
        <thead>
          <tr>
            <th>顧客名</th>
            <th>助成金名</th>
            <th>助成額</th>
            <th>申請期限</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>
                <Link to={`/customers/${customer.id}`}>{customer.name}</Link>
              </td>

              <td>{customer.subsidyName}</td>

              <td>{Number(customer.subsidyAmount).toLocaleString()}円</td>

              <td>{customer.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {customers.length === 0 && !errorMessage && (
        <p>登録された顧客はいません。</p>
      )}

      <p>
        <Link to="/customers/new">顧客登録へ</Link>
      </p>
    </div>
  );
}

export default CustomerList;
