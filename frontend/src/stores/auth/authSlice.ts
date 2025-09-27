import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, User, MacroGoals } from '@/types/authTypes'

// ダミーユーザーのmacroGoalsを定義
const dummyMacroGoals: MacroGoals = {
  protein: 25,
  carbs: 50,
  fat: 25,
}

// ダミーユーザー
const dummyUser: User = {
  id: "dummy-id",
  name: "Test User",
  email: "test@example.com",
  dailyCalorieGoal: 2000,
  macroGoals: dummyMacroGoals,
}

// 初期状態（ダミーユーザーでログイン済みとする）
const initialState: AuthState = {
  user: dummyUser,
  loading: false,
}

// createSlice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ログイン
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    // ログアウト
    logout(state) {
      state.user = null
    },
    // ローディング
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  }
})

// Actionエクスポート
export const { setUser, logout, setLoading } = authSlice.actions

// Reducerエクスポート
export default authSlice.reducer