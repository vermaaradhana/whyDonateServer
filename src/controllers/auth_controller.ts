import { UserInterface } from '../interface/user_interface';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import passport from 'passport';
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';

// TODO: Send response using UserInterface or decide something better
// Promise<youcanpasinterfacehere>
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userData = req.body;
    if (!(userData.contact && userData.full_name && userData.password)) {
      return res.json({ message: 'contact, full_name and password required' });
    }
    const user: any = await User.findOne({ contact: userData.contact }).exec();
    if (user && user.otp_verified) {
      return res.json({
        success: false,
        message: 'User with this contact number already registered'
      });
      // send error message user already registered
    } else {
      const newUser = new User({
        full_name: userData.full_name,
        password: userData.password,
        created_at: new Date(),
      });

      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          //save pass to hash
          newUser.password = hash;
          if (user && !user.otp_verified) {
            await user.update({
              $set: {
                full_name: userData.full_name,
                password: hash,
                updated_date: new Date()
              }
            });
          } else {
            await newUser.save();
          }
          return res.json({
            success: true,
            message: 'Please enter OTP to verify your mobile number'
          });
        })
      );
    } //ELSE statement ends here
  } catch (error) {
    console.log(error);
    throw new Error('Invalid');
    // or
    next(error); // this will lead forward use if really needed
    //handleError(error);
  }
};

// TODO: Make a different function to send OTP in case it didn't reach to user mobile phone

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!(req.body.contact && req.body.password)) {
      return res.json({ message: 'contact and password required' });
    }
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ success: false, message: info.message, data: null });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        res.json({
          success: true,
          message: 'User logged in successfully',
          data: user
        });
        next();
      });
    })(req, res, next);
  } catch (error) {
    console.log(error);
    throw new Error('Invalid');
    // or
    next(error); // this will lead forward use if really needed
    //handleError(error);
  }
};
