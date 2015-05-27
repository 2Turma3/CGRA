/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

	this.cube=new MyUnitCubeQuad(this.scene);
	this.woodMaterial = new CGFappearance(this.scene);
	this.woodMaterial.setDiffuse(0.4, 0.2, 0.0, 1.0);
	this.woodMaterial.setSpecular(0.4, 0.2, 0.0, 0.2);
	this.woodMaterial.setAmbient(0.2, 0.1, 0.0, 1);
	this.woodMaterial.setShininess(50);
	this.woodMaterial.loadTexture("../resources/images/table.png");
	this.metalMaterial = new CGFappearance(this.scene);
	this.metalMaterial.setDiffuse(0.329, 0.329, 0.329, 1.0);
	this.metalMaterial.setSpecular(0.329, 0.329, 0.329, 0.7);
	this.metalMaterial.setAmbient(0.1, 0.1, 0.1, 1.0);
	this.metalMaterial.setShininess(150);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {

	// TAMPO DA MESA
    this.scene.pushMatrix();
    this.woodMaterial.apply();
    this.scene.translate(0,3.5+0.3/2,0);
    this.scene.scale(5,0.3,3);
    this.cube.display();
    this.scene.popMatrix();


    //4 PERNAS
    this.scene.pushMatrix();
	this.metalMaterial.apply();
    //Perna de -z e -x
    this.scene.pushMatrix();
    this.scene.translate(-(2.5-0.3),1.75,-(1.5-0.3));
    this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    //Perna de -z e +x
    this.scene.pushMatrix();
    this.scene.translate(+(2.5-0.3),1.75,-(1.5-0.3));
    this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    //Perna de +z e +x
    this.scene.pushMatrix();
    this.scene.translate(+(2.5-0.3),1.75,+(1.5-0.3));
    this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();
    
    //Perna de +z e -x
    this.scene.pushMatrix();
    this.scene.translate(-(2.5-0.3),1.75,+(1.5-0.3));
    this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
}

