import axios from 'axios'

export const api = axios.create({
	baseURL: '/api'
})

export function setAuthToken(token: string | null) {
	if (token) {
		api.defaults.headers.common['Authorization'] = `Bearer ${token}`
	} else {
		delete api.defaults.headers.common['Authorization']
	}
}

export async function register(username: string, password: string) {
	const res = await api.post('/auth/register', { username, password })
	return res.data
}

export async function login(username: string, password: string): Promise<{ token: string, userId: number }> {
	const res = await api.post('/auth/login', { username, password })
	return res.data
}

export async function createOrder(params: { userId: number, productName: string, quantity: number, price: number }) {
	const res = await api.post('/orders', params)
	return res.data
}

export async function getOrders(userId: number) {
	const res = await api.get(`/orders/user/${userId}`)
	return res.data
} 