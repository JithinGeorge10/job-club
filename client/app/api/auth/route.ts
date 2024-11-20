import { createRouter } from 'next-connect';
import passport from 'passport';
import axios from 'axios';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

interface User {
  id: string;
  email: string;
  name: string;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: '200095093612-l6io12cqh0l2199jhgof2q56kf6vn2nt.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
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

const router = createRouter();

// Initialize passport using next-connect middleware
// router.use(passport.initialize());

// Route to redirect to Google's authentication page
router.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after Google authentication
router.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { session: false }),
  async (req: any, res: any) => {
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

export default router.handler();
