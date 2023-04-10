import $api from '../http'
import { AxiosResponse } from 'axios'
import { AuthResponse } from 'types/response/authResponse'

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { email, password })
  }

  static async registration(
    email: string, password: string, firstName: string, lastName: string, phoneNumber: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', {
      email, password, firstName, lastName, phoneNumber
    })
  }

  static async logout(): Promise<void> {
    return $api.post('/logout')
  }
}
