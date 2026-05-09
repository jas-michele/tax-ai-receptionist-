import express from "express";
import cors from "cors"; 
import estimateRoutes from "./routes/estimateRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/estimate", estimateRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Server running" });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
