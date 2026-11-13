import { Link } from "react-router-dom";

function UserList() {
  return (
    <div>
      <h1>顧客一覧画面</h1>

      <Link to="/users/new">新規登録</Link>
    </div>
  );
}

export default UserList;
