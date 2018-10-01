var PlayerRect;
var keydown;
var keyup;
var status = "idle";
var facing = "right";
var jumpSwitch = false;
var leftSwitch = false;
var rightSwitch = false;

function playerInsert()
{
    PlayerRect =
        {
            x: 300-15,
            y: canvas.height - platformArray[0].height - 100,// + (35 * i),
            width: 0,
            height: 0,
            image: null,
            tFrame: 0,
            cFrame: 0,
            counter: 0,
            sWidth: 0,
            sHeight: 0,
            dy: 0,
            dx: 0,
            moving: false,
            colliding: false,
            speed: 1
        };
}

function drawPlayer()
{
    statusChange();

    for(i=0; i < objectArray.length; i++)
    {
        if (PlayerRect.dy == 0)
        {
            if (
                PlayerRect.dx !== 0)
            {
                status = "running";
            } else
            {
                status = "idle";
            }
        }
        else if (PlayerRect.dy < 0)
        {
            status = "jumping";
        } else if (PlayerRect.dy > 0)
        {
            status = "falling";
        }
    }

    var p = PlayerRect;

    ctx.drawImage(p.image, p.cFrame * p.sWidth, 0, p.sWidth, p.sHeight, p.x, p.y, p.sWidth, p.sHeight);

    //counter means you can slow the animation speed but still have a past update
    if (p.counter === 5)
    {
        if (p.cFrame >= p.tFrame)
        {
            p.cFrame = 0;
        } else
        {
            p.cFrame++;
        }
        p.counter = 0
    }else
    {
        p.counter++;
    }

}

function statusChange()
{
    if (facing === "right")
    {
        if (status === "idle")
        {
            PlayerRect.image = $("#playerIdle").get(0);
        }
        if (status === "running")
        {
            PlayerRect.image = $("#playerRun").get(0);
        }
        if (status === "jumping")
        {
            PlayerRect.image = $("#playerJump").get(0);
        }
        if (status === "falling")
        {
            PlayerRect.image = $("#playerFall").get(0);
        }
    } else if (facing === "left")
    {
        if (status === "idle")
        {
            PlayerRect.image = $("#playerIdleLeft").get(0);
        }
        if (status === "running")
        {
            PlayerRect.image = $("#playerRunLeft").get(0);
        }
        if (status === "jumping")
        {
            PlayerRect.image = $("#playerJumpLeft").get(0);
        }
        if (status === "falling")
        {
            PlayerRect.image = $("#playerFallLeft").get(0);
        }
    }

    if (status === "idle")
    {
        PlayerRect.tFrame = 1;
        PlayerRect.sWidth = 50;
        PlayerRect.sHeight = 75;
        PlayerRect.width = 50;
        PlayerRect.height = 75;
    }
    if (status === "running")
    {
        PlayerRect.tFrame = 5;
        PlayerRect.sWidth = 287 / 6;
        PlayerRect.sHeight = 80;
        PlayerRect.width = 287 / 6;
        PlayerRect.height = 80;
    }
    if (status === "jumping")
    {
        PlayerRect.tFrame = 0;
        PlayerRect.cFrame = 0;
        PlayerRect.sWidth = 49;
        PlayerRect.sHeight = 85;
        PlayerRect.sWidth = 49;
        PlayerRect.sHeight = 85;
    }
    if (status === "falling")
    {
        PlayerRect.tFrame = 0;
        PlayerRect.cFrame = 0;
        PlayerRect.sWidth = 56;
        PlayerRect.sHeight = 77;
        PlayerRect.sWidth = 56;
        //makes sure that player is still above collision when status change
        PlayerRect.sHeight = 80;
    }
}


function playerControls() {
    $(document).keydown(function(event)
    {
        keydown = event.which;
        // Left arrow or a
        if (keydown === 37 ||
            keydown === 65)
        {
            PlayerRect.moving = true;
            leftSwitch = true;
            facing = "left";
        }
        // Right arrow or d
        if (keydown === 39 ||
            keydown === 68)
        {
            PlayerRect.moving = true;
            rightSwitch = true;
            facing = "right";
        }
        // space or up or w
        if (keydown === 32 ||
            keydown === 38 ||
            keydown === 87)
        {
            //jumpSwitch switch stops player from holding down space and repeatedly jumping
            if (!jumpSwitch)
            {
                jump();
            }
        }
    });
   $(document).keyup(function(event)
    {
        keyup = event.which;
        // Left arrow
        if (keyup === 37 ||
            keyup === 65)
        {
            PlayerRect.moving = false;
            leftSwitch = false;
        }
        // Right arrow
        if (keyup === 39 ||
            keyup === 68)
        {
            PlayerRect.moving = false;
            rightSwitch = false;
        }
    });
}

function jump()
{
  if(PlayerRect.dy == 0 &&
    !jumpSwitch)
  {
    jumpSwitch = true;
    PlayerRect.dy = - 30;
    setTimeout(function()
    {
      jumpSwitch = false;
    }, 0400);
  }

}

function playerMovement()
{

    if(leftSwitch)
    {
        if (PlayerRect.dx > -10)
        {
            PlayerRect.dx -= PlayerRect.speed;
        }
    }

    if (rightSwitch)
    {
        if (PlayerRect.dx < 10)
        {
            PlayerRect.dx += PlayerRect.speed;
        }
    }

}

function playerGravity()
{
  if ( PlayerRect.y < Height - 60)
  {
      PlayerRect.dy += grav;
      PlayerRect.x += PlayerRect.dx;
      PlayerRect.y += PlayerRect.dy;
      playerMovement();
  } else
  {
  PlayerRect.dy = 0;
  PlayerRect.y = Height - PlayerRect.height;
  clear();
  clearInterval(canvasInterval);
  failAlert();
  }

  if (PlayerRect.y <= 100)
  {
    PlayerRect.dy = -PlayerRect.dy;
    PlayerRect.y = 100;
  }
  if (PlayerRect.x <= 0 )
  {
    PlayerRect.dx = -PlayerRect.dx;
    PlayerRect.x = 0;
  }
  if (PlayerRect.x > Width - 30)
  {
    PlayerRect.dx = -PlayerRect.dx;
    PlayerRect.x = Width - PlayerRect.x;
  }
  if (PlayerRect.dx < 0.1 &&
      PlayerRect.dx > -0.1)
  {
    PlayerRect.dx = 0;
  }
}


function playerCollision()
{
    var r = objectArray;
    var p = platformArray;

    for (i=0; i < objectArray.length; i++)
    {
        //stops collision with objects if they're being dragged (avoids cheating)
        if (r[i].collisionOn)
        {
            if (PlayerRect.x < r[i].x + r[i].width &&
                PlayerRect.x + PlayerRect.width > r[i].x &&
                PlayerRect.y < r[i].y + r[i].height &&
                PlayerRect.height + PlayerRect.y > r[i].y)
            {

                if (PlayerRect.x + PlayerRect.width > r[i].x &&
                    PlayerRect.x + PlayerRect.width < r[i].x + 50 &&
                    PlayerRect.y + PlayerRect.height > r[i].y + 50)
                {
                    PlayerRect.dx = -PlayerRect.dx;
                    PlayerRect.x = r[i].x - PlayerRect.width;
                }
                else if (PlayerRect.x < r[i].x + r[i].width &&
                         PlayerRect.x > r[i].x + r[i].width - 50 &&
                         PlayerRect.y + PlayerRect.height > r[i].y + 50)
                {
                    PlayerRect.dx = -PlayerRect.dx;
                    PlayerRect.x = r[i].x + r[i].width;
                }
                else
                {
                    if (PlayerRect.y > r[i].y + r[i].height / 2 &&
                        PlayerRect.y < r[i].y + r[i].height)
                    {
                        PlayerRect.dy = -PlayerRect.dy;
                        PlayerRect.y = r[i].y + r[i].height;
                    }
                    else
                    {
                        PlayerRect.y = r[i].y - PlayerRect.height;
                        // set dy to 0 instead of -(PlayerRect.dy * elasticity) because people aren't bouncy and dy will never be 0
                        PlayerRect.dy = 0;
                    }
                }

                if (!PlayerRect.moving)
                {
                    PlayerRect.dx *= friction;
                }
            }
        }
    }

    for (j=0; j < platformArray.length; j++)
    {
        if (PlayerRect.x < (p[j].x + p[j].width) &&
            (PlayerRect.x + PlayerRect.width) > p[j].x &&
            PlayerRect.y < (p[j].y + p[j].height) &&
            (PlayerRect.height + PlayerRect.y) > p[j].y)
        {
            if ((PlayerRect.y + PlayerRect.height) > p[j].y &&
                PlayerRect.y < p[j].y + 1)
            {
                PlayerRect.y = p[j].y - PlayerRect.height;
                // set dy to 0 instead of -(PlayerRect.dy * elasticity) because people aren't bouncy and dy will never be 0
                PlayerRect.dy = 0;

                if (!PlayerRect.moving)
                {
                    PlayerRect.dx *= friction;
                }
            }

            if (PlayerRect.y > p[j].y)
            {
                if (PlayerRect.x > p[j].x + p[j].width / 2)
                {
                    PlayerRect.dx = -PlayerRect.dx;
                    PlayerRect.x = p[j].x + p[j].width;
                }
                if (PlayerRect.x < p[j].x + p[j].width / 2)
                {
                    PlayerRect.dx = -PlayerRect.dx;
                    PlayerRect.x = p[j].x - PlayerRect.width;
                }
            }
        }
    }


    var f = flagSprite;
    if (PlayerRect.x < (f.x + f.width) &&
        (PlayerRect.x + PlayerRect.width) > f.x &&
        PlayerRect.y < (f.y + f.height) &&
        (PlayerRect.height + PlayerRect.y) > f.y)
    {
        clear();
        clearInterval(canvasInterval);
        winAlert();
    }
}
