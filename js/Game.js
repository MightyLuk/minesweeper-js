class Game {
    constructor(boardArray, a, b, bombs){
        this.boardArray = boardArray;
        this.totalx = a;
        this.totaly = b;
        this.bombs = bombs;
        this.clickCount = a*b - bombs;
        console.log('new Game');
    }
    click(id){
        
        if(($('#' +id).hasClass('flag') == false) && (this.boardArray[id].clicked == false)){
            $('#'+id).addClass('square-clicked');
            this.checkSquare(id);
        };
        
    }
    setFlag(id){
        console.log("flag: "+ id);
        if(this.boardArray[id].clicked == false){
            $('#'+id).toggleClass('flag');
        }
    }
    checkSquare(id){
        this.boardArray[id].clicked = true;
        $('#'+id).addClass('square-clicked');
        if(this.boardArray[id].bomb == true){
            $('#'+id).addClass('bomb');
            $('#'+id).addClass('explode');
            this.gameLost();
        } else {
            let nearBombs = this.checkSurrounding(id);
            if(nearBombs > 0){
                $('#'+id).html(nearBombs);
                $('#'+id).addClass('danger-'+nearBombs);
            }
            this.clickCount--;
            console.log(this.clickCount)
            if(this.clickCount == 0){
                this.gameWon();
            }
            
        }
        console.log(id);
    }
    gameLost(){
        this.boardArray.forEach(square => {
            if(square.clicked == false){
                this.boardArray[square.id].clicked = true;
                if(square.bomb == true){
                    $('#'+square.id).removeClass('flag');
                    $('#'+square.id).addClass('bomb');
                }
            }
        });
    }
    gameWon(){
        this.boardArray.forEach(square => {
            if(square.clicked == false){
                this.boardArray[square.id].clicked = true;
                if(square.bomb == true){
                    $('#'+square.id).removeClass('flag');
                    $('#'+square.id).addClass('bomb');
                    $('#'+square.id).addClass('game-won');
                }
            }
        });
    }
    getSquareByCoordinates(x, y){
        for(let square of this.boardArray){
            if(square.x == x && square.y == y){
                return square;
            }
        }
        

    }
    checkSurrounding(id){
        let nearBombs = 0;
        //n
        let n = this.getSquareByCoordinates(this.boardArray[id].x-1, this.boardArray[id].y);
        if(n != null && n.bomb == true){
            nearBombs++;
        }
        //ne
        let ne = this.getSquareByCoordinates(this.boardArray[id].x-1, this.boardArray[id].y+1);
        if(ne != null && ne.bomb == true){
            nearBombs++;
        }
        //e
        let e = this.getSquareByCoordinates(this.boardArray[id].x, this.boardArray[id].y+1);
        if(e != null && e.bomb == true){
            nearBombs++;
        }
        //se
        let se = this.getSquareByCoordinates(this.boardArray[id].x+1, this.boardArray[id].y+1);
        if(se != null && se.bomb == true){
            nearBombs++;
        }
        //s
        let s = this.getSquareByCoordinates(this.boardArray[id].x+1, this.boardArray[id].y);
        if(s != null && s.bomb == true){
            nearBombs++;
        }
        //sw
        let sw = this.getSquareByCoordinates(this.boardArray[id].x+1, this.boardArray[id].y-1);
        if(sw != null && sw.bomb == true){
            nearBombs++;
        }
        //w
        let w = this.getSquareByCoordinates(this.boardArray[id].x, this.boardArray[id].y-1);
        if(w != null && w.bomb == true){
            nearBombs++;
        }
        //nw
        let nw = this.getSquareByCoordinates(this.boardArray[id].x-1, this.boardArray[id].y-1);
        if(nw != null && nw.bomb == true){
            nearBombs++;
        }
       console.log(nearBombs);
       if(nearBombs == 0){
        if(n != null){
            this.click(n.id);
        }
        if(ne != null){
            this.click(ne.id);
        }
        if(e != null){
            this.click(e.id);
        }
        if(se != null){
            this.click(se.id);
        }
        if(s != null){
            this.click(s.id);
        }
        if(sw != null){
            this.click(sw.id);
        }
        if(w != null){
            this.click(w.id);
        }
        if(nw != null){
            this.click(nw.id);
        }
       }
       return nearBombs;

    }
}