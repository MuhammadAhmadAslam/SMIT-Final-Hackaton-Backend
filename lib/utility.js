import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const convertPasswordToHash = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password , salt)
}

export const generateToken = (user) => {
  console.log(user , "user in generate token");
    return jwt.sign(
      user,
      process.env.JWT_PASSWORD_SECRET_KEY,
      { expiresIn: '60d' } 
    );
  };


  export async function comaprePassword(currentSendedPassword, password) {
      return await bcrypt.compare(currentSendedPassword,password)
  }