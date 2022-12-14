const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



// just waa qaybti registertion......

const registers = async (req, res) => {
  try {
      const { teacher_subject,teacheradress,teacherLevel,teacherImage} = req.body;
  
    if (!teacher_subject ||!teacheradress || !teacherLevel ||!teacherImage)
    {
      res.json({
        status: "Error",
        message: "all information is wrong",
      });
      return;
    }

    // waa qeybtii create ka teacherka....
   

    const newteacher = await prisma.certificate.create({
      data: {
        teacher_subject: teacher_subject,
        teacheradress: teacheradress,
        teacherLevel: teacherLevel,
        teacherImage: teacherImage,
        UserID : req.user.user,
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

// ==================get all data======================\\

const getalldata = async (req, res) => {
  try {
    const userss = await prisma.certificate.findMany(
      {
        include:{
          certif : true,
          
        }
      }
    );

    res.json({
      userss,
    });
  } catch (errors) {
    res.json({ errors });
  }
};

// waad salan tahay

const updated = async (req, res) => {

  try {
      const { teacher_subject,teacheradress,teacherLevel,teacherImage} = req.body;
      const {teachid} = req.params
  
    if (!teacher_subject ||!teacheradress || !teacherLevel ||!teacherImage)
    {
      res.json({
        error: "Error",
        message: "your data is empty please provided ",
      });
      return;
    }

    // >>=> >>=> >>=> >>=> >>=>  >>=>  find the Users <==<< <==<< <==<< <==<< <==<< <==<<

    const user = await prisma.certificate.findFirst({
      
      where: {
        teachid: +teachid,
      },
    });

    if (!user) {
      res.json({
        status: "Error",
        message: "The user you are looking for is not in the database",
      });
      return;
    }

    //============================  update certificate ==============================//

    const update = await prisma.certificate.update({    
      where: {
        teachid: +teachid,
      },
      data: {
        teacher_subject: teacher_subject,
        teacheradress: teacheradress,
        teacherLevel: teacherLevel,
        teacherImage: teacherImage,
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
    const { teachid } = req.params;

    const user = await prisma.certificate.findFirst({
      where: {
        teachid: +teachid,
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

//================================================ end get one =============================//


//================================================ Start Delete one =============================//

const deleteteach = async (req, res) => {
  try {
    const { teachid } = req.params;

    const userdeleted = await prisma.certificate.delete({
      where: {
        teachid: +teachid,
      },
    });
  
    res.json({
      status: "Success",
      message: "user is deleted Succesfully",
      userdeleted, 
    });
    
  } catch (error) {
    res.json({
      status:'error',
      message : "teachid in not your database"
    })
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
