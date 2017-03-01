/**
 * Created by hey on 2017/2/28.
 */

HEY.init();

var rectangle = new HEY.Rectangle(HEY.gl);

animate();

function animate() {
    requestAnimationFrame(animate);

    HEY.render();
    rectangle.render();
}

