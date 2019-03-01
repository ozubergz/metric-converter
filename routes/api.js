/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      console.log(input)
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      var obj = {};
    
      if(!input) {
        console.log('invalid input');
        res.send('invalid input');
      } else {
        initNum == 'invalid number' ? obj.string = 'invalid number' : obj.initNum = initNum;
        initUnit == 'invalid unit' ? obj.string = 'invalid unit' : obj.initUnit = initUnit;
        initUnit == 'invalid number' ? obj.string = 'invalid number' : obj.returnNum = returnNum;
        initUnit == 'invalid unit' ? obj.string = 'invalid unit' : obj.returnUnit = returnUnit;
        toString == 'invalid number and unit' ? obj.string = 'invalid number and unit' : obj.string = toString;
      }
      res.json(obj)
    });
    
};
