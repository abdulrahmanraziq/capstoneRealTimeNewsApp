import auth from '../common/auth.js';
const verify = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (token) {
      let payload = await auth.decodeToken(token);
      if (payload.exp > Math.floor(Date.now() / 1000)) {
        next();
      } else {
        res.status(401).send({
          message: "Token Expired",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
        message: error.message || 'Internal Server Error',
        error
    })
  }
};

export default verify;
