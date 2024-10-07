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

  const validateAddress = async (address) => {
    try {
      // Make a request to the adresse.data.gouv.fr API
      const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${address}&limit=1`);
      const { features } = response.data;

      if (features.length === 0) {
        setErrorMessage("Address not found. Please enter a valid address.");
        setErrorPopupVisible(true);
        return false;
      }

      // Extract the coordinates of the address
      const { coordinates } = features[0].geometry;
      const [userLongitude, userLatitude] = coordinates;

      // Paris coordinates
      const parisLongitude = 2.3522; // Longitude of Paris
      const parisLatitude = 48.8566;  // Latitude of Paris

      // Calculate the distance between the two coordinates using Haversine formula
      const distance = haversineDistance(
          { latitude: userLatitude, longitude: userLongitude },
          { latitude: parisLatitude, longitude: parisLongitude }
      );

      if (distance > 50) {
        setErrorMessage("L'adresse de l'utilisateur doit être située à moins de 50 km de Paris.");
        setErrorPopupVisible(true);
        return false;
      }

      return true; // Address is valid and within range
    } catch (error) {
      console.error("Error validating address:", error);
      setErrorMessage("An error occurred while validating the address. Please try again.");
      setErrorPopupVisible(true);
      return false;
    }
  };

  const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(coords1.latitude)) * Math.cos(toRad(coords2.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address");
      setErrorPopupVisible(true);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setErrorPopupVisible(true);
      return;
    }

    // Validate the address
    const isAddressValid = await validateAddress(address);
    if (!isAddressValid) {
      return; // Stop if the address is invalid
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
    localStorage.setItem("user", JSON.stringify(user));

    console.log("User created successfully", user);
    navigate("/"); // Navigate to the desired page after successful signup
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
