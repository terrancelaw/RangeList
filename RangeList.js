class RangeList {
	constructor() {
		this.data = []; // a list of ranges
	}
	add(input) {
		let inputIsValid = this.checkIfInputIsValid(input);
		let data = this.data;
		let inputLowerBound = null;
		let inputUpperBound = null;
		let removeStartIndex = null; // remove all ranges that overlap with input
		let removeEndIndex = null; // remove all ranges that overlap with input
		let insertIndex = 0; // index to insert input

		if (!inputIsValid)
			return;

		if (data.length == 0) {
			data.push(input); return;
		}

		[ inputLowerBound, inputUpperBound ] = input;

		for (let i = 0; i < data.length; i++) {
			let currRange = data[i];
			let [ dataLowerBound, dataUpperBound ] = currRange;

			// input not overlap with curr but input is bigger -> insert after curr range
			if (inputLowerBound > dataUpperBound) {
				insertIndex = i + 1;
			}
			// input is strictly inside the current range -> expand input from both sides
			else if (inputLowerBound > dataLowerBound && 
				inputUpperBound < dataUpperBound) {
				input[0] = dataLowerBound;
				input[1] = dataUpperBound;
				if (!removeStartIndex) removeStartIndex = removeEndIndex = i;
				else removeEndIndex = i;
			}
			// input overlaps with left of current range -> expand right of input
			else if (inputLowerBound <= dataLowerBound && 
					 inputUpperBound >= dataLowerBound &&
					 inputUpperBound < dataUpperBound) {
				input[1] = dataUpperBound;
				if (!removeStartIndex) removeStartIndex = removeEndIndex = i;
				else removeEndIndex = i;
			}
			// input overlaps with right of current range -> expand left of input
			else if (inputLowerBound > dataLowerBound &&
					 inputLowerBound <= dataUpperBound &&
					 inputUpperBound >= dataUpperBound) {
				input[0] = dataLowerBound;
				if (!removeStartIndex) removeStartIndex = removeEndIndex = i;
				else removeEndIndex = i;
			}
			// input "wraps" the current range -> no change to input
			else if (inputLowerBound <= dataLowerBound &&
					 inputUpperBound >= dataUpperBound) {
				if (!removeStartIndex) removeStartIndex = removeEndIndex = i;
				else removeEndIndex = i;
			}
		}

		// remove overlapped elements
		if (removeStartIndex !== null && removeEndIndex !== null)
			data.splice(removeStartIndex, removeEndIndex - removeStartIndex + 1);

		// insert input
		data.splice(insertIndex, 0, input);
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
				result.push([ inputUpperBound, dataUpperBound ]);
			}
			// input overlaps with left of current range -> remove left of range
			else if (inputLowerBound <= dataLowerBound &&
					 inputUpperBound > dataLowerBound &&
					 inputUpperBound < dataUpperBound) {
				currRange[0] = inputUpperBound;
				result.push(currRange);
			}
			// input overlaps with right of current range -> remove right of range
			else if (inputLowerBound > dataLowerBound &&
					 inputLowerBound < dataUpperBound &&
					 inputUpperBound >= dataUpperBound) {
				currRange[1] = inputLowerBound;
				result.push(currRange);
			}
			// no overlapping -> no need to change range
			else if (inputLowerBound >= dataUpperBound ||
					 inputUpperBound <= dataLowerBound) {
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
		let isInputArray = Array.isArray(input);
		let isLengthValid = isInputArray && input.length == 2;		
		let isInputInteger = isLengthValid && 
						 	 Number.isInteger(input[0]) &&
							 Number.isInteger(input[1]);
		let isSecondGreaterThanFirst = isLengthValid && 
									   input[1] > input[0];

		if (!isInputArray) {
			// console.log('Input is not an array.');
			return false;
		}
		else if (!isLengthValid) {
			// console.log('Input array should contain two integers.');
			return false;
		}
		else if (!isInputInteger) {
			// console.log('Input array should contain integers only.');
			return false;
		}
		else if (!isSecondGreaterThanFirst) {
			// console.log('The second element should be larger than the first element.');
			return false;
		}
		else return true;
	}
}

module.exports = RangeList;