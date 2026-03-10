import React, { useEffect, useState } from "react";
import api from "../api/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("auth/profile/");
        console.log("res dot data: ", res.data);

        setUser(res.data);
      } catch (error) {
        console.error("fetch error: ", error);
        setError(error.response?.data?.detail || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "80vh", textAlign: "center" }}
    >
      {user && (
        <>
          <h1>{user.username}</h1>
          <p>{user.email}</p>
        </>
      )}
    </div>
  );
};

export default Profile;

// return user ? (
//   <div>
//     <h1>{user.username}</h1>
//     <p>{user.email}</p>
//   </div>
// ) : (
//   <p>loading...</p>
// );
// };
