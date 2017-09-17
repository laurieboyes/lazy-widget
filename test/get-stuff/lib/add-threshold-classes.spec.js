const addThresholdClasses = require('../../../src/functions/get-stuff/lib/add-threshold-classes');
const { expect } = require('chai');



describe('Add threshold classes', () => {
	it('should add the class to all the points above the threshold but leave the others alone', () => {

		const fakeChartHtml = `
			<line x1="blah blah" y1="15" x2="139.43857142857144" y2="15" class="ct-point" ct:value="3"></line>
			<line x1="blah blah" y1="15" x2="139.43857142857144" y2="15" class="ct-point" ct:value="0"></line>
			<line x1="blah blah" y1="15" x2="139.43857142857144" y2="15" class="ct-point" ct:value="30"></line>
			<line x1="blah blah" y1="15" x2="139.43857142857144" y2="15" class="ct-point" ct:value="-5"></line>
		`;

		expect(addThresholdClasses(fakeChartHtml, 3)).to.equal(`
			<line x1="blah blah" y1="15" x2="139.43857142857144" y2="15" class="ct-point point-above-threshold" ct:value="3"></line>
			<line x1="blah blah" y1="15" x2="139.43857142857144" y2="15" class="ct-point" ct:value="0"></line>
			<line x1="blah blah" y1="15" x2="139.43857142857144" y2="15" class="ct-point point-above-threshold" ct:value="30"></line>
			<line x1="blah blah" y1="15" x2="139.43857142857144" y2="15" class="ct-point" ct:value="-5"></line>
		`);
	});
});