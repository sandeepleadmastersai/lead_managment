import jwt from "jsonwebtoken";
// Hardcoded admin credentials
const ADMIN = { email: "admin@test.com", password: "admin123" };


export const login = (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN.email && password === ADMIN.password) {
        // Generate JWT
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        return res.json({ token });
    }

    res.status(401).json({ error: "Invalid credentials" });
}