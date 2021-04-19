const jwt = require("jsonwebtoken");

module.exports = function verify(req, res, next) {
  const authHeader = req.headers['authorization'] // Get auth header from request
  const token = authHeader && authHeader.split(' ')[1] // The token itself
  if(token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403) // Token sent, but it's invalid
    req.user = user
    next()
  })


  //const token = req.header("auth-token");
  /* const token = req.headers["x-access-token"]; */
  /* console.log(token); */
  /* if (!token) return res.status(401).send("Access denied."); */

  /* try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized.");
  } */
};
