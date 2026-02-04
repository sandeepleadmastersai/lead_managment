import { useEffect, useState } from "react";
import { API } from "../api/axios.js";

function LeadsPage() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const response = await API.get("/leads");
            const leads = response.data;

            if (leads && leads.length > 0) {
                setLeads(leads);
                setLoading(false);
            } else {
                setLeads([]);
                setLoading(false);
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
            {
                loading ? (
                    <p>Loading Leads...</p>
                ) : (
                    <ul>
                        {
                            leads.map((leadItem) => <li>{leadItem.name}</li>)
                        }
                    </ul>
                )
            }
            {/* <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mark</td>
                        <td>1</td>
                        <td>new</td>
                    </tr>
                    <tr>
                        <td>Jacob</td>
                        <td>2</td>
                        <td>new</td>
                    </tr>
                </tbody>
            </table> */}
        </div>
    );
}

export default LeadsPage;