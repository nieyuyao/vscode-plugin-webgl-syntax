import { TextDocument, Position, MarkdownString, Range } from 'vscode';
import { Attr } from '../helpers/attr';
import { Component } from './component';
const components:Component[] = require('../../res/webgl.json');
const attrRegExp = /(?:^|\s*|\{|\,)(gl\.[0-9a-zA-Z]+)(?:$|\,|;|\}|\s*|\()/g;
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
function paramMark(paramName:string, desc:string) {
    return `*@param* -\`${paramName}\`.${desc}  \n`;
}
export function getAttr(doc: TextDocument, position: Position): Attr {
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
    return new Attr(attrName, isHover);
}

export function getComponent(attr:Attr) {
    let comp:Component | undefined;
    if (!attr.name) {
        return;
    }
    components.find(c => {
        if (c.syntax.indexOf(attr.name) > -1) {
            comp = c;
        }
        return !!comp;
    });
    return comp;
}

export function swapMarkDown(comp:Component | undefined):MarkdownString {
    if (comp === undefined) {
        return new MarkdownString('');
    }
    const {desc, syntax, returnVal, url, params } = comp;
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
        markString += paramMark(param.paramName, param.desc);
    });
    markString += `*@return* ${returnVal}`;
    markString += '  \n';
    const linkUrl = `https://${url}`;
    markString += link(linkUrl, linkUrl);
    let markDownString = new MarkdownString(markString);
    markDownString.isTrusted = true;
    return markDownString;
}