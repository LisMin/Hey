/**
 * Created by ll on 2017/3/1.
 */

///<reference path="./WebGL2Renderer.ts" />
namespace HEY.Scene{
    export let gl:any = null;

    export function init(){
        let  canvas = document.getElementById("render_canvas") as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let renderer = new WebGL2Renderer({canvas:canvas});
        gl = renderer.gl;
    }




}