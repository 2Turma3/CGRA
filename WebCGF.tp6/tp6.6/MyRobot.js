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
	
	this.direction = 1;
    this.rot = 0;

    this.lastCurrTime = -1;
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
	this.geometry.rotateWheels(-delta/(this.geometry.wheel.radius * this.geometry.wheel.radius * Math.PI)*360, -delta/(this.geometry.wheel.radius * this.geometry.wheel.radius * Math.PI)*360);
	
	if (!this.geometry.waving) {
		this.geometry.armAngle = this.geometry.armAngle + 15* delta * this.direction;
	
		if(this.geometry.armAngle > 45){
			this.direction *= -1;
			this.geometry.armAngle = 45 - (this.geometry.armAngle % 45);
		}else if(this.geometry.armAngle < -45){
			this.direction *= -1;
			this.geometry.armAngle = -45 + (-this.geometry.armAngle) % 45;
		}
	}
}

MyRobot.prototype.rotate = function(alpha){
	this.rot = (this.rot + alpha) % 360;

	this.geometry.rotateWheels(alpha, -alpha);
}

MyRobot.prototype.wave = function() {
	this.geometry.wave();
}

MyRobot.prototype.update = function(currTime) {
	this.geometry.update(currTime);
	
	if (this.lastCurrTime == -1) {
		this.lasCurrTime = currTime;
		return;
	}

	
	this.lastCurrTime = currTime;
}


MyRobot.prototype.setAppearance = function(robotAppearance) {
	this.geometry.setAppearance(robotAppearance);
}