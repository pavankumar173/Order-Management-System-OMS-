import { useEffect, useState } from 'react'
import { Container, Typography, List, ListItem, ListItemText, Alert } from '@mui/material'
import { getOrders } from '../api'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
	const [orders, setOrders] = useState<any[]>([])
	const [err, setErr] = useState<string | null>(null)
	const { auth } = useAuth()

	useEffect(() => {
		(async () => {
			if (!auth?.userId) return
			try {
				const data = await getOrders(auth.userId)
				setOrders(data)
			} catch (e: any) {
				setErr(e?.response?.data?.message ?? 'Failed to load orders')
			}
		})()
	}, [auth?.userId])

	return (
		<Container maxWidth="sm" sx={{ mt: 4 }}>
			<Typography variant="h5" sx={{ mb: 2 }}>Order History</Typography>
			{err && <Alert severity="error">{err}</Alert>}
			<List>
				{orders.map((o) => (
					<ListItem key={o.id} divider>
						<ListItemText primary={`${o.productName} x${o.quantity} @ ${o.price}`} secondary={new Date(o.createdAt).toLocaleString()} />
					</ListItem>
				))}
			</List>
		</Container>
	)
} 