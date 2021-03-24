
export function CreateViewport (viewportId, width, height) {

    var handle = {
        width: width, 
        height: height,
        dom: document.getElementById(viewportId),
    };

    handle.initialize = function() {
        init(this); 
    }

    handle.backgroundSolidColor = function(red, green, blue) {
        setBackgroundColor(this, red, green, blue); 
    }

    handle.drawVerticalSpring = function(attachedAt, length, radius, iterations = 9) {
        drawVerticalSpring(handle, attachedAt, length, radius, iterations); 
    }

    handle.drawFilledSquare = function(size, location, axisShift, color) {
        drawFilledSquare(handle, size, location, axisShift, color);
    }

    return handle;
}

function init(handle) {
    handle.context = handle.dom.getContext("2d");
}

function setBackgroundColor(handle, r, g, b) {
    handle.context.clearRect(0, 0, handle.dom.width, handle.dom.height);
    handle.context.fillStyle = "rgb(" + r + ',' + g + ',' + b + ")";
    handle.context.fillRect(0, 0, handle.dom.width, handle.dom.height);
}

function drawVerticalSpring(handle, attachedAt, length, radius, iterations = 9) {
    handle.context.lineWidth = 2;
    handle.context.beginPath();
    handle.context.moveTo(attachedAt.x, attachedAt.y);
    var prevX = attachedAt.x; var prevY = attachedAt.y;
    var gap = (length / iterations) / 3;
    for(var i=0;i<iterations;i++) {
        handle.context.bezierCurveTo(prevX + radius, prevY + gap, prevX - radius, prevY + 2 * gap, prevX, prevY + 3 * gap);
        prevY = prevY + 3 * gap;
    }
    handle.context.stroke();
}

function drawFilledSquare(handle, size, location, axisShift, color) {
    handle.context.fillStyle = "rgb(" + color.r + ',' + color.g + ',' + color.b + ")";
    handle.context.fillRect(location.x + axisShift.x, location.y + axisShift.y, size, size);
}