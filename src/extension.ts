import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    vscode.window.onDidChangeActiveTextEditor(editor => {  
        if (editor) {
            vscode.commands.executeCommand('workbench.files.action.collapseExplorerFolders');
            vscode.commands.executeCommand('workbench.files.action.showActiveFileInExplorer');
        }
    });
}

export function deactivate() {}
