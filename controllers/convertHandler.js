/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    let units = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    let validFraction = /^([1-9]\d*(\.\d+)?)[/](\d+(\.\d+)?)$/ //regex match fractions
    let validDecimal = /^\d+(\.\d+)?$/ //regex match decimals
    let number = input.split(/([a-zA-z]+$)/); // split letters from numbers
    number = number.filter(Boolean) // remove empty or white space
    let result = number[0];
    
    //if a number is a valid decimal or number,
    //return number
    if(validDecimal.test(result)) {
      result = Number(number[0])
    //if a number is a fraction, split two numbers between
    //division sign and return fraction
    } else if(validFraction.test(result)) {
        let seperate = result.split('/');
        let fraction = Number(seperate[0]) / Number(seperate[1]);
        result = fraction;
    //if first index of split array is one of the units,
    //return number with 1
    } else if(units.includes(result)) {
        result = 1
    } else {
        result = 'invalid number'
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let units = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    let letter = input.split(/([a-zA-z]+$)/); //split letters between numbers
    letter = letter.filter(Boolean); //remove empty or white space
    let inputUnit = letter[letter.length - 1];
    
    //if no units matches units inside array,
    //return invalid unit
    let unit = inputUnit.toLowerCase();
    if(!units.includes(unit)) {
      return 'invalid unit'
    }
    
    return inputUnit;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    let unit = initUnit.toLowerCase();
    switch(unit) {
      case 'gal': result = 'L'; break;
      case 'l': result = 'gal'; break;
      case 'lbs': result = 'kg'; break;
      case 'kg': result = 'lbs'; break;
      case 'mi': result = 'km'; break;
      case 'km': result = 'mi'; break;
      default: result = 'invalid unit';
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let units = unit.toLowerCase();
    let obj = {'gal': 'gallons',
               'l': 'liters',
               'lbs': 'pounds',
               'kg': 'kilograms',
               'mi': 'miles',
               'km': 'kilometers' },
        result;
    
    for(let props in obj) {
      if(props == units) {
        result = obj[props];
      }
    };
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    // const lbsToKg = 0.453592;
    const galToL = 3.78541;
    const lbsToKg = 2.20462;
    const miToKm = 1.60934;
    let num = initNum;
    
    // if(num === 'invalid number') {num = 'invalid number'}
    
    switch(initUnit) {
      case 'gal': num = num * galToL; break;
      case 'l': num = num / galToL; break;
      case 'lbs': num = num / lbsToKg; break;
      case 'kg': num = num * lbsToKg; break;
      case 'mi': num = num * miToKm; break;
      case 'km': num = num / miToKm; break;
      // default: num = 'invalid number';
    }
    
    return num;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const validDecimal = /^(\d+\.\d+)$/;    
    let roundNum;
    let result;
    
    //if returnNum is a decimal, and if the decimal number's length
    // is longer than 6, round the number to 5 decimals
    if(validDecimal.test(returnNum)) { 
      let seperate = returnNum.toString().split('.');
      if(seperate[1] > 5) {
        roundNum = parseFloat(returnNum).toFixed(5);
      }
    }
    
    if(returnNum == 'invalid number' && returnUnit == 'invalid unit') {
      result = 'invalid number and unit'
    } else if(returnNum == 'invalid number') {
      result = 'invalid number';
    } else if(returnUnit == 'invalid unit') {
      result = 'invalid unit';
    } else {
      result = initNum + ' ' + this.spellOutUnit(initUnit)
               + ' converts to ' + roundNum + ' '
               + this.spellOutUnit(returnUnit);
    }
    
    return result;
  };
  
}

module.exports = ConvertHandler;
