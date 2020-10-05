//Validation for norwegian social security numbers
var validateSocialSecurityNumberNo = function($element) {
    console.log('kjørte validering');
	var $validationField = findMyHiddenBrother($element);
	if($element.val().length > 0 && $element.val().length < parseInt($element.attr("maxlength"))) {
		$validationField.val(false);
		var $errorMessage = $element.parent().find(".digiforms_validation_message");
		$errorMessage.text("Må være 11 siffer (DDMMÅÅXXXXX)");
        console.log('ikke nok tegn og sånn');
		if ($("html").attr("lang").toLowerCase() == "se") {
			$errorMessage.text("Måste vara 11 siffror (DDMMÅÅXXXXX)");
		}
		else if ($("html").attr("lang").toLowerCase() == "en") {
			$errorMessage.text("Must be 11 digits (DDMMYYXXXXX)");
		}
	}
	else {
        var $number = removeWhiteSpaces($element.val());
		var valid1 = validationMOD11($number.substring(0, 10), "376189452", true); //1st Kontrollsiffer
		var valid2 = validationMOD11($number, "5432765432", false); //Second control number
		$validationField.val(valid1 && valid2);
        console.log(valid1, valid2);
		if(!(valid1 && valid2) && $element.val().length > 0) {
			var $errorMessage = $element.parent().find(".digiforms_validation_message");
			$errorMessage.text("Ugyldig fødselsnummer");
			if ($("html").attr("lang").toLowerCase() == "se") {
				$errorMessage.text("Ogiltigt personnummer");
			}
			else if ($("html").attr("lang").toLowerCase() == "en") {
				$errorMessage.text("Invalid social security number");
			}
		}
	}
}

function validationMOD11(val, weightNumber, ignoreLength) {
	var number = removeWhiteSpaces(val);

	//1. Sum up all the products of multiplying
	//each digit with the corresponding weight number
	var sum = 0;
	for(var i=0; i < number.length - 1; i++) {
		sum += number.charAt(i) * weightNumber.charAt(i);
	}

	//2. Calculate the reminder using modulo 11
	var reminderMOD11 = sum % 11;

	//3. Calculate control number (norwegian account numbers/social sequrity numbers can't have a reminder of 1)
	var calculatedControllNumber = reminderMOD11 == 0 ? 0 : 11 - reminderMOD11;

	//4. Check if the calculated control number is equal to the one entered by the user
	if (calculatedControllNumber != number[number.length - 1] && (ignoreLength || number.length == 11)) {
		return false;
	}
	else if (ignoreLength || number.length == 11) {
		return true;
	}
	else {
		return false;
	}
}

function findMyHiddenBrother($input) {
	var $validationField = $input.closest(".label_control").parent().parent().find("input[type=hidden]:first");
	return $validationField;
    console.log('found brother');
}

//Removes whitespaces from a given string
function removeWhiteSpaces(str) {
	var subStrings = str.split(" ");
	var newStr = "";
	for(var i=0; i < subStrings.length; i++) {
		newStr += subStrings[i].trim();
	}
	return newStr;
}