var total = 12;
var loop = 1;
var result = 0;
$(function () {
    btn_go = $("#btn_go");
    game_center = $("#game_center");
    game_win_light = $("#game_win_light");
    game_bg_1 = $("#game_bg_1");
    for (i = 1; i <= total; i++) {
        item_text_now = $("#item_text_" + i);
        item_text_now.show();
        TweenMax.to(item_text_now, 1, {
            rotation: get_text_angle(i),
            onComplete: function () {

                if (game_demo == 1) {
                    demo();
                } else {
                    btn_go.show();
                }
            }
        });
    }
    TweenMax.to(btn_go, 0.5, {
        scale: 1.5,
        repeat: -1,
        yoyo: true
    });
    TweenMax.from(game_bg_1, 1, {
        rotation: -360,
        opacity: 0
    });
    TweenMax.from(game_center, 1, {
        delay: 1,
        opacity: 0,
        scale: 4
    });

    TweenMax.from(game_win_light, 1, {
        delay: 1.5,
        opacity: 0,
        scale: 4
    });
});

function demo() {
    TweenMax.to(game_bg_1, 5, {
        delay: 2,
        rotation: +get_angle_1(rand(1, 12)),
        ease: "Circ.easeInOut",
        onComplete: function () {
            demo();
        }
    });
}

function rand(min, max) {
    return Math.floor(Math.random() * max) + min;
}
function get_angle_1(re) {
    angle = (360 * 1 * loop) + re * -(360 / total) + 360 / total;
    loop += 1;
    return angle;
}
function get_angle(re) {
    angle = (360 * 6 * loop) + re * -(360 / total) + 360 / total;
    loop += 1;
    return angle;
}

function get_text_angle(re) {
    angle = 360 + re * (360 / total) - (360 / total / 2) + 90 - (360 / total / 2);
    return angle;
}

function go() {
    btn_go.hide();

    $.post(curUrl, {
        act: 'go'
    }, function (data) {

        if (data.status == -88) {
            alert(data.msg);

            btn_go.show();
            return;
        }
        if (data.status == -99) {
            alert(data.msg);

            btn_go.show();
            return;
        }
        result = data.result;

        if (data.status == 1) {



            if (result == 0) {
                alert(data.msg);
                return;
            }


            $("#total_turn").html(data.point);
            TweenMax.to(game_bg_1, 5, {
                rotation: +get_angle(result),
                ease: "Circ.easeInOut",
                onComplete: done_spin
            });
        } else {
            btn_go.show();
            if (data.status == -1) {
                alert(data.msg);

            }
            if (data.status == 0) {
                alert(data.msg);

            }
        }
    }, 'json');
}

function done_spin() {
    win_text = $("#item_text_" + result);
    win_img = $("#item_text_" + result + " img");
    TweenMax.to(game_win_light, .5, {
        yoyo: true,
        repeat: 2,
        opacity: 1,
    });


    //load_history(page_now);
    TweenMax.from(win_text, .5, {
        yoyo: true,
        repeat: 2,
        opacity: 0,
        onComplete: show_result
    });
    /* TweenMax.from(win_img, .5, {
         yoyo: true,
         repeat: 2,
         scale: 5
     });*/
}



function show_result() {
    /*   if(result==12)
      {
          text="";
      }
      else
      {
          text="Congratulation, you have just won\n\n";
      }
      alert(text+item_list[result]); */
    btn_go.show();
    get_history();



}