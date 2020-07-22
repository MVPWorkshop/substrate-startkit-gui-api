import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { AuthenticationError } from '../utils/errors.util';
import { VerifyCallback } from 'passport-oauth2';
import { CONFIG } from './index';
import User from '../models/User.model';
import AuthService from '../services/auth.service';
import { ILoggedInUser } from '../entities/user.entity';

passport.serializeUser<ILoggedInUser, ILoggedInUser>((user, done) => {
  done(undefined, user);
});

passport.deserializeUser<ILoggedInUser, ILoggedInUser>((user, done) => {
  if (user) {
    return done(undefined, user);
  } else {
    return done(new AuthenticationError(), undefined);
  }
});

const authenticate = async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {

  const user = await AuthService.login(accessToken, profile);

  try {
    done(undefined, user);
  } catch (error) {
    return done(new AuthenticationError(), undefined);
  }
};

const strategy = new GitHubStrategy({
  clientID: CONFIG.GITHUB_APP_CLIENT_ID,
  clientSecret: CONFIG.GITHUB_APP_CLIENT_SECRET,
  callbackURL: CONFIG.HOST_ADDRESS + '/api/v1/auth/github/callback'
}, authenticate);

passport.use(strategy);
