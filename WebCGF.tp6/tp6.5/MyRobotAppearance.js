/**
 * MyRobotApperance
 * @constructor
 */
function MyRobotAppearance(scene, name) {
    this.name = name

    this.head = new CGFappearance(scene);
    this.head.loadTexture("../resources/images/" + this.name + "_head.png");

    this.body = new CGFappearance(scene);
    this.body.loadTexture("../resources/images/" + this.name + "_body.png");

    this.shoulder = new CGFappearance(scene);
    this.shoulder.loadTexture("../resources/images/" + this.name + "_shoulder.png");

    this.arm = new CGFappearance(scene);
    this.arm.loadTexture("../resources/images/" + this.name + "_arm.png");

    this.hand = new CGFappearance(scene);
    this.hand.loadTexture("../resources/images/" + this.name + "_hand.png");

    this.top = new CGFappearance(scene);
    this.top.loadTexture("../resources/images/" + this.name + "_top.png");

    this.bottom = new CGFappearance(scene);
    this.bottom.loadTexture("../resources/images/" + this.name + "_bottom.png"); 
};

MyRobotAppearance.prototype = Object.create(Object.prototype);
MyRobotAppearance.prototype.constructor = MyRobotAppearance;