import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClient, updateClient } from "../api/client";

function CustomerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [subsidyName, setSubsidyName] = useState("");
  const [subsidyAmount, setSubsidyAmount] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 顧客情報をAPIから取得
  useEffect(() => {
    let cancelled = false;

    const fetchCustomer = async () => {
      try {
        const customer = await getClient(id);

        if (!cancelled) {
          setCustomerName(customer.name);
          setSubsidyName(customer.subsidyName);
          setSubsidyAmount(String(customer.subsidyAmount));
          setApplicationDeadline(customer.deadline);
        }
      } catch (error) {
        console.error("顧客情報取得エラー:", error);

        if (!cancelled) {
          setError("顧客情報の取得に失敗しました。");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchCustomer();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // 顧客情報をAPIで更新
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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

    const updatedCustomer = {
      name: customerName.trim(),
      subsidyName: subsidyName.trim(),
      subsidyAmount: Number(subsidyAmount),
      deadline: applicationDeadline,
    };

    try {
      setSaving(true);

      // 更新APIを実行
      await updateClient(id, updatedCustomer);

      // 成功した場合は顧客詳細画面へ移動
      navigate(`/customers/${id}`, {
        state: {
          successMessage: "顧客情報を更新しました。",
        },
      });
    } catch (error) {
      console.error("顧客更新エラー:", error);
      setError("顧客情報の更新に失敗しました。通信状態を確認してください。");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="login-container">
        <p>顧客情報を取得しています...</p>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h1>顧客編集</h1>

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
          />
        </div>

        <div className="form-group">
          <label>助成金名</label>
          <input
            type="text"
            value={subsidyName}
            onChange={(e) => setSubsidyName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>助成額</label>
          <input
            type="number"
            min="0"
            value={subsidyAmount}
            onChange={(e) => setSubsidyAmount(e.target.value)}
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

        <button type="submit" className="login-button" disabled={saving}>
          {saving ? "更新中..." : "更新"}
        </button>
      </form>

      <p>
        <button type="button" onClick={() => navigate(`/customers/${id}`)}>
          戻る
        </button>
      </p>
    </div>
  );
}

export default CustomerEdit;
