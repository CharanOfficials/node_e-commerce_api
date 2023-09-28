import { ApplicaationError } from "../../../error-handler/applicationError.js"
import { getDB } from "../../config/mongodb.js"
class UserModel{
    constructor(name, email, password, type) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }
    static getAllUsers() {
        return users
    }
}

export default UserModel