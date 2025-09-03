import { useState } from 'react'
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material'
import { register } from '../api'
import { useAuth } from '../context/AuthContext'

export default function Register() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState<string | null>(null)
	const [err, setErr] = useState<string | null>(null)
	const { notify } = useAuth()

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setMsg(null); setErr(null)
		try {
			await register(username, password)
			setMsg('Registered successfully')
			notify('Registered successfully', 'success')
		} catch (e: any) {
			setErr(e?.response?.data?.message ?? 'Registration failed')
		}
	}

	return (
		<Container maxWidth="sm">
			<Box component="form" onSubmit={onSubmit} sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Typography variant="h5">Register</Typography>
				<TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} required />
				<TextField type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} required />
				<Button type="submit" variant="contained">Register</Button>
				{msg && <Alert severity="success">{msg}</Alert>}
				{err && <Alert severity="error">{err}</Alert>}
			</Box>
		</Container>
	)
} 