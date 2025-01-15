import React, { useState } from "react";

const Register = () => {
  const [fullName, setFullName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });

  const handleRegister = async (e) => {
    e.preventDefault();

    setError({ fullName: "", email: "", password: "", confirmPassword: "" });


    
    try {
      const response = await fetch('http://localhost:5000/register')({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setMessage('Registration successful!');
      } else {
        setMessage(result.message || 'An error occurred during registration.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while registering. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text" 
          placeholder="Enter Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        {error.fullName && <p style={{ color: "red" }}>{error.fullName}</p>}

        <input
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error.email && <p style={{ color: "red" }}>{error.email}</p>}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error.password && <p style={{ color: "red" }}>{error.password}</p>}

        <input
          type="password"
          placeholder="Retype Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error.confirmPassword && <p style={{ color: "red" }}>{error.confirmPassword}</p>}

        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;
