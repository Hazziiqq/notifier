import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    }
});

const EmailModel = mongoose.models.Email || mongoose.model("Email", emailSchema);

export default EmailModel;
