import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from "./menu";
import './article.css';
import axios from 'axios';

function Article() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/api/user-data', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    const userData = response.data;
                    setFirstName(userData.firstName);
                    setLastName(userData.lastName);
                    setEmail(userData.email);
                    setPhone(userData.phone);
                    setAddress(userData.address);
                    setBirthdate(userData.birthdate);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.post('/api/update-user-data', { firstName, lastName, email, phone, address, birthdate }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('User data updated successfully:', response.data);
                setEditing(false);
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    };

    return (
        <Fragment>
            <Menu />
            <main>
                <div className="profile-container">
                    <div className="profile-header">
                        <h1>Profile</h1>
                    </div>
                    <div className="profile-info">

                        <div className="profile-details">
                            {editing ? (
                                <div className="form-container">
                                    <form onSubmit={handleSubmit}>
                                        <label>
                                            Prénom:
                                        </label>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        <br />
                                        <label>
                                            Nom:
                                        </label>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                        <br />
                                        <label>
                                            Email:
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <br />
                                        <label>
                                            Téléphone:
                                        </label>
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <br />
                                        <label>
                                            Adresse:
                                        </label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <br />
                                        <label>
                                            Date de naissance:
                                        </label>
                                        <input
                                            type="date"
                                            value={birthdate}
                                            onChange={(e) => setBirthdate(e.target.value)}
                                        />
                                        <br />
                                        <button className="login-btn" type="submit">Enregistrer</button>
                                        <button className="register-btn" onClick={() => setEditing(false)}>Annuler</button>
                                    </form>
                                </div>
                            ) : (
                                <div className="profile-info-box">
                                    <h2>{firstName} {lastName}</h2>
                                    <p style={{ marginBottom: 10 }}>Email : {email}</p>
                                    <p style={{ marginBottom: 10 }}>Téléphone : {phone}</p>
                                    <p style={{ marginBottom: 10 }}>Adresse : {address}</p>
                                    <p style={{ marginBottom: 10 }}>Date de naissance : {new Date(birthdate).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                                    <button className="register-btn" onClick={() => setEditing(true)}>Éditer</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <section className="footer text-light">
                {/* Footer content */}
            </section>
        </Fragment>
    );
}

export default Article;