import express from 'express'
const app = express();
import 'dotenv/config'
import {connectRedis} from './utils/redis.js'
const PORT = process.env.PORT || 3001;

//routes
import  authRouter from './routes/authRoute.js'

app.use(express.json());

connectRedis().then(() => {
    console.log('Redis Connected!');
})

app.use('/auth', authRouter);
app.get("/" , (req , res) => {
    res.send("Working")
})

app.listen(PORT , () => {
    console.log(`Server started on port ${PORT} `);

})
