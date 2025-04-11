const admin = require("firebase-admin");
const firebaseConfig = require("../config/firebase");

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

module.exports = async (req, res, next) => {

  console.warn("⚠️ Middleware de autenticação desativado temporariamente para testes.");
  req.user = { uid: "test-user" }; // Simular um usuário autenticado
  next();

/* Descomentar para autenticar o token
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    res.status(401).json({ error: "Token inválido" });
  }
    */
};