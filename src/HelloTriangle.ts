/**
 * Created by hey on 2017/2/28.
 */

namespace HEY{

    export function test(){

        let vertices = new Float32Array([
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
            0.0,  0.5, 0.0
        ]);
        let  canvas = document.getElementById("render_canvas") as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let renderer = new WebGL2Renderer({canvas:canvas});
        let gl = renderer.gl;

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
        gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader,Shaders.v_default);
        gl.compileShader(vertexShader);

        let succ = gl.getShaderParameter(vertexShader,gl.COMPILE_STATUS);
        if(!succ){
            let log = gl.getShaderInfoLog(vertexShader);
            console.log("compile shader error:",log);
            return ;
        }

        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader,Shaders.f_default);
        gl.compileShader(fragmentShader);

        succ = gl.getShaderParameter(fragmentShader,gl.COMPILE_STATUS);
        if(!succ){
            let log = gl.getShaderInfoLog(fragmentShader);
            console.log(log);
            return;
        }

        let program = gl.createProgram();
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
        gl.deleteShader(fragmentShader);
        gl.useProgram(program);



    }





}