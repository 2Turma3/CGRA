/**
 * MyClock
 * @constructor
 */
 function MyClock(scene) {
 	CGFobject.call(this,scene);

 	this.body = new MyCilinder(this.scene, 12, 1);
 	this.top = new MyCircle(this.scene, 12);

 	this.hourHand = new MyClockHand(this.scene);
 	this.minHand = new MyClockHand(this.scene);
 	this.secHand = new MyClockHand(this.scene);

  	this.secHand.setAngle(45 * 360 / 60);
 	this.minHand.setAngle((30 + 45 / 60) * 360 / 60);
 	this.hourHand.setAngle((3 + 30 / 60 + 45 / (60 * 60)) * 360 / 12);

 	this.clockAppearance = new CGFappearance(this.scene);
 	this.clockAppearance.loadTexture("../resources/images/clock.png");

    this.clockHandAppearance = new CGFappearance(this.scene);
    this.clockHandAppearance.setAmbient(0.3,0.3,0.3,1);
	this.clockHandAppearance.setDiffuse(0.0,0.0,0.0,1);
	this.clockHandAppearance.setSpecular(0.1,0.1,0.1,1);
	this.clockHandAppearance.setShininess(50);

	this.lastCurrTime = -1;
};

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function() {
 	var appliedAppearance = new CGFappearance(this.scene);

    this.scene.pushMatrix();
    this.scene.scale(1,1,0.2);
 	this.body.display();
 	this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0,0,0.21);
    this.clockAppearance.apply();
 	this.top.display();
 	this.scene.popMatrix();

 	this.clockHandAppearance.apply();
    
    this.scene.pushMatrix();
    this.scene.translate(0,0,0.24);
    this.scene.scale(0.4, 0.4, 0.4);
    this.hourHand.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,0,0.24);
    this.scene.scale(0.6, 0.6, 0.6);
    this.minHand.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.scene.translate(0,0,0.24);
    this.scene.scale(0.8, 0.8, 0.8);
    this.secHand.display();
    this.scene.popMatrix();

    
	appliedAppearance.apply();
 };

MyClock.prototype.update = function(currTime) {
  	if (this.lastCurrTime === -1)
  	{
  	  this.lastCurrTime = currTime;
  	  return;
  	}

    var delta = (currTime - this.lastCurrTime) / 1000; 
    this.lastCurrTime = currTime; 	

 	this.secHand.setAngle(this.secHand.angle + delta * 360 / 60 );
 	this.minHand.setAngle(this.minHand.angle + delta * 360 / (60 * 60));
 	this.hourHand.setAngle(this.hourHand.angle + delta * 360 / (12 * 60 * 60));
};