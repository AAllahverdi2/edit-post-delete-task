const { ITEMS } = require("../model/model")
const ITEMSController = {
    getAll: async (req, res) => {
        try {
            const target = await ITEMS.find({})
            res.send(target)

        } catch (error) {
            res.send("item is not found")
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const ITEMS = await ITEMS.findById(id)
            res.send(ITEMS)

        } catch (error) {
            res.send("item is not found")
        }
    },
    Post: async (req, res) => {
        try {
            const { name, description, price, image } = req.body
            const NewProduct = new ITEMS({ name, description, price, image })
            await NewProduct.save()
            res.send(NewProduct)

        } catch (error) {
            res.send("item is not found")
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            const { name, price, description, image } = req.body
            const target = await ITEMS.findByIdAndUpdate(id, { name, price, description, image })
            res.send(target)
        } catch (error) {
            res.send("item is not a fount")
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            await ITEMS.findByIdAndDelete(id)
            res.send("deleted")
        } catch (error) {
            res.send("item is not found")
        }
    },
}
module.exports = { ITEMSController }