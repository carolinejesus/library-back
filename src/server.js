import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import livrosRoutes from "./routes/livrosRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import loginRoutes from "./routes/loginRoutes.js"
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

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
