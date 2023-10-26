import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserModel from "../models/user"
import bcrypt from  "bcrypt"


interface SignUpBody { 
     username?: string,
     email?: string,
     password?: string | undefined,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
     const username = req.body.username
     const email = req.body.email
     const passwordRow = req.body.password 

     try { 
       if (!username || !email || !passwordRow) {
        throw createHttpError(400, "Paramets missing")
       }

       const existingUsername = await UserModel.findOne({ username: username}).exec()

       if (existingUsername) {
        throw createHttpError(409, "Username alrealy taken ")
    }
    const existingEmail = await UserModel.findOne({email: email}).exec()

    if (existingEmail) {
      throw createHttpError(409, "A user with this email")
    }

    const passwordHashed = await bcrypt.hash(passwordRow, 10)

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    })
        res.status(201).json(newUser)
    } catch(error) {
      next(error)
    }
}