const { User } = require("../models/index")

async function authorization(request, response, next) {
    try {

        console.log("masuk authorrrrrzz");
        console.log("masuk author");

        const { role } = request.dataUser

        console.log(request.dataUser, "ini data user");

        console.log(role);

        if (role !== "admin") throw { name: "Forbidden" }

        next()

    } catch (err) {
        next(err)
    }
}

module.exports = { authorization }


