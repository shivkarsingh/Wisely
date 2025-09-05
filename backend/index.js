import express from "express"
import dotenv from "dotenv"
import connectDb from "./configs/db.js"
import authRouter from "./routes/authRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import courseRouter from "./routes/courseRoute.js"
//import paymentRouter from "./routes/paymentRoute.js"
import aiRouter from "./routes/aiRoute.js"
import reviewRouter from "./routes/reviewRoute.js"

dotenv.config()

// connect DB once (cold start)
connectDb()

const app = express()

// CORS options
const corsOptions = {
  origin: ["https://wisely-chi.vercel.app", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))

//
app.options("*", cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
//app.use("/api/payment", paymentRouter)
app.use("/api/ai", aiRouter)
app.use("/api/review", reviewRouter)

app.get("/", (req, res) => {
  res.send("Hello From Server")
})

// Export for Vercel
export default app

