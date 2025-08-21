import express from "express"
import 'dotenv/config'; // Loads .env variables
import dotenv from "dotenv"
import connectDb from './controllers/config/db.js'
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"
import bookingRouter from "./routes/booking.route.js"

let port = process.env.PORT || 6000

let app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://renting-app-ihcc.onrender.com",
    credentials: true
}))

// Routers
app.use("/api/auth", authRouter )
app.use("/api/user", userRouter )
app.use("/api/listing", listingRouter )
app.use("/api/booking", bookingRouter )

// Root route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Example route
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

// ✅ Ping route for UptimeRobot
app.get('/ping', (req, res) => {
  console.log("Ping received - keeping server awake ✅");
  res.send("I'm awake");
});

// Start server (only once)
app.listen(port, () => {
  connectDb();
  console.log(`🚀 Server running on http://localhost:${port}`);
});
