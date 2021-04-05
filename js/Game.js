class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
        player1 = createSprite(800,500,20,20);
        player1.collide(ground);
        player2 = createSprite(800,500,20,20);
        player1.collide(ground)
        players=[player1,player2];
    }
    
    play(){
        
        form.hide1();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;

            if(index === player.index){   
                fill("black");
                textSize(25);
                text(allPlayers[plr].name ,x-25,y+25); 
            }
        }

        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }
    
        if (frameCount % 50 === 0) {
            fruits = createSprite(1100, 500, 100, 100);
            fruits.velocityX = 5;
            fruitGroup.add(fruits);score
        }

        // Add code to destroy fruits, calculate scores and
        // update the scores to the database
        if (player.index!==null){
            if (keyCode===LEFT_ARROW){
                player.x=player.x-10;
            }
            if (keyCode===RIGHT_ARROW){
                player.x=player.x+10;
            }
            if (keyCode===32){
                player.x=player.y-10;
            }
            
    /*var score1 = database.ref("players/player1/score");
    var score2 = database.ref("players/player2/score");
    var name1 = database.ref("players/player1/name");
    var name2 = database.ref("players/player2/name");
    fill(rgb(208, 255, 0));
    text(name1,"'s Score:"+score1,20,20);
    text(name2,"'s Score:"+score2,20,40);*/
    if(player!==null){
            for (var i = 0; i < fruitGroup.length; i++) {
                if (fruitGroup.get(i).isTouching(players)) {
                    game.update(2);
                }
            }
        }
    }

        


    }

    end(){
        clear();
        fill(rgb(208, 255, 0));
        text("Game Over",20,20);
    }
}
