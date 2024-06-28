import { ObjectId } from "mongodb";
import mongoose, { Schema, model, models, Document } from "mongoose";

interface IPrompt extends Document {
    _id: string;
    creator: ObjectId;
    prompt: string;
    tag: string;
}

const PromptSchema = new Schema<IPrompt>({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required'],
    },
});

const Prompt = models.Prompt as mongoose.Model<IPrompt> || model<IPrompt>('Prompt', PromptSchema);

export default Prompt;