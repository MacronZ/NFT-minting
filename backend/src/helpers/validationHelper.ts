import jwt from 'jsonwebtoken';
import CodeError from './errorHelper';

const checkToken = async (token) => {
  let decoded;

  try {
    decoded = await jwt.verify(token, process.env.USER_SECRET!);
  } catch (error) {
    throw new CodeError(error.message, 401);
  }

  return decoded;
};

const generateToken = async (email) => jwt.sign({ email }, process.env.USER_SECRET!, { expiresIn: '12h' });

export default { checkToken, generateToken };
