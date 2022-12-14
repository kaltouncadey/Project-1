const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const brybtts = require("bcryptjs");
const jwt = require('jsonwebtoken')


//======= generator ===============//
const generator = (user) =>{
  return jwt.sign({ user }, process.env.jwt_sec,{
    expiresIn : '1d'
  });
}

// just waa qaybti registertion......

const registers = async (req, res) => {
  try {
    const {userFname,userLname,userPhone,userLocation,userEmail,userpassword,useraddress,} = req.body;
  const checkUser = await prisma.users.findFirst({
    where: {
      userEmail,
    },
  });

  if (checkUser) {
    res.json({
      status: "Erorr",
      message: "The email is already exist",
    });
    return;
  }
    if ( !userFname||!userLname||!userPhone||!userLocation||!userEmail||!userpassword||!useraddress) {
      res.json({
        status: "Error",
        message: "all information is wrong",
      });
      return;
    }

    // waa password hidding....
    const salts = brybtts.genSaltSync(10);
    const hidepassword = brybtts.hashSync(userpassword, salts);

    const newusers = await prisma.users.create({
      data: {
        userFname: userFname,
        userLname: userLname,
        userPhone: userPhone,
        userLocation: userLocation,
        userEmail: userEmail,
        useraddress: useraddress,
        Userpassword: hidepassword,
      },
      select: {
        userFname: true,
        userLname: true,
        userEmail: true,
        isAdmin: true,
        role: true,
        userPhone: true,
        userLocation: true,
        useraddress: true,
      },
    });
    const token = generator(newusers.userId)
    res.json({
      user : {...newusers},
      token, 
      status: "Success"
    })

  
  } catch (error) {
    res.json({
      status: "Error",
      message: "not Found",
    });
  }
};

// ==================LOGIN USERS START======================\\




const login = async (req, res) => {

 // try {
 const { userEmail, Userpassword } = req.body;

  if (!userEmail || !Userpassword) {
    res.json({
      status: "Error",
      message: "Email or password was not provided",
    }); 

    return;
  }

  const userExisting = await prisma.users.findFirst({
    
    where: {
      userEmail: userEmail,
    },
    select: {
      userId: true,
      userFname: true,
      userLname: true,
      userEmail: true,
      isAdmin: true,
      role: true,
      userPhone: true,
      userLocation: true,
      Userpassword: true, 
      useraddress: true,
    },
  });
 
  if (!userExisting) {
    res.json({
      status: "Error",
      message: "Wrong credentials",
    });
    return;
  }

  const dehashedPass = brybtts.compareSync(Userpassword, userExisting.Userpassword);

  if (dehashedPass) {
    const token = generator(userExisting.userId);
    res.json({
      status: "Success",
      message: "You are logged in",
      token,
      user: userExisting,
    });
  } else {
    res.json({
      status: "Error",
      message: "Wrong credentials",
    });
  }
} 
  //}
    

 





// ==================LOGIN USERS END======================\\
// ==================get all data======================\\

const getalldata = async (req, res) => {
  try {
    const userss = await prisma.users.findMany();
    res.json({
      userss,
    });
  } catch (errors) {
    res.json({ errors });
  }
};

// waad salan tahay 


const updateuser = async (req, res) => {
  try {
    const {
      userFname,
      userLname,
      userPhone,
      userLocation,
    
      useraddress,
    } = req.body;
    const { userId } = req.params;
    if (
      !userFname ||
      !userLname ||
      !userPhone ||
      !userLocation ||
      !useraddress
    ) {
      res.json({
        error: "Error",
        message: "your data is empty please provided ",
      });
      return;
    }

    // >>=> >>=> >>=> >>=> >>=>  >>=>  find the Users <==<< <==<< <==<< <==<< <==<< <==<<

    const finduser = await prisma.users.findFirst({
      where: {
        userId: +userId,
      },
    });
    if (!finduser) {
      res.json({
        error: "error",
        message: "User not Find",
      });
      return;
    }

    //============================  update users ==============================//

    const updateuser = await prisma.users.update({
      where: {
        userId: parseInt(userId),
      },
      data: {
        userFname: userFname,
        userLname: userLname,
        userPhone: userPhone,
        userLocation: userLocation,
        useraddress: useraddress,
      },
    });

    res.status(200).json({
      status: "succes",
      message: "User is Updated successful!",
      updateuser,
    });
  } catch (error) {
    res.json({
      error: "error",
    });
  }
};

//================================================ Start get one =============================//
const getoneUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.users.findFirst({
      where: {
        userId: +userId,
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

//===================================| hello  |===========================================================
//==============================================================================================
// waa inta u dhexaysa delete ka iyo get one ka
//==============================================================================================
//==============================================================================================

//================================================ Start Delete one =============================//

const deleteuser = async (req, res) => {
  const { userId } = req.params;

  const userdeleted = await prisma.users.delete({
    where: {
      userId: parseInt(userId),
    },
  });

  res.json({
    status: "Success",
    message: "user is deleted Succesfully",
    userdeleted,
  });
};

//================================================ end Delete one =============================//
//================================================ Start change Role =============================//


const changerole = async(req,res)=>{
  try {
    const {userId, role}=  req.body
    if(!role) {
      res.json({
        status: "Error",
        message: "please add the role"
      })
      return

    }
    const updateuser = await prisma.users.update({
      where:{
        userId
      },
    data:{
       role : role.toUpperCase()       
    }  

    })
    res.json({
      message: "updated Success",
      updateuser
    })

  } catch (error) {
    res.json({error})
  }
}



//================================================ End change Role =============================//




module.exports = {
  getalldata,
  registers,
  updateuser,
  getoneUser,
  deleteuser,
  login,
  changerole
};
