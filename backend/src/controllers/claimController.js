import prisma from "../lib/prismaClient.js";

export const submitClaim = async (req, res) => {
  const { userId, productId, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    const claim = await prisma.damageClaim.create({
      data: { userId, productId, image: imageUrl, description },
    });

    res.json({ message: "Claim submitted successfully", claim });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error submitting claim" });
  }
};

export const getAllClaims = async (req, res) => {
  const claims = await prisma.damageClaim.findMany({
    include: { user: true, product: true },
  });
  res.json(claims);
};

export const updateClaimStatus = async (req, res) => {
  const { status, rejectionReason } = req.body;

  await prisma.damageClaim.update({
    where: { id: req.params.id },
    data: { status, rejectionReason },
  });

  res.json({ message: "Claim updated" });
};

export const getUserClaims = async (req, res) => {
  const claims = await prisma.damageClaim.findMany({
    where: { userId: req.params.userId },
  });
  res.json(claims);
};
