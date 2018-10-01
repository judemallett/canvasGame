$(function()
{
    swal({
        title: "Select a level",
        buttons: {
            lvl1: {
                text: "level 1",
                value: "lvl1",
            },
            lvl2: {
                text: "level 2",
                value: "lvl2",
            },
            lvl3: {
                text: "level 3",
                value: "lvl3",
            },
        },
    })
        .then((value) => {
        switch (value) {

        case "lvl1":
            level1();
            break;

        case "lvl2":
            level2();
            break;

        case "lvl3":
            level3();
            break;
        }
    })
});


function failAlert()
{
    swal({
        title: "Level Failed",
        text: "You hit the ground",
        icon: "error",
        button: {
            text: "try again?",
            value: "restart",
        }
    })
        .then((value) => {
        restart();

    });
}

function winAlert()
{
  if (currentLevel === 3)
  {
    swal({
      title:"Game Complete!",
      text: "You did it",
      icon: "success",
      button: {
        text: "restart?",
        value: "restart",
      }
    })
    .then((value) => {
        location.reload();
    });
  } else
  {
    swal({
        title: "Level Passed",
        text: "You did it",
        icon: "success",
        buttons: {
            restart: {
                text: "try again?",
                value: "restart",
            },
            lvl2: {
                text: "next level",
                value: "next",
            },
          },
        })
        .then((value) => {
          switch (value) {

          case "next":
              nextLevel();
              break;

          case "restart":
              restart();
              break;
          }
    });
  }
}
