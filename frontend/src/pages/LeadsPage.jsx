import { useEffect, useState } from "react";
import { API } from "../api/axios.js";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    source: "manual",
  });

  // Fetch leads from backend
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await API.get("/leads");
      setLeads(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch leads");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Handle status update
  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const res = await API.patch(`/leads/${leadId}/status`, {
        status: newStatus,
      });
      setLeads((prev) =>
        prev.map((lead) => (lead._id === leadId ? res.data : lead))
      );
    } catch {
      alert("Failed to update status");
    }
  };

  // Handle form submission
  const handleAddLead = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/leads", formData);
      setLeads([res.data, ...leads]);
      setFormData({ name: "", phone: "", source: "manual" });
    } catch {
      alert("Failed to add lead");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Leads</h1>

      {/* Add Lead Form */}
      <form onSubmit={handleAddLead} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          required
          className="border p-2 rounded"
        />
        <select
          value={formData.source}
          onChange={(e) =>
            setFormData({ ...formData, source: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="manual">Manual</option>
          <option value="ad">Ad</option>
          <option value="referral">Referral</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          Add Lead
        </button>
      </form>

      {/* Loading/Error */}
      {loading && <p>Loading leads...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Leads Table */}
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Phone</th>
            <th className="text-left p-2">Source</th>
            <th className="text-left p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-b">
              <td className="p-2">{lead.name}</td>
              <td className="p-2">{lead.phone}</td>
              <td className="p-2">{lead.source}</td>
              <td className="p-2">
                <select
                  value={lead.status}
                  onChange={(e) =>
                    handleStatusChange(lead._id, e.target.value)
                  }
                  className="border rounded p-1"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
                <span
                  className={`ml-2 px-2 py-1 rounded text-white ${
                    lead.status === "new"
                      ? "bg-green-500"
                      : lead.status === "contacted"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
                >
                  {lead.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}