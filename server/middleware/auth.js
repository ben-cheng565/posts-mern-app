import jwt from "jsonwebtoken";

// determine if the api request is legal
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isGoogleAuth = token.length >= 500;

    let decodedData;
    if (token && !isGoogleAuth) {
      decodedData = jwt.verify(token, "privatekey");

      req.userId = decodedData.id;
    } else {
      decodedData = jwt.decode(token);

      //sub is the identifier of google auth
      req.userId = decodedData.sub;
    }

    // after checking the above information, go to next action
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
