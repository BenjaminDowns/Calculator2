(function() {

    var calculator = {

        isOn: false,

        turnOn: function() {
            calculator.isOn = true
            displayScreen.update()
                // reattach event handler
            $('.button').click(getValue)
        },

        turnOff: function() {
            calculator.isOn = false
            calculator.clear()
            displayScreen.update()
                // detach all event handlers, then reattach for the on/off button        
            $('.button').off()
            $('#onOff').click(calculator.togglePower)
        },

        togglePower: function() {
            calculator.isOn ? calculator.turnOff() : calculator.turnOn()
        },

        clear: function() {
            currentOperand = ""
            currentOperator = ""
            result = ""
            value = ""
        },

        add: function(x, y) {
            return +x + +y
        },

        subtract: function(x, y) {
            return y - x
        },

        divide: function(x, y) {
            y.length ? y = 1 : y
            return y / x
        },

        multiply: function(x, y) {
            y.length ? y = 1 : y
            return x * y
        },

        modulo: function(x, y) {
            return y % x
        }

    }

    var displayScreen = {
        update: function(x) {
            if (!x) {
                calculator.isOn ? x = 0 : x = ''
            }
            if (x.toString().length > 10) {
                x = x.toString().slice(0,9)
            }
            $('#output').text(x)
        }
    }

    var result = ''
    var currentOperand = ''
    var currentOperator = ''
    var value = ''

    function getValue(evt) {
        value = $(evt.target).text().toString()
        if (/[0-9\.]/.test(value)) {

            if (currentOperator == '=') {
                currentOperator = ''
            }
            /// if operand, store it
            currentOperand += value
            return displayScreen.update(currentOperand)


        } else if (value == 'C') {
            calculator.clear()
            return displayScreen.update()

        } else if (value == "on/off") {
            return null;

        } else if (event.target.id == 'sqrt') {
            value = 'sqrt'
            calculate(value)

        } else {

            if (!currentOperator) {
                displayScreen.update(currentOperand)
                currentOperator = value
                result = currentOperand
                currentOperand = ''

            } else {
                calculate(currentOperator)
                currentOperator != value ? currentOperator = value : null
            }
        }
    }

    function next() {
        if (value == '=' || value == 'sqrt') {
            currentOperand = ''
            displayScreen.update(result)
        } else {
            displayScreen.update(result)
            currentOperand = ''
        }
    }

    function calculate(operator) {
        switch (operator) {
            case '/':
                result = calculator.divide(currentOperand, result);
                return next()
            case '+':
                result = calculator.add(currentOperand, result);
                return next()
            case '-':
                result = calculator.subtract(currentOperand, result);
                return next()
            case 'X':
                result = calculator.multiply(currentOperand, result);
                return next()
            case '%':
                result = calculator.modulo(currentOperand, result);
                return next()
            case 'sqrt':
                if (!currentOperand && !result) {
                    return null
                } else if (!result) {
                    result = Math.sqrt(currentOperand)
                    console.log(result)
                    return next()
                } else if (!currentOperand) {
                    result = Math.sqrt(result)
                    console.log(result)
                    return next()
                }
        }
    }

    $('#onOff').click(calculator.togglePower)

})()