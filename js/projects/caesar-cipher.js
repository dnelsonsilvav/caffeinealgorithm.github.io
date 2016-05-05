// Get shift value
function getShift() {
	// Get shift value and convert to int
	var shift = parseInt(document.getElementById('shift').value);

	// Check if the shift value is between 0 and 25
	if (shift < 0 || shift >= 26) {
		// Warning
		alert('Shift value must be between 0 and 25');

		// Return zero
		return 0;
	}

	// Return shift value
	return shift;
}

// Encrypt text
function encrypt () {
	// Get shift value
	var shift = getShift();

	// Get text to encrypt
	var text = document.getElementById('text').value;

	// Check if text is empty or if shift is equal to NaN 
	if (text == '' || isNaN(shift)) {
		// Warning
		alert('Fill all the empty fields');

		// Return zero
		return 0;
	}

	// Execute crypt (textarea - encryption)
	document.getElementById('encryption').innerText = crypt(text, shift);
}

// Decrypt cipher
function decrypt () {
	// Get shift value
	var shift = getShift();

	// Set shift value
	shift = (26 - shift) % 26;

	// Get cipher to decrypt
	var cipher = document.getElementById('cipher').value;

	// Check if cipher is empty or if shift is equal to NaN
	if (cipher == '' || isNaN(shift)) {
		// Warning
		alert('Fill all the empty fields');

		// Return zero
		return 0;
	}

	// Execute crypt (textarea - decryption)
	document.getElementById('decryption').innerText = crypt(cipher, shift);
}

// Crypt text or cipher
function crypt (input, shift) {
	// Initialize output
	var output = '';

	// Loop
	for (var i = 0; i < input.length; i++) {
		// Get char code value
		var code = input.charCodeAt(i);

		// Encrypt or decrypt
		if (code >= 65 && code <= 90) { output += String.fromCharCode((code - 65 + shift) % 26 + 65); }
		else if (code >= 97 && code <= 122) { output += String.fromCharCode((code - 97 + shift) % 26 + 97); }
		else { output += input.charAt(i); }
		// End encrypt or decrypt
	}

	// Return output value
	return output;
}