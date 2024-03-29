const jwt = require('jsonwebtoken')
const config =  require ('./config')


exports.getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  )
}

exports.isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("provided token: \n")
  console.log(token)
  console.log("\n")


  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode
      console.log("DEBUG1: auth")
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }
};

exports.isAdmin  = (req, res, next) => {
  console.log(req.user);
  console.log("provided token: \n")
  console.log(token)
  console.log("\n")
  if (req.user && req.user.isAdmin) {
    console.log("DEBUG1: auth is admin")
    return next();
  }
  return res.status(401).send({ message: 'Your are not Admin.' });
};


