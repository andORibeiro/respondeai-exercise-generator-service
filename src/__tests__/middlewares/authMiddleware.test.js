const authMiddleware = require("../../middlewares/authMiddleware");

describe("authMiddleware", () => {
  it("deve adicionar um usuário simulado ao req.user para testes", async () => {
    const req = {};
    const res = {};
    const next = jest.fn();

    await authMiddleware(req, res, next);

    expect(req.user).toEqual({ uid: "test-user" });
    expect(next).toHaveBeenCalled();
  });
});