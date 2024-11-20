const nextConnect = require('next-connect');
import axios from 'axios';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
interface User {
    id: string;
    email: string;
    name: string;
    // Add other fields relevant to your user
  }
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // Process the user profile and pass it to the next step
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: User | null, done: (err: any, user?: User | null) => void) => {
    done(null, user);
  });
  

const handler = nextConnect();

handler.use(passport.initialize());

// Route to redirect to Google's authentication page
handler.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after Google authentication
handler.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { session: false }),
  async (req: any, res:any) => {
    const user = req.user; // Extract authenticated user details

    // Send user details to your AUTH_SERVICE_URL for saving
    try {
      const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/google-login`, {
        googleId: user.id,
        name: user.displayName,
        email: user.emails[0].value,
      });

      if (response.data.success) {
        res.redirect('/jobListingPage'); // Redirect to your app's dashboard
      } else {
        res.redirect('/login'); // Redirect to login on failure
      }
    } catch (error) {
      console.error(error);
      res.redirect('/login');
    }
  }
);

export default handler;
