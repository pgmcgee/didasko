var TURTLE_DRAWING = "M28.589,10.903l-5.828,1.612c-0.534-1.419-1.338-2.649-2.311-3.628l3.082-5.44c0.271-0.48,0.104-1.092-0.38-1.365c-0.479-0.271-1.09-0.102-1.36,0.377l-2.924,5.162c-0.604-0.383-1.24-0.689-1.9-0.896c-0.416-1.437-1.652-2.411-3.058-2.562c-0.001-0.004-0.002-0.008-0.003-0.012c-0.061-0.242-0.093-0.46-0.098-0.65c-0.005-0.189,0.012-0.351,0.046-0.479c0.037-0.13,0.079-0.235,0.125-0.317c0.146-0.26,0.34-0.43,0.577-0.509c0.023,0.281,0.142,0.482,0.352,0.601c0.155,0.088,0.336,0.115,0.546,0.086c0.211-0.031,0.376-0.152,0.496-0.363c0.105-0.186,0.127-0.389,0.064-0.607c-0.064-0.219-0.203-0.388-0.414-0.507c-0.154-0.087-0.314-0.131-0.482-0.129c-0.167,0.001-0.327,0.034-0.481,0.097c-0.153,0.063-0.296,0.16-0.429,0.289c-0.132,0.129-0.241,0.271-0.33,0.426c-0.132,0.234-0.216,0.496-0.25,0.783c-0.033,0.286-0.037,0.565-0.009,0.84c0.017,0.16,0.061,0.301,0.094,0.449c-0.375-0.021-0.758,0.002-1.14,0.108c-0.482,0.133-0.913,0.36-1.28,0.653c-0.052-0.172-0.098-0.344-0.18-0.518c-0.116-0.249-0.263-0.486-0.438-0.716c-0.178-0.229-0.384-0.41-0.618-0.543C9.904,3.059,9.737,2.994,9.557,2.951c-0.18-0.043-0.352-0.052-0.516-0.027s-0.318,0.08-0.463,0.164C8.432,3.172,8.318,3.293,8.23,3.445C8.111,3.656,8.08,3.873,8.136,4.092c0.058,0.221,0.181,0.384,0.367,0.49c0.21,0.119,0.415,0.138,0.611,0.056C9.31,4.556,9.451,4.439,9.539,4.283c0.119-0.21,0.118-0.443-0.007-0.695c0.244-0.055,0.497-0.008,0.757,0.141c0.081,0.045,0.171,0.115,0.27,0.208c0.097,0.092,0.193,0.222,0.286,0.388c0.094,0.166,0.179,0.368,0.251,0.608c0.013,0.044,0.023,0.098,0.035,0.146c-0.911,0.828-1.357,2.088-1.098,3.357c-0.582,0.584-1.072,1.27-1.457,2.035l-5.16-2.926c-0.48-0.271-1.092-0.102-1.364,0.377C1.781,8.404,1.95,9.016,2.43,9.289l5.441,3.082c-0.331,1.34-0.387,2.807-0.117,4.297l-5.828,1.613c-0.534,0.147-0.846,0.699-0.698,1.231c0.147,0.53,0.697,0.843,1.231,0.694l5.879-1.627c0.503,1.057,1.363,2.28,2.371,3.443l-3.194,5.639c-0.272,0.481-0.104,1.092,0.378,1.363c0.239,0.137,0.512,0.162,0.758,0.094c0.248-0.068,0.469-0.229,0.604-0.471l2.895-5.109c2.7,2.594,5.684,4.123,5.778,1.053c1.598,2.56,3.451-0.338,4.502-3.976l5.203,2.947c0.24,0.138,0.514,0.162,0.762,0.094c0.246-0.067,0.467-0.229,0.603-0.471c0.272-0.479,0.104-1.091-0.377-1.362l-5.701-3.229c0.291-1.505,0.422-2.983,0.319-4.138l5.886-1.627c0.53-0.147,0.847-0.697,0.696-1.229C29.673,11.068,29.121,10.756,28.589,10.903z"
var TURTLE_ROTATION_ADJUSTMENT = 14;
var TURTLE_X_ADJUSTMENT = 16;
var TURTLE_Y_ADJUSTMENT = 16;
var SPEED = 3;

var DRAWING_AREA = $('#drawing-area').first();

// Make a paper to draw on which fills the entire screen
var PAPER = Raphael("drawing-area", "100%", "100%");

function deg2rad(deg) {
    return Math.PI * (deg / 180);
}

function distance(x1, x2, y1, y2) {
    var diffX = x1 - x2;
    var diffY = y1 - y2;

    return Math.sqrt(diffX * diffX + diffY * diffY);
}

function drawpath( canvas, pathstr, duration, attr, callback )
{
    var guide_path = canvas.path( pathstr ).attr( { stroke: "none", fill: "none" } );
    var path = canvas.path( guide_path.getSubpath( 0, 1 ) ).attr( attr );
    var total_length = guide_path.getTotalLength( guide_path );
    var last_point = guide_path.getPointAtLength( 0 );
    var start_time = new Date().getTime();
    var interval_length = 50;
    var result = path;        

    var interval_id = setInterval( function () {
	var elapsed_time = new Date().getTime() - start_time;
	var this_length = elapsed_time / duration * total_length;
	var subpathstr = guide_path.getSubpath( 0, this_length );            
	attr.path = subpathstr;

	path.animate( attr, interval_length );
	if ( elapsed_time >= duration )
	{
	    clearInterval( interval_id );
	    if ( callback != undefined ) callback();
	    guide_path.remove();
	}                                       
    }, interval_length );  
    return result;
}

function TurtleManager() {
    return {
	turtles: [],
	addTurtle: function (turtle) {
	    this.turtles.push(turtle);
	},
	allTurtlesToFront: function () {
	    $.each(this.turtles, function (idx, turtle) {
		turtle.toFront();
	    });
	}
    };
}

TURTLE_MANAGER = TurtleManager();

function AnimationQueue() {
    return {
	_actionQueue: [],
	_currentlyAnimating: false,

	animateNextAction: function () {
            if (this._actionQueue.length > 0) {
		var queuedAction = this._actionQueue.shift();
		this.animate(queuedAction);
            }
            else {
		this._currentlyAnimating = false;
            }
	},

        animate: function (action) {
	    if (action.action == 'transform') {
		var dist = distance(action.newX, action.oldX, action.newY, action.oldY);

		if (dist > 0) {
		    var time = SPEED * dist;
		} else {
		    var rotation = Math.abs(action.newRotation - action.oldRotation);
		    if (rotation > 180) {
			rotation -= 180;
		    }
		    var time = SPEED * rotation;
		}
		
		var queue = this;
		action.turtle.animate({ transform: action.transformString }, time, 'linear', function () {
		    queue.animateNextAction();
		});

		if (action.penIsDown && dist > 0) {
		    var pathString = "M" + action.oldX + "," + action.oldY + "L" + action.newX + "," + action.newY;
		    drawpath(PAPER, pathString, time, { stroke: action.color }, function() {});
		}
	    } else if (action.action = 'text') {
		var text = PAPER.text(action.x, action.y, action.text);
		text.attr(action.font);
		this.animateNextAction();
	    }

	    TURTLE_MANAGER.allTurtlesToFront();
        },

	animateAction: function (action) {
	    if(this._currentlyAnimating) {
                this._actionQueue.push(action);
            }
            else {
                this._currentlyAnimating = true;
                this.animate(action);
            }
	}
    }
}

var ANIMATION_QUEUE = AnimationQueue();

