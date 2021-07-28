const express = require('express');
const session = require('express-session');
const router = require('./routers');
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    resave: false
}))
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(PORT, () => {
    console.log(`this app running on PORT ${PORT}`);
})