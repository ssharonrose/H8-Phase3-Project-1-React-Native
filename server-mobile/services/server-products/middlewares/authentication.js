const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index")

async function authentication(request, response, next) {
    try {

        const access_token = request.headers?.authorization

        // console.log(request.headers);

        // console.log(access_token);

        if (!access_token) throw { name: "Unauthorized" }

        const payload = verifyToken(access_token)
        if (!payload) throw { name: "JsonWebTokenError" }

        const user = await User.findOne({
            where: {
                id: payload.id
            }
        })

        // console.log(user);

        request.dataUser = {
            userId: user.id,
            email: user.email,
            role: user.role
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { authentication } 