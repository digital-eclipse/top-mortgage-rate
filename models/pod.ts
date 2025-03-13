import mongoose, { Document, Schema } from 'mongoose';

// Define the Pod interface
interface IPod extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  googleDriveFolderId: string;
  googleDriveFolderName: string;
  notionDatabaseId: string;
  notionDatabaseName: string;
  channelId: string;
  resourceId: string;
  processedIds: string[];  
  expiration: string;
  createdAt: { type: Date }  
}

// Define the Pod schema
const podSchema: Schema<IPod> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true, default: 'Pod' },
  googleDriveFolderId: { type: String, default: '' },
  googleDriveFolderName: { type: String, required: true, default: 'Folder' },
  notionDatabaseId: { type: String, default: '' },
  notionDatabaseName: { type: String, required: true, default: 'Database' },
  channelId: { type: String, default: '' }, 
  resourceId: { type: String, default: '' }, 
  processedIds: { type: [], default: [] },  
  expiration: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }  // Add this line
});

// Create the Pod model
const Pod = mongoose.models.Pod || mongoose.model<IPod>('Pod', podSchema);

export default Pod;
export type { IPod };
