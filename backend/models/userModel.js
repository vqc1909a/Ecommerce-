import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    // Para crear los campos de updatedAt and createdAt automaticamente sin crearlos en la parte de arriba
    timestamps: true
})

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  const passwordHashed = bcrypt.hashSync(this.password, 10)
  this.password = passwordHashed
  return next()
})

UserSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(String(password), this.password)
}

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

const User = mongoose.model("User", UserSchema);
export default User;