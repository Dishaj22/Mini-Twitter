import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContextValue";

export default function AppLayout() {
  const { isAuthenticated, currentUser, logout } = useAuth();

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Mini Twitter</h2>

        <nav>
          <Link to="/">Home</Link>
          <br />
          <Link to="/login">Login</Link>
          <br />
          <Link to="/profile/1">Profile</Link>
          <br />
          <Link to="/settings">Settings</Link>
        </nav>

        {isAuthenticated && (
          <div>
            <p>Welcome, {currentUser.name}</p>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}