import mongoose, { Document, Model } from "mongoose";

export interface IAddress {
  address: string;
  city: string;
  country: string;
  pin: string;
}

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  contact: string;
  address: IAddress;
  city: string;
  country: string;
  avatar: string;
  isAdmin: boolean;
  lastLogin?: Date;
  isVerified?: boolean;
  refreshToken?: string;
  refreshTokenExpiry?: Date;
  resetPasswordToken?: string;
  resetPasswordTokenExpiry?: Date;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
}

export interface IUserDocument extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
}

const addressSchema = new mongoose.Schema<IAddress>({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    contact: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    refreshToken: String,
    refreshTokenExpiry: Date,

    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,

    verificationToken: String,
    verificationTokenExpiry: Date,
  },
  { timestamps: true }
);


export const User: Model<IUserDocument> = mongoose.model<IUserDocument>("User", userSchema);