import { useState } from 'react'
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material'
import { login } from '../api'

export default function Login({ onLogin }: { onLogin: (args: { token: string, username: string }) => void }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [err, setErr] = useState<string | null>(null)

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setErr(null)
		try {
			const token = await login(username, password)
			onLogin({ token, username })
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