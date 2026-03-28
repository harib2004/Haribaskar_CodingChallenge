import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function PlayerEditForm() {
    const { id } = useParams();
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

    useEffect(() => {
        axios.get(`${API_URL}/${id}`)
            .then((res) => {
                setPlayerRegistration(res.data);
            })
            .catch((err) => {
                console.error("Error loading player data:", err);
                alert("Could not find player with ID: " + id);
                navigate("/");
            });
    }, [id, navigate]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPlayerRegistration({ ...playerRegistration, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${API_URL}/${id}`, playerRegistration)
            .then((response) => {
                console.log("Update Success:", response.data);
                alert("Player details updated successfully");
                navigate("/");
            })
            .catch((error) => {
                console.error("Update failed:", error);
                alert("Failed to update player");
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-warning">Edit Player Profile</h2>
            
            <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded border border-warning">
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Player Name:</label>
                        <input type="text" className="form-control" name="playerName" 
                            value={playerRegistration.playerName} onChange={handleChange} required />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Jersey Number:</label>
                        <input type="number" className="form-control" name="jerseyNumber" 
                            value={playerRegistration.jerseyNumber} onChange={handleChange} required />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Role:</label>
                        <select className="form-select" name="role" value={playerRegistration.role} onChange={handleChange} required>
                            <option value="">Select Role</option>
                            <option value="Batsmen">Batsmen</option>
                            <option value="Bowler">Bowler</option>
                            <option value="All-Rounder">All-Rounder</option>
                            <option value="Wicket Keeper">Wicket Keeper</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Team Name:</label>
                        <input type="text" className="form-control" name="teamName" 
                            value={playerRegistration.teamName} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Country:</label>
                        <input type="text" className="form-control" name="country" 
                            value={playerRegistration.country} onChange={handleChange} required />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Matches Played:</label>
                        <input type="number" className="form-control" name="totalMatches" 
                            value={playerRegistration.totalMatches} onChange={handleChange} />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Description:</label>
                        <textarea className="form-control" name="description" rows="3"
                            value={playerRegistration.description} onChange={handleChange}></textarea>
                    </div>
                </div>
                
                <div className="mt-4">
                    <button type="submit" className="btn btn-warning w-100 fw-bold">Update Player</button>
                    <button type="button" className="btn btn-outline-secondary w-100 mt-2" onClick={() => navigate("/")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PlayerEditForm;