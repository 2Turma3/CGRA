/**
 * MyRobot
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyRobot(scene, robotAppearance) {
	CGFobject.call(this,scene);
    
    this.geometry = new MyRobotGeometry(this.scene, robotAppearance);

    this.x = 0;
    this.z = 0;

    this.rot = 0;
};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor=MyRobot;

MyRobot.prototype.display = function () {

    this.scene.pushMatrix();
		this.scene.translate(this.x, 0, this.z);
		this.scene.rotate(this.rot*Math.PI/180,0,1,0);
    	this.geometry.display();
    
    this.scene.popMatrix();
}


MyRobot.prototype.move = function(delta) {
	this.z += delta*Math.cos(this.rot*Math.PI/180);
	this.x += delta*Math.sin(this.rot*Math.PI/180);
}

MyRobot.prototype.rotate = function(alpha){
	this.rot = (this.rot + alpha) % 360;
}

MyRobot.prototype.setAppearance = function(robotAppearance) {
	this.geometry.setAppearance(robotAppearance);
}