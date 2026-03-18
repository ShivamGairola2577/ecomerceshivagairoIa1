import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile({ loading }) {

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    dob: "",
    username: "",
    password: ""
  });

  const [checkingSession, setCheckingSession] = useState(true);

  // ✅ Check backend session
  useEffect(() => {
  fetch("https://ecomercebackand1shivam.onrender.com/current-user", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn && data.user) {
          setProfile({
            name: data.user.fullName || "",
            email: data.user.email || "",
            dob: data.user.dob || "",
            username: data.user.username || "",
            password: data.user.password || ""
          });
        }
        setCheckingSession(false);
      })
      .catch(() => setCheckingSession(false));
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully ✅");
  };

  // ✅ Logout function
  const handleLogout = async () => {
    try {
await fetch("https://ecomercebackand1shivam.onrender.com/logout", {
        credentials: "include"
      });

      alert("Logged out successfully ✅");

      navigate("/login"); // redirect to login

    } catch (error) {
      console.log(error);
      alert("Logout failed ❌");
    }
  };

  if (loading || checkingSession) {
    return (
      <div style={outerStyle}>
        <h2>Loading...</h2>
      </div>
    );
  }

  // ❌ Not logged in
  if (!profile.email) {
    return (
      <div style={outerStyle}>
        <div style={cardStyle}>
          <h2 style={{ textAlign: "center" }}>
            Please Login First
          </h2>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link to="/login" style={buttonStyle}>
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Logged in UI
  return (
    <div style={outerStyle}>
      <div style={cardStyle}>

        <h2 style={headingStyle}>My Profile</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="date"
            name="dob"
            value={profile.dob}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={profile.username}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={profile.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Save Changes
          </button>

        </form>

        {/* 🔴 Logout Button */}
        <button
          onClick={handleLogout}
          style={logoutButtonStyle}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

//////////////////////////////////////////////////////////////
// Styles
//////////////////////////////////////////////////////////////

const outerStyle = {
  minHeight: "100vh",
  backgroundColor: "#b7cdd6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const cardStyle = {
  backgroundColor: "white",
  width: "400px",
  padding: "40px",
  borderRadius: "15px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "25px",
  color: "#1177aa"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

const buttonStyle = {
  display: "inline-block",
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#1177aa",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  textDecoration: "none",
  textAlign: "center",
  marginBottom: "15px"
};

const logoutButtonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "red",
  color: "white",
  fontSize: "16px",
  cursor: "pointer"
};

export default Profile;