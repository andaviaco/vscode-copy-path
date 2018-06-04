const vscode = require('vscode');
const path = require('path');
const ncp = require("copy-paste");

function copyProjectPath(selected) {
    let path = vscode.workspace.asRelativePath(selected.path);

    path = path.replace(/\\/g, '/');

    ncp.copy(path);
}

function copyRelativePath(selected) {
    const config = vscode.workspace.getConfiguration('copyPath');
    const editor = vscode.window.activeTextEditor;

    let current;
    let relativePath;

    if (!editor) {
        vscode.window.showInformationMessage("There is no open file to get the relative path.");
        return;
    }

    current = editor.document.uri;
    relativePath = path.relative(path.dirname(current.path), selected.path);
    relativePath = relativePath.replace(/\\/g, '/');

    if (config.addLeadingDot && !relativePath.startsWith('..')) {
        relativePath = `./${relativePath}`;
    }

    ncp.copy(relativePath);
}

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.copyProjectPath', copyProjectPath);
    let disposable2 = vscode.commands.registerCommand('extension.copyRelativePath', copyRelativePath);

    context.subscriptions.push(disposable, disposable2);
}
exports.activate = activate;

function deactivate() {}

exports.deactivate = deactivate;