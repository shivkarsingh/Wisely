import express from "express"
import dotenv from "dotenv"
import connectDb from "./configs/db.js"
import authRouter from "./routes/authRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import courseRouter from "./routes/courseRoute.js"
import paymentRouter from "./routes/paymentRoute.js"
import aiRouter from "./routes/aiRoute.js"
import reviewRouter from "./routes/reviewRoute.js"

dotenv.config()

// connect DB once (cold start)
connectDb()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ["https://wisely-chi.vercel.app", "http://localhost:3000"],
  credentials: true
}))

// Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/ai", aiRouter)
app.use("/api/review", reviewRouter)

app.get("/", (req, res) => {
  res.send("Hello From Server")
})

// ❌ DO NOT use app.listen on Vercel
// ✅ Export app as default
export default app
