import { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    dob: "",
    username: "",
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
    const response = await fetch("https://ecomercebackand1shivam.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      alert("Account Created Successfully ✅");
    } else {
      alert("Error creating account ❌");
    }

  } catch (error) {
    alert("Server Error ❌");
  }
};


  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to right, #1cc7d0, #1e90ff)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        backgroundColor: "#e6e6e6",
        padding: "40px",
        borderRadius: "15px",
        width: "350px",
        textAlign: "center"
      }}>
        <h2 style={{ color: "#1e90ff" }}>Create Your Account</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name"
            onChange={handleChange} required style={inputStyle} />

          <input type="text" name="address" placeholder="Address"
            onChange={handleChange} required style={inputStyle} />

          <input type="date" name="dob"
            onChange={handleChange} required style={inputStyle} />

          <input type="text" name="username" placeholder="Username"
            onChange={handleChange} required style={inputStyle} />

          <input type="email" name="email" placeholder="Email"
            onChange={handleChange} required style={inputStyle} />

          <input type="password" name="password" placeholder="Password"
            onChange={handleChange} required style={inputStyle} />

          <button type="submit" style={{
            marginTop: "15px",
            padding: "10px",
            width: "100%",
            backgroundColor: "#1e90ff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

export default Signup;