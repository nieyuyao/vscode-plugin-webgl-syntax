import {
  CompletionItemProvider,
  TextDocument,
  Position,
} from "vscode";
import { getInputVal, createPropRegExp, createCompleteItems } from "../utils";
export default class CompletionItemProviderPlugin implements CompletionItemProvider {
  async provideCompletionItems(document: TextDocument, position: Position) {
    //获取用户输入
    const inputVal = getInputVal(document, position);
    if (!inputVal) {
      return [];
    }
    //产生正则表达式
    const reg = createPropRegExp(inputVal);
    return createCompleteItems(reg, position);
  }
}
