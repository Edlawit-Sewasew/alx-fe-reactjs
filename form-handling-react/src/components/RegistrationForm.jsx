import { useState } from "react";

/**
 * RegistrationForm - Controlled component implementation
 * Manages form state with useState and validates that no fields are empty
 */
function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = "Username is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validate()) {
      return;
    }

    // Mock API submission - simulate user registration
    const userData = { username, email, password };
    console.log("Registration submitted (controlled):", userData);

    // Simulate API call
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Registration success:", data);
        alert("Registration successful!");
        setUsername("");
        setEmail("");
        setPassword("");
        setErrors({});
        setSubmitted(false);
      })
      .catch((err) => {
        console.error("Registration error:", err);
        alert("Registration failed. Please try again.");
      });
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Registration (Controlled Components)</h2>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter username"
        />
        {submitted && errors.username && (
          <p className="error-message">{errors.username}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter email"
        />
        {submitted && errors.email && (
          <p className="error-message">{errors.email}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password"
        />
        {submitted && errors.password && (
          <p className="error-message">{errors.password}</p>
        )}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
