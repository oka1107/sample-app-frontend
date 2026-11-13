const STORAGE_KEY = "customers";

// 顧客データを取得
export function getCustomers() {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}

// 顧客データを保存
export function saveCustomers(customers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

// 顧客を追加
export function addCustomer(customer) {
  const customers = getCustomers();

  const newCustomer = {
    ...customer,
    id: Date.now(),
  };

  customers.push(newCustomer);

  saveCustomers(customers);

  return newCustomer;
}
// 顧客情報を更新
export function updateCustomer(updatedCustomer) {
  const customers = getCustomers();

  const updatedCustomers = customers.map((customer) =>
    customer.id === updatedCustomer.id ? updatedCustomer : customer,
  );

  saveCustomers(updatedCustomers);
}
// 顧客情報を削除
export function deleteCustomer(id) {
  const customers = getCustomers();

  const updatedCustomers = customers.filter(
    (customer) => customer.id !== Number(id),
  );

  saveCustomers(updatedCustomers);
}
