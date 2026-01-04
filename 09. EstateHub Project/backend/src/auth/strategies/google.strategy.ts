import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleOauthConfig from 'src/config/google-oauth.config';
import { AuthService } from '../auth.service';

export interface GoogleUserPayload {
  provider?: 'google';
  providerId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleOauthConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: googleConfiguration.clientID!,
      clientSecret: googleConfiguration.clientSecret!,
      callbackURL: googleConfiguration.callbackURL!,
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const email = profile.emails?.[0]?.value;

    if (!email) {
      return done(new Error('Google account has no email'), undefined);
    }
    console.log({ profile });
    const user: GoogleUserPayload = await this.authService.validateGoogleUser({
      email: profile.emails?.[0]?.value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      avatarUrl: profile.photos[0].value,
      password: '',
    });
    done(null, user);
  }
}
