const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const { errorHandler } = require("./middleware/errorMiddleware"); // Middleware import karein

dotenv.config();
connectDB();

const app = express();

// CORS Configuration ko update kiya hai
app.use(cors({
    origin: "https://delightful-cajeta-43bdcc.netlify.app", // Aapka Netlify URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

// Error Handling Middleware (Ye hamesha routes ke baad aana chahiye)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
