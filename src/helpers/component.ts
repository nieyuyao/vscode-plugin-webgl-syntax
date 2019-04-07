type param = {
    paramName:string,
    desc:string
};
export type Component = {
    desc:string,
    syntax:string,
    returnVal:string,
    url:string,
    params:Array<param>
};