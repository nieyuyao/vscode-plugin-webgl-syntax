const vertexShderSourceTemplate:string = `
    attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
    }
`;
const fragmentShderSourceTemplate:string = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    }
`;
export default [{
    name: 'VERTEX_SHADER_TEMPLATE',
    type: 'text',
    value: '`' + vertexShderSourceTemplate + '`'
}, {
    name: 'FRAGMENT_SHADER_TEMPLATE',
    type: 'text',
    value: '`' + fragmentShderSourceTemplate + '`'
}];