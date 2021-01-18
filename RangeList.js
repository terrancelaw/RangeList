class RangeList {
	constructor() {
		this.data = []; // a list of ranges
	}
	add(input) {
		let inputIsValid = this.checkIfInputIsValid(input);
		let data = this.data;
		let result = null;
		let inputLowerBound = null;
		let inputUpperBound = null;

		if (!inputIsValid)
			return;

		if (data.length == 0) {
			data.push(input); return;
		}

		result = [];
		[ inputLowerBound, inputUpperBound ] = input;

		for (let i = 0; i < data.length; i++) {
			let currRange = data[i];
			let [ dataLowerBound, dataUpperBound ] = currRange;

			// input is inside the current range
			if (inputLowerBound >= dataLowerBound && 
				inputUpperBound <= dataUpperBound) {
				result.push(currRange);
			}
			// input overlaps with left of current range
			else if (inputLowerBound < dataLowerBound && 
					 inputUpperBound > dataLowerBound &&
					 inputUpperBound <= dataUpperBound) {
				currRange[0] = inputLowerBound;
				result.push(currRange);
			}
			// input overlaps with right of current range
			else if (inputLowerBound >= dataLowerBound &&
					 inputLowerBound < dataUpperBound &&
					 inputUpperBound > dataUpperBound) {
				currRange[1] = inputUpperBound;
				result.push(currRange);
			}
			// input "wraps" the current range
			else if (inputLowerBound < dataLowerBound &&
					 inputUpperBound > dataUpperBound) {
				currRange[0] = inputLowerBound;
				currRange[1] = inputUpperBound;
				result.push(currRange);
			}
			// input not overlapp with current range and input is smaller
			else if (inputUpperBound <= dataLowerBound) {
				result.push(input);
				result.push(currRange);
			}
			// input not overlapp with current range and input is bigger
			else if (inputLowerBound >= dataUpperBound) {
				result.push(currRange);
				result.push(input);
			}
		}

		this.data = result;
	}
	remove(input) {
		let inputIsValid = this.checkIfInputIsValid(input);
		let data = this.data;
		let result = null;
		let inputLowerBound = null;
		let inputUpperBound = null;

		if (!inputIsValid)
			return;

		result = [];
		[ inputLowerBound, inputUpperBound ] = input;

		for (let i = 0; i < data.length; i++) {
			let currRange = data[i];
			let [ dataLowerBound, dataUpperBound ] = currRange;

			// input is strictly inside the current range -> split range
			if (inputLowerBound > dataLowerBound &&
				inputUpperBound < dataUpperBound) {
				result.push([ dataLowerBound, inputLowerBound ]);
				result.push([ inputUpperBound + 1, dataUpperBound ]);
			}
			// input overlaps with left of current range -> remove left of range
			else if (inputLowerBound <= dataLowerBound &&
					 inputUpperBound > dataLowerBound &&
					 inputUpperBound < dataUpperBound) {
				currRange[1] = inputLowerBound;
				result.push(currRange);
			}
			// input overlaps with right of current range -> remove right of range
			else if (inputLowerBound > dataLowerBound &&
					 inputLowerBound < dataLowerBound &&
					 inputUpperBound > dataUpperBound) {
				currRange[0] = inputUpperBound;
				result.push(currRange);
			}
			// no need to change range
			else {
				result.push(currRange);
			}
		}

		this.data = result;
	}
	print() {
		let data = this.data;
		let outputString = '';

		for (let i = 0; i < data.length; i++) {
			let currRange = data[i];
			let [ dataLowerBound, dataUpperBound ] = currRange;

			outputString += (i != data.length - 1) // add a space if not last element
						  ? `[${ dataLowerBound }, ${ dataUpperBound }) `
						  : `[${ dataLowerBound }, ${ dataUpperBound })`;
		}

		console.log(outputString);
	}

	// helpers

	checkIfInputIsValid(input) {
		let [ inputLowerBound, inputUpperBound ] = input;
		let isInputArray = Array.isArray(input);
		let isLengthValid = isInputArray && input.length == 2;
		let isInputInteger = isLengthValid && 
							 Number.isInteger(inputLowerBound) &&
							 Number.isInteger(inputUpperBound);
		let isSecondGreaterThanFirst = isLengthValid && 
									   inputUpperBound > inputLowerBound;

		if (!isInputArray) {
			console.log('Input is not an array.');
			return false;
		}
		else if (!isLengthValid) {
			console.log('Input array should contain two integers.');
			return false;
		}
		else if (!isInputInteger) {
			console.log('Input array should contain integers only.');
			return false;
		}
		else if (!isSecondGreaterThanFirst) {
			console.log('The second element should be larger than the first element.');
			return false;
		}
		else return true;
	}
}

module.exports = RangeList;