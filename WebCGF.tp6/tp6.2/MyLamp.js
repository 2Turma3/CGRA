/**
 * MyLamp
 * @constructor
 */
function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.top = new MyHemisphere(scene, slices, stacks);
	this.bottom = new MyCircle(scene, slices, stacks);

 	this.initBuffers();
};
MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.display = function() {
	this.top.display();

	this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.bottom.display();
	this.scene.popMatrix();
}