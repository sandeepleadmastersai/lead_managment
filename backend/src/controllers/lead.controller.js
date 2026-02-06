import mongoose from "mongoose";
import Lead from "../models/lead.model.js";



export const createLead = async (req, res) => {
    try {
        const { name, phone, source, status } = req.body;

        if (!name || !phone || !source) {
            res.status(400).json({ message: "All Fields are required!" });
        }

        if (!["manual", "ad", "referral"].includes(source)) {
            res.status(400).json({ message: "Invalid source" });
        }

        const lead = await Lead.create(req.body);

        if (!lead) {
            res.status(500).json({ message: "Some error has occured" });
        }

        return res.status(201).json(lead);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


export const getLeads = async (req, res) => {
    try {
        const { q = "", page = 1, limit = 10 } = req.query;
        const query = {
            $or: [
                { name: { $regex: q, $options: "i" } },
                { phone: { $regex: q } },
            ],
        };

        const leads = await Lead.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await Lead.countDocuments(query);

        return res.status(200).json({
            leads,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
        });
        // const leads = await Lead.find().sort({ createdAt: -1 });
        // return res.status(200).json(leads);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


export const updateLeadStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["new", "contacted", "closed"].includes(status)) {
            res.status(400).json({ message: "Invalid Lead Source" });
        }

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Lead ID not valid" });
        }

        const lead = await Lead.findByIdAndUpdate(
            id,
            { status: req.body.status },
            { new: true },
        );

        if (!lead) {
            res.status(404).json({ message: "Lead not found" });
        }

        return res.status(200).json(lead);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


export const deleteLead = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Lead ID not valid" });
        }

        const lead = await Lead.findByIdAndDelete(id);

        if (!lead) {
            res.status(404).json({ message: "Lead not found" });
        }

        return res.status(200).json({ message: "Lead deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};