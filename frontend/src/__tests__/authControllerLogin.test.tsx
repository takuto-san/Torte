import React from 'react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuthControllerLogin } from '@/api/auth/auth' // 必要に応じてパス修正

const server = setupServer(
 http.post('http://localhost:8080/auth/login', async ({ request }) => {
   // 必要ならリクエストボディを await request.json() で取得
   return HttpResponse.json({ success: true }, { status: 200 })
 })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function wrapper({ children }: { children: React.ReactNode }) {
 const client = new QueryClient()
 return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

describe('useAuthControllerLogin', () => {
 it('mutation success', async () => {
   const { result } = renderHook(() => useAuthControllerLogin(), { wrapper })
   await act(async () => {
     result.current.mutate()
   })
   await waitFor(() => {
     expect(result.current.isSuccess).toBe(true)
     expect(result.current.data).toEqual({ success: true })
   })
 })
})
