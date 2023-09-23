export class UserModel{
    constructor(id, name, email, password, type) {
        this.name = name,
        this.email = email,
        this.password = password,
        this.type = type,
        this.id = id
    }
    static signUp(name, email, password, type) {
        const id = users.length + 1
        const newUser = new UserModel(id, name, email, password, type)
        users.push(newUser)
        return newUser
    }
    static signIn(email, password, type) {
        const user = users.find((u) => u.email === email && u.password === password && u.type === type)
        return user
    }
    static getAllUsers() {
        return users
    }
}

let users = [{
    id:1,
    name: "Seller User",
    email: "seller@gmail.com",
    password: "123",
    type:"seller"
}, {
    id:2,
    name: "Customer User",
    email: "customer@gmail.com",
    password: "123",
    type:"customer"
}]