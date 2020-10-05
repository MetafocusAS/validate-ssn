//Validation for swedish social security numbers
//Takes following formats
//ååmmddxxxx 
//ååmmdd-xxxx
//ååååmmddxxxx
//ååååmmdd-xxxx
//Also validates checksum for control-numbers

function findMyHiddenBrother($input) {
	var $validationField = $input.closest(".label_control").parent().parent().find("input[type=hidden]:first");
	return $validationField;
    console.log('ser etter skjult felt');
}

var testSwedFnr = 
            function($element) {
            var $number = removeWhiteSpaces($element.val().toString());
            console.log('kjører svensk validering', $number);
                
            // Check valid length & form
            var $validationField = findMyHiddenBrother($element);
            if (!$element.val()) { $validationField.val(false); console.log('feltet er tomt'); }

            if ($element.val().indexOf('-') === -1) {
                if ($element.val().length === 10) {
                    input = $element.val().slice(0, 6) + "-" + $element.val().slice(6);
                } else {
                    input = $element.val().slice(0, 8) + "-" + $element.val().slice(8);
                }  
            }
            if (!$element.val().match(/^(\d{2})(\d{2})(\d{2})\-(\d{4})|(\d{4})(\d{2})(\d{2})\-(\d{4})$/)) { $validationField.val(false); console.log('kunne ikke matche regex'); };

            // Clean input
            input = $element.val().replace('-', '');
            if ($element.val().length === 12) {
                input = $element.val().substring(2);
            }

            // Declare variables
            var d = new Date(((!!RegExp.$1) ? RegExp.$1 : RegExp.$5), (((!!RegExp.$2) ? RegExp.$2 : RegExp.$6)-1), ((!!RegExp.$3) ? RegExp.$3 : RegExp.$7)),
                    sum = 0,
                    numdigits = input.length,
                    parity = numdigits % 2,
                    i,
                    digit;

            // Check valid date
            if (Object.prototype.toString.call(d) !== "[object Date]" || isNaN(d.getTime())) $validationField.val(false);

            // Check luhn algorithm
            for (i = 0; i < numdigits; i = i + 1) {
                digit = parseInt(input.charAt(i), 10);
                if (i % 2 === parity) { digit *= 2; }
                if (digit > 9) { digit -= 9; }
                sum += digit;
            }
            return $validationField.val((sum % 10) === 0);
                console.log('returnerer modulus');
        }

//Removes whitespaces from a given string
function removeWhiteSpaces(str) {
	var subStrings = str.replace(/[- ]/g, ""); 
	return subStrings; 
}
