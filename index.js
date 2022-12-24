const port = process.env.PORT || 3000;
// const pptr = require('puppeteer');
const express = require("express");
const cors = require('cors');
const { run } = require('./src/app');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.set('view engine', 'hbs');

app.get('/:handel', (req, res) => {
    let handel = req.params.handel.trim();
    // run(handel);
    res.render(__dirname + '/src/report', {name: handel});
});

app.post('/:handel', (req, res) => {
    // let handel = req.body.username.trim();
    let handel = req.params.handel.trim();
    run(handel)
    .then((details) => {
        console.log(details);
        // const feedDisplay = document.querySelector('.content');
        // details.forEach(element => {
        //     const title = `<a herf= "google.com"> ${element.name} </a>`;
        //     feedDisplay.insertAdjacentHTML("beforeend", title);
        // })
        res.send(details);
    })
});

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});