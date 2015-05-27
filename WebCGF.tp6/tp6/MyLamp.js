/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {
 	this.vertices = [];
 	this.normals = [];
	this.indices = [];
    this.alpha = (2*Math.PI)/this.slices;
    this.beta = (Math.PI/2)/this.stacks;

    // BEGIN TOPO
	for (var stack = 0; stack < (this.stacks+1); ++stack) {
	    if(stack == this.stacks){
            this.vertices.push (0,0,1);
            this.normals.push(0,0,1);
	    }else {
	        for (var slice = 0; slice < this.slices; ++slice) {
 		    this.vertices.push(Math.cos(slice*this.alpha)*Math.cos(stack*this.beta), Math.sin(slice*this.alpha)*Math.cos(stack*this.beta), Math.sin(stack*this.beta));
	 	    this.normals.push(Math.cos(slice*this.alpha)*Math.cos(stack*this.beta), Math.sin(slice*this.alpha)*Math.cos(stack*this.beta), Math.sin(stack*this.beta));
	        }
	 	}
	}

 	for (var stack = 0; stack < this.stacks; ++stack) {
 		if(stack == this.stacks-1){
			for(var slice = 0; slice < this.slices; ++slice){
				this.indices.push(stack * this.slices + slice, stack * this.slices + (slice + 1) % this.slices, this.stacks*this.slices)
			}
 		}else{
			for (var slice = 0; slice < this.slices; ++slice) {
				this.indices.push(stack * this.slices + slice, stack * this.slices + (slice + 1) % this.slices, (stack + 1) * this.slices + (slice + 1) % this.slices);
				this.indices.push(stack * this.slices + slice, (stack + 1) * this.slices + (slice + 1) % this.slices, (stack + 1) * this.slices + slice);
			}
 		}
 	}
	// END faces laterais
	
	// BEGIN base
	for (var slice = 0; slice < this.slices; ++slice) {
		this.vertices.push(Math.cos(slice*this.alpha), Math.sin(slice*this.alpha), 0);
		this.normals.push(0, 0, -1);
	}

	for (var slice = 0; slice < (this.slices -1); ++slice) {
		this.indices.push((this.stacks)*this.slices + this.slices,(this.stacks) * this.slices + (this.slices - (slice + 1)), (this.stacks) * this.slices + (this.slices - (slice + 2)));
	}
	// END bases
	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
