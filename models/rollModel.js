import mongoose from "../config/mongoose.js";

const rollSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
});
const Roll = mongoose.model("Roll", rollSchema);

export default Roll;