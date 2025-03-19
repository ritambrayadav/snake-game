import React, { useEffect, useState } from "react";
import { getUserById } from "../api/users";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem("user")).id;

    if (!userId) {
      setError("User not found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error) {
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p><strong>Email:</strong> {user?.email}</p>
    </div>
  );
};

export default Dashboard;
