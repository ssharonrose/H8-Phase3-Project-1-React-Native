const { ObjectId } = require("mongodb")
const { hashPassword } = require("../helpers/bcrypt")
const User = require("../models/user")

class UserController {

    static async getAllUser(request, response) {
        try {

            // console.log("masukkk");
            const result = await User.findAll()

            console.log(result);

            result.forEach((el) => {
                delete el.password
            })

            response.status(200).json(result)

        } catch (err) {
            console.log(err)
            response.status(500).json({ msg: "error" })
        }
    }

    static async getUserById(request, response) {
        try {
            const { id } = request.params
            const params = {
                _id: new ObjectId(id)
            }
            const result = await User.findOne(params)

            response.status(200).json(result)

        } catch (err) {
            console.log(err)
            response.status(500).json({ msg: "error" })
        }
    }

    static async createUser(request, response) {
        try {
            const { username, email, password, phoneNumber, address } = request.body

            console.log(username, email, password, phoneNumber, address,)


            const newUser = {
                username, email, password: hashPassword(password), phoneNumber, address
            }


            const result = await User.create(newUser)

            // console.log(result.insertedId);
            console.log(result, "<<<<<<");

            response.status(201).json(result)

            // console.log(result, _id);

        } catch (err) {
            console.log(err);
            response.status(500).json({ msg: "error" })
        }
    }


    static async deleteUser(request, response) {
        try {

            const { id } = request.params
            const params = {
                _id: new ObjectId(id)
            }
            const result = await User.delete(params)


            response.status(201).json({
                message: `User ${id} success to delete`
            })

        } catch (err) {
            console.log(err)
            response.status(500).json({ msg: "error" })
        }
    }


}

module.exports = UserController