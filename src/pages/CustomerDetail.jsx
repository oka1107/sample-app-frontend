import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getClient, deleteClient } from "../api/client";

function CustomerDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleting, setDeleting] = useState(false);

  // バックエンドから顧客詳細を取得
  useEffect(() => {
    let cancelled = false;

    const fetchCustomer = async () => {
      try {
        const data = await getClient(id);

        if (!cancelled) {
          setCustomer(data);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setErrorMessage("顧客情報の取得に失敗しました。");
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

  // 顧客削除処理
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "この顧客情報を削除してもよろしいですか？",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await deleteClient(id);

      // 削除成功後、顧客一覧画面へ移動
      navigate("/customers", {
        state: {
          successMessage: "顧客情報を削除しました。",
        },
      });
    } catch (error) {
      console.error("顧客削除エラー:", error);
      setErrorMessage("顧客情報の削除に失敗しました。");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="login-container">
        <p>顧客情報を取得しています...</p>
      </div>
    );
  }

  if (errorMessage && !customer) {
    return (
      <div className="login-container">
        <p>{errorMessage}</p>
        <Link to="/customers">顧客一覧に戻る</Link>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="login-container">
        <p>顧客情報が見つかりません。</p>
        <Link to="/customers">顧客一覧に戻る</Link>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h1>顧客詳細</h1>
      {location.state?.successMessage && (
        <p style={{ color: "green" }} role="status">
          {location.state.successMessage}
        </p>
      )}

      <p>顧客名：{customer.name}</p>
      <p>助成金名：{customer.subsidyName}</p>
      <p>
        助成額：
        {Number(customer.subsidyAmount).toLocaleString()}円
      </p>
      <p>申請期限：{customer.deadline}</p>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* 編集画面へのリンク */}
      <p>
        <Link to={`/customers/${customer.id}/edit`}>顧客情報を編集する</Link>
      </p>

      {/* 削除ボタン */}
      <p>
        <button type="button" onClick={handleDelete} disabled={deleting}>
          {deleting ? "削除中..." : "顧客情報を削除する"}
        </button>
      </p>

      <p>
        <Link to="/customers">顧客一覧に戻る</Link>
      </p>
    </div>
  );
}

export default CustomerDetail;
