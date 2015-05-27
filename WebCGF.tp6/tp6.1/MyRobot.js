/**
 * MyRobot
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyRobot(scene) {
	CGFobject.call(this,scene);
    
    this.geometry = new MyRobotGeometry(this.scene);
};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor=MyRobot;

MyRobot.prototype.display = function () {
    this.geometry.display();
}