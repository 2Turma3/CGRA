/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene) {
	CGFobject.call(this,scene);
	this.hand = new MyUnitCubeQuad(this.scene);
	this.angle = 0;
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.display = function () {
   this.scene.pushMatrix();
   this.scene.rotate(-Math.PI*this.angle/180,0,0,1);
   this.scene.translate(0, 0.5, 0);
   this.scene.scale(0.08,1,0.08);
   this.hand.display();
   this.scene.popMatrix();
}


MyClockHand.prototype.setAngle = function(angle){
    this.angle = angle;
}