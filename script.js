const gameBoard = document.getElementById('game-board');
const board = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let pacmanPosition = { x: 1, y: 1 };

function drawBoard() {
    gameBoard.innerHTML = '';
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (board[y][x] === 1) {
                cell.classList.add('wall');
            } else if (x === pacmanPosition.x && y === pacmanPosition.y) {
                const pacman = document.createElement('div');
                pacman.classList.add('pacman');
                cell.appendChild(pacman);
            } else {
                const pacDot = document.createElement('div');
                pacDot.classList.add('pac-dot');
                cell.appendChild(pacDot);
            }

            gameBoard.appendChild(cell);
        }
    }
}

function movePacman(direction) {
    const newPosition = { ...pacmanPosition };

    if (direction === 'ArrowUp') newPosition.y--;
    if (direction === 'ArrowDown') newPosition.y++;
    if (direction === 'ArrowLeft') newPosition.x--;
    if (direction === 'ArrowRight') newPosition.x++;

    // Verifica se a nova posição não é uma parede
    if (board[newPosition.y] && board[newPosition.y][newPosition.x] !== 1) {
        pacmanPosition = newPosition;
        drawBoard();
    }
}

document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        movePacman(e.key);
    }
});

drawBoard();
