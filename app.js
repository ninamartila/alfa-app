const express = require('express');
const router = require('./routers');
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(PORT, () => {
    console.log(`this app running on PORT ${PORT}`);
})