import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState({ email: "", password: "", confirmPassword: "" });
  const [fullName, setName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();


    setError({ email: "", password: "", confirmPassword: "" });


    if (password !== confirmPassword) {
      setError((prev) => ({ ...prev, confirmPassword: "Passwords do not match." }));
      return;
    }


    const value = { email, password };  
    if (error.email === "" && error.password === "" && error.confirmPassword === "") {
      axios.post("http://localhost:8080/Register", value)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
      } else {
        setMessage(result.message || "An error occurred.");
      }
    } catch (err) {
      setMessage("An error occurred while registering.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="fullName"
          placeholder="Enter FullName"
          value={fullName}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Retype Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
      {error.confirmPassword && <p style={{ color: 'red' }}>{error.confirmPassword}</p>}
    </div>
  );
};

export default Register;
