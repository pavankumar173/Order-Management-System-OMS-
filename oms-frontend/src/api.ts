import axios from 'axios'

export const api = axios.create({
	baseURL: '/api'
})

export async function register(username: string, password: string) {
	const res = await api.post('/auth/register', { username, password })
	return res.data
}

export async function login(username: string, password: string): Promise<string> {
	const res = await api.post('/auth/login', { username, password })
	return res.data.token
}

export async function createOrder(params: { userId: number, productName: string, quantity: number, price: number }) {
	const res = await api.post('/orders', params)
	return res.data
}

export async function getOrders(userId: number) {
	const res = await api.get(`/orders/user/${userId}`)
	return res.data
} 