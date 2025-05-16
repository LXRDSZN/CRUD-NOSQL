import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema({
    subjectname: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export default mongoose.model("Subject", subjectSchema);
