import prisma from "../lib/prismaClient.js";

export const registerUser = async (req, res) => {
  const { name, email, role, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name, email, role, password },
    });
    res.json({ message: "User registered successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User already exists" });
  }
};

export const loginUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", userId: user.id });
  } catch (error) {
    console.log(error);
  }
};
