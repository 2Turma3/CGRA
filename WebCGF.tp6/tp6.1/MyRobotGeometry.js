/**
 * MyRobotGeometry
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyRobotGeometry(scene) {
	CGFobject.call(this,scene);
    
    this.initBuffers();
};

MyRobotGeometry.prototype = Object.create(CGFobject.prototype);
MyRobotGeometry.prototype.constructor=MyRobotGeometry;

MyRobotGeometry.prototype.initBuffers = function () {
    this.vertices = [ 0.5, 0.3, 0.0,
                    -0.5, 0.3, 0.0,
                     0.0, 0.3, 2.0,
                     0.5, 0.3, 0.0,
                    -0.5, 0.3, 0.0,
                     0.0, 0.3, 2.0 ];
    
    this.normals = [ 0, 0,  1,
                    0, 0,  1,
                    0, 0,  1,
                    0, 0, -1,
                    0, 0, -1,
                    0, 0, -1 ];

    this.indices = [0, 1, 2,
                   3, 5, 4 ];

    this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers(); 
}