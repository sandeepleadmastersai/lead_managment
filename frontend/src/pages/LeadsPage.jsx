import { useEffect, useState } from "react";
import { API } from "../api/axios.js";

function LeadsPage() {
    const [leads, setLeads] = useState([]);

    const fetchLeads = async () => {
        try {
            const response = await API.get("/leads");
            const leads = response.data;

            if (leads && leads.length > 0) {
                setLeads(leads);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);


    console.log(leads);


    return (
        <div>
            <h1>Leads Page</h1>
            <ul>
                {
                    leads.map((leadItem) => <li>{leadItem.name}</li>)
                }
            </ul>
        </div>
    );
}

export default LeadsPage;