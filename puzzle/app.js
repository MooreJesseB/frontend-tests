(function() {
    function Board(size) {
        this.size = size;
        this.length = Math.sqrt(this.size + 1);
        this.tileMatrix = [];
    }

    /*
        Set up a new 2d array to represent the board.
        With a 0 standing in for the blank space (not in DOM!)
    */
    Board.prototype.buildBoard = function() {
        var counter = 0
        var matrix = [];
        
        if (length !== Math.round(length)) {
            alert("Invalid board size! Must be a true square - 1")
            return;
        }
        
        for (var i = 0; i < this.length; i++) {
            this.tileMatrix[i] = [];
            for(var j = 0; j < this.length; j++) {
                counter++;
                this.tileMatrix[i][j] = counter <= this.size ? counter : 0;
            }
        }

        this.renderBoard({ emptyCoords: {y: 2, x: 2}});
    }

    /*
        Rendering is where the blank space get represented.
        It exists solely as a tile sized margin on an adjacent tile.
    */
    Board.prototype.renderBoard = function(options) {
        var marginCoords = {};
        var emptyCoords = options.emptyCoords;
        var tiles = document.getElementsByClassName('tile');
        var marginValue = 0
        var left = false;

        // emptyCoords is the location in the matrix where the empty tile is located.
        if (emptyCoords.x === 0) {
            marginCoords = {y: emptyCoords.y, x: emptyCoords.x + 1}
            left = true;

        /* 
            marginCoords is the location in the matrix of the tile that needs to
            have a margin applied (left or right depending on location of empty)
        */
        } else {
            marginCoords = {y: emptyCoords.y, x: emptyCoords.x - 1}
            left = false;
        }

        // marginValue is the value of the innerText of the tile to be styled.
        marginValue = this.tileMatrix[marginCoords.y][marginCoords.x];

        /* 
            Iterate through the tiles, adding a margin to the right tile and
            stripping any inline styling from all of the other tiles.
        */
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            if (parseInt(tile.innerText) === marginValue) {
                if (left) {
                    tile.style.cssText = 'margin-left: 70px'
                    continue;
                } else {
                    tile.style.cssText = 'margin-right: 70px'
                    continue;
                }
            }
            tile.style.cssText = '';
        }
    }

    // Set up click event listeners and handlers for each of the tiles on the board.
    Board.prototype.setListeners = function() {
        var tiles = document.getElementsByClassName('tile');
        var self = this;

        for(var i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener('click', function(item) {
                self.handleTileClick(this);
            })
        }
    }

    /*
        On click, get the innerText of the clicked element.
        Use it to determine the coordinates of the value in the matrix.
        Check if there is an adjacent 'empty' tile.
        If so then move to swapping the tile and the empty.
    */
    Board.prototype.handleTileClick = function(el) {
        var coords = {};
        var emptyCoords = {};
        var value = parseInt(el.innerText);

        for(var i = 0; i < this.length; i++) {
            var index = this.tileMatrix[i].indexOf(value);
            
            if (index !== -1) {
                coords = {
                    x: index,
                    y: i
                }
                break;
            }
        }

        emptyCoords = this.checkForEmpty(coords);

        if (emptyCoords) {
            this.changePlaces({ coords: coords, emptyCoords: emptyCoords})
        }
    }

    /*
        Using clicked tile coords, check top, right, bottom, and left positions
        in the matrix to see if the 'empty' is there. 
        If so return the coords of the 'empty' 
    */
    Board.prototype.checkForEmpty = function(coords) {
        // Coords of each position cardinal to clicked tile
        var top = { x: coords.x, y: coords.y - 1};
        var right = { x: coords.x + 1, y: coords.y};
        var bottom = { x: coords.x, y: coords.y + 1};
        var left = { x: coords.x -1, y: coords.y};

        var matrix = this.tileMatrix

        // If 'empty' found then return it's coords.
        if (top.y >= 0 && matrix[top.y][top.x] === 0) return top;
        if (right.x < matrix.length && matrix[right.y][right.x] === 0) return right;
        if (bottom.y < matrix.length && matrix[bottom.y][bottom.x] === 0) return bottom;
        if (left.x >= 0 && matrix[left.y][left.x] === 0) return left;

        return null;
    }

    /*
        Swap the value of the clicked tile and the 'empty' in the matrix.
        Then generate a sequential list of all of the values to reassign
        the innerText of each tile.
    */
    Board.prototype.changePlaces = function(options) {
        var coords = options.coords;
        var emptyCoords = options.emptyCoords;
        var tileValue = this.tileMatrix[coords.y][coords.x];
        var tiles = document.getElementsByClassName('tile');
        var values = [];

        // Assign value of clicked tile to location of 'empty' in matrix
        this.tileMatrix[emptyCoords.y][emptyCoords.x] = tileValue;
        // Assign 0 to location of 'clicked' tile. It is the new 'empty'
        this.tileMatrix[coords.y][coords.x] = 0;

        // Concat a sequential list of all of the values in the matrix.
        for (var i = 0; i < this.length; i++) {
            Array.prototype.push.apply(values, this.tileMatrix[i])
        }

        // Remove the 0 as it has no representation in the DOM
        values = values.filter(function(item) {
            if (item !== 0) {
                return true;
            }
        })

        // Assign the tile elements their new innerText values.
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            tile.innerText = values[i].toString();
        }

        // Render the board again.
        this.renderBoard({ emptyCoords: coords });
    }

    // This prevents the javascript from running before the DOM has loaded.
    document.addEventListener("DOMContentLoaded", function(e) {
        var board = new Board(8);
        board.buildBoard();
        board.setListeners();    
    });
})();
