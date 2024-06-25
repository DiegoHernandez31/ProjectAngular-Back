import mongoose from "../config/mongoose.js";

const itemsSchema = mongoose.Schema({
    quantity: Number,
    discount: Number,
    tax: Number,
    totalItem: Number,
    perfume: {
        type: mongoose.Types.ObjectId,
        ref: "Perfume",
    },
    sell: {
        type: mongoose.Types.ObjectId,
        ref: "Sell",
    },
});
const Items = mongoose.model("Items", itemsSchema);

export default Items;