const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const ip = require("ip");
const expressHbs = require('express-handlebars');
var Handlebars = require('handlebars');

console.log(ip.address());

Handlebars.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1;
});

app.engine(
  'hbs',
  expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs'
  }),
  'handlebars', expressHbs({
    helpers: {
      // Function to do basic mathematical operation in handlebar
      math: function (lvalue, operator, rvalue) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
          "+": lvalue + rvalue,
          "-": lvalue - rvalue,
          "*": lvalue * rvalue,
          "/": lvalue / rvalue,
          "%": lvalue % rvalue
        }[operator];
      }
    }
  })
);
app.set('view engine', 'hbs');
app.set('views', 'views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

let gameRoutes = require('./routes/myRoutes');

app.use(express.static(path.join(__dirname, 'public')));


app.use(gameRoutes);

app.listen(process.env.PORT || 1337, () => console.log('Server ready'))



