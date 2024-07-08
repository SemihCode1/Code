const gameBoard = document.getElementById('gameBoard');
const boardSize = 400;
const unitSize = 20;

let snake = [{ x: 100, y: 100 }];
let direction = { x: unitSize, y: 0 };
let food = { x: getRandomInt(0, boardSize / unitSize) * unitSize, y: getRandomInt(0, boardSize / unitSize) * unitSize };

function createBoard() {
    gameBoard.innerHTML = '';
    snake.forEach(segment => createSegment(segment.x, segment.y, 'snake'));
    createSegment(food.x, food.y, 'food');
}

function createSegment(x, y, className) {
    const segment = document.createElement('div');
    segment.style.left = `${x}px`;
    segment.style.top = `${y}px`;
    segment.classList.add(className);
    gameBoard.appendChild(segment);
}

function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        food = { x: getRandomInt(0, boardSize / unitSize) * unitSize, y: getRandomInt(0, boardSize / unitSize) * unitSize };
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    const key = event.key;
    switch (key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                direction = { x: 0, y: -unitSize };
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction = { x: 0, y: unitSize };
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction = { x: -unitSize, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction = { x: unitSize, y: 0 };
            }
            break;
    }
}

function gameLoop() {
    moveSnake();
    if (isGameOver()) {
        alert('Game Over');
        snake = [{ x: 100, y: 100 }];
        direction = { x: unitSize, y: 0 };
        food = { x: getRandomInt(0, boardSize / unitSize) * unitSize, y: getRandomInt(0, boardSize / unitSize) * unitSize };
    }
    createBoard();
}

function isGameOver() {
    const head = snake[0];
    if (head.x < 0 || head.y < 0 || head.x >= boardSize || head.y >= boardSize) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener('keydown', changeDirection);
setInterval(gameLoop, 100);