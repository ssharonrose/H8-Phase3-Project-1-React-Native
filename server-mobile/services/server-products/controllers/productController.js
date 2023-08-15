const { Product, Category, Images, sequelize } = require("../models/index")
const { slug } = require("../helpers/slug")

class productController {
    static async readAllProduct(request, response, next) {
        try {
            const read = await Product.findAll({
                include: [Category, Images],
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

    static async readDetailProduct(request, response, next) {

        try {

            console.log("masuk detail");

            const { id } = request.params
            console.log(request.params);
            const oneProduct = await Product.findOne({
                where: { id }, include: [Images, Category]
            })

            console.log(oneProduct, "<<<<<<<<<<<<<<");

            if (!oneProduct) {
                throw { name: "NotFound" }
            } else {
                response.status(200).json(oneProduct)
            }

        }
        catch (err) {
            next(err)
        }
    }

    static async deleteProduct(request, response, next) {

        try {
            const { id } = request.params
            const oneProduct = await Product.findByPk(id)

            console.log(oneProduct);

            const deleteProduct = await Product.destroy({ where: { id } })

            if (!oneProduct) {
                throw { name: "NotFound" }
            } else {
                response.status(201).json({
                    message: `Product ${oneProduct.name} success to delete`
                })
            }

        }
        catch (err) {
            next(err)
        }

    }

    static async addProduct(request, response, next) {
        const t = await sequelize.transaction();
        try {

            console.log("MASUK ADDDD <<<<<<<<<<<<<<<<<<<<<<<,");

            // const { userId } = request.dataUser

            const { name, description, price, mainImg, categoryId, authorId } = request.body

            console.log(name, description, price, mainImg, categoryId, authorId, "<<<<<<<<<<<<<<");

            const created = await Product.create({ name, slug: slug(name), description, price, mainImg, categoryId, authorId }, { transaction: t })

            console.log(created, "<<<<<<<<<<");

            const { imgUrl1, imgUrl2, imgUrl3 } = request.body
            console.log(imgUrl1, imgUrl2, imgUrl3);
            if (!imgUrl1 || !imgUrl2 || !imgUrl3) throw { name: "ImgLessThan3" }

            const images = await Images.bulkCreate([
                { imgUrl: imgUrl1, productId: created.id },
                { imgUrl: imgUrl2, productId: created.id },
                { imgUrl: imgUrl3, productId: created.id },
            ], { transaction: t })

            console.log("SELESAI add");
            // console.log(images);

            response.status(201).json({ created, images })
            await t.commit()
        }
        catch (err) {
            await t.rollback();
            // throw
            console.log("masuk error <<<<<<<<<");
            next(err)
        }
    }

    static async editProduct(request, response, next) {
        // const t = await sequelize.transaction();
        try {

            console.log("MASUK EDITT <<<<<<<<<<<<<<<<<<<<<<<,");

            // const { userId } = request.dataUser

            const { name, description, price, mainImg, categoryId } = request.body

            // console.log(name, description, price, mainImg, categoryId);

            const { id } = request.params
            // console.log(id);

            const updated = await Product.update({ name, slug: slug(name), description, price, mainImg, categoryId }, { where: { id } })

            console.log("SELESAI edittt");

            response.status(201).json({
                message: `Product ${id} success to edit`
            })
        }
        catch (err) {
            // await t.rollback();
            // throw
            console.log("masuk error <<<<<<<<<");
            next(err)
        }

    }


}
module.exports = productController

