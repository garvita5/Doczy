import jwt from "jsonwebtoken";

//admin authetication middleware

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      res.json({ success: false, message: "Authorization failed,Login again" });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    //decoding token will give user id add in req.body
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
