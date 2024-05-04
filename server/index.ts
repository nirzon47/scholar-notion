import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { connectDB } from './config/db'

// Connect to MongoDB
connectDB()

// Create Hono app
const app = new Hono().basePath('/api')

// Middlewares
app.use(logger())

// Routes
app.get('/', (c) => {
	return c.text('Hello Hono!')
})

export default app
