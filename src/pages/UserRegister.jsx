import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createClient } from "../api/client";

function UserRegister() {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [subsidyName, setSubsidyName] = useState("");
  const [subsidyAmount, setSubsidyAmount] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // 顧客登録処理
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !customerName.trim() ||
      !subsidyName.trim() ||
      subsidyAmount === "" ||
      !applicationDeadline
    ) {
      setError("すべての項目を入力してください。");
      return;
    }

    if (!Number.isFinite(Number(subsidyAmount)) || Number(subsidyAmount) < 0) {
      setError("助成額は0以上の数値を入力してください。");
      return;
    }

    const customer = {
      name: customerName.trim(),
      subsidyName: subsidyName.trim(),
      subsidyAmount: Number(subsidyAmount),
      deadline: applicationDeadline,
    };

    try {
      setLoading(true);

      // Spring BootのAPIに登録
      await createClient(customer);

      console.log("登録成功！");
      console.log("一覧画面へメッセージを渡します");

      navigate("/customers", {
        state: {
          successMessage: "顧客情報を登録しました。",
        },
      });
    } catch (error) {
      console.error("顧客登録エラー:", error);
      setError("顧客情報の登録に失敗しました。通信状態を確認してください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>
        <Link
          to="/customers"
          style={{
            color: "inherit",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          顧客登録
        </Link>
      </h1>

      {success && (
        <p style={{ color: "green" }} role="status">
          {success}
        </p>
      )}

      {error && (
        <p style={{ color: "red" }} role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>顧客名</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="顧客名を入力してください"
          />
        </div>

        <div className="form-group">
          <label>助成金名</label>
          <input
            type="text"
            value={subsidyName}
            onChange={(e) => setSubsidyName(e.target.value)}
            placeholder="助成金名を入力してください"
          />
        </div>

        <div className="form-group">
          <label>助成額</label>
          <input
            type="number"
            min="0"
            value={subsidyAmount}
            onChange={(e) => setSubsidyAmount(e.target.value)}
            placeholder="助成額を入力してください"
          />
        </div>

        <div className="form-group">
          <label>申請期限</label>
          <input
            type="date"
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
          />
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "登録中..." : "登録"}
        </button>
      </form>
    </div>
  );
}

export default UserRegister;
