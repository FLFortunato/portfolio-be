// import * as passport from "passport";
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import * as dotenv from "dotenv";
// import { User } from "../models/user.model";
// dotenv.config();

// export default passport.use(
//   new Strategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeader("authorization"),
//       secretOrkey: process.env.SECRET_TOKEN as string,
//     },
//     async (payload: any, done: any) => {
//       try {
//         const user = await User.findOne(payload.id);
//         if (!user) return done(null, false);

//         done(null, user);
//       } catch (error) {
//         done(error, false);
//       }
//     }
//   )
// );
