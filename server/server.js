import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import connectDB from "./config/dbconfig.js"
import path from "path"
import { fileURLToPath } from "url"

//Local Imports
import authRoutes from "./routes/authRoutes.js" 
import followRoutes from "./routes/followRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import errorHandler from "./middleware/errorhandler.js"
import adminRoutes from "./routes/adminRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import savedPostRoutes from "./routes/savedPostRoutes.js"

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()


//DB Connection
connectDB()

//Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))  

// console.log(process.env.MONGO_URI)

// Root route handled below in production config


// Auth Routes
app.use("/api/auth" , authRoutes)


//Follow Routes
app.use("/api/user" , followRoutes)

//Profile Routes
app.use("/api/profile" , profileRoutes)

//Admin Routes
app.use("/api/admin" , adminRoutes)

//Post Routes
app.use("/api/posts" , postRoutes)

//Save Post Routes
app.use("/api/saved-posts" , savedPostRoutes)

// Serve Frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) =>
        res.sendFile(
            path.resolve(__dirname, "../", "client", "dist", "index.html")
        )
    );
} else {
    app.get("/", (req, res) => {
        res.json({ message: "WELCOME TO IMAGINEX API" });
    });
}

//Error Handler 
app.use(errorHandler)

app.listen(PORT , () => {
    console.log(`SERVER IS RUNNING AT : ${PORT}`)
})