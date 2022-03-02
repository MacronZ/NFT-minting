import { model } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { CodeError } from '../helpers';
import { UserSchema } from '../schemas';
import { UserInterface } from '../interfaces';

const saltRounds = 10;

UserSchema.pre('save', function CheckExistence(this:any, next) {
  if (this.isNew || this.isModified('password')) {
    bcrypt.hash(this.password, saltRounds,
      (err, hashedPassword) => {
        if (err) {
          next(err);
        } else {
          this.password = hashedPassword;
          next();
        }
      });
  } else {
    next();
  }
});

UserSchema.pre('findOneAndUpdate', function updateUser(next) {
  // @ts-ignore
  const document = this._update;

  if (document.password) {
    bcrypt.hash(document.password, saltRounds,
      (err, hashedPassword) => {
        if (err) {
          next(err);
        } else {
          document.password = hashedPassword;
          next();
        }
      });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = async function CheckPassword(user, password) {
  async function validateOldPassword() {
    const passHash = crypto.createHash('sha512').update(password).digest('hex');
    const finalHash = crypto.createHash('sha512').update(passHash + user.salt).digest('hex');

    if (finalHash !== user.password) throw new CodeError('Username or Password is not correct!', 401);
  }

  async function validateNewPassword() {
    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) throw new CodeError('Username or Password is not correct!', 401);
  }

  try {
    if (user.migrated) await validateOldPassword(); else await validateNewPassword();
  } catch (error) {
    throw new CodeError(error.message, error.code);
  }
};

const User = model < UserInterface.IUser >('User', UserSchema);

export default User;
