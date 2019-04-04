// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import getSplitComponentName from './split-regex'

const TEST_FILE_NAME = 'template-component-test.js';
const FUNCTIONAL_COMPONENT_FILE_NAME = 'template-functional-component.js';
const CLASS_COMPONENT_FILE_NAME = 'template-class-component.js';
const INDEX_FILE_NAME = 'template-index.js';
const STUB_COMPONENT_NAME = '__StubComponentName__';

interface ConfigObject {
	pathToTemplates: string;
}

const getConfig = function getConfig(): ConfigObject {
	const config = vscode.workspace.getConfiguration('scaffoldreactcomponent', null);

	return {
		pathToTemplates: config.get('pathToTemplates', ''),
	};
};

const makeDirSync = function makeDirSync(dir: string): boolean {
	if (fs.existsSync(dir)) {
		return false;
	}
	if (!fs.existsSync(path.dirname(dir))) {
			makeDirSync(path.dirname(dir));
	}

	fs.mkdirSync(dir);

	console.log('Made new directory at:', dir);
	return true;
};

const readReplaceWriteFileAsync = function readReplaceWriteFileAsync(templateFile: string, newFile: string, componentName: string, stringToReplace: string): void {
	if (!fs.existsSync(newFile)) {
		fs.readFile(templateFile, 'utf8', function (err, data) {

			if (err) {
				console.log('Could not read file:', err);
				return false;
			}

			var result = data.replace(new RegExp(stringToReplace, 'g'), componentName);

				fs.writeFile(newFile, result, 'utf8', function (err) {
					if (err) {
						console.log('Could not write file:', err);
						return false;
					}
				});
		});
	}
	else {
		console.log('File creation aborted', newFile, 'already exists.');
	}
};

const copyTestFileAsync = function copyTestFileAsync(templatePath: string, copyPath: string, fileName: string, componentName: string, stringToReplace: string): void {	
	const testFile = path.resolve(templatePath, TEST_FILE_NAME);
	const newFileName = path.resolve(copyPath, `${fileName}.test.js`);

	readReplaceWriteFileAsync(testFile, newFileName, componentName, stringToReplace);
};

const copyIndexFileAsync = function copyIndexFileAsync(templatePath: string, copyPath: string, componentFileName: string, stringToReplace: string): void {
	const indexFile = path.resolve(templatePath, INDEX_FILE_NAME);
	const newFileName = path.resolve(copyPath, 'index.js');

	readReplaceWriteFileAsync(indexFile, newFileName, componentFileName, stringToReplace);
};

const copyComponentFileAsnyc = function copyComponentFileAsnyc(templateFileName: string, copyPath: string, componentFileName: string, componentName: string, stringToReplace: string): void {
	const componentTemplateFile = path.resolve(__dirname, templateFileName);
	const newFileName = path.resolve(copyPath, `${componentFileName}.js`);

	readReplaceWriteFileAsync(componentTemplateFile, newFileName, componentName, stringToReplace);
};

const scaffoldNewComponent = async function scaffoldNewComponent(componentType: 'class' | 'functional', folderObject: any): Promise<{}> {
	const config = getConfig();
	const templatePath = config.pathToTemplates === '' ? path.resolve(__dirname) : path.resolve(config.pathToTemplates);
	const stringToReplace = STUB_COMPONENT_NAME;
	const falseValue =  new Promise(()=>false);
	const trueValue = new Promise(()=>true);
	const isClassComponent = componentType === 'class';
	const newFolderBase = folderObject.fsPath || undefined;
	const templateFile = path.resolve(templatePath, isClassComponent ? CLASS_COMPONENT_FILE_NAME : FUNCTIONAL_COMPONENT_FILE_NAME);

	if (!newFolderBase) {
		console.error('The folder path was undefined, cannot continue.');

		return falseValue;
	}
	// Display a message box to the user
	const componentName = await vscode.window.showInputBox();

	if (!componentName || componentName === '') {
		console.error('The component name was undefined, cannot continue.');

		return falseValue;
	}

	const folderAndFileName = getSplitComponentName(componentName); // componentName.split(/(?=[A-Z0-9])/).join("-").toLowerCase();
	const fullNewFolderPath = `${newFolderBase}/${folderAndFileName}`;
	
	// vscode.window.showInformationMessage('Scaffolding component...');
	console.log('');
	console.log(`Create ${componentType} component:`, componentName);
	console.log('With file name:', folderAndFileName);
	console.log('In folder:', fullNewFolderPath);

	if (!fs.existsSync(fullNewFolderPath)) {
		makeDirSync(fullNewFolderPath);
	}
	else {
		console.log('Just FYI, this directory already exists.');
	}

	copyTestFileAsync(templatePath, fullNewFolderPath, folderAndFileName, componentName, stringToReplace);

	copyIndexFileAsync(templatePath, fullNewFolderPath, folderAndFileName, stringToReplace);
	
	copyComponentFileAsnyc(templateFile, fullNewFolderPath, folderAndFileName, componentName, stringToReplace);

	return trueValue;
};

export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		// console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposableFunctional = vscode.commands.registerCommand('extension.scaffoldFunctionalComponent', async (folderObject) => {
		// The code you place here will be executed every time your command is executed
		scaffoldNewComponent('functional', folderObject);
	});

	let disposableClass = vscode.commands.registerCommand('extension.scaffoldClassComponent', async (folderObject) => {
		// The code you place here will be executed every time your command is executed
		scaffoldNewComponent('class', folderObject);
	});

	context.subscriptions.push(disposableFunctional);
	context.subscriptions.push(disposableClass);
}



// this method is called when your extension is deactivated
export function deactivate() {}
