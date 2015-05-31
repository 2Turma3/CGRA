/**
 * MyRobotGeometry
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyRobotGeometry(scene, robotAppearance) {
	CGFobject.call(this,scene);
    
    this.body = new MyRobotGeometryBody(this.scene, 1.5, 0.5, new CGFappearance(this.scene), new CGFappearance(this.scene), new CGFappearance(this.scene));
    this.arm = new MyRobotGeometryArm(this.scene, 1.0, 0.125, new CGFappearance(this.scene), new CGFappearance(this.scene), new CGFappearance(this.scene));
	this.wheel = new MyRobotGeometryWheel(this.scene, 0.15, 0.30);
	this.head = new MyRobotGeometryHead(this.scene, 0.5, new CGFappearance(this.scene), new CGFappearance(this.scene));

	this.neckGap = 0.05;
	this.leftWheelRotation = 0;
	this.rightWheelRotation = 0;

	this.armAngle = 0;

	if(typeof robotAppearance !== 'undefined')
		this.setAppearance(robotAppearance);

	this.lastCurrTime = -1;
	this.waving = false;

	this.rightArmElevation = 0;
	this.rightArmInclination = 0;
	this.wavingSpeed = 200;
	this.wavingStates = ["up", "oneRight", "oneLeft", "twoRight", "twoLeft", "threeRight", "threeLeft", "down"];
};

MyRobotGeometry.prototype = Object.create(CGFobject.prototype);
MyRobotGeometry.prototype.constructor=MyRobotGeometry;

MyRobotGeometry.prototype.display = function() {
	this.scene.pushMatrix();
	
		this.scene.translate(0, this.wheel.radius, 0);
		this.scene.pushMatrix();
			this.body.display();
		this.scene.popMatrix();
		
		this.displayArms();

		// left wheel
		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.scene.rotate(this.leftWheelRotation * Math.PI / 180, 0, 0, 1);
			this.scene.translate(0, 0, -(this.body.radius + this.wheel.width));
			this.wheel.display();
		this.scene.popMatrix();
		
		// right wheel
		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.scene.rotate(this.rightWheelRotation * Math.PI / 180, 0, 0, 1);
			this.scene.translate(0, 0, this.body.radius);
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, this.body.height + this.neckGap, 0);
			this.head.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
}

MyRobotGeometry.prototype.setAppearance = function(robotAppearance) {
	this.body.bodyAppearance = robotAppearance.body;
	this.body.topAppearance = robotAppearance.top;
	this.body.bottomAppearance = robotAppearance.bottom;

	this.arm.armAppearance = robotAppearance.arm;
	this.arm.shoulderAppearance = robotAppearance.shoulder;
	this.arm.handAppearance = robotAppearance.hand;

	this.head.headAppearance = robotAppearance.head;
	this.head.neckAppearance = robotAppearance.top;
}

MyRobotGeometry.prototype.rotateWheels = function(alpha, beta) {
	this.leftWheelRotation = (this.leftWheelRotation + alpha) % 360;
	this.rightWheelRotation = (this.rightWheelRotation + beta) % 360;
}

MyRobotGeometry.prototype.displayArms = function() {

	// left arm
	this.scene.pushMatrix();
		this.scene.translate(this.body.radius+this.arm.radius, this.body.height - this.arm.height, 0);
		this.scene.translate(0, this.arm.height - this.arm.radius, 0);
		this.scene.rotate(this.armAngle*Math.PI/180, 1, 0, 0);
		this.scene.translate(0, -(this.arm.height - this.arm.radius), 0);
		this.arm.display();
	this.scene.popMatrix();
	

	//right arm
	this.scene.pushMatrix();
	this.scene.translate(-(this.body.radius+this.arm.radius), this.body.height - this.arm.height, 0);	
	this.scene.translate(0, this.arm.height - this.arm.radius, 0);
	if (this.waving) {
		this.scene.rotate(-this.rightArmElevation * Math.PI/180, 1, 0, 0);
		this.scene.rotate(-this.rightArmInclination * Math.PI/180, 0, 0, 1);
	}
	else {
			this.scene.rotate(-this.armAngle*Math.PI/180, 1, 0, 0);		
	}
	this.scene.translate(0, -(this.arm.height - this.arm.radius), 0);
	this.arm.display();
	this.scene.popMatrix();
}

MyRobotGeometry.prototype.wave = function() {
	if (!this.waving) {
		this.waving = true;
		this.duration = 0;
		this.wavingState = this.wavingStates[0];
		this.rightArmElevation = this.armAngle;
		this.rightArmInclination = 0;
	}
}

MyRobotGeometry.prototype.update = function(currTime) {
	if (this.lastCurrTime == -1) {
		this.lastCurrTime = currTime;
		return;
	}

	if (this.waving) {
		var delta = (currTime - this.lastCurrTime) / 1000;

		if (this.wavingState == this.wavingStates[0]) {
			this.rightArmElevation += delta * this.wavingSpeed;
			if (this.rightArmElevation >= 180) {
				this.rightArmElevation = 180;
				this.rightArmInclination = 0;
				this.wavingState = this.wavingStates[1];
			}
		} else if (this.wavingState == this.wavingStates[1]) {
			this.rightArmInclination += delta * this.wavingSpeed;

			if (this.rightArmInclination >= 45) {
				this.rightArmInclination = 45;
				this.wavingState = this.wavingStates[2];
			}
		} else if (this.wavingState == this.wavingStates[2]) {
			this.rightArmInclination -= delta * this.wavingSpeed;

			if (this.rightArmInclination <= 0) {
				this.rightArmInclination = 0;
				this.wavingState = this.wavingStates[3];
			}
		} else if (this.wavingState == this.wavingStates[3]) {
			this.rightArmInclination += delta * this.wavingSpeed;

			if (this.rightArmInclination >= 45) {
				this.rightArmInclination = 45;
				this.wavingState = this.wavingStates[4];
			}
		} else if (this.wavingState == this.wavingStates[4]) {
			this.rightArmInclination -= delta * this.wavingSpeed;

			if (this.rightArmInclination <= 0) {
				this.rightArmInclination = 0;
				this.wavingState = this.wavingStates[5];
			}
		} else if (this.wavingState == this.wavingStates[5]) {
			this.rightArmInclination += delta * this.wavingSpeed;

			if (this.rightArmInclination >= 45) {
				this.rightArmInclination = 45;
				this.wavingState = this.wavingStates[6];
			}
		} else if (this.wavingState == this.wavingStates[6]) {
			this.rightArmInclination -= delta * this.wavingSpeed;

			if (this.rightArmInclination <= 0) {
				this.rightArmInclination = 0;
				this.wavingState = this.wavingStates[7];
			}
		} else if (this.wavingState == this.wavingStates[7]) {
			this.rightArmElevation -= delta * this.wavingSpeed;

			if (this.rightArmElevation <= this.armAngle) {
				this.rightArmElevation = this.armAngle;
				this.waving = false;
			}
		}
	}

	this.lastCurrTime = currTime;
}


function MyRobotGeometryBody(scene, height, radius, bodyAppearance, topAppearance, bottomAppearance) {
	CGFobject.call(this, scene);
	
	this.height = height;
	this.radius = radius;
	this.cilinder = new MyCilinder(this.scene, 24, 24);
	this.circle = new MyCircle(this.scene, 24);

	this.bodyAppearance = bodyAppearance;
	this.topAppearance = topAppearance;
	this.bottomAppearance = bottomAppearance;
}

MyRobotGeometryBody.prototype = Object.create(CGFobject.prototype);
MyRobotGeometryBody.prototype.constructor = MyRobotGeometryBody;

MyRobotGeometryBody.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.scale(this.radius, this.height, this.radius);
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI / 2, 0, 0, 1);
			this.bodyAppearance.apply();
			this.cilinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, 0, 1);
			this.topAppearance.apply();
			this.circle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.bottomAppearance.apply();
			this.circle.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
}


function MyRobotGeometryArm(scene, height, radius, armAppearance, shoulderAppearance, handAppearance) {
	CGFobject.call(this, scene);
	
	this.height = height;
	this.radius = radius;

	this.cilinder = new MyCilinder(this.scene, 24, 24);
	this.hemisphere = new MyHemisphere(this.scene, 24, 24);

	this.armAppearance = armAppearance;
	this.shoulderAppearance = shoulderAppearance;
	this.handAppearance = handAppearance;
}

MyRobotGeometryArm.prototype = Object.create(CGFobject.prototype);
MyRobotGeometryArm.prototype.constructor = MyRobotGeometryArm;

MyRobotGeometryArm.prototype.display = function() {
	var armHeight = (this.height - this.radius * 2);

	this.scene.pushMatrix();
		this.scene.translate(0, this.radius, 0);
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);

		this.scene.pushMatrix();
			this.scene.scale(this.radius, this.radius, armHeight);
			this.armAppearance.apply();
			this.cilinder.display();
		this.scene.popMatrix();
	
		this.scene.pushMatrix()
			this.scene.translate(0, 0, armHeight);
			this.scene.scale(this.radius, this.radius, this.radius);
			this.shoulderAppearance.apply();
			this.hemisphere.display();
		this.scene.popMatrix();
		this.scene.pushMatrix()
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.scene.scale(this.radius, this.radius, this.radius);
			this.handAppearance.apply();
			this.hemisphere.display();
		this.scene.popMatrix();


	this.scene.popMatrix();
}

function MyRobotGeometryWheel(scene, width, radius) {
	CGFobject.call(this, scene);
	this.width = width;
	this.radius = radius;
	this.cilinder = new MyCilinder(this.scene, 24, 24);
	this.circle = new MyCircle(this.scene, 24);

	this.tireAppearance = new CGFappearance(this.scene);
	this.tireAppearance.loadTexture("../resources/images/tire.png");
	this.rimAppearance = new CGFappearance(this.scene);
	this.rimAppearance.loadTexture("../resources/images/rim.png");
}

MyRobotGeometryWheel.prototype = Object.create(CGFobject.prototype);
MyRobotGeometryWheel.prototype.constructor = MyRobotGeometryWheel;

MyRobotGeometryWheel.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.scale(this.radius, this.radius, this.width);
		this.tireAppearance.apply();
		this.cilinder.display();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.rimAppearance.apply();
			this.circle.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
			this.scene.translate(0, 0, 1);
			this.rimAppearance.apply();
			this.circle.display();
		this.scene.popMatrix();

	this.scene.popMatrix();
}

function MyRobotGeometryHead(scene, radius, headAppearance, neckAppearance) {
	CGFobject.call(this, scene);
	this.radius = radius;
	this.hemisphere = new MyHemisphere(this.scene, 24, 24);
	this.circle = new MyCircle(this.scene, 24);

	this.headAppearance = headAppearance;
	this.neckAppearance = neckAppearance;
}

MyRobotGeometryHead.prototype = Object.create(CGFobject.prototype);
MyRobotGeometryHead.prototype.constructor = MyRobotGeometryHead;

MyRobotGeometryHead.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.scene.scale(this.radius, this.radius, this.radius);
		this.headAppearance.apply();
		this.hemisphere.display();

		this.scene.rotate(Math.PI, 0, 1, 0);
		this.neckAppearance.apply();
		this.circle.display();
	this.scene.popMatrix();
}