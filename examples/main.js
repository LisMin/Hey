/**
 * Created by hey on 2017/2/28.
 */

HEY.Scene.init();

var rectangle = new HEY.Rectangle();

animate();

function animate() {
    requestAnimationFrame(animate);

    rectangle.render();
}

