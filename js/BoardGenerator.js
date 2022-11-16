class BoardGenerator {
    $board = $('#board');

    constructor(){
        
    }
    


    generateBoard(a, b, bombs){
        this.$board.empty();
        //this.$board.html('a:' + a + ' ,b: ' + b + ' ,bomb: ' + bombs);
        let boardArray = [];
        let id = 0;
        let bombArray = this.createBombs(bombs, a*b + 1);
        console.log(bombArray);
        for(let i = 0; i < a; i++){
            
            for(let j = 0; j < b; j++){
                let square = {
                    id: id,
                    x: i,
                    y: j,
                    bomb: false,
                    clicked: false,                    
                };
                if(bombArray.includes(id)){
                    square.bomb = true;
                }
                id++;
                boardArray.push(square);
            }
        }
        console.log(boardArray);
        boardArray.forEach(this.createSquare)
        return boardArray;

    }
    createBombs(bombs, fieldsize){
        //console.log("bomb ok")
        let bombArray = [];
        let i = 0;
        while(i < bombs){
            let randomBomb = Math.floor(Math.random() * fieldsize);
            console.log(randomBomb);
            if(bombArray.includes(randomBomb) == false){
                bombArray.push(randomBomb);
                i++;
            }
            console.log(bombArray);
        }
        return bombArray;

    }
    createSquare(square){
        
            let $square = $('<div>');
            $square.addClass('square');
            $square.attr('id', square.id);
            console.log($square);
            $('#board').append($square);
            //console.log(this.$board);
            //this.$board.append($button);
        
    }
}