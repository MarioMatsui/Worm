window.onload = function() {

    var stage = document.getElementById("stage");
    var ctx = stage.getContext("2d");

    var pontos = 0;
    var best_score = 0;

    var direction = '';
    var continua = false;
    var endgame = false;

    var fps = 80

    setInterval(game,fps);

    document.addEventListener("keydown",keyPush);
    document.getElementById("btn_recomeco").addEventListener("click",start_again)
    var vel = 1;

    var vx = 0;
    var vy = 0;

    var px = 3;
    var py = 3;

    var tp = 25;
    var qp = 20;

    var tail = 5;
    var trail = [];

    var ax = Math.floor(Math.random()*qp);
    var ay = Math.floor(Math.random()*qp);

    function game() {

        px += vx;
        py += vy;

        if (px < 0){
            px = qp-1;
        }

        if (px > qp-1){
            px = 0;
        }

        if (py < 0){
            py = qp-1;
        }

        if (py > qp-1){
            py = 0
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0,0,stage.width,stage.height);

        ctx.fillStyle = "red";
        ctx.fillRect(ax*tp,ay*tp,tp,tp);

        ctx.fillStyle = "gray";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x*tp,trail[i].y*tp, tp-1, tp-1);

            if (continua && trail[i].x == px && trail[i].y == py) {
                game_over();
            }

        }

        trail.push({x:px,y:py});

        while (trail.length > tail){
            trail.shift();
        }

        if (ax == px && ay == py) {
            tail ++;

            pontos += 10;

            if(best_score < pontos){
                best_score = pontos;
            }

            reescrever_pontos();

            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);
        }
    }

    function keyPush(event) {

        if (!endgame){
            continua = true;
        }

            switch (event.keyCode) {
                case 37:
                    if(direction != "RIGHT"){
                        direction = "LEFT";
                    }
                move_snake();
                break;

                case 40:
                    if(direction != "UP"){
                        direction = "DOWN";
                    }
                move_snake();
                break;

                case 39:
                    if(direction != "LEFT"){
                        direction = "RIGHT";
                    }
                move_snake();
                break;

                case 38:
                if(direction != "DOWN"){
                        direction = "UP";
                    }
                move_snake();
                break;
            }
        }
    function move_snake(){
        switch(direction){
            case "LEFT":
            vx = -vel;
            vy = 0;
            break;

            case "RIGHT":
            vx = vel;
            vy = 0;
            break;

            case "UP":
            vx = 0;
            vy = -vel;
            break;

            case "DOWN":
            vx = 0;
            vy = vel;
            break;
        }
    }

    function reescrever_pontos(){
        document.getElementById("pontos").innerHTML = pontos;
        document.getElementById("best_score").innerHTML = best_score;
    }
    function game_over(){
        document.getElementById("game_over").style = "display:inline"
        vx = 0;
        vy = 0;

        tail = 5;
        vel = 0;

        continua = false;
        endgame = true;
    }
    function start_again() {
        pontos = 0;
        reescrever_pontos();
        px = 3;
        py = 3;
        vel = 1;
        vx = 1;
        end_game = false;
        continua = true;
        document.getElementById("game_over").style = "display:none"
    }
}