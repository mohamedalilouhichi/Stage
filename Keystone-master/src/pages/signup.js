import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setErrorPopupVisible(true);
      return ;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setErrorPopupVisible(true);
      return;
    }

    try {
      const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${address}&postcode=&city=&limit=1`);
      const data = await response.json();

      if (data.features.length === 0) {
        setErrorMessage('Adresse non trouvée');
        setErrorPopupVisible(true);
        return;
      }

      const userLatitude = data.features[0].geometry.coordinates[1];
      const userLongitude = data.features[0].geometry.coordinates[0];

      const parisLatitude = 48.8567;
      const parisLongitude = 2.3508;

      const distance = calculateDistance(userLatitude, userLongitude, parisLatitude, parisLongitude);

      if (distance > 50) {
        setErrorMessage('L\'adresse doit se situer dans un rayon de 50 km autour de Paris.');
        setErrorPopupVisible(true);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            birthdate,
            address,
            phone,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          setErrorMessage(data.message);
          setErrorPopupVisible(true);
          return;
        }

        const data = await response.json();
        console.log('User created successfully');
        navigate('/');
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
        setErrorPopupVisible(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
      setErrorPopupVisible(true);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };  const closeErrorPopup = () => {
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
          </form>          {errorPopupVisible && (
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