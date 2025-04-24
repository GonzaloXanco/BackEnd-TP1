import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { connectDB } from "./config/mongo";

connectDB()

interface UserInterface extends Document {
  name: string
  age: number
  email: string
  city: string
  amount: number
  total: number
  role: "user" | "admin"
}

const userSchema: Schema = new Schema<UserInterface>({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 18 },
  email: { type: String, requiered: true, unique: true, match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ },
  city: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: false, versionKey: false })

userSchema.set("strict", true)

const User = mongoose.model<UserInterface>("user", userSchema)


const createUser = async () => {
  try {
    const user: UserInterface = new User({
      name: "Gonzalo Xanco",
      age: 20,
      email: "GonzaloXanco@gmail.com",
      city: "Monte Grande",
    })

    await user.save()
    console.log("Usuario Creado")
  } catch (error) {
    console.log("Error al registrar usuario")
  }
}

// createUser()


const getUser = async () => {
  try {
    const user = await User.find()
    console.log(user)
  } catch (error) {
    console.log("Error al recuperar los usuarios")
  }
}

// getUser()

const getUserID = async (id: string) => {
  try {
    const user = await User.findById(id)
    console.log(user)
  } catch (error) {
    console.log("Error al recuperar el usuario por su ID")
  }
}
//const id = "680a31f880b3d3a3c47f438d"
//getUserID(id)

const updeteUser = async (id: string, body: object) => {
  try {
    const updeteUser = await User.findByIdAndUpdate(id, body, { new: true })
    
  } catch (error) {
    console.log("Error al actuelizar")
  }
}

//updeteUser("680a31f880b3d3a3c47f438d", {email: "GonzaloNuevo@gmail.com"})
//getUser()


const deleteUser = async (id: string) => {
  try {
    const deleteUser = await User.findByIdAndDelete(id)
  } catch (error) {
    console.log("Error al eleminar el usuario")
  }
}


//deleteUser("680a31f880b3d3a3c47f438d")
//getUser()