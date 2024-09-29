// models/DocumentModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IDocument extends Document {
  content: string;
  metadata?: Record<string, any>; // Optional metadata
}

const DocumentSchema: Schema = new Schema({
  content: { type: String, required: true },
  metadata: { type: Object, required: false },
});

const DocumentModel = mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);

export default DocumentModel;
