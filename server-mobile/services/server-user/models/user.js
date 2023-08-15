const { ObjectId } = require("mongodb")
const { getDB } = require("../config/connectionMongodb")

class User {
    static collection() {
        return getDB().collection("users")
    }

    static findAll() {
        return this.collection().find().toArray()
    }

    static findOne(params) {
        return this.collection().findOne(params, {
            projection: {
                password: 0
            }
        })
    }

    static create(data) {
        return this.collection().insertOne(data)
    }

    static update(params, data) {
        return this.collection().updateOne(params, data)
    }

    static delete(params) {
        return this.collection().deleteOne(params)
    }


}

module.exports = User