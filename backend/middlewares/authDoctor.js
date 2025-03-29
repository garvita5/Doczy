import jwt from "jsonwebtoken";

//doctor authetication middleware

const authDoctor = async (req, res, next) => {
  try {
    let dToken = req.headers.authorization; //normal way was not working
    if (!dToken) {
      return res.json({
        success: false,
        message: "Authorization failed,Login again",
      });
    }

    dToken = dToken.split(" ")[1]; // Remove "Bearer" prefix
    const token_decode = jwt.verify(dToken, process.env.JWT_SECRET);

    //decoding token will give user id add in req.body
    req.body.docId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
