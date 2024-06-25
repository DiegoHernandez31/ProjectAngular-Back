import mongoose from "../config/mongoose.js";

const creditCardSchema = mongoose.Schema({
    name: String,
    lastname: String,
    cardNumber: Number,
    goodThru: String,
    cvv: Number,
    type: String,
    deletedAt: {
        type: Date,
        default: null,
    }
});
const CreditCard = mongoose.model("CreditCard", creditCardSchema);

export default CreditCard;