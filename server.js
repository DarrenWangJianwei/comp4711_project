const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const ip = require("ip");
const expressHbs = require('express-handlebars');
var Handlebars = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');

console.log ( ip.address() );
HandlebarsIntl.registerWith(Handlebars);
Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});
Handlebars.registerHelper("replys", function(array, post_id)
{
    let replys = 0;
    for(let i=0;i<array.length;i++){
        if(array[i].post_id == post_id){
            replys++;
        }
    }
    return replys;
});

Handlebars.registerHelper('xIf', function (lvalue, operator, rvalue, options) {

  var operators, result;

  if (arguments.length < 3) {
      throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  }

  if (options === undefined) {
      options = rvalue;
      rvalue = operator;
      operator = "===";
  }

  operators = {
      '==': function (l, r) { return l == r; },
      '===': function (l, r) { return l === r; },
      '!=': function (l, r) { return l != r; },
      '!==': function (l, r) { return l !== r; },
      '<': function (l, r) { return l < r; },
      '>': function (l, r) { return l > r; },
      '<=': function (l, r) { return l <= r; },
      '>=': function (l, r) { return l >= r; },
      'typeof': function (l, r) { return typeof l == r; }
  };

  if (!operators[operator]) {
      throw new Error("'xIf' doesn't know the operator " + operator);
  }

  result = operators[operator](lvalue, rvalue);

  if (result) {
      return options.fn(this);
  } else {
      return options.inverse(this);
  }
});

app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    }),
    'handlebars', expressHbs({
      helpers:{
        // Function to do basic mathematical operation in handlebar
        math: function(lvalue, operator, rvalue) {lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);
            return {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            }[operator];
        }
    }})
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

let gameRoutes = require('./routes/myRoutes');

app.use(express.static(path.join(__dirname,'public')));


app.use(gameRoutes);

app.listen(process.env.PORT||1337, () => console.log('Server ready'))



