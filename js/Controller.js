class Controller {
    constructor(){
        this.boardGenerator = new BoardGenerator();
        this.a = 10;
        this.b = 10;
        this.bombs = 15;
        this.boardArray = this.boardGenerator.generateBoard(this.a, this.b, this.bombs);
        this.game = this.startGame(this.boardArray);
        this.initGUIElements();
        this.initSquares();
    }

    initGUIElements(){
        let self = this;
        $('#create-game-btn').on('click', function(){
            self.boardArray = self.boardGenerator.generateBoard(self.a, self.b, self.bombs);
            self.initSquares();
            console.log(self.boardArray)
            self.game = self.startGame(self.boardArray);
        })
        
    }
    initSquares(){
        let self = this;
        $('.square').on('click',function(){
            self.game.click(this.id);
        });
        $('.square').contextmenu(function(){
            self.game.setFlag(this.id);
        });
        console.log('squares test');
    }
    startGame(boardArray){
        return new Game(boardArray,this.a, this.b, this.bombs);
    }
}