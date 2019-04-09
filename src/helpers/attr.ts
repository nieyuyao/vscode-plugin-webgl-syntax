type param = {
    paramName:string,
    desc:string
};
export type Attr = {
    name:string,
    desc:string,
    syntax:string,
    returnVal:string,
    url:string,
    params:Array<param>
};