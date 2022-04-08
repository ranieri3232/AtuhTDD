import 'dotenv/config';

const auth = {
  secretJwt: process.env.JWT_SECRET,
  expiresIn: '1d',
};
export { auth };
