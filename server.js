const express = require('express');
const hbs = require('hbs');

var app = express();

// app.get('/',
// (req, res) =>
// {
//   //res.send('<h1>Hello Express!</h1>');
//   res.send({
//     name: 'Andrew',
//     likes: [
//       'Biking',
//       'Cities'
//     ]
//   });
//
// });

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
})

app.use((req,res,next) => {
  res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

app.get('/about',
(req, res) =>
{
  //res.send('<h1>About!</h1>');
  res.render('about.hbs', {
    pageTitle: 'About page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/',
(req, res) =>
{
  //res.send('<h1>About!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad',
(req, res) =>
{
  res.send({error: 'unable to handle request'});
});

app.use(express.static(__dirname + '/public'));


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
