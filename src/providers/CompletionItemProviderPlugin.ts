import {
  CompletionItemProvider,
  TextDocument,
  Position,
  CancellationToken,
  CompletionContext,
  CompletionItem
} from "vscode";
import { getInputVal } from "../helpers/utils";
export default class CompletionItemProviderPlugin implements CompletionItemProvider {
  async provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext) {
    //获取用户输入
    const inputVal = getInputVal(document, position);
    return [new CompletionItem("")];
  }
}
