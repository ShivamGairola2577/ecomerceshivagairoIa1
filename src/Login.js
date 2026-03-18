import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const response = await fetch("https://ecomercebackand1shivam.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",   // ✅ VERY IMPORTANT
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful ✅");

        setIsLoggedIn(true);
        setFormData({ email: "", password: "" });

        navigate("/profile");
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Server Error ❌");
    }
  };

  return (
    <div style={outerStyle}>
      <div style={cardStyle}>

        <h2 style={headingStyle}>Login to Your Account</h2>

        {/* Google Login */}
        <button
          type="button"
          style={googleBtnStyle}
          onClick={() => {
            window.location.href = "https://ecomercebackand1shivam.onrender.com/auth/google";
          }}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="google"
            style={{ width: "20px", marginRight: "10px" }}
          />
          Sign in with Google
        </button>

        <p style={{ margin: "20px 0", color: "white" }}>OR</p>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <button type="submit" style={loginBtnStyle}>
            Login
          </button>

        </form>

        <p style={{ marginTop: "20px", color: "white" }}>
          New user?{" "}
          <Link to="/signup" style={{ color: "#000", fontWeight: "bold" }}>
            Sign up here
          </Link>
        </p>

      </div>
    </div>
  );
}

//////////////////////////////////////////////////////////////
// Styles
//////////////////////////////////////////////////////////////

const outerStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #20c6c6, #1ccfcf)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const cardStyle = {
  background: "linear-gradient(to bottom right, #1e90ff, #1c86ee)",
  padding: "40px",
  width: "350px",
  borderRadius: "15px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
};

const headingStyle = {
  color: "white",
  marginBottom: "20px"
};

const googleBtnStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "14px"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "none",
  fontSize: "14px"
};

const loginBtnStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#ddd",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Login;