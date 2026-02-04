import Lead from "../models/lead.model.js";



export const createLead = async (req, res) => {
    try {
        const { name, phone, source, status } = req.body;

        if (!name || !phone || !source) {
            res.status(400).json({ message: "All Fields are required!" });
        }

        if (!["manual", "add", "referral"].includes(source)) {
            res.status(400).json({ message: "Invalid source" });
        }

        const lead = await Lead.create(req.body);

        if (!lead) {
            res.status(500).json({ message: "Some error has occured"});
        }

        return res.status(201).json(lead);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};