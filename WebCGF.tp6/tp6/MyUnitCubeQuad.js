/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCubeQuad(scene) {
	CGFobject.call(this,scene);
	this.quad = new MyQuad(this.scene, 0.0, 1.0, 0.0, 1.0);
	this.quad.initBuffers();
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function () {
    this.scene.pushMatrix();

    this.scene.translate(0.0, 0.0, 0.5);
    this.quad.display(); // face paralela XY, Z positivo
    
    this.scene.popMatrix();
    this.scene.pushMatrix();
    
    this.scene.rotate(Math.PI/2, 0.0, 1.0, 0.0);
    this.scene.pushMatrix();

    this.scene.translate(0.0, 0.0, 0.5);
    this.quad.display(); // face paralela YZ, X positivo
    this.scene.popMatrix();

    this.scene.rotate(Math.PI/2, 0.0, 1.0, 0.0);
    this.scene.pushMatrix();

    this.scene.translate(0.0, 0.0, 0.5);
    this.quad.display(); // face paralela XY, Z negativo
    this.scene.popMatrix();

    this.scene.rotate(Math.PI/2, 0.0, 1.0, 0.0);
    this.scene.pushMatrix();

    this.scene.translate(0.0, 0.0, 0.5);
    this.quad.display(); // face paralela YZ, X negativo
    this.scene.popMatrix();
	this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2, 1.0, 0.0, 0.0);
    this.scene.translate(0.0, 0.0, 0.5);
    this.quad.display(); // face paralela XZ, Y negativo
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/2, 1.0, 0.0, 0.0);
    this.scene.translate(0.0, 0.0, 0.5);
    this.quad.display(); // face paralela XZ, Y positivo
    this.scene.popMatrix();
}