const RangeList = require('./RangeList');

test('original tests', () => {
	const rl = new RangeList();

	rl.add([1, 5]); 
	expect(rl.createOutputString()).toBe('[1, 5)');

	rl.add([10, 20]); 
	expect(rl.createOutputString()).toBe('[1, 5) [10, 20)');

	rl.add([20, 20]); 
	expect(rl.createOutputString()).toBe('[1, 5) [10, 20)');

	rl.add([20, 21]); 
	expect(rl.createOutputString()).toBe('[1, 5) [10, 21)');

	rl.add([2, 4]); 
	expect(rl.createOutputString()).toBe('[1, 5) [10, 21)');

	rl.add([3, 8]);
	expect(rl.createOutputString()).toBe('[1, 8) [10, 21)');

	rl.remove([10, 10]);
	expect(rl.createOutputString()).toBe('[1, 8) [10, 21)');

	rl.remove([10, 11]);
	expect(rl.createOutputString()).toBe('[1, 8) [11, 21)');

	rl.remove([15, 17]);
	expect(rl.createOutputString()).toBe('[1, 8) [11, 15) [17, 21)');

	rl.remove([3, 19]);
	expect(rl.createOutputString()).toBe('[1, 3) [19, 21)');
});

test('add test: overlap with existing interval to the left', () => {
	const rl = new RangeList();

	rl.add([20, 25]);
	rl.add([15, 20]);
	expect(rl.createOutputString()).toBe('[15, 25)');

	rl.add([10, 20]);
	expect(rl.createOutputString()).toBe('[10, 25)');
});

test('add test: overlap with existing interval to the right', () => {
	const rl = new RangeList();

	rl.add([20, 25]);
	rl.add([25, 30]);
	expect(rl.createOutputString()).toBe('[20, 30)');

	rl.add([20, 30]);
	expect(rl.createOutputString()).toBe('[20, 30)');

	rl.add([25, 35]);
	expect(rl.createOutputString()).toBe('[20, 35)');
});

test('add test: overlap with multiple intervals', () => {
	const rl1 = new RangeList();
	const rl2 = new RangeList();

	rl1.add([20, 25]);
	rl1.add([27, 30]);
	rl1.add([32, 35]);
	rl1.add([38, 40]);
	rl1.add([20, 40]);
	expect(rl1.createOutputString()).toBe('[20, 40)');

	rl2.add([20, 25]);
	rl2.add([23, 30]);
	rl2.add([33, 40]);
	rl2.add([10, 50]);
	expect(rl2.createOutputString()).toBe('[10, 50)');
});

// test('add test: fully encapsulated by an existing interval', () => {

// });

// test('add test: fully encapsulate an existing interval', () => {

// });

// test('remove test: splitting an existing interval', () => {

// });

// test('remove test: remove an interval from the right', () => {

// });

// test('remove test: remove an interval from the left', () => {

// });

// test('remove test: remove multiple intervals', () => {

// });

