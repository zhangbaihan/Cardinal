import { Auth } from 'aws-amplify';

export interface AuthCredentials {
  username: string;
  password: string;
  email?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: any;
}

/**
 * Authentication service for user management
 */
export const authService = {
  /**
   * Sign up a new user
   * @param credentials User registration credentials
   */
  async signUp(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const { username, password, email } = credentials;
      
      const result = await Auth.signUp({
        username,
        password,
        attributes: { email }
      });
      
      return {
        success: true,
        message: 'User registered successfully',
        user: result.user
      };
    } catch (error) {
      console.error('Error signing up:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred during signup'
      };
    }
  },
  
  /**
   * Sign in an existing user
   * @param credentials User login credentials
   */
  async signIn(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const { username, password } = credentials;
      
      const user = await Auth.signIn(username, password);
      
      return {
        success: true,
        message: 'User signed in successfully',
        user
      };
    } catch (error) {
      console.error('Error signing in:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred during signin'
      };
    }
  },
  
  /**
   * Sign out the current user
   */
  async signOut(): Promise<AuthResponse> {
    try {
      await Auth.signOut();
      
      return {
        success: true,
        message: 'User signed out successfully'
      };
    } catch (error) {
      console.error('Error signing out:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred during signout'
      };
    }
  },
  
  /**
   * Get the current authenticated user
   */
  async getCurrentUser(): Promise<any> {
    try {
      return await Auth.currentAuthenticatedUser();
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },
  
  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      await Auth.currentAuthenticatedUser();
      return true;
    } catch {
      return false;
    }
  }
}; 