const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  // no authentication token, return error
  if (!authHeader) {
    return res.status(401).json("You are not authenticated");
  }

  const token = authHeader.split(" ")[1];
  // verify auth tokem
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403).json("Token is not valid");
    }

    req.user = user;
    next();
  });
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    // check if token is of the user whose detail will be updated
    // or if they are the admnin
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next(); //
    } else {
      res.status(403).json("Unauthorized to carry out the action");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // check if token user has admin privileges
    if (req.user.isAdmin) {
      next(); //
    } else {
      res.status(403).json("Not an admin Unauthorized to carry out the action");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
