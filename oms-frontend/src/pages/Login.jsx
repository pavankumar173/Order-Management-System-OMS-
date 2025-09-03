import { useState } from 'react'
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material'
import { login } from '../api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [err, setErr] = useState<string | null>(null)
	const { setAuth, notify } = useAuth()

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setErr(null)
		try {
			const { token, userId } = await login(username, password)
			setAuth({ token, userId, username })
			notify('Logged in', 'success')
		} catch (e: any) {
			setErr(e?.response?.data?.message ?? 'Login failed')
		}
	}

	return (
		<Container maxWidth="sm">
			<Box component="form" onSubmit={onSubmit} sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Typography variant="h5">Login</Typography>
				<TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} required />
				<TextField type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} required />
				<Button type="submit" variant="contained">Login</Button>
				{err && <Alert severity="error">{err}</Alert>}
			</Box>
		</Container>
	)
} 