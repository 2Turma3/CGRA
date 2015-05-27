/**
 * MyClosedCilinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClosedCilinder(scene, slices, stacks,  minS, maxS, minT, maxT, topAppearance, sideAppearance) {
	CGFobject.call(this,scene);
    
    this.top = new MyCircle(this.scene, slices);
    this.side = new MyCilinder(this.scene, slices, stacks, minS, maxS, minT, maxT);

    this.topAppearance = typeof topAppearance !== 'undifined' ? topAppearance : new CGFappearance(this.scene);
    this.sideAppearance = typeof sideAppearance !== 'undifined' ? sideAppearance : new CGFappearance(this.scene); 
};

MyClosedCilinder.prototype = Object.create(CGFobject.prototype);
MyClosedCilinder.prototype.constructor=MyClosedCilinder;

MyClosedCilinder.prototype.display = function () {
    var appliedAppearance = new CGFappearance(this.scene);

    this.sideAppearance.apply();
    this.side.display();

    this.topAppearance.apply();
    this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.top.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.top.display();
    this.scene.popMatrix();

    appliedAppearance.apply();
}