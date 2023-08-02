const path = require('path');
const express = require('express');
const hbs =require('hbs')
// const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


//Define Path for the Express Config
const app = express();
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views'); // Add this line to specify the views directory
const partialsDirectory= path.join(__dirname,'../templates/partials');


//setupHandlers engine and view Location
app.set('view engine', 'hbs');
app.set('views', viewsDirectory); // Set the views directory
hbs.registerPartials(partialsDirectory)

//Setup Static directory to Serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {  
        title: 'weather',
        name: 'Sonu Singh'
    }); 
});


// it is for fetching weather
app.get('/weather', (req, res) => {
if(!req.query.address){
    return res.send({
error:"You must have to provide address"
    })
}
forecast(req.query.address, (error, weatherData) => {
    if (error) {
      return res.send({ error });
    }

    res.send({
      forecast: weatherData,
      address: req.query.address
    });
  });
});


//for products
app.get('/products',(req,res)=>{
if(!req.query.search){
   return res.send({
        error:"You must have a search term"
    })
}
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/about', (req, res) => {
    res.render('about',{
       title:'About me',
        name:'Sakha'
    });
});


app.get('/help', (req, res) => {
    res.render('help',{
        helpText:'This is Someone Helpful text',
        title:'help',
        name:'Sakha'
    });
});

app.get('*',(req,res) =>{
    res.send("My 404 page")
})


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
