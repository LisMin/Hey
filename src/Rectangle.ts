/**
 * Created by ll on 2017/3/1.
 */

namespace HEY{

    export class Rectangle{

        program:WebGLProgram = null;
        vao:number = null;

        texture:WebGLTexture = null;

        gl:WebGLRenderingContext = null;

        constructor(){
            let gl = HEY.gl;

            let vertices = new Float32Array([
                //position     //colors        //uvs
                -0.2,0.2,0,    1.0,0.,0.,     0.,1.,
                -0.2,-0.2,0,   0.,1.,0.,      0.,0.,
                0.2,0.2,0,     0.,0.,1.,      1.,1.,
                0.2,-0.2,0 ,    1.,1., 0.,    1.,0.,
            ]);

            let indices = new Uint16Array([
                0,1,2,
                2,1,3
            ]);

            let ebo = gl.createBuffer();
            let vbo = gl.createBuffer();
            
            let vao = gl.createVertexArray();
            gl.bindVertexArray(vao);

            gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
            gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ebo);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);
            
            gl.vertexAttribPointer(0,3,gl.FLOAT,false,8*Float32Array.BYTES_PER_ELEMENT,0);
            gl.enableVertexAttribArray(0);

            gl.vertexAttribPointer(1,3,gl.FLOAT,false,8*Float32Array.BYTES_PER_ELEMENT,3*Float32Array.BYTES_PER_ELEMENT);
            gl.enableVertexAttribArray(1);

            gl.vertexAttribPointer(2,2,gl.FLOAT,false,8*Float32Array.BYTES_PER_ELEMENT,6*Float32Array.BYTES_PER_ELEMENT);
            gl.enableVertexAttribArray(2);



            gl.bindVertexArray(null);

            gl.bindBuffer(gl.ARRAY_BUFFER,null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);

            //init textures
            let texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D,texture);
            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);

            let data = new Uint8Array([255,255,255,255]);

            let image = document.createElement("img");
            image.src = "../asset/wall.jpg";
            image.onload = function(data:any){
                console.log("====",data);
                gl.bindTexture(gl.TEXTURE_2D,texture);
                gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,data.target);
            }

            gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,data);

            gl.bindTexture(gl.TEXTURE_2D,null);

            this.texture = texture;



            let shader = new Shader(ShaderLib.v_rectangle,ShaderLib.f_rectangle);

            this.program = shader.getWebglProgram();
            this.vao = vao;

            this.gl = gl;



        }

        render(){

            let gl:any = this.gl;
            gl.useProgram(this.program);
            
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D,this.texture);
            let loc = gl.getUniformLocation(this.program,"ourTexture");
            gl.uniform1i(loc,1);

            gl.bindVertexArray(this.vao);
            gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0);

            gl.bindVertexArray(null);
        }


    }
}