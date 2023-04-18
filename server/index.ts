require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const route = require('./router/index')
const errorMiddleware = require('./middleware/error-middleware')

const PORT = process.env.PORT || 5000
const app = express()

const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use('/api', route)
app.use(errorMiddleware)

io.on('connection', (socket) => {
  console.log('New client connected')

  socket.on('select-lesson', (data) => {
    socket.broadcast.emit('receive-lesson', data)
  })

  socket.on('mouse-position', (data) => {
    socket.broadcast.emit('receive-mouse-position', data)
  })

  socket.on('toggle-notebook', (data) => {
    socket.broadcast.emit('receive-toggle-notebook', data)
  })

  socket.on('write-to-notebook', (data) => {
    socket.broadcast.emit('receive-write-to-notebook', data)
  })
})

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
    server.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}

start()
