import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { HttpErrorHandlerService } from 'src/common/http-error-handler.service';

@Injectable()
export class AuthService {

  private accessToken: string;
  private refreshToken: string;
  private expiresIn: number;

  constructor(private readonly httpErrorHandlerService: HttpErrorHandlerService) { }
  private refreshTimeout: NodeJS.Timeout | null = null;

  async fetchAuthToken(authCode: string): Promise<void> {
    const UID = process.env.CLIENT_ID;
    const SECRET = process.env.CLIENT_SECRET;

    // Define the data for the POST request
    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code');
    data.append('client_id', UID);
    data.append('client_secret', SECRET);
    data.append('code', authCode);
    data.append('redirect_uri', process.env.REDIRECT_URI);

    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.INTRA_URL}/oauth/token`,
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;
      this.expiresIn = Date.now() + response.data.expires_in * 1000;
      // console.log("Token:", {
      //   accessToken: this.accessToken,
      //   refreshToken: this.refreshToken,
      //   expiresIn: this.expiresIn,
      // });
      this.startTokenRefresher();
    } catch (error) {
      this.httpErrorHandlerService.handleAxiosError(error, 'Failed to fetch authentication token');
    }
  }

  async refreshAuthToken(): Promise<void> {
    console.log('Refreshing token...');

    if (!this.refreshToken) {
      console.error("No refresh token available. Please authenticate first.");
      throw new HttpException("No refresh token", HttpStatus.UNAUTHORIZED);
    }

    const data = new URLSearchParams();
  
    data.append('grant_type', 'refresh_token');
    data.append('refresh_token', this.refreshToken);
    data.append('client_id', process.env.CLIENT_ID);
    data.append('client_secret', process.env.CLIENT_SECRET);
    data.append('redirect_uri', process.env.REDIRECT_URI);

    try {
      const response = await axios.post(`${process.env.INTRA_URL}/oauth/token`, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;
      this.expiresIn = Date.now() + response.data.expires_in * 1000;
      // console.log('Token refreshed succesfully', { 
      //   accessToken: this.accessToken,
      //   refreshToken: this.refreshToken,
      //   expiresIn: this.expiresIn,
      // });
      this.startTokenRefresher();
    } catch (error) {
      console.error("Error when refreshing token:", error.response?.status, error.response?.data);
      this.httpErrorHandlerService.handleAxiosError(error, 'Error when refreshing token:');
    }
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  async redirectToAuth(): Promise<{ authUrl: string }> {
    const url = `${process.env.INTRA_URL}/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`;
    // console.log('Redirecting to:', url);
    return { authUrl: url };
  }

  /**
   * Start a timer that triggers a token refresh shortly before the token expires.
   */
  startTokenRefresher() {
    console.log('🕒 Starting token refresher ...');
    const safetyBuffer = 60 * 1000;
    
    const timeoutDuration = Math.max(this.expiresIn - Date.now() - safetyBuffer, 0);
    console.log(`🕒 Token will refresh in ${timeoutDuration / 1000} seconds`);
  
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
    
    this.refreshTimeout = setTimeout(async () => {
      console.log('⏳ In setTimeout ...');
      await this.refreshAuthToken();
    }, timeoutDuration);
  }
  
}