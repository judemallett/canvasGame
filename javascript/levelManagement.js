var canvas;
var ctx;
var bounding;
var offsetX;
var offsetY;
var Width;
var Height;
var canvasInterval;
var currentLevel = 0;
var restartSwitch = false;

function startGame()
{
    canvas = $("#canvas").get(0);
    ctx = canvas.getContext("2d");
    bounding = canvas.getBoundingClientRect();
    offsetX = bounding.left;
    offsetY = bounding.top;
    canvas.height = 900;
    canvas.width = 1800;
    Width = canvas.width;
    Height = canvas.height;

    backgroundInsert();
    objectArrayInsert();
    platformInsert();
    playerInsert();
    playerControls();
    insertFlag();


    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;
    canvas.onmousemove = mouseMove;
    canvasInterval = setInterval(update, 20);
}


function restart()
{
    // run clear and clearInterval before running
    objectArray = [];

    objectArrayInsert();

    for (var i=0; i < objectArray.length; i++)
    {
        if (i > 0)
        {
            objectArray[i].x = objectArray[i - 1].x + objectArray[i - 1].width + 10;
        } else
        {
            objectArray[i].x = 40;
        }
        objectArray[i].y =  50 - objectArray[i].height / 2;
        objectArray[i].isDragging = false;
        objectArray[i].collisionOn = false;
        objectArray[i].gravityOn = false;
    }

    platformArray[0].x = 100;
    platformArray[1].x = Width - platformArray[1].width - 100;


    PlayerRect.x = 300-15;
    PlayerRect.y = canvas.height - platformArray[0].height - 60 - 200;// + (35 * i),
    PlayerRect.dx = 0;
    PlayerRect.dy = 1;

    canvasInterval = setInterval(update, 20);
}


function clear()
{
    ctx.clearRect(0, 0, Width, Height);
}

function nextLevel()
{
    if (currentLevel === 1)
    {
        restartSwitch = true;
        level2();
    } else if (currentLevel === 2)
    {
        restartSwitch = true;
        level3();
    } else if (currentLevel === 3)
    {
        restartSwitch = true;
        level2();
    }
}

function level1()
{
    currentLevel = 1;

    NUMOFCRATES = 3;
    NUMOFBIGCRATES = 3;
    NUMOFLOGS = 1;
    if (restartSwitch)
    {
        restart();
        restartSwitch = false;
    } else
    {
        startGame();
    }
}
function level2()
{
    currentLevel = 2;

    NUMOFCRATES = 0;
    NUMOFBIGCRATES = 0;
    NUMOFLOGS = 1;
    if (restartSwitch)
    {
        restart();
        restartSwitch = false;
    } else
    {
        startGame();
    }
}
function level3()
{
    currentLevel = 3;

    NUMOFCRATES = 2;
    NUMOFBIGCRATES = 2;
    NUMOFLOGS = 0;
    if (restartSwitch)
    {
        restart();
        restartSwitch = false;
    } else
    {
        startGame();
    }
}

function update()
{
    clear();

    //world.js
    parallax();
    drawToolbar();
    drawBackground();
    drawPlatforms();
    renderFlag();

    //objects.js
    drawObjects();
    objectGravity();
    objectCollision();

    //player.js
    drawPlayer();
    playerGravity();
    playerCollision();


}
