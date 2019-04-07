import { CompletionItemProvider, TextDocument, Position, CancellationToken, CompletionContext, CompletionItem } from 'vscode';

export default class CompletionItemProviderPlugin implements CompletionItemProvider {
    async provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext) {
        return [new CompletionItem('')];
    }
}