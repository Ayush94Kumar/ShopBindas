import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        //getting token from header
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: "NOT Autherized" });
        }
        //verify the oken using jwt
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "NOT Autherized" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export default adminAuth