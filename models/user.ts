import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the IUser interface
interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  googleId: string;
  name?: string;
  picture?: string;
  notionAccessToken?: string;
  subscription: {
    status: 'none' | 'active' | 'expired';
  };
  stripeCustomerId?: string;
  preferences?: {
    notificationSettings: object;
    reportFrequency: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Update the UserSchema to remove the pods array
const userSchema: Schema<IUser> = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  googleId: { type: String, required: true, unique: true },
  name: { type: String },
  picture: { type: String },
  notionAccessToken: { type: String },
  subscription: {
    status: { type: String, enum: ['none', 'active', 'expired'], default: 'none' },
  },
  stripeCustomerId: { type: String },
  preferences: {
    notificationSettings: { type: Object },
    reportFrequency: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the `updatedAt` timestamp
userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
export type { IUser };
