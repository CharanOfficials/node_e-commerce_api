// To implement user specific features

import jwt from "jsonwebtoken"
import env  from '../env.js'
const jwtauth = (req, res, next) => {
    // 1. Read token
    const token = req.header("authorization")
    // If no token then send invalid token
    if (!token) {
        return res.status(401).send("Unauthorized")
    }
    // If token then check validity
    try {
        const payloadjwt = jwt.verify(token, env.jwtSecret)
    } catch (err) {
        // else return error
        return res.status(401).send("Unauthorized")
    }
    // If valid call next
    next()
}

export default jwtauth