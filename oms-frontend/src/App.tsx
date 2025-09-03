import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { AppBar, Toolbar, Button, Container } from '@mui/material'
import Register from './pages/Register'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Dashboard from './pages/Dashboard'

export default function App() {
	const [auth, setAuth] = useState<{ token: string, username: string } | null>(null)
	const [userId, setUserId] = useState<number | null>(null)

	return (
		<BrowserRouter>
			<AppBar position="static">
				<Toolbar>
					<Button color="inherit" component={Link} to="/">Home</Button>
					<Button color="inherit" component={Link} to="/register">Register</Button>
					<Button color="inherit" component={Link} to="/login">Login</Button>
					{auth && <Button color="inherit" component={Link} to="/place-order">Place Order</Button>}
					{auth && <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>}
				</Toolbar>
			</AppBar>
			<Container sx={{ mt: 3 }}>
				<Routes>
					<Route path="/" element={<div>Welcome to OMS</div>} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login onLogin={({ token, username }) => { setAuth({ token, username }); /* demo: assume userId==1 */ setUserId(1) }} />} />
					<Route path="/place-order" element={auth && userId ? <PlaceOrder userId={userId} /> : <Navigate to="/login" replace />} />
					<Route path="/dashboard" element={auth && userId ? <Dashboard userId={userId} /> : <Navigate to="/login" replace />} />
				</Routes>
			</Container>
		</BrowserRouter>
	)
}
