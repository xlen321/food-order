import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const addressSchema = new Schema<IAddress>({
  street: {
    type: String,
    default: "Update your street",
    trim: true,
  },
  city: {
    type: String,
    default: "Update your city",
    trim: true,
  },
  state: {
    type: String,
    default: "Update your state",
    trim: true,
  },
  postalCode: {
    type: String,
    default: "update your postal code",
    trim: true,
  },
  country: {
    type: String,
    default: "Update your country",
    trim: true,
  },
});

interface Iuser extends Document {
  fullName: string;
  email: string;
  password: string;
  address: IAddress;
  avatar: string;
  isAdmin: boolean;
  lastLogin: Date;
  isVerified: boolean;
  resetPasswordToken: string;
  resetPasswordTokenExpiryDate: Date;
  refreshToken: string;
  refreshTokenExpiryDate: Date;
}

const userSchema = new Schema<Iuser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address.",
      ],
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Password must be at least 6 characters long and contain at least one letter, one number, and one special character.",
      ],
    },
    address: {
      type: addressSchema,
      default: () => ({}),
    },

    avatar: {
      type: String,
      default: "",
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordTokenExpiryDate: {
      type: Date,
    },

    refreshToken: {
      type: String,
    },

    refreshTokenExpiryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccesstoken = function () {
  return jwt.sign(
    {
      _id: this.id,
      email: this.email,
      fullname: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this.id,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User: Model<Iuser> = mongoose.model<Iuser>("User", userSchema);

export { IAddress, Iuser, User };
