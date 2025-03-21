import prisma from "../lib/prismaClient.js";

// export const submitClaim = async (req, res) => {
//   const { userId, productId, description } = req.body;

//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const imageUrl = `/uploads/${req.file.filename}`;

//   try {
//     const claim = await prisma.damageClaim.create({
//       data: { userId, productId, image: imageUrl, description },
//     });

//     res.json({ message: "Claim submitted successfully", claim });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Error submitting claim" });
//   }
// };

export const submitClaim = async (req, res) => {
  const { email, productId, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }, // Fetch user ID
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const claim = await prisma.damageClaim.create({
      data: {
        user: { connect: { id: user.id } },
        product: { connect: { id: productId } },
        image: imageUrl,
        description,
        email, // Store email
      },
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
        product: true,
      },
    });

    const filteredClaims = claims.filter((claim) => claim.product !== null);

    res.json(filteredClaims);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving claims" });
  }
};

export const updateClaimStatus = async (req, res) => {
  const { status, rejectionReason, userId } = req.body;

  try {
    const claim = await prisma.damageClaim.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!claim) {
      return res.status(404).json({ message: "No claim found for this user" });
    }

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
      user: true,
      product: true,
    },
  });
  res.json(claims);
};
export const deleteClaim = async (req, res) => {
  const { claimId } = req.params;

  try {
    const claim = await prisma.damageClaim.findUnique({
      where: {
        id: claimId,
      },
    });

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    await prisma.damageClaim.delete({
      where: {
        id: claimId,
      },
    });

    res.json({ message: "Claim deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting claim" });
  }
};
