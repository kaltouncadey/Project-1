const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// just waa qaybti registertion......

const registers = async (req, res) => {
  try {
    const { teacherFname, teacherLname, teacherPhone, teacherLocation,teacherLevel } =req.body;

    if (!teacherFname || !teacherLname || !teacherPhone || !teacherLocation || !teacherLevel) {
      res.json({
        status: "Error",
        message: "all information is wrong",
      });
      return;
    }

    // waa password hidding....

    const newteacher = await prisma.product_Teacher.create({
      data: {
        teacherFname,
        teacherLname,
        teacherPhone,
        teacherLocation,
        teacherLevel,
        UserId: req.user.user,
      },
    });
    res.status(201).json({
      status: "Succuess",
      newteacher,
    });
  } catch (error) {
    res.json({
      status: error,
      message: "not Found",
    });
  }
};

// ==================get all data======================\\

const getalldata = async (req, res) => {
  try {
    const product = await prisma.product_Teacher.findMany();
    res.json({
      product,
    });
  } catch (errors) {
    res.json({ errors });
  }
};

// waad salan tahay

const updated = async (req, res) => {
  try {
    const { teacherFname, teacherLname, teacherPhone, teacherLocation,teacherLevel } = req.body;

    const { T_id } = req.params;

    if (!teacherFname || !teacherLname || !teacherPhone || !teacherLocation ||!teacherLevel) {
      res.json({
        error: "Error",
        message: "your data is empty please provided ",
      });
      return;
    }

    // >>=> >>=> >>=> >>=> >>=>  >>=>  find the Users <==<< <==<< <==<< <==<< <==<< <==<<

    const user = await prisma.product_Teacher.findFirst({
      where: {
        T_id: +T_id,
      },
    });

    if (!user) {
      res.json({
        status: "Error",
        message: "The user you are looking for is not in the database",
      });
      return;
    }

    //============================  update product_Teacher ==============================//

    const update = await prisma.product_Teacher.update({
      where: {
        T_id: +T_id,
      },
      data: {
        teacherFname,
        teacherLname,
        teacherPhone,
        teacherLocation,
        teacherLevel,
      },
    });

    res.status(200).json({
      status: "succes",
      message: "User is Updated successful!",
      update,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

//================================================ Start get one =============================//
const getoneteach = async (req, res) => {
  try {
    const { T_id } = req.params;

    const teachers = await prisma.product_Teacher.findFirst({
      where: {
        T_id: +T_id,
      },
    });

    if (!teachers) {
      res.json({
        status: error,
        message: "The teacher you are looking for is not in the database",
      });
    } else {
      res.json({
        status: "success",
        teachers,
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

//================================================ end get one =============================//

//================================================ Start Delete one =============================//

const deleteteach = async (req, res) => {
  try {
    const { T_id } = req.params;

    const deleted = await prisma.product_Teacher.delete({
      where: {
        T_id: +T_id,
      },
    });
    res.json({
      status: "Success",
      message: "Teacher is deleted Succesfully",
      deleted,
    });
  } catch (error) {
    res.json({ error });
  }
};

//================================================ end Delete one =============================//

module.exports = {
  getalldata,
  registers,
  updated,
  getoneteach,
  deleteteach,
};
