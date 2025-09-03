import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { AppBar, Toolbar, Button, Container } from '@mui/material'
import Register from './pages/Register'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Dashboard from './pages/Dashboard'
import { useAuth } from './context/AuthContext'

function AppInner() {
	const { auth, setAuth } = useAuth()
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Button color="inherit" component={Link} to="/">Home</Button>
					<Button color="inherit" component={Link} to="/register">Register</Button>
					{!auth && <Button color="inherit" component={Link} to="/login">Login</Button>}
					{auth && <Button color="inherit" component={Link} to="/place-order">Place Order</Button>}
					{auth && <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>}
					{auth && <Button color="inherit" onClick={() => setAuth(null)}>Logout</Button>}
				</Toolbar>
			</AppBar>
			<Container sx={{ mt: 3 }}>
				<Routes>
					<Route path="/" element={<div>Welcome to OMS</div>} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={!auth ? <Login /> : <Navigate to="/dashboard" replace />} />
					<Route path="/place-order" element={auth ? <PlaceOrder /> : <Navigate to="/login" replace />} />
					<Route path="/dashboard" element={auth ? <Dashboard /> : <Navigate to="/login" replace />} />
				</Routes>
			</Container>
		</>
	)
}

export default function App() {
	return (
		<BrowserRouter>
			<AppInner />
		</BrowserRouter>
	)
}
