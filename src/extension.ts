import { languages, DocumentSelector, ExtensionContext, DocumentFilter }  from 'vscode';
import HoverProviderPlugin from './providers/HoverProviderPlugin';
import CompletionItemProviderPlugin from './providers/CompletionItemProviderPlugin';
const jsSel: DocumentFilter = {
	scheme: 'file',
	language: 'javascript'
};
const hoverProvider = new HoverProviderPlugin();
const completionItemProvider = new CompletionItemProviderPlugin();
export function activate(context: ExtensionContext) {
	//为js文件注册悬浮提供器
	const hoverDisposable = languages.registerHoverProvider([jsSel], hoverProvider);
	//自动补全
	const completionDisposable = languages.registerCompletionItemProvider([jsSel], completionItemProvider, '.');
	
	context.subscriptions.push(hoverDisposable, completionDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
