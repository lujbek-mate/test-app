import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/Services/modules/users/fetchOne'

const slice = createSlice({
  name: 'auth',
  initialState: { token: null, user: null } as AuthState,
  reducers: {
    setCredentials: (
      state: any,
      {
        payload: { user, token },
      }: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = user
      state.token = token
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export type AuthState = {
  user: null
  token: string | null
}
