import { useState } from "react";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully ✅");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
<div style={outerStyle} className="contact-outer">
 <div style={cardStyle} className="contact-card">

        <h1 style={headingStyle}>Contact Us</h1>
        <p style={subTextStyle}>
          We’d love to hear from you! Choose one of the options below or send us a message.
        </p>

        {/* Email */}
        <div style={infoBoxStyle} className="contact-info">
          📧 <strong style={{ marginLeft: "10px" }}>Email Us</strong>
          <a
            href="mailto:shivamgairola30@gmail.com"
            style={linkStyle}
          >
            — shivamgairola30@gmail.com
          </a>
        </div>

        {/* Call */}
        <div style={infoBoxStyle}>
          📞 <strong style={{ marginLeft: "10px" }}>Call Us</strong>
          <a
            href="tel:+918954159979"
            style={linkStyle}
          >
            — +91 8954159979
          </a>
        </div>

        {/* WhatsApp */}
        <div style={infoBoxStyle}>
          💬 <strong style={{ marginLeft: "10px" }}>Chat on WhatsApp</strong>
          <a
            href="https://wa.me/918954159979?text=Hello%20I%20want%20to%20contact%20you"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            — +91 8954159979
          </a>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            style={textareaStyle}
            required
          />

          <button type="submit" style={buttonStyle}>
            Send Message
          </button>

        </form>

      </div>
<style>
{`
  @media (max-width: 768px) {

    /* Outer container fix */
    .contact-outer {
      padding: 20px !important;
      display: block !important; /* remove flex centering */
    }

    /* Card fix */
    .contact-card {
      width: 100% !important;
      padding: 20px !important;
      margin: 0 auto !important;
      box-sizing: border-box !important;
    }

    /* Prevent input overflow */
    .contact-card input,
    .contact-card textarea {
      width: 100% !important;
      box-sizing: border-box !important;
      font-size: 14px !important;
    }

    /* Stack info boxes properly */
    .contact-info {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 6px !important;
    }

    /* Smaller heading */
    .contact-card h1 {
      font-size: 24px !important;
    }

    /* Button fit */
    .contact-card button {
      font-size: 16px !important;
      padding: 12px !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }

  }
`}
</style>
    </div>
  );
}

//////////////////////////////////////////////////////////////
// Styles
//////////////////////////////////////////////////////////////

const outerStyle = {
  backgroundColor: "#b7cdd6",
  minHeight: "100vh",
  padding: "60px 0",
  display: "flex",
  justifyContent: "center"
};

const cardStyle = {
  backgroundColor: "#f0f0f0",
  width: "70%",
  maxWidth: "800px",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
};

const headingStyle = {
  textAlign: "center",
  color: "#1177aa",
  marginBottom: "10px"
};

const subTextStyle = {
  textAlign: "center",
  marginBottom: "30px",
  color: "#333"
};

const infoBoxStyle = {
  backgroundColor: "#e8e8e8",
  padding: "15px 20px",
  borderRadius: "10px",
  marginBottom: "15px",
  display: "flex",
  alignItems: "center",
  fontSize: "16px"
};

const linkStyle = {
  marginLeft: "10px",
  textDecoration: "none",
  color: "#1177aa",
  fontWeight: "bold"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px"
};

const textareaStyle = {
  width: "100%",
  padding: "12px",
  height: "120px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  resize: "none"
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#1177aa",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "18px",
  cursor: "pointer"
};

export default Contact;