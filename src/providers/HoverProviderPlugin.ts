import { HoverProvider, TextDocument, Position, CancellationToken, Hover, MarkdownString } from 'vscode';
import { getProp, getAttrComponent, getConstantComponent, swapAttrComponentMarkDown, swapConstantComponentMarkDown } from '../helpers/utils';
import { Attr } from '../helpers/attr';
import { Constant } from '../helpers/constant';
export default class HoverProviderPlugin implements HoverProvider {
    async provideHover(document: TextDocument, position: Position, token: CancellationToken) {
        const prop = getProp(document, position);
        let markDownString:MarkdownString;
        let comp: Attr | Constant | undefined;
        comp = getAttrComponent(prop);
        if (comp) {
            //如果是属性
            markDownString = swapAttrComponentMarkDown(comp);
        } else {
            //如果是常量
            comp = getConstantComponent(prop);
            markDownString = swapConstantComponentMarkDown(comp);
        }
        //获取对应属性
        return new Hover(markDownString);
    }
}