var platformArray = [];
var bgArray = [];
var bgRight = [];
var bgLeft = [];
var toolbar;
var flagSprite;
var NUMOFPLATS = 0;

function insertFlag()
{
    flagSprite = {
        image: $("#flag").get(0),
        tFrame: 9,
        cFrame: 0,
        counter: 0,
        x: platformArray[1].x + platformArray[1].width / 2,
        y: platformArray[1].y - 324,
        sWidth: 202,
        sHeight: 324,
        width: 202,
        height: 324
    }
}
function renderFlag()
{
    var f = flagSprite;

    ctx.drawImage(f.image, f.cFrame * f.sWidth, 0, f.sWidth, f.sHeight, f.x, f.y, f.sWidth, f.sHeight);

    //counter means you can slow the animation speed but still have a fast update
    if (f.counter === 2)
    {
        if (f.cFrame === f.tFrame)
        {
            f.cFrame = 0;
        } else
        {
            f.cFrame++;
        }
        f.counter = 0
    }else
    {
        f.counter++;
    }
}

function drawToolbar()
{
    toolbar =  {
      image: $("#toolbar").get(0),
      x: 0,
      y: 0,
      width: 1800,
      height: 100
    };

    var r = toolbar;
    ctx.drawImage(r.image, r.x, r.y, r.width, r.height);
}

function backgroundInsert()
{
    for (i=0; i < 4 ; i++)
    {
        bgLeft.push(
            {
                width: 1800,
                height: 400,
                image: 0,
                x: -canvas.width / 2,
                startY: 200+100*i,
                y: 100+100*i
            }
        )

        bgArray.push(
            {
                width: 1800,
                height: 400,
                image: 0,
                x: 0,
                startY: 200+100*i,
                y: 100+100*i
            }
        )

        bgRight.push(
            {
                width: 1800,
                height: 400,
                image: 0,
                x: canvas.width,
                startY: 200+100*i,
                y: 100+100*i
            }
        )
    }
    bgLeft[0].y = 100;
    bgLeft[0].startY = 100;
    bgLeft[0].image = $("#bg1").get(0);
    bgLeft[1].image = $("#bg2").get(0);
    bgLeft[2].image = $("#bg3").get(0);
    bgLeft[3].image = $("#bg4").get(0);

    bgArray[0].y = 100;
    bgArray[0].startY = 100;
    bgArray[0].image = $("#bg1").get(0);
    bgArray[1].image = $("#bg2").get(0);
    bgArray[2].image = $("#bg3").get(0);
    bgArray[3].image = $("#bg4").get(0);

    bgRight[0].y = 100;
    bgRight[0].startY = 100;
    bgRight[0].image = $("#bg1").get(0);
    bgRight[1].image = $("#bg2").get(0);
    bgRight[2].image = $("#bg3").get(0);
    bgRight[3].image = $("#bg4").get(0);
}

function parallax()
{
    for(i = 0; i < bgArray.length; i++)
    {
        bgLeft[i].x = PlayerRect.x * (i/20) - canvas.width;
        bgArray[i].x = PlayerRect.x * (i/20);
        bgRight[i].x = PlayerRect.x * (i/20) + canvas.width;

        bgLeft[i].y =  bgLeft[i].startY + PlayerRect.y * (i/100);
        bgArray[i].y = bgArray[i].startY + PlayerRect.y * (i/100);
        bgRight[i].y = bgRight[i].startY + PlayerRect.y * (i/100);
    }
}

function drawBackground()
{
    for (i=0; i < bgArray.length; i++)
    {
        var l = bgLeft[i];
        var m = bgArray[i];
        var r = bgRight[i];

        ctx.drawImage(l.image, l.x, l.y, l.width, l.height);
        ctx.drawImage(m.image, m.x, m.y, m.width, m.height);
        ctx.drawImage(r.image, r.x, r.y, r.width, r.height);
    }
}
function platformInsert()
{
    NUMOFPLATS = 2;
    img = document.getElementById("brick");
    var pat = ctx.createPattern(img,"repeat");

    for (i=0; i < NUMOFPLATS; i++)
    {
        platformArray.push(
            {
                //object variables for the rects
                width: 400,
                height: 200,
                x: 0,
                y: 0,
                cornerRadius: 15,
                fill: pat,
                colliding: false
            });
        platformArray[i].y =  canvas.height - platformArray[i].height;
    }

    platformArray[0].x = 100;
    platformArray[1].x = Width - platformArray[1].width - 100;

}


function drawPlatforms()
{
    for (i=0; i < platformArray.length; i++)
    {
        var p = platformArray[i];

        ctx.lineJoin = "round";
        ctx.lineWidth = p.cornerRadius;
        ctx.fillStyle = p.fill;

        ctx.strokeRect(p.x+(p.cornerRadius/2), p.y+(p.cornerRadius/2), p.width-p.cornerRadius, p.height + 10-p.cornerRadius);
        drawRect(p.x + 7, p.y + 7, p.width - 14, p.height);
    }
}