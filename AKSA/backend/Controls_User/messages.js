const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getoneteach = async (req, res) => {
  try {
    const { userID } = req.params;

    const user = await prisma.messages.findByIdAndUpdate({
      where: {
        userId: +userID,
      },

      include: {
        user: true,
      },
    });
    if (!user) {
      res.json({
        status: "Error",
        message: "The user you are looking for is not in the database",
      });
    } else {
      res.json({
        status: "success",
        user,
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports ={
    getoneteach,
}