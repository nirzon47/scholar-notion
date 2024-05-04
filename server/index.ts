import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { connectDB } from './config/db'
import userRoutes from './routers/user.route'

// Connect to MongoDB
connectDB()

// Create Hono app
const app = new Hono().basePath('/api')

// Middlewares
app.use(logger())

// Exception handler
app.onError((err, c) =>
	c.json(
		{
			success: false,
			message: err.message || 'Internal Server Error',
		},
		500
	)
)
app.notFound((c) => c.json({ success: false, message: 'Not Found' }, 404))

// Routes
app.route('/user', userRoutes)

export default app
