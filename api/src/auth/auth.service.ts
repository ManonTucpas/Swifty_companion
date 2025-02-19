import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { HttpErrorHandlerService } from 'src/common/http-error-handler.service';

@Injectable()
export class AuthService {

  private accessToken: string;
  private refreshToken: string;
  private expiresIn: number;

  constructor(private readonly httpErrorHandlerService: HttpErrorHandlerService) { }

  async fetchAuthToken(authCode: string): Promise<void> {
    console.log('GET /auth');
    const UID = process.env.CLIENT_ID;
    const SECRET = process.env.CLIENT_SECRET;

    // Define the data for the POST request
    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code');
    data.append('client_id', UID);
    data.append('client_secret', SECRET);
    data.append('code', authCode);
    data.append('redirect_uri', process.env.REDIRECT_URI);

    // console.log("Data is:", data)
    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.INTRA_URL}/oauth/token`,
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log("DATA Response is:", response.data);
      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;
      this.expiresIn = Date.now() + response.data.expires_in * 1000;
      console.log("Refresh token:", {
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
        expiresIn: this.expiresIn,
      });
      this.startTokenRefresher();
    } catch (error) {
      this.httpErrorHandlerService.handleAxiosError(error, 'Failed to fetch authentication token');
    }
  }

  async refreshAuthToken(): Promise<void> {
    console.log('Refreshing token...');

    if (!this.refreshToken) {
      console.error("No refresh token available. L'utilisateur doit se reconnecter.");
      throw new HttpException("No refresh token", HttpStatus.UNAUTHORIZED);
    }

    const data = new URLSearchParams();
    console.log('1--Data is:', data);

    data.append('grant_type', 'refresh_token');
    data.append('refresh_token', this.refreshToken);
    data.append('client_id', process.env.CLIENT_ID);
    data.append('client_secret', process.env.CLIENT_SECRET);
    data.append('redirect_uri', process.env.REDIRECT_URI);

    console.log('2--Data is:', data);

    try {
      const response = await axios.post(`${process.env.INTRA_URL}/oauth/token`, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;
      this.expiresIn = Date.now() + response.data.expires_in * 1000;
      console.log('Token refreshed succesfully', {
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
        expiresIn: this.expiresIn,
      });
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
    console.log('Redirecting to:', url);
    return { authUrl: url };
  }

  /**
   * Start a timer that triggers a token refresh shortly before the token expires.
   */
  startTokenRefresher() {
    console.log('🕒 Starting token refresher ...');
    // Define a safety buffer (e.g., 1 minute) before actual expiration
    const safetyBuffer = 60 * 1000;
    console.log("safety buffer is:", safetyBuffer);
    console.log("expiresIn is:", this.expiresIn);
    console.log("Date.now() is:", Date.now());



    // Calculate remaining time until token expiration minus the buffer
    const timeoutDuration = Math.max(this.expiresIn - Date.now() - safetyBuffer, 0);
    console.log("timeoutDuration is:", timeoutDuration);


    console.log(`Token will refresh in ${timeoutDuration / 1000} seconds`);

    setTimeout(async () => {
      console.log('⏳ In setTimout ...');
      await this.refreshAuthToken();
      // Restart the timer with the new token's expiration
      this.startTokenRefresher();
    }, timeoutDuration);
  }
}