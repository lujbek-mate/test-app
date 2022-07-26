import { api } from '@/Services/api'
import login from './login'
import register from './register'
import logout from './logout'

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    logout: logout(build),
    login: login(build),
    register: register(build),
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  userApi
