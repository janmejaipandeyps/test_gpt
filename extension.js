// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const fs = require("fs");
const vscode = require("vscode");
const { Configuration, OpenAIApi } = require("openai");


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "testgpt" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "testgpt.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from TestGPT TESTT!");

      let currentFile = "";
      if (vscode.workspace.workspaceFolders.length) {
        currentFile = vscode.window.activeTextEditor.document.fileName;
      }

      if (currentFile != "") {
        fs.readFile(currentFile, async (err, data) => {
			const content = data.toString();
			// const response = await createComplettion("write unit test cases in a single file using JEST and react-testing-library for \n" + content);
			const response = await createComplettion("write only code for unit test cases in a single file using JUNIT, Jupiter with exception handling for \n" + content);
			// const testFile = currentFile.replace(".js", ".test.js");
			const testFile = currentFile.replace(".java", "Test.java");
			const code = response.data.choices[0].message.content;
			fs.writeFile(testFile, code, (err) => {
				if (err) console.log(err);
				else {
				console.log("File written successfully\n");
				console.log("The written has the following contents:");
				console.log(fs.readFileSync("books.txt", "utf8"));
				}
			});
		});
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

async function createComplettion(prompt) {
	const configuration = new Configuration({
		organization: "org-5vVbXjuRH940d1Dgpxg1brNw",
		apiKey: "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",
	  });

	  
	const openai = new OpenAIApi(configuration);

	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [{role: "user", content: prompt}]
	});

  	return response;
}
