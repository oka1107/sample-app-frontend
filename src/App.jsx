import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import UserList from "./pages/UserList";
import UserRegister from "./pages/UserRegister";
import CustomerList from "./pages/CustomerList";
import CustomerDetail from "./pages/CustomerDetail";
import CustomerEdit from "./pages/CustomerEdit.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ログイン画面 */}
        <Route path="/login" element={<Login />} />

        {/* ユーザー一覧画面 */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />

        {/* 顧客一覧画面 */}
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <CustomerList />
            </ProtectedRoute>
          }
        />

        {/* 顧客登録画面 */}
        <Route
          path="/customers/new"
          element={
            <ProtectedRoute>
              <UserRegister />
            </ProtectedRoute>
          }
        />

        {/* 顧客詳細画面 */}
        <Route
          path="/customers/:id"
          element={
            <ProtectedRoute>
              <CustomerDetail />
            </ProtectedRoute>
          }
        />

        {/* 顧客編集画面 */}
        <Route
          path="/customers/:id/edit"
          element={
            <ProtectedRoute>
              <CustomerEdit />
            </ProtectedRoute>
          }
        />

        {/* その他のURLはログイン画面へ */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
