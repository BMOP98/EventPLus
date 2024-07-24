import React, { useState } from 'react';
import '../../css/style.css'; // Asegúrate de importar el archivo CSS específico para este componente

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = process.env.LOGIN_USER;
    const response = await fetch(url + "/" + email + "/" + password);
    const message = await response.json();
    if (!response.ok) {
      alert(message);
    } else {
      sessionStorage.setItem("item_key", message.idclients)
      if (message.role === "admin") {
        sessionStorage.setItem("item_rol", message.role);
        window.location.href = '/Admin';
      } else {
        sessionStorage.setItem("item_rol", message.role)
        window.location.href = '/Client';
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="login-container">
        <h2 className="text-center">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn login-btn">Login</button>
        </form>
        <button className="btn recover-btn">Forgot password</button>
        <div className="register-link">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
