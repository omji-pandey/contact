const mongoose = require("mongoose");
const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  message: {
    type: String,
    required: true,
    minlength: [50, "Message must be at least 50 characters long"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Form = mongoose.model("Form", formSchema);
module.exports = Form;