function Turtle() {
    var Turtle = {
        turtle: PAPER.path(TURTLE_DRAWING).attr({ fill: "black", stroke: "black" }),
        penIsDown: false,
        x: 28.436,
        y: 15.099,
        rotation: 0,
        _color: "#000",
        font: { 'font-family': 'Arial', 'font-size': '16px' },
        _transform: function(params, animate) {
	    animate = typeof animate !== 'undefined' ? animate : true;

            params = $.extend({
		oldX: this.x,
		oldY: this.y,
                newX: this.x,
                newY: this.y,
                oldRotation: this.rotation,
		newRotation: this.rotation
            }, params);

            /* Translate the turtle to center the drawing */
            var transformString = "T" + (params.newX - TURTLE_X_ADJUSTMENT) + "," + (params.newY - TURTLE_Y_ADJUSTMENT);
            transformString    += "R" + (params.newRotation + TURTLE_ROTATION_ADJUSTMENT);

	    if (animate) {
		var copy = $.extend(true, {}, this);
		ANIMATION_QUEUE.animateAction({
		    action: 'transform',
		    turtle: this.turtle,
		    penIsDown: this.penIsDown,
		    transformString: transformString,
		    color: this._color,
		    oldX: params.oldX,
		    oldY: params.oldY,
                    newX: params.newX,
                    newY: params.newY,
                    oldRotation: params.oldRotation,
		    newRotation: params.newRotation
		}, copy);
	    }
	    else {
		this.turtle.transform(transformString);
		if (this.penIsDown) {
		    PAPER.path("M" + params.oldX + "," + params.oldY + "L" + params.newX + "," + params.newY).attr({ stroke: this._color });
		}
	    }
        },
        penUp: function() {
            this.penIsDown = false;
        },
        penDown: function() {
            this.penIsDown = true;
        },
        remove: function() {
            this.turtle.remove();
        },
        move: function(x, y, animate) {
	    animate = typeof animate !== 'undefined' ? animate : true;

	    var oldX = this.x;
	    var oldY = this.y;

            this.x += x;
            this.y += y;

            this._transform({ 
		oldX: oldX,
		oldY: oldY,
		newX: this.x,
		newY: this.y
	    }, animate);
        },
        moveUp: function(amount) {
            this.move(0, -amount);
        },
        moveDown: function(amount) {
            this.move(0, amount);
        },
        moveLeft: function(amount) {
            this.move(-amount, 0);
        },
        moveRight: function(amount) {
            this.move(amount, 0);
        },
        color: function(color) {
            this._color = color;
            this.turtle.attr({ fill: this._color });
        },
        fontSize: function(size) {
            this.font['font-size'] = size;
        },
        fontFamily: function(family) {
            this.font['font-family'] = family;
        },
        write: function(text) {
	    ANIMATION_QUEUE.animateAction({
		action: 'text',
		text: text,
		x: this.x,
		y: this.y,
		font: this.font
	    })
        },
        rotate: function(deg) {
	    var oldX = this.x;
	    var oldY = this.y;
	    var oldRotation = this.rotation;

            this.rotation += deg;
            if (this.rotation > 180) {
                this.rotation -= 360;
            }
            else if (this.rotation <= -180) {
                this.rotation += 360;
            }

            this._transform({ 
		oldRotation: oldRotation,
		newRotation: this.rotation,
		oldX: oldX,
		oldY: oldY
	    });
        },
        moveForward: function(distance) {
            var rad = deg2rad(this.rotation);
            var x = Math.round(distance * Math.sin(rad));
            var y = Math.round(-distance * Math.cos(rad));

            this.move(x, y);
        },
        moveBackward: function(distance) {
            this.moveForward(-distance);
        }
    };

    TURTLE_MANAGER.addTurtle(Turtle.turtle);

    Turtle.move(-28.436, -15.099, false);
    Turtle.move(DRAWING_AREA.width() / 2, DRAWING_AREA.height() / 2, false);
    Turtle.rotate(0);

    return Turtle;
}

var turtle = Turtle();
turtle.penDown();
turtle.moveRight(100);
turtle.moveDown(100);
turtle.color("red");
turtle.moveLeft(100);
turtle.moveUp(100);

turtle.penUp();
turtle.moveDown(20);
turtle.fontSize('18px');
turtle.write("This is some text");
turtle.moveUp(20);


var another = Turtle();
another.color('green');
another.penDown();
another.rotate(180);

for(var i = 0; i < 4; i++) {
    another.rotate(-90);
    another.moveForward(50);
}

another.rotate(30);

another.moveBackward(150);

var third = Turtle();
third.color('blue');
third.penDown();

for(var i = 0; i < 8; i++) {
    third.moveForward(120);
    third.rotate(45);
}
