import { useEffect, useState } from 'react'
import { Container, Typography, List, ListItem, ListItemText, Alert } from '@mui/material'
import { getOrders } from '../api'

export default function Dashboard({ userId }: { userId: number }) {
	const [orders, setOrders] = useState<any[]>([])
	const [err, setErr] = useState<string | null>(null)

	useEffect(() => {
		(async () => {
			try {
				const data = await getOrders(userId)
				setOrders(data)
			} catch (e: any) {
				setErr(e?.response?.data?.message ?? 'Failed to load orders')
			}
		})()
	}, [userId])

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