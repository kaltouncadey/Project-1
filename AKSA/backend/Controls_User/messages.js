const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getalldata = async (req, res) => {
  try {
    const userss = await prisma.certificate.findMany({
      include: {
        certif: true,
        users : true,
      },
    });

    res.json({
      userss,
    });
  } catch (errors) {
    res.json({ errors });
  }
};


module.exports ={
    getalldata,
}