# testssn (js)
validate-ssn validates the format of both Norwegian and Swedish social security numbers using MOD11 and MOD10 algorithms respectively. 
They check if the date input is valid and that the control-numbers sum is correct.

# How to use
**1. Create your SSN input field and add events.**

Swedish ssn:
* Button | onChange | RUN clientside javascript | testSwedFnr($(this));
* Button | onBlur | RUN clientside javascript | testSwedFnr($(this));

Norwegian ssn:
* Button | onChange | RUN clientside javascript | validateSocialSecurityNumberNo($(this));
* Button | onBlur | RUN clientside javascript | validateSocialSecurityNumberNo($(this));

**2. Add hidden input-field 'valid-ssn'**
* Create input field. Remove label and set to hidden.
* Set expression value to 'false' and update value to render. 
* 'Use only when field is empty' toggled on.

**3. Add validation to SSN input**
* Validation schematron ASSERT | valid-ssn = 'true'

**NOTE:** Hidden input and name in validation expression must be the same. 

# How does it work
**Norwegian ssn script**: 
1. Event sends the input element to the function validateSocialSecurityNumberNo
2. Function checks input length matches that of the input field maxlength
3. If valid checks the control numbers
4. Runs a MOD11 algorithm on the last ssn-number https://no.wikipedia.org/wiki/MOD11
5. Returns true or false to the hidden input field

**Swedish ssn script**: 
1. Takes following formats:
* ååmmddxxxx 
* ååmmdd-xxxx
* ååååmmddxxxx
* ååååmmdd-xxxx
2. Checks input length
3. Validates control-numbers checksum using MOD10 algorithm https://no.wikipedia.org/wiki/MOD10
4. Returns true or false to hidden input field

# testssn (jsp)
You can also install testssn on the server and connect it to a Digiforms template using a datasource.
