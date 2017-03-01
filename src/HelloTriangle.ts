/**
 * Created by hey on 2017/2/28.
 */

namespace HEY{

    export let gl:any = null;
    let vao:number = null;
    let program:WebGLProgram = null;

    export function init( ){

        let vertices = new Float32Array([
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
            0.0,  0.5, 0.0
        ]);
        let  canvas = document.getElementById("render_canvas") as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let renderer = new WebGL2Renderer({canvas:canvas});
        gl = renderer.gl;

        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader,ShaderLib.v_default);
        gl.compileShader(vertexShader);

        let succ = gl.getShaderParameter(vertexShader,gl.COMPILE_STATUS);
        if(!succ){
            let log = gl.getShaderInfoLog(vertexShader);
            console.log("compile shader error:",log);
            return ;
        }

        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader,ShaderLib.f_default);
        gl.compileShader(fragmentShader);

        succ = gl.getShaderParameter(fragmentShader,gl.COMPILE_STATUS);
        if(!succ){
            let log = gl.getShaderInfoLog(fragmentShader);
            console.log(log);
            return;
        }

        program = gl.createProgram();
        gl.attachShader(program,vertexShader);
        gl.attachShader(program,fragmentShader);
        gl.linkProgram(program);

        succ = gl.getProgramParameter(program,gl.LINK_STATUS);
        if(!succ){
            let log = gl.getProgramInfoLog(program);
            console.log(log);
            return;
        }
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader );

        vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
        gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

        gl.vertexAttribPointer(0,3,gl.FLOAT,false,0,0);
        gl.enableVertexAttribArray(0);

        gl.bindVertexArray(null);

        return;

    }

    export function render(){
        gl.bindVertexArray(vao);
        gl.useProgram(program);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
        gl.bindVertexArray(null);
    }



}