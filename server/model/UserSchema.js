const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  endereco: {
    rua: {
      type: String,
      required: true,
    },
    bairro: {
      type: String,
      required: true,
    },
    cidade: {
      type: String,
      required: true,
    },
    pais: {
      type: String,
      required: true,
    },
    cep: {
      type: Number,
      required: true,
    },
  },
  events: {
    type: Array,
    default: [],
  },
  planners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Planner",
    },
  ],
});

userSchema.methods.getAllPlanners = async function () {
  const planners = await mongoose
    .model("planners")
    .find({ _id: { $in: this.planners } });
  return planners;
};

// Hash a user's password before saving to the database
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("users", userSchema);

module.exports = User;
