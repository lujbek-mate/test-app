import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<User, string>({
    query: id => `v1/users/${id}`,
  })

export type User = {
  id: number
  username: string
  email: string
  role: string
  age: string
  name: string
  thumbnail: string
  address: {
    street: string
    city: string
    state: string
  }
  bio: string
  photos: string[]
}
