import mongoose from "../config/mongoose.js";

const sellSchema = mongoose.Schema({
    total: Number,
    subtotal: Number,
    taxes: Number,
    observation: String,
    date: Date,
    dueDate: Date,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    paymentMethod: {
        type: mongoose.Types.ObjectId,
        ref:"PaymentMethod",
    },
});
const Sell = mongoose.model("Sell", sellSchema);

export default Sell;