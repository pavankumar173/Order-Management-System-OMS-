import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { setAuthToken } from '../api'
import { Snackbar, Alert } from '@mui/material'

// Plain JS auth context
// auth: { token: string, userId: number, username: string } | null
const AuthCtx = createContext(undefined)

export function AuthProvider({ children }) {
	const [auth, setAuth] = useState(() => {
		const saved = localStorage.getItem('auth')
		return saved ? JSON.parse(saved) : null
	})
	const [snack, setSnack] = useState({ open: false, msg: '', severity: 'info' })

	useEffect(() => {
		localStorage.setItem('auth', JSON.stringify(auth))
		setAuthToken(auth?.token ?? null)
	}, [auth])

	const notify = (msg, severity = 'info') => setSnack({ open: true, msg, severity })

	const value = useMemo(() => ({ auth, setAuth, notify }), [auth])

	return (
		<AuthCtx.Provider value={value}>
			{children}
			<Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack(s => ({ ...s, open: false }))}>
				<Alert severity={snack.severity} onClose={() => setSnack(s => ({ ...s, open: false }))}>{snack.msg}</Alert>
			</Snackbar>
		</AuthCtx.Provider>
	)
}

export function useAuth() {
	const ctx = useContext(AuthCtx)
	if (!ctx) throw new Error('useAuth must be used within AuthProvider')
	return ctx
} 