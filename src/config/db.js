const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // usa variável do .env
    console.log("✅ Conectado ao MongoDB Atlas com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB Atlas:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
