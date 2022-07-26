import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default (build: EndpointBuilder<any, any, any>) =>
  build.mutation({
    query: () => ({
      url: 'v1//auth/logout',
      method: 'POST',
    }),
  })
