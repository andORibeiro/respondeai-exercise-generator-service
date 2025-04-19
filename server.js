require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./src/config/swaggerConfig");
const connectDB = require("./src/config/db"); // ⬅️ novo arquivo para conexão

const app = express();
const PORT = process.env.PORT || 3001;

connectDB(); // ⬅️ conecta ao MongoDB Atlas

app.use(express.json());

const exerciseRoutes = require("./src/routes/exerciseRoutes");

app.use("/api/exercicios", exerciseRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rota de teste
app.get("/", (req, res) => {
  res.send("🚀 API está rodando!");
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
