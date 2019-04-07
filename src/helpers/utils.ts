import { TextDocument, Position, TextLine } from 'vscode';
import { Attr } from '../helpers/attr';
const components = require('../../res/webgl.json');
const attrRegExp = /(?:^|\s*|\{|\,)(gl\.[0-9a-zA-Z]+)(?:$|\,|;|\}|\s*|\()/g;
export function getAttr(doc: TextDocument, position: Position): Attr {
    const line = position.line; //行号
    const character = position.character; //字符的位置
    let lineText = doc.lineAt(line).text; //行文本
    lineText.replace(attrRegExp, (raw: string, segment: string, offset: number) => {
        // const segIndex = raw.indexOf(segment);
        console.log(segment + ' ' + offset);
        return raw;
    });
    return new Attr();
}