//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import defaultExport, { matchByRegex } from '../split-regex';
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import * as myExtension from '../extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function () {

    test("Regex matches component name based on groupings of CAPSLettersOrNumb345", () => {
        const matchArray = matchByRegex('CAPSLettersOrNumb345');
        
        assert.equal(matchArray !== null, true);
        if (matchArray) {
            assert.equal(matchArray.length, 5);
        }
    });

    test("Default export from split-regex creates correct string for file names", () => {
        const camelCase = defaultExport('camelCase');
        const PascalCase = defaultExport('PascalCase');
        const constructedString = defaultExport('CAPSLettersOrNumb345');
        
        assert.equal(camelCase.length, 10);
        assert.equal(camelCase, 'camel-case');
        assert.equal(camelCase.length, 10);
        assert.equal(PascalCase, 'pascal-case');
        assert.equal(constructedString.length, 24);
        assert.equal(constructedString, 'caps-letters-or-numb-345');
    });

    test("Default export returns 'default-component' if unable to create match", () => {
        const constructedStringA = defaultExport('_x_A_');
        const constructedStringB = defaultExport('_xA_');
        
        assert.equal(constructedStringA, 'default-component');
        assert.equal(constructedStringB, 'default-component');
    });

    test("Default export returns a name constructed from matched parts of string", () => {
        // Note that the grouped lower-case letters will not match due to no preceding capitol letter
        const constructedString = defaultExport('ABcde_B_C-fghi-e-*-JKLmnop-ZXy');
        
        assert.equal(constructedString, 'a-bcde-jk-lmnop-z-xy');
    });
});