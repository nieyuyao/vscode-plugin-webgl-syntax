import { TextDocument, Position, MarkdownString, CompletionItem } from 'vscode';
import { Prop } from './prop';
import { Attr } from './attr';
import { Constant } from './constant';
const attrs:Attr[] = require('../../res/webgl.attrs.json');
const constants:Constant[] = require('../../res/webgl.constants.json');
const attrRegExp = /(?:^|\s*|\{|\,)gl\.([0-9a-zA-Z_]+)(?:$|\,|;|\}|\s*|\()/g;
const descRegExp = /(^|\s*)(WebGLRenderingContext\.[0-9a-zA-Z\(\)]+)(\s*)/g;
const htmlTagRegExp = /<[^<>]+>/g;

function link(name:string, url: string) {
    return `Reference: [${name}](${url})`;
}
function bold(content:string) {
    return `**${content}**`;
}
function code(content:string) {
    return `\`\`\`\n${content}\n\`\`\``;
}
function htmlTag(tag:string) {
    return `\`${tag}\``;
}
function paramMark(type:string, paramName:string, desc:string = '') {
    return `*@${type}* -\`${paramName}\`.${desc}  \n`;
}
export function getProp(doc: TextDocument, position: Position): Prop {
    const line = position.line; //行号
    const character = position.character; //光标的位置
    let lineText = doc.lineAt(line).text; //行文本
    let attrName:string = '';
    let isHover:boolean = false;
    lineText.replace(attrRegExp, (raw: string, segment: string, offset: number) => {
        const segIndex = raw.indexOf(segment);
        if (character >= offset + segIndex && character <= segIndex + offset + segment.length) {
            attrName = segment;
            isHover = true;
        }
        return raw;
    });
    return new Prop(attrName, isHover);
}

export function getAttrComponent(prop:Prop) {
    let comp:Attr | undefined;
    if (!prop.name) {
        return;
    }
    attrs.find(attr => {
        if (attr.name === prop.name) {
            comp = attr;
        }
        return !!comp;
    });
    return comp;
}

export function getConstantComponent(prop:Prop) {
    let cst:Constant | undefined;
    if (!prop.name) {
        return;
    }
    constants.find(c => {
        if (c.name === prop.name) {
            cst = c;
        }
        return !!cst;
    });
    return cst;
}

export function swapAttrComponentMarkDown(comp:Attr | undefined):MarkdownString {
    if (comp === undefined) {
        return new MarkdownString('');
    }
    const { desc, syntax, returnVal, url, params } = comp;
    let markString:string = '';
    markString = desc.replace(descRegExp, (raw:string, pre:string, segment:string, post:string) => {
        return pre + bold(segment) + post;
    });
    markString = markString.replace(htmlTagRegExp, (raw:string) => {
        return htmlTag(raw);
    });
    markString += '  \n';
    markString += code(syntax);
    markString += '  \n';
    params.forEach(param => {
        markString += paramMark('param', param.paramName, param.desc);
    });
    markString += paramMark('return', returnVal);
    markString += '  \n';
    const linkUrl = `https://${url}`;
    markString += link(linkUrl, linkUrl);
    let markDownString = new MarkdownString(markString);
    markDownString.isTrusted = true;
    return markDownString;
}

export function swapConstantComponentMarkDown(comp:Constant | undefined):MarkdownString {
    if (comp === undefined) {
        return new MarkdownString('');
    }
    const { name, value, desc, url } = comp;
    let markString:string = '';
    markString += desc;
    markString += '  \n';
    markString += code(name);
    markString += '  \n';
    markString += paramMark('value', value);
    const linkUrl = `https://${url}`;
    markString += link(linkUrl, linkUrl);
    let markDownString = new MarkdownString(markString);
    markDownString.isTrusted = true;
    return markDownString;
}

export function getCompleteProps(inputVal:string):Array<string> {
    return [];
}

export function getInputVal(doc:TextDocument, pos:Position):string {
    let val:string = '';
    let isGl:boolean = false;
    const line = pos.line;
    const character = pos.character;
    const lineText = doc.lineAt(line).text;
    for (var i = character;i >= 0; i--) {
        let char = lineText.charAt(i);
        if (char === '.') {
            val = char + val;
            break;
        }
    }
    if (lineText.substring(i-2, i) === 'gl') {
        isGl = true;
    }
    return isGl ? val : '';
}

export function createCompleteItem(prop:string):CompletionItem {
    return new CompletionItem(prop);
}