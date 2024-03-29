import { User } from 'types/user'
import { makeAutoObservable } from 'mobx'
import AuthService from 'services/AuthService'
import axios from 'axios'
import { AuthResponse } from 'types/response/authResponse'
import { API_URL } from '../http'

export default class Store {
  user = {} as User
  isAuth = false
  isLoading = false
  isFullWidthPage = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: User) {
    this.user = user
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  setIsFullWidthPage(bool: boolean) {
    this.isFullWidthPage = bool
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (err) {
      console.log(err.response?.data?.message)
    }
  }

  async registration(email: string, password: string, firstName: string, lastName: string, phoneNumber: string) {
    try {
      const response = await AuthService.registration(email, password, firstName, lastName, phoneNumber)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (err) {
      console.log(err.response?.data?.message)
    }
  }

  async logout() {
    try {
      await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as User)
    } catch (err) {
      console.log(err.response?.data?.message)
    }
  }

  async checkAuth() {
    this.setLoading(true)
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (err) {
      console.log(err.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
}