/**
 * MyWindowedWall
 * @constructor
 */
function MyWindowedWall(scene, windowAppearance, frameLeft, frameTop, frameWidth, frameHeight, windowLeft, windowTop, windowWidth, windowHeight) {
    CGFobject.call(this,scene);

    this.windowAppearance = windowAppearance;
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
    this.frameLeft = frameLeft;
    this.frameTop = frameTop; 
    this.frameWidth = frameWidth; 
    this.frameHeight = frameHeight; 
    this.windowLeft = windowLeft; 
    this.windowTop = windowTop; 
    this.windowWidth = windowWidth; 
    this.windowHeight = windowHeight;

    this.wallTopLeft = new Plane(this.scene, 24, this.sValue(0), this.sValue(this.windowLeft + this.windowWidth), this.tValue(0), this.tValue(this.windowTop));
    this.wallTopRight = new Plane(this.scene, 24, this.sValue(this.windowLeft + this.windowWidth), this.sValue(1), this.tValue(0), this.tValue(this.windowTop + this.windowHeight));
    this.wallBottomRight = new Plane(this.scene, 24, this.sValue(this.windowLeft), this.sValue(1), this.tValue(this.windowTop + this.windowHeight), this.tValue(1));
    this.wallBottomLeft = new Plane(this.scene, 24, this.sValue(0), this.sValue(this.windowLeft), this.tValue(this.windowTop), this.tValue(1)); 
}

MyWindowedWall.prototype = Object.create(CGFobject.prototype);
MyWindowedWall.prototype.constructor = MyWindowedWall;

MyWindowedWall.prototype.display = function() {
    var apliedAppearance = new CGFappearance(this.scene);
    this.windowAppearance.apply();

    this.scene.pushMatrix();
        this.scene.translate(-this.windowLeft/2,this.windowHeight/2 + this.windowTop/2, 0);
        this.scene.scale(this.windowWidth + this.windowLeft,this.windowTop, 1)
        this.wallTopLeft.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(this.windowWidth/2 +this.windowLeft/2, this.windowTop/2 ,0)
        this.scene.scale(1-(this.windowWidth + this.windowLeft),this.windowTop + this.windowHeight, 1);
        this.wallTopRight.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(this.windowLeft/2, -(this.windowHeight/2 + this.windowTop/2),0);
        this.scene.scale(1-this.windowLeft,1-(this.windowTop + this.windowHeight), 1)
        this.wallBottomRight.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(-(this.windowWidth/2 +this.windowLeft/2), -this.windowTop/2,0);
        this.scene.scale(this.windowLeft,1-this.windowTop, 1);
        this.wallBottomLeft.display();
    this.scene.popMatrix();

    apliedAppearance.apply();
}

MyWindowedWall.prototype.sValue = function(x) {
    return (x- this.frameLeft) / this.frameWidth;
}

MyWindowedWall.prototype.tValue = function(y) {
    return (y - this.frameTop) / this.frameHeight;
}