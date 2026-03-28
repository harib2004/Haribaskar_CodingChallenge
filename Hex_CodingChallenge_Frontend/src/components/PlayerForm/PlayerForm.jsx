import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlayerForm() {

    const navigate = useNavigate();

    const [playerRegistration, setPlayerRegistration] = useState({
        playerName: "",
        jerseyNumber: "",
        role: "",
        totalMatches: "",
        teamName: "",
        country: "",
        description: ""
    });

    const API_URL = "http://localhost:8080/api/players";

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPlayerRegistration({ ...playerRegistration, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/add`, playerRegistration)
            .then((response) => {
                console.log("Success:", response.data);
                alert("Player Added Successfully");
                navigate("/");
            
                setPlayerRegistration({
                    playerName: "",
                    jerseyNumber: "",
                    role: "",
                    totalMatches: "",
                    teamName: "",
                    country: "",
                    description: ""
                });
            })
            .catch((error) => {
                console.error("Error adding player", error);
                alert("Failed to add player");
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Cricket Player Entry</h2>
            
            <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded border">
                <div className="row g-3">
                    <div className="col-md-6">
                        <label>Player Name:</label>
                        <input type="text" className="form-control" name="playerName" 
                            value={playerRegistration.playerName} onChange={handleChange} required />
                    </div>

                    <div className="col-md-3">
                        <label>Jersey Number:</label>
                        <input type="number" className="form-control" name="jerseyNumber" 
                            value={playerRegistration.jerseyNumber} onChange={handleChange} required />
                    </div>

                    <div className="col-md-3">
                        <label>Role:</label>
                        <select className="form-control" name="role" value={playerRegistration.role} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="Batsmen">Batsmen</option>
                            <option value="Bowler">Bowler</option>
                            <option value="All-Rounder">All-Rounder</option>
                            <option value="Wicket Keeper">Wicket Keeper</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label>Team Name:</label>
                        <input type="text" className="form-control" name="teamName" 
                            value={playerRegistration.teamName} onChange={handleChange} required />
                    </div>

                    <div className="col-md-4">
                        <label>Country:</label>
                        <input type="text" className="form-control" name="country" 
                            value={playerRegistration.country} onChange={handleChange} required />
                    </div>

                    <div className="col-md-4">
                        <label>Matches:</label>
                        <input type="number" className="form-control" name="totalMatches" 
                            value={playerRegistration.totalMatches} onChange={handleChange} />
                    </div>

                    <div className="col-12">
                        <label>Description:</label>
                        <textarea className="form-control" name="description" rows="2"
                            value={playerRegistration.description} onChange={handleChange}></textarea>
                    </div>
                </div>
                
                <input type="submit" className="btn btn-primary w-100 mt-4" value="Add Player to Squad" />
            </form>

            
        </div>
    );
}

export default PlayerForm;