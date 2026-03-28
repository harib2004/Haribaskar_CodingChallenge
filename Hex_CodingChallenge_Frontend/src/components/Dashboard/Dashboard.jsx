import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Dashboard() {

    const API_URL = "http://localhost:8080/api/players";

    const [data, setData] = useState([]);
    const [searchResult, setSearchResult] = useState(null);
    const [message, setMessage] = useState("");
    const [searchJersey, setSearchJersey] = useState("");
    const navigate = useNavigate();


    const apiGet = () => {
        axios.get(API_URL)
            .then((response) => setData(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    };


    const apiGetByJersey = () => {
        if (!searchJersey) {
            setMessage("Please enter a jersey number");
            return;
        }

        axios.get(`${API_URL}/jersey/${searchJersey}`)
            .then((response) => {
                if (response.data && response.data.playerName) {
                    setSearchResult(response.data);
                    setMessage(""); 
                } else {
                    setSearchResult(null);
                    setMessage(`No player found with Jersey No.${searchJersey}`);
                }
            })
            .catch((error) => {
                setSearchResult(null);
                setMessage("Error: Backend Not Responding");
            });
    };

    const handleUpdate = (id) => navigate(`/edit/${id}`);

    useEffect(() => {
        apiGet();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-primary fw-bold text-center mb-4">Cricket Squad Management</h2>

            <div className="row mb-5 justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm p-3">
                        <label className="form-label fw-bold">Find Player by Jersey Number</label>
                        <div className="input-group">
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder="Enter Jersey No." 
                                value={searchJersey}
                                onChange={(e) => setSearchJersey(e.target.value)}
                            />
                            <button className="btn btn-info text-white" onClick={apiGetByJersey}>Search</button>
                        </div>
                        {message && <div className="text-danger small mt-2 fw-bold">{message}</div>}
                    </div>
                </div>
            </div>

            {searchResult && (
                <div className="mb-5 animate__animated animate__fadeIn">
                    <table className="table table-success table-striped shadow-sm rounded">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Jersey No.</th>
                                <th>Role</th>
                                <th>Team</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="align-middle">
                                <td>{searchResult.id}</td>
                                <td className="fw-bold">{searchResult.playerName}</td>
                                <td>{searchResult.jerseyNumber}</td>
                                <td><span className="badge bg-dark">{searchResult.role}</span></td>
                                <td>{searchResult.teamName}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm" onClick={() => handleUpdate(searchResult.id)}>Update</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}


            <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-secondary border-bottom pb-2">Full Squad List</h4>
                </div>
                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-dark table-hover table-striped mb-0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Player Name</th>
                                <th>Jersey No.</th>
                                <th>Role</th>
                                <th>Team</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id} className="align-middle">
                                    <td>{item.id}</td>
                                    <td className="text-info">{item.playerName}</td>
                                    <td>{item.jerseyNumber}</td>
                                    <td>{item.role}</td>
                                    <td>{item.teamName}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" onClick={() => handleUpdate(item.id)}>Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}