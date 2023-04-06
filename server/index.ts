require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const route = require('./router/index')
const errorMiddleware = require('./middleware/error-middleware')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL
}))
app.use('/api', route)
app.use(errorMiddleware)

const start = async () => {
	try {
		mongoose.set('strictQuery', false)
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}, (error: Error) => {
			if (error) {
				console.log(error)
			} else {
				console.log('Database connected')
			}
		})
		app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
	} catch (err) {
		console.log(err)
	}
}

start()
