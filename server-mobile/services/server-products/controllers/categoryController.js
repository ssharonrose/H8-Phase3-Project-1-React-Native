const { Product, Category, Images } = require("../models/index")

class categoryController {

    static async addCategory(request, response, next) {
        try {


            const { name } = request.body

            const created = await Category.create({ name })


            console.log(created);

            response.status(201).json({
                message: created,
            })

        }
        catch (err) {
            next(err)
        }

    }

    static async readAllCategory(request, response, next) {
        try {
            const read = await Category.findAll({
                order: [
                    ['createdAt', 'ASC']
                ]
            })

            // console.log(read);

            response.status(200).json(read)
        }
        catch (err) {
            next(err)
        }

    }

    static async readDetailCategory(request, response, next) {

        try {


            console.log("masuk detail");

            const { id } = request.params
            console.log(request.params);
            const oneCategory = await Category.findOne({
                where: { id }
            })

            console.log(oneCategory, "<<<<<<<<<<<<<<");

            if (!oneCategory) {
                throw { name: "NotFound" }
            } else {
                response.status(200).json(oneCategory)
            }

        }
        catch (err) {
            next(err)
        }
    }

    static async deleteCategory(request, response, next) {

        try {
            const { id } = request.params
            const oneCategory = await Category.findByPk(id)

            const deleteCategory = await Category.destroy({ where: { id } })

            if (!oneCategory) {
                throw { name: "NotFound" }
            } else {
                response.status(201).json({
                    message: `${oneCategory.name} success to delete`
                })
            }

        }
        catch (err) {
            next(err)
        }

    }

    static async editCategory(request, response, next) {

        try {

            console.log("masukkk edit catgory");
            const { id } = request.params
            const { name } = request.body

            console.log(id);
            console.log(name);


            const updated = await Category.update({
                name
            },
                {
                    where: {
                        id: id
                    }
                })

            console.log(updated);

            response.status(201).json(updated)

        }
        catch (err) {
            next(err)
        }

    }
}
module.exports = categoryController

