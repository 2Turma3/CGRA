/**
 * MyRobot
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyRobot(scene) {
	CGFobject.call(this,scene);
    
    this.geometry = new MyRobotGeometry(this.scene);

    this.position = {x: 0.0,
                     z: 0.0};
    this.orientation = 0.0;
};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor=MyRobot;

MyRobot.prototype.display = function () {
    this.scene.pushMatrix();
    this.scene.translate(this.position.x, 0, this.position.z);
    this.scene.rotate(this.orientation, 0, 1, 0);
    this.geometry.display();
    this.scene.popMatrix();

    console.log(this.position.x);
}

MyRobot.prototype.move = function(delta) {
    this.position.x += delta * Math.cos(this.orientation);
    this.position.z += delta * Math.sin(this.orientation);
}

MyRobot.prototype.rotate = function(angle) {
    this.orientation += angle;
}