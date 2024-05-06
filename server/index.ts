import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

import { connectDB } from './config/db'
import userRoutes from './routers/user.route'
import profileRoutes from './routers/profile.route'

// Connect to MongoDB
connectDB()

// Create Hono app
const app = new Hono().basePath('/api')

// Middlewares
app.use('/api/*', cors())
app.use(logger())

// Exception handler
app.onError((err, c) =>
	c.json(
		{
			ok: false,
			message: err.message || 'Internal Server Error',
		},
		500
	)
)
app.notFound((c) => c.json({ ok: false, message: 'Not Found' }, 404))

// Routes
app.route('/user', userRoutes)
app.route('/user/profile', profileRoutes)

export default app
