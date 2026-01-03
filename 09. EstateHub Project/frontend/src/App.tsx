import { useEffect, useState } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google/login";
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get("token");

      if (tokenFromUrl) {
        localStorage.setItem("token", tokenFromUrl);
        // Remove query params without reloading
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }

      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch("http://localhost:3000/user/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setUser(data);
          } else {
            // Token might be invalid
            if (res.status === 401) {
              localStorage.removeItem("token");
            }
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="app-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {user ? (
        <div className="profile-card">
          <div className="profile-avatar">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Profile" />
            ) : (
              <span>{user.firstName ? user.firstName[0] : "U"}</span>
            )}
          </div>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <p>{user.role}</p>

          <div className="user-info">
            <div className="user-info-item">
              <span className="user-info-label">ID</span>
              <span>{user.id}</span>
            </div>
            <div className="user-info-item">
              <span className="user-info-label">Role</span>
              <span>{user.role}</span>
            </div>
          </div>

          <button className="btn-outline" onClick={logout}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className="login-container">
          <h1>Welcome to EstateHub</h1>
          <p>Sign in to access your dashboard and manage properties.</p>
          <button className="btn-primary" onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
