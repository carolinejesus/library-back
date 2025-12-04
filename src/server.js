import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import livrosRoutes from "./routes/livrosRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import loginRoutes from "./routes/loginRoutes.js"
import path from "path";
import { fileURLToPath } from "url";



dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads/usuarios", express.static(path.join(__dirname, "uploads/usuarios")));

app.use("/livros", livrosRoutes);
app.use("/reservas", reservaRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/login", loginRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});