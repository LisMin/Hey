/**
 * Created by ll on 2017/3/1.
 */

///<reference path="./WebGL2Renderer.ts" />
namespace HEY.Scene{
    export let gl:any = null;

    let triangle:Triangle = null;
    let rectangle:Rectangle = null;

    let box:Box = null;

    export function init(){
        let  canvas = document.getElementById("render_canvas") as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let renderer = new WebGL2Renderer({canvas:canvas});
        gl = renderer.gl;

        rectangle = new HEY.Rectangle();
        triangle = new HEY.Triangle();
        box = new HEY.Box();
    }


    export function render(){
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(1,1,1,1);
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

        // triangle.render();
        // rectangle.render();
        box.render();
    }

}