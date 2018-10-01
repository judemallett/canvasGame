var objectArray = [];
var NUMOFCRATES = 0;
var NUMOFBIGCRATES = 0;
var NUMOFLOGS = 0;
var dragSwitch = false;
var startX;
var startY;
var grav = 3;
var elasticity = 0.4;
var friction = 0.6;
var pX;
var pY;

var i = 0;
var j = 0;

function objectArrayInsert()
{
    for (i = 0; i < NUMOFCRATES; i++)
    {
        objectArray.push(
            {
                //object variables for the rects
                x: 0,
                y: 0,
                width: 30,
                height: 30,
                image: $('#crate').get(0),
                dy: 1,
                dx: 0,
                colliding: false,
                isDragging: false,
                collisionOn: false,
                gravityOn: false
            }
        );
    }
    for (i = 0; i < NUMOFBIGCRATES; i++)
    {
        objectArray.push(
            {
                x: 0,
                y: 0,
                width: 50,
                height: 50,
                image: $("#crate").get(0),
                dy: 1,
                dx: 0,
                colliding: false,
                isDragging: false,
                collisionOn: false,
                gravityOn: false
            }
        );
    }


    for (i = 0; i < NUMOFLOGS; i++)
    {
        objectArray.push(
            {
                x: 0,
                y: 0,
                width: 400,
                height: 40,
                image: $("#log").get(0),
                dy: 1,
                dx: 0,
                isDragging: false,
                collisionOn: false,
                gravityOn: false
            }
        );
    }

    for (i = 0; i < objectArray.length; i++)
    {
        if (i > 0)
        {
            objectArray[i].x = objectArray[i - 1].x + objectArray[i - 1].width + 10;
        } else
        {
            objectArray[i].x = 40;
        }
        objectArray[i].y =  50 - objectArray[i].height / 2;
    }
}

function drawRect(x, y, w, h)
{
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}



function drawObjects()
{
    var o = objectArray;

    for (i = 0; i < NUMOFCRATES; i++)
    {
        ctx.drawImage(o[i].image, o[i].x, o[i].y, o[i].width, o[i].height);
    }

    for (i = NUMOFCRATES; i < NUMOFCRATES + NUMOFBIGCRATES; i++)
    {
        ctx.drawImage(o[i].image, o[i].x, o[i].y, o[i].width, o[i].height);
    }

    for (i = NUMOFCRATES + NUMOFBIGCRATES; i < NUMOFCRATES + NUMOFBIGCRATES + NUMOFLOGS; i++)
    {
        ctx.drawImage(o[i].image, o[i].x, o[i].y, o[i].width, o[i].height);
    }

}

function objectCollision()
{
	for (i=0; i < objectArray.length; i++)
	{
		var r = objectArray;
		var p = platformArray;

		//stops collision if dragging
		if (r[i].isDragging)
        {
            r[i].collisionOn = false;
        } else
        {
            r[i].collisionOn = true;
        }

		for (j=0; j < objectArray.length; j++)
		{
            if (r[j].collisionOn === true && r[i].collisionOn === true)
            {
                //if the two rects are different
                if (i !== j)
                {
                    //if the two rects collide
                    if (r[i].x < (r[j].x + r[j].width) &&
                        (r[i].x + r[i].width) > r[j].x &&
                        r[i].y < (r[j].y + r[j].height) &&
                        (r[i].height + r[i].y) > r[j].y)
                    {
                        // if rect1 is higher
                        if (r[i].y < r[j].y) {
                            if ((r[i].y + r[i].height) >= r[j].y)
                            {
                                r[i].y = r[j].y - r[i].height;
                                r[i].dy = -(r[i].dy * elasticity);
                                r[i].dx *= friction;
                            }
                        }
                    }
                }
            }
        }
        //having collision stop when dragging means the object will stay under the mouse
        if (r[i].collisionOn)
        {
            for (j = 0; j < platformArray.length; j++)
            {
                if (r[i].x < (p[j].x + p[j].width) &&
                    (r[i].x + r[i].width) > p[j].x &&
                    r[i].y < (p[j].y + p[j].height) &&
                    (r[i].height + r[i].y) > p[j].y)
                {
                    if ((r[i].y + r[i].height) > p[j].y &&
                        r[i].y < p[j].y + 50)
                    {
                        r[i].y = p[j].y - r[i].height;
                        r[i].dy = -(r[i].dy * elasticity);
                        r[i].dx *= friction;
                    }

                    if (r[i].x < (p[j].x + p[j].width) &&
                        (r[i].x + r[i].width) > p[j].x &&
                        r[i].y < (p[j].y + p[j].height) &&
                        r[i].y > p[j].y)
                    {
                        if (
                            r[i].x > p[j].x + p[j].width - p[j].width / 2)
                        {
                            r[i].dx = -r[i].dx;
                            r[i].x = p[j].x + p[j].width;
                        }
                        if (r[i].x < p[j].x + p[j].width / 2)
                        {
                            r[i].dx = -r[i].dx;
                            r[i].x = p[j].x - r[i].width;
                        }
                    }
                }
            }
        }
    }
}


function objectGravity()
{
    var o = objectArray;

    for (i=0; i < o.length; i++)
    {
		if (o[i].isDragging)
		{
		o[i].dx = -pX;
		o[i].dy = -pY;
		}
		if (o[i].gravityOn === true)
		{
			//height needs to be one pixel above so that the boxes don't jitter
			if ( o[i].y < Height - o[i].height - 1)
			{
				o[i].dy = o[i].dy += grav;
				o[i].x += o[i].dx;
				o[i].y += o[i].dy;

			} else
			{
				o[i].dy = - o[i].dy * elasticity;
				o[i].dx *= friction;
				o[i].x += o[i].dx;
				o[i].y = Height -o[i].height;
				o[i].y += o[i].dy;
			}
			if (o[i].y <= 100 &&
                o[i].collisionOn === true)
			{
			    o[i].y = 100;
				o[i].dy = -o[i].dy;
			}
            if (o[i].x <= 0 )
            {
                o[i].dx = -o[i].dx;
                o[i].x = 0;
            }
            if (o[i].x > Width - o[i].width)
            {
                o[i].dx = -o[i].dx;
                o[i].x = Width - o[i].width;
            }

			if (o[i].dy < 0.1 &&
                o[i].dy > -0.1)
            {
                o[i].dy = 0;
            }

            if (o[i].dx < 0.1 &&
                o[i].dx > -0.1)
            {
                o[i].dx = 0;
            }
		}
    }
}
function mouseDown(e)
{
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);

    dragSwitch = false;
    for (i = 0; i < objectArray.length; i++)
    {
        var r = objectArray[i];
        if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height)
        {
            dragSwitch = true;
			r.gravityOn = false;
            r.isDragging = true;
        }
    }

    startX = mx;
    startY = my;
}

function mouseUp(e)
{
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);

    dragSwitch = false;
    for (i = 0; i < objectArray.length; i++)
    {
		var r = objectArray[i];
		if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height)
        {
			r.isDragging = false;
			r.gravityOn = true;
        }
    }
}

function mouseMove(e)
{
    if (dragSwitch)
    {
        var mx = parseInt(e.clientX - offsetX);
        var my = parseInt(e.clientY - offsetY);

        var dx = mx - startX;
        var dy = my - startY;

        for (i = 0; i < objectArray.length; i++)
        {
            var r = objectArray[i];
            if (r.isDragging)
            {
                r.x += dx;
                r.y += dy;
            }
        }


		pX = startX - mx;
		pY = startY - my;

        startX = mx;
        startY = my;

    }
}
