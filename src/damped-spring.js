var mass = 1.0; 
var dampingFactor = 0.2; 
var initialPosition = 100;
var springConstant = 0.2;
var ticks = 1; t = 0.0;

const viewport = require('./graphics/viewport');
const viewportHandle = viewport.CreateViewport('viewport', 512, 512);
viewportHandle.initialize();
window.requestAnimationFrame(draw);

var length = 150; var currentLength = length;
var springAttachedPoint = { x : 256, y: 50 };
const attachedMassSize = 50;

function draw() {
    
    const mass2 = 2 * mass;
    var frequency = Math.sqrt(springConstant / mass - (dampingFactor / mass2) * (dampingFactor / mass2));
    currentLength = length + initialPosition * Math.exp((-dampingFactor * t)/mass2) * Math.cos(frequency * t);

    t += ticks;

    viewportHandle.backgroundSolidColor(5, 205, 255);
    viewportHandle.drawVerticalSpring(springAttachedPoint, currentLength, 70);
    viewportHandle.drawFilledSquare(attachedMassSize, { x: springAttachedPoint.x, y: springAttachedPoint.y + currentLength }, 
        { x : -attachedMassSize/2, y: 0 }, { r: 200, g: 0, b: 100 });

    window.requestAnimationFrame(draw);
}

function initValues() {

    mass = 3; springConstant = 0.2; dampingFactor = 0.2; ticks = 1; initialPosition = 150;

    var txtMass = document.getElementById('mass');
    var txtDampingFactor = document.getElementById('dampingFactor');
    var txtInitialPosition = document.getElementById('initialPosition');
    var txtSpringConstant = document.getElementById('springConstant');
    var txtTicks = document.getElementById('ticks');

    txtMass.value = mass;
    txtDampingFactor.value = dampingFactor;
    txtInitialPosition.value = initialPosition;
    txtSpringConstant.value = springConstant;
    txtTicks.value = ticks;
}

function onApply() {
    var txtMass = document.getElementById('mass');
    var txtDampingFactor = document.getElementById('dampingFactor');
    var txtInitialPosition = document.getElementById('initialPosition');
    var txtSpringConstant = document.getElementById('springConstant');
    var txtTicks = document.getElementById('ticks');

    mass = parseFloat(txtMass.value); 
    dampingFactor = parseFloat(txtDampingFactor.value);
    initialPosition = parseFloat(txtInitialPosition.value);
    springConstant = parseFloat(txtSpringConstant.value);
    ticks = parseFloat(txtTicks.value);

    t = 0; 
}

window.onApply = onApply;
window.initValues = initValues;