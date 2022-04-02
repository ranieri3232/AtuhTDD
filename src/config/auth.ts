import 'dotenv/config';

const auth = {
  secret_jwt: process.env.JWT_SECRET,
};
export { auth };
