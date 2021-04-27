var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// create cipher alphabet
function getCipherAlphabet(input, keyword, keyletter, cipherAlphabet) {
	var keywordArray = []; 
	
	// put each letter of keyword into an array, no repeating letters
	for ( i = 0; i < keyword.length; i++) {
		if (keywordArray.includes(keyword.charAt(i))) { // do not add letter if it already appears in keyword array
			continue;
		}
		else {
			keywordArray.push(keyword.charAt(i));
		}
	}
	
	// determine whether keyword will need to wrap around
	if (keywordArray.length > (27 - keyletter)) { // add partial keyword to end of cipher alphabet
		for (i = 0; i < (27 - keyletter); i++) {
			cipherAlphabet.push(keywordArray[i]);
		}
		
		// fill in alphabet before keyword, starting at "z" and moving backward through the alphabet
		for (i = alphabet.length - 1; i >= 0; i--) {
			if (keywordArray.includes(alphabet[i])) { // do not add letter if it appears in the keyword array
				continue;
			}
			else {
				cipherAlphabet.unshift(alphabet[i]);
			}
		}
		
		// fill in remaining letters of keyword at beginning of cipher alphabet
		for (i = (keywordArray.length - 1); i >= (27 - keyletter); i--) {
			cipherAlphabet.unshift(keywordArray[i]);
		}
	}
	
	// else if keyword does not need to wrap around
	else {
	// add updated keyword (no repeated letters) to cipher alphabet
	for (i = 0; i < keywordArray.length; i++) {
			cipherAlphabet.push(keywordArray[i]);
	}
	
	// fill in alphabet before keyword, starting at "z" and moving backward through alphabet
	for (i = 25; cipherAlphabet.length < (keyletter + keywordArray.length - 1); i--) {
		if (cipherAlphabet.includes(alphabet[i])) {
			continue;
		}
		else {
			cipherAlphabet.unshift(alphabet[i]);
		}
	}
	
	// fill in alphabet after keyword, starting at "a" and moving forward through alphabet
	for (i = 0; cipherAlphabet.length <= 26; i++) {
		if (cipherAlphabet.includes(alphabet[i])) {
			continue;
		}
		else {
			cipherAlphabet.push(alphabet[i]);
		}
	}
	
	return(cipherAlphabet);
	}
}

// encipher plaintext
function doEncipher() {
	var input = document.getElementById("input").value; // get plaintext message from user input
	var keyword = document.getElementById("keyword").value; // get keyword from user input
	var keyletter = document.getElementById("keyletter").value; // get key letter from user input
	var cipherAlphabet = [];
	var encipheredOutput = "";
	
	// make all characters lowercase for input and keyword
	input = input.toLowerCase();
	
	keyword = keyword.toLowerCase();
	
	// locate key letter in alphabet
	keyletter = keyletter.toLowerCase().charCodeAt() - 96;
	
	// get cipher alphabet
	getCipherAlphabet(input, keyword, keyletter, cipherAlphabet);
	
	// remove spaces from input
	input = input.replace(/ /g, "");
	
	// replace each letter in plaintext with ciphertext
	for (i = 0; i < input.length; i++) {
		// add space after every fifth character
		if (i%5 == 0) {
				encipheredOutput += " ";
		}
		
		// ignore punctuation
		if (input.charCodeAt(i) < 97 || input.charCodeAt(i) > 122) {
			continue;
		}
		
		encipheredOutput += cipherAlphabet[input.charCodeAt(i) - 97];
	}
	
	// print alphabet and cipher alphabet
	document.getElementsByName("plaintext")[0].value = alphabet.join(" ");
	document.getElementsByName("ciphertext")[0].value = cipherAlphabet.join(" ");
		
	// output enciphered text
	document.getElementsByName("output")[0].value = encipheredOutput;
}


// decipher ciphertext
function doDecipher() {
	var input = document.getElementById("input").value; // get ciphertext message from user input
	var keyword = document.getElementById("keyword").value; // get keyword from user input
	var keyletter = document.getElementById("keyletter").value; // get key letter from user input
	var cipherAlphabet = [];
	var decipheredOutput = "";
	
	// make all characters lowercase for input and keyword
	input = input.toLowerCase();
	
	keyword = keyword.toLowerCase();
	
	// locate key letter in alphabet
	keyletter = keyletter.toLowerCase().charCodeAt() - 96;
	
	// get cipher alphabet
	getCipherAlphabet(input, keyword, keyletter, cipherAlphabet);
	
	// remove spaces from input
	input = input.replace(/ /g, "");
	
	// replace each letter in ciphertext with plaintext
	for (i = 0; i < input.length; i++) {
		// add space after every fifth character
		if (i%5 == 0) {
				decipheredOutput += " ";
		}
		
		// ignore punctuation
		if (input.charCodeAt(i) < 97 || input.charCodeAt(i) > 122) {
			continue;
		}
		
		decipheredOutput += alphabet[cipherAlphabet.indexOf(input.charAt(i))];
	}

	// print alphabet and cipher alphabet
	document.getElementsByName("plaintext")[0].value = alphabet.join(" ");
	document.getElementsByName("ciphertext")[0].value = cipherAlphabet.join(" ");

	// output deciphered text
	document.getElementsByName("output")[0].value = decipheredOutput;
}

// replace letters from input with ciphertext alphabet (for cryptanalysis)
function doSwitch(id) {
	var input = document.getElementById("cryptinput").value;
	var letter = id; // letter in alphabet (will be replaced by letter from user input)
	var newLetter = document.getElementById(id).value; // user input letter
	var decipheredText = document.getElementById("cryptoutput").value;
	var decTextArray = [];
		
	// make all characters lowercase for input and newLetter
	input = input.toLowerCase();

	newLetter = newLetter.toLowerCase();
		
	// create array for output
	for (i = 0; i < decipheredText.length; i++) {
		decTextArray.push(decipheredText.charAt(i));
	}
	
	// find letters in input and replace with ciphertext letter
	for (i = 0; i < input.length; i++) {
		if (input.charAt(i) == letter) {
			if (newLetter.length == 0) {
				decTextArray[i] = "*";
			}
			else {
				decTextArray[i] = newLetter;
			}
		}
	}
	
	// output asterisks in place of input
	document.getElementsByName("cryptoutput")[0].value = decTextArray.join("");
}

// replace input with asterisks in output box (for cryptanalysis)
function doCipherTextBox(id) {
	var input = document.getElementById("cryptinput").value;
	var asterisks = [];

	input = input.toLowerCase();

	for (i = 0; i < input.length; i++) {
		if (input.charAt(i) == " ") {
			asterisks.push(" ");
		}
		else if (input.charAt(i) == "\n") {
			asterisks.push("\n");
		}
		else if (input.charCodeAt(i) < 97 || input.charCodeAt(i) > 122) {
			continue;
		}
		else {
			asterisks.push("*");
		}
	}
	
	// output asterisks in place of input
	document.getElementsByName("cryptoutput")[0].value = asterisks.join("");
}

