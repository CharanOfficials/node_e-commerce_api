import { UserModel } from "../features/user/user.model.js"
// Basic authorization includes the credentials in authorization header
const basicAuthorizer = (req, res, next) => {
    // 1. Check if authorization header is empty.
    const authHeader = req.header("authorization")
    if (!authHeader) {
        return res.status(401).send("No authorization details found.")
    }
    // 2. Extract credentials [Basic djowqdnbjwkdkqwd]
    const base64Credentials = authHeader.replace("Basic ", '')
    const decodeCreds = Buffer.from(base64Credentials, 'base64').toString('utf8')
    const creds = decodeCreds.split(':')
    const user = UserModel.getAllUsers().find(u => u.email === creds[0] && u.password === creds[1])  
    if (user) {
        next()
    } else {
        res.status(401).send("Incorrect Credentials")
    }
}

export default basicAuthorizer