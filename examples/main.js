/**
 * Created by hey on 2017/2/28.
 */

HEY.Scene.init();

var rectangle = new HEY.Rectangle();

var triangle = new HEY.Triangle();

animate();

function animate() {
    requestAnimationFrame(animate);

    triangle.render();
    rectangle.render();
}

