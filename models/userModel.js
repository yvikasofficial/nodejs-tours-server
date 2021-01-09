const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Username is required!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, 'password is required!'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'password is required!'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
