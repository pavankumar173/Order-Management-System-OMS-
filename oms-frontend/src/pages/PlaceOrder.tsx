import { useState } from 'react'
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material'
import { createOrder } from '../api'
import { useAuth } from '../context/AuthContext'

export default function PlaceOrder() {
	const [productName, setProductName] = useState('')
	const [quantity, setQuantity] = useState<number>(1)
	const [price, setPrice] = useState<number>(0)
	const [msg, setMsg] = useState<string | null>(null)
	const [err, setErr] = useState<string | null>(null)
	const { auth, notify } = useAuth()

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!auth?.userId) return
		setMsg(null); setErr(null)
		try {
			await createOrder({ userId: auth.userId, productName, quantity, price })
			setMsg('Order placed successfully')
			notify('Order placed successfully', 'success')
		} catch (e: any) {
			setErr(e?.response?.data?.message ?? 'Failed to place order')
		}
	}

	return (
		<Container maxWidth="sm">
			<Box component="form" onSubmit={onSubmit} sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Typography variant="h5">Place Order</Typography>
				<TextField label="Product" value={productName} onChange={e => setProductName(e.target.value)} required />
				<TextField type="number" label="Quantity" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} required />
				<TextField type="number" label="Price" value={price} onChange={e => setPrice(parseFloat(e.target.value))} required />
				<Button type="submit" variant="contained">Place Order</Button>
				{msg && <Alert severity="success">{msg}</Alert>}
				{err && <Alert severity="error">{err}</Alert>}
			</Box>
		</Container>
	)
} 