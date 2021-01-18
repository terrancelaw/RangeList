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
		return true;
	}
}

module.exports = RangeList;