import * as vscode from 'vscode';

function updateToggleButton(toggleButton: vscode.StatusBarItem, focusedExplorerEnabled: boolean) {
	const icon = focusedExplorerEnabled ? 'pass' : 'circle-slash';
	toggleButton.text = `$(fold) Focused Explorer: $(${icon})`;
}

export async function activate(context: vscode.ExtensionContext) {
	let focusedExplorerEnabled = context.globalState.get('focusedExplorer.enabled', true);

	const toggleButton = vscode.window.createStatusBarItem('focusedExplorer.toggle', vscode.StatusBarAlignment.Left, 1);
	toggleButton.tooltip = 'Toggle Focused Explorer';
	toggleButton.command = 'focusedExplorer.toggle';
	updateToggleButton(toggleButton, focusedExplorerEnabled);
	toggleButton.show();
	context.subscriptions.push(toggleButton);

	const toggleCommand = vscode.commands.registerCommand('focusedExplorer.toggle', async () => {
		focusedExplorerEnabled = !focusedExplorerEnabled;
		updateToggleButton(toggleButton, focusedExplorerEnabled);
		await context.globalState.update('focusedExplorer.enabled', focusedExplorerEnabled);
	});
	context.subscriptions.push(toggleCommand);

	const onTextEditorChange = vscode.window.onDidChangeActiveTextEditor(async editor => {
		if (focusedExplorerEnabled) {
			vscode.commands.executeCommand('workbench.files.action.collapseExplorerFolders');
			vscode.commands.executeCommand('workbench.files.action.showActiveFileInExplorer');
		}
	});
	context.subscriptions.push(onTextEditorChange);
}

export function deactivate() {}
