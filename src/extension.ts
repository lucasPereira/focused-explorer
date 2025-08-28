import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    // LOG 1: A extensão foi ativada com sucesso?
    console.log('SUCESSO: A extensão "Explorer Focus" foi ativada.');

    vscode.window.onDidChangeActiveTextEditor(editor => {
        
        // LOG 2: O evento de troca de aba foi disparado?
        console.log('EVENTO: Troca de editor de texto detectada.');

        if (editor) {
            // LOG 3: O objeto 'editor' é válido?
            console.log('INFO: Editor válido encontrado. Arquivo:', editor.document.uri.toString());
            
            console.log('AÇÃO: Tentando executar os comandos de colapso e revelação...');
            vscode.commands.executeCommand('workbench.files.action.collapseExplorerFolders');
            vscode.commands.executeCommand('workbench.files.action.showActiveFileInExplorer');
            console.log('AÇÃO: Comandos enviados para execução.');

        } else {
            // LOG 4: O evento disparou, mas sem um editor válido?
            console.log('AVISO: Evento disparado, mas nenhum editor de texto estava ativo.');
        }
    });
}

export function deactivate() {}