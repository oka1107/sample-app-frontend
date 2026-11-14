const API_URL = "https://sample-app-backend-java.onrender.com";

// API通信確認
export async function checkApiConnection() {
  const response = await fetch(`${API_URL}/subsidies`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("API通信に失敗しました");
  }

  return await response.json();
}

// 顧客一覧取得
export async function getClients() {
  const response = await fetch(`${API_URL}/subsidies`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("顧客一覧の取得に失敗しました");
  }

  return await response.json();
}

// 顧客詳細取得
export async function getClient(id) {
  const response = await fetch(`${API_URL}/subsidies/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("顧客詳細の取得に失敗しました");
  }

  return await response.json();
}

// 顧客を新規登録
export async function createClient(client) {
  const response = await fetch(`${API_URL}/subsidies`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    throw new Error("顧客登録に失敗しました");
  }

  return await response.json();
}

// 顧客情報を更新
export async function updateClient(id, client) {
  const response = await fetch(`${API_URL}/subsidies/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    const message = await response.text();
    console.error("顧客更新エラー:", response.status, message);
    throw new Error("顧客更新に失敗しました");
  }

  return await response.json();
}

// 顧客を削除
export async function deleteClient(id) {
  const response = await fetch(`${API_URL}/subsidies/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("顧客削除に失敗しました");
  }
}
