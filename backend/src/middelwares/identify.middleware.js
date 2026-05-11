const jwt = require('jsonwebtoken');

async function identifyUser(req, res, next) {
    const token = req.cookies['jwt-token'];
        const postId = req.params.id;
        let decoded = null;
        try {
            decoded = jwt.verify(token, process.env.JWT_URI);
        } catch(err) {
            return res.status(401).json({message: 'unauthorized access'});
        }
        req.user = decoded;
        next();
    }

    module.exports = { identifyUser };