import React, { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { user, loading, error, fetchUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await fetchUser(userData);
    setUserData({ email: "", password: "" });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={userData.password}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p>
          Don't have an account? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
