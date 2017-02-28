/**
 * Created by hey on 2017/2/28.
 */

namespace HEY.Shaders{

    export let v_default:string =
            `#version 300 es
            layout (location = 0) in vec3 position;
            void main()
            {
                 gl_Position = vec4(position.x, position.y, position.z, 1.0);
            }
        `;

    export let f_default:string =
            `#version 300 es
            precision highp float;
            out vec4 color;
            
            void main()
            {
                color = vec4(1.0f, 0.5f, 0.2f, 1.0f);
            }
    `;


}