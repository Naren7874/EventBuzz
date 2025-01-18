import express from 'express'
const app = express();
import 'dotenv/config'
const PORT = process.env.PORT || 3001;

app.get("/" , (req , res) => {
    res.send("Working")
})

app.listen(PORT , () => {
    console.log(`Server started on port ${PORT} `);
    
})