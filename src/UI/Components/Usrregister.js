import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Usrregister = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [idcard, setIdcard] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.VERIFY_INFORMATION;
      const verify = await fetch(url + "/" + mail);
      const mess = await verify.json();
      if (!verify.ok) {
        alert(mess);
      } else {
        const url1 = process.env.REGISTER_INFORMATION;
        const response = await fetch(url1, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, lastname, idcard, mail, password, phone, address })
        });
        const message = await response.json();
        if (!response.ok) {
          throw new Error("Response Status: " + response.status);
        } else {
          navigate('/Login')
          alert(message);
        }
      }
    } catch (error) {
    }
  };

  return (
    <div className="container_register">
      <div className="form-container">
        <h2 className="text-center">Customer Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control small-input"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              className="form-control small-input"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="idcard">Id Card</label>
            <input
              type="text"
              className="form-control small-input"
              id="idcard"
              value={idcard}
              onChange={(e) => setIdcard(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mail">Mail Address</label>
            <input
              type="mail"
              className="form-control small-input"
              id="mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control small-input"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              className="form-control small-input"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control small-input"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="site-btn" id="btn_registrar_cliente">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Usrregister;
