const jwt = require('jsonwebtoken');
const seccode = "my name is sheela";

const fetchuser = (req, res, next) => {
    //get the user from the jwt token abd add it to req object

    const token = req.header('authtoken');
    if (!token) {
        res.status(401).send({error:"please login with correct details"})
    }

    try {
        
        const data = jwt.verify(token, seccode);

        req.user = data.user;
        next();
        
    } 
    catch (error) {
        res.status(401).send({error:"internal server error"})
    }
}

module.exports = fetchuser;