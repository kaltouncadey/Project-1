const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registers = async (req, res) => {
  try {
    const newteacher = await prisma.messages.create({
      data: {
        UserID: req.user.user,
      },
    });
    res.status(201).json({
      status: "Succuess",
      newteacher,
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: "not Found",
    });
  }
};

module.exports ={
    registers,
}