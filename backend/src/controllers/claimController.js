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
  try {
    const claims = await prisma.damageClaim.findMany({
      include: {
        user: true,
        product: true, // If the product is missing, it will return null for 'product'
      },
    });

    // Optionally, you can filter out claims without a valid product if needed
    const filteredClaims = claims.filter((claim) => claim.product !== null);

    res.json(filteredClaims); // Send filtered claims if necessary
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving claims" });
  }
};

export const updateClaimStatus = async (req, res) => {
  const { status, rejectionReason, userId } = req.body;

  try {
    // Find the claim associated with the userId
    const claim = await prisma.damageClaim.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!claim) {
      return res.status(404).json({ message: "No claim found for this user" });
    }

    // Update the claim
    await prisma.damageClaim.updateMany({
      where: { userId: userId },
      data: { status, rejectionReason },
    });

    res.json({ message: "Claim updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating claim", error: error.message });
  }
};

export const getUserClaims = async (req, res) => {
  const claims = await prisma.damageClaim.findMany({
    where: { userId: req.params.userId },
    include: {
      user: true, // Include the related User data
      product: true, // Include the related Product data
    },
  });
  res.json(claims);
};
