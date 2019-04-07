import { HoverProvider, TextDocument, Position, CancellationToken, Hover } from 'vscode';
import { getAttr, getComponent, swapMarkDown } from '../helpers/utils';
export default class HoverProviderPlugin implements HoverProvider {
    async provideHover(document: TextDocument, position: Position, token: CancellationToken) {
        const attr = getAttr(document, position);
        const comp = getComponent(attr);
        const markDownString = swapMarkDown(comp);
        //获取对应属性
        return new Hover(markDownString);
    }
}