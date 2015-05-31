var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	//this.leftWall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
	this.floor = new MyQuad(this, 0, 10, 0,12);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, (BOARD_HEIGHT - BOARD_WIDTH)/(2*BOARD_HEIGHT),  (BOARD_WIDTH+BOARD_HEIGHT)/(2*BOARD_HEIGHT), 0,1 );
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);
	this.view = new Plane(this, 100);

	this.viewHeight = 15;
	this.viewWidth = this.viewHeight * 16/9;

	var columnAppearance = new CGFappearance(this);
	columnAppearance.loadTexture("../resources/images/column.jpg");
	columnAppearance.setTextureWrap("REPEAT", "REPEAT");

	this.column = new MyClosedCilinder(this, 50,50, 0,3,0,3, new CGFappearance(this), columnAppearance);
	this.clock = new MyClock(this);
	this.lamp = new MyLamp(this, 50, 50);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0.0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);
	
	this.enableTextures(true);

	this.defaultAppearance = new CGFappearance(this);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setDiffuse(0.4, 0.2, 0.0, 1.0);
	this.floorAppearance.setSpecular(0.4, 0.2, 0.0, 0.2);
	this.floorAppearance.setAmbient(0.2, 0.1, 0.0, 1);
	this.floorAppearance.setShininess(50);
	this.floorAppearance.loadTexture("../resources/images/floor.png");

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
	
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.slidesAppearance.setSpecular(0.3, 0.3, 0.3, 0.2);
	this.slidesAppearance.setShininess(10);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setDiffuse(.5, .5, .5, 1.0);
	this.boardAppearance.setSpecular(.7, .7, .7, 1.0);
	this.boardAppearance.setShininess(100);
	this.boardAppearance.loadTexture("../resources/images/board.png");

	this.viewAppearance = new CGFappearance(this);
	this.viewAppearance.loadTexture("../resources/images/view.png");

	this.leftWall = new MyWindowedWall(this, this.windowAppearance, 0.25, 0.3, 0.5, 0.4, 0.27, 0.32, 0.46, 0.36);

	this.setUpdatePeriod(100);

	this.Relogio = true;

	this.Luz1 = true;
	this.Luz2 = true;
	this.Luz3 = true;

	this.robotAppearanceList =	['SuitSkeleton', 'Goku', 'PBear'];
	this.currRobotAppearance = this.robotAppearanceList[0];
	
	this.robotAppearances = [];
	for (i = 0; i < this.robotAppearanceList.length; ++i)
		this.robotAppearances.push(new MyRobotAppearance(this, this.robotAppearanceList[i]));

	this.robot = new MyRobot(this, this.robotAppearances[0]);

	this.lastCurrTime = -1;
	this.relTime = 0;
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.0,0.0,0.0, 1.0);

	this.shader.bind();
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 3, 1);
	this.lights[1].setPosition(10.5, 6.0, 7.0, 1.0);
	this.lights[2].setPosition(0, 4, 7.5, 1.0);

	this.lights[0].setAmbient(0.2, 0.2, 0.2, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0.2, 0.2, 0.2, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0.2, 0.2, 0.2, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].enable();

	this.shader.unbind();
};

LightingScene.prototype.updateLights = function() {
	this.lightsState = [];
	this.lightsState[0] = this.Luz1;
	this.lightsState[1] = this.Luz2;
	this.lightsState[2] = this.Luz3;
	for (i = 0; i < this.lights.length; i++){
		if (this.lightsState[i])
			this.lights[i].enable();
		else
			this.lights[i].disable();
		this.lights[i].update();
	}
}


LightingScene.prototype.display = function() {
	this.shader.bind();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	this.updateRobot();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor

	this.floorAppearance.apply();
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floor.display();
	this.popMatrix();


	// Left Wall
	this.windowAppearance.apply();
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.leftWall.display();
	this.popMatrix();

	this.materialDefault.apply();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(4, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	// Column
	this.pushMatrix();
		this.translate(1,0,13)
		this.rotate(-90 * degToRad,1,0,0);
		this.scale(1,1,8);
		this.column.display();
	this.popMatrix();

	//Clock
	this.defaultAppearance.apply();
	this.pushMatrix();
	this.translate(7.2,7.2,0)
	this.scale(0.7,0.7,1)
	this.clock.display();
	this.popMatrix();

	// Robot
	this.pushMatrix();
	this.translate(7.5, 0, 7.5);
	this.rotate(-3/4 * Math.PI, 0, 1, 0);
	this.robot.display();
	this.popMatrix();

	//View
	this.viewAppearance.apply();
	this.pushMatrix();
		this.translate(-7.5, 4 + 2, 7.5);
		this.rotate(Math.PI/2, 0,1,0);
		this.scale(this.viewWidth, this.viewHeight, 1);
		this.view.display();
	this.popMatrix();

	// ---- END Primitive drawing section

	this.shader.unbind();
};


LightingScene.prototype.update = function(currTime) {
	this.robot.update(currTime);
	
	if (this.lastCurrTime === -1)
  	{
  	  this.lastCurrTime = currTime;
  	  this.relTime = 0;
  	  return;
  	}

	if (this.Relogio) {
	   	this.relTime += (currTime - this.lastCurrTime);  
		this.clock.update(this.relTime);
	}

	this.lastCurrTime = currTime;
};


LightingScene.prototype.updateRobot = function() {
	this.robot.setAppearance(this.robotAppearances[this.robotAppearanceList.indexOf(this.currRobotAppearance)]);
};
