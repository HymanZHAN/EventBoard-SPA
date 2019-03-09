import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { AuthOptions, WebAuth } from 'auth0-js';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
    this.properties = {
      clientID: 'mFuMRFj7gnRFca5cS7F7CGIg6rTYcn3B',
      domain: 'xzhan.auth0.com',
      responseType: 'token id_token',
      audience: 'http://localhost:3000',
      redirectUri: 'http://localhost:4200/events/',
      scope: 'openid profile'
    };
    this.auth0Client = new WebAuth({ ...this.properties });
  }
  protected auth0Client: WebAuth;
  private accessToken: string;
  private idToken: string;
  private properties: AuthOptions;

  public login(): void {
    // triggers auth0 authentication page
    this.auth0Client.authorize();
  }

  public checkSession(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      // checks in Auth0's server if the browser has a session
      this.auth0Client.checkSession(
        this.properties,
        async (error, authResult) => {
          if (error && error.error !== 'login_required') {
            // some other error
            return reject(error);
          } else if (error) {
            // explicit authentication
            this.handleAuthentication();
            return resolve(false);
          }
          if (!this.isAuthenticated()) {
            this._setSession(authResult);
            return resolve(true);
          }
        }
      );
    });
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    return this.accessToken != null;
  }

  private handleAuthentication(): void {
    this.auth0Client.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._setSession(authResult);
      } else if (err) {
        console.log(err);
      }
    });
  }

  private _setSession(authResult): void {
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
  }

  // check if there is a property Admin in the access token
  public isAdmin(): boolean {
    if (this.accessToken) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(this.accessToken);
      if (decodedToken['http://localhost:3000/roles'].indexOf('admin') > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public getProfile(): object {
    if (this.idToken) {
      const helper = new JwtHelperService();
      return helper.decodeToken(this.idToken);
    }
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public logout(): void {
    // Remove tokens
    delete this.accessToken;
    delete this.idToken;
  }
}
