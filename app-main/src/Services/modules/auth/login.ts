import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { User } from '../users/fetchOne'

export default (build: EndpointBuilder<any, any, any>) =>
  build.mutation<UserResponse, LoginRequest>({
    query: credentials => ({
      url: 'v1//auth/login',
      method: 'POST',
      body: credentials,
    }),
  })

export interface UserResponse {
  user: User
  token: string
}

export interface LoginRequest {
  email: string
  password: string
}
