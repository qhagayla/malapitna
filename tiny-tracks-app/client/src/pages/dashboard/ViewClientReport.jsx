import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access URL parameters
import { useSelector } from "react-redux";

const ViewClientReportPage = () => {
    const { id } = useParams(); // Access the ID parameter from the URL
    const { user } = useSelector((state) => state.user);
    const [clientData, setClientData] = useState(null);

    useEffect(() => {
        // Fetch client data based on the ID from your API
        const fetchClientData = async () => {
            try {
                // Make API request to fetch client data based on the ID
                const response = await fetch(`/api/clients/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch client data");
                }
                const data = await response.json();
                setClientData(data);
            } catch (error) {
                console.error("Error fetching client data:", error);
            }
        };

        fetchClientData();
    }, [id, user.token]);

    if (!clientData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Client Information</h1>
            <p>ID: {clientData.id}</p>
            <p>Name: {clientData.name}</p>
            <p>Age: {clientData.age}</p>
            <p>Birthday: {clientData.birthday}</p>
            <p>Remarks: {clientData.remarks}</p>
            <h2>Video</h2>
            {/* Render video player component */}
            <video controls>
                <source src={clientData.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default ViewClientReport;
