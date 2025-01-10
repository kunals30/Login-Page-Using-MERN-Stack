const userModel = require("../model/userSchema");

const signUp = async (req, res) => {
  const { Name, Username, Email, Password, Bio } = req.body;

  if(!Name || !Username || !Email || !Password){
    return res.status(400).json({
      success: false,
      message: "Fill the required fields"
    })
  }

  try {
    const userInfo =new userModel(req.body);
    const result = await userInfo.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
        success:false,
        message: 'Account Already Exist with Provided Email Id'
    })
  }
};

const signIn = async(req, res) => {
  const { Username, Email, Password } = req.body;
  
  if(!Username || !Email || !Password ){
    return res.status(200).json({
      success: false,
      message: "Every field is mandatory"
    })
  }

  try {
    const user = await userModel
    .findOne({
      Email
    })
    .select('+Password')

  if(!user || user.Password !== Password){
    return res.status(200).json({
      success:false,
      message:'Invalid Email Id or Password'
    })
  }
  const token = user.jwtToken();
  user.Password = undefined;

  const cookieOption = {
    httpOnly: true,
     maxAge : 24*60*60*1000,
  };

  res.cookie("token", token, cookieOption);
  res.status(200).json({
    success: true,
    data: user
  })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }

};


const logOut = (req,res)=>{
  try {
    const cookieOption = {
      expires: new Date(),
      httpOnly: true
    }
    res.cookie("token", null, cookieOption)
    res.status(200).json({
      success: true,
      message: "Logged out succesfully"
    })
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
}


module.exports = { signUp, signIn, logOut };
