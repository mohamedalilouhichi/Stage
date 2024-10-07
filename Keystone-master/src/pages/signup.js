import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginform.css";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") setFirstName(value);
    if (name === "lastName") setLastName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
    if (name === "birthdate") setBirthdate(value);
    if (name === "address") setAddress(value);
    if (name === "phone") setPhone(value);
  };

  const handleEmailBlur = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address");
      setErrorPopupVisible(true);
    } else {
      setErrorMessage("");
      setErrorPopupVisible(false);
    }
  };

  const handlePasswordBlur = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setErrorPopupVisible(true);
    } else {
      setErrorMessage("");
      setErrorPopupVisible(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setErrorPopupVisible(true);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setErrorPopupVisible(true);
      return;
    }

    // Validate address and distance from Paris (if needed)
    if (address) {
      // Here you could include the distance check if you have coordinates for the address
      // For this example, we will skip the distance check
    }

    // Create user object
    const user = {
      firstName,
      lastName,
      email,
      password,
      birthdate,
      address,
      phone,
    };

    // Store user data in local storage
    localStorage.setItem('user', JSON.stringify(user));

    console.log('User created successfully', user);
    navigate('/'); // Navigate to the desired page after successful signup
  };

  const closeErrorPopup = () => {
    setErrorPopupVisible(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
      <div className="signup-container">
        <div className="signup-box">
          <div className="back-button" onClick={handleGoBack}>
            <i className="fa fa-arrow-left"></i>
          </div>
          <div className="signup-title">Signup:</div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Prénom:</label>
              <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Nom:</label>
              <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  onBlur={handleEmailBlur}
              />
            </div>
            <div>
              <label>Mot de Passe:</label>
              <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Confirmer Mot de Passe:</label>
              <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handlePasswordBlur}
              />
            </div>
            <div>
              <label>Date de naissance:</label>
              <input
                  type="text"
                  name="birthdate"
                  value={birthdate}
                  onChange={handleInputChange}
                  pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                  placeholder="JJ-MM-AAAA"
              />
            </div>
            <div>
              <label>Adresse:</label>
              <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Numéro de téléphone:</label>
              <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
          </form>
          {errorPopupVisible && (
              <div className="error-popup">
                <div className="error-popup-content">
                  <p>{errorMessage}</p>
                  <button onClick={closeErrorPopup}>Close</button>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}

export default Signup;
