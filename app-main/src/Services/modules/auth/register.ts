import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { User } from '../users/fetchOne'

export default (build: EndpointBuilder<any, any, any>) =>
  build.mutation<UserResponse, RegisterRequest>({
    query: credentials => ({
      url: 'v1//auth/register',
      method: 'POST',
      body: credentials,
    }),
  })

export interface UserResponse {
  user: User
  token: string
}

export interface RegisterRequest {
  email: string
  password: string
  username: string
  age: string
}
