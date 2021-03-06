//declare global variables
const directionVector = {
  x: 1,
  y: 1
};
let ballPosition = {
  x: 485,
  y: 235
};
let speedBall = 1;

let checkCollide;

let $paddleA;
let $paddleB;
let topPaddleA;
let topPaddleB;
let $board;
let heightBoard;
let $paddles;
let paddlesHeight;
let $ball;

const intervalNames = ['40', '38', '65', '81'];

let $button;

//score
let $playerone;
let $playertwo;
let scorep1=0;
let scorep2=0;

//variables for the alert
let $alert;
let $ok; //ok button
let $shader; //for z-index

//sounds
let commentaries;
let winning;

//opening-screen
let $openingScreen;
let $openingImage;
let $line;

$(init);

//main functions
function init () {
  // declare JQuery variables
  $paddleA = $('#paddleA');
  $paddleB = $('#paddleB');
  $board = $('#board');
  $paddles = $('.paddles');
  $ball = $('#ball');
  $button = $('#button');
  $openingScreen = $('.opening-screen');
  $openingImage = $('.opening-screen img');
  $line = $('.line');
  $playerone = $('.playerone');
  $playertwo = $('.playertwo');

  $(window).on('load', playGASport);
  $(window).on('load', animateLogo);
  $(document).on('keydown', movePaddles);
  $button.on('click', playGame);
}

function playGame() {
  playCommentaries();
  checkCollide = setInterval(checkCollision, 3);
}

function checkCollision() {
  // console.log($ball.position());
  const $topBall = parseInt($ball.css('top'));
  const $leftBall = parseInt($ball.css('left'));
  const $diameterBall = parseInt($ball.css('border-radius'));
  const $heightBoard = parseInt($board.css('height'));
  const $widthBoard = parseInt($board.css('width'));
  const $topPaddleA = parseInt($paddleA.css('top'));
  const $topPaddleB = parseInt($paddleB.css('top'));
  const $heightPaddles = parseInt($paddles.css('height'));
  const $bottomPaddleA = $topPaddleA + $heightPaddles;
  const $bottomPaddleB = $topPaddleB + $heightPaddles;
  const $widthPaddles = parseInt($paddles.css('width'));
  const $outsidePaddleA = parseInt($paddleA.css('left'));
  const $insidePaddleA = $widthPaddles + $outsidePaddleA;
  const $insidePaddleB = parseInt($paddleB.css('left'));

  //updating the position of the ball at each time interval lambda. Might refactore it later using updateBallPosition() {}.
  //for example,
  bounceBall();

  // check collision with bottomBorder
  if ($topBall >= $heightBoard - $diameterBall) {
    bounceBall();
    directionVector.y = -1;
  }

  //check collision with topBorder
  if ($topBall <= 0) {
    bounceBall();
    directionVector.y = 1;
  }

  //check collision with rightBorder;
  if ($leftBall >= $widthBoard - $diameterBall) {
    pauseCommentaries();
    resetBallPosition();
    resetPaddlePosition();
    updateScore('one', $playerone);
    resetSpeed();
    if (scorep1===11) {
      displayAlert('1');
      messageColor('#e8161c');
      resetScore();
    }
  }

  //check collision with leftBorder;
  if ($leftBall <= 0) {
    pauseCommentaries();
    resetBallPosition();
    resetPaddlePosition();
    updateScore('two', $playertwo);
    resetSpeed();
    if (scorep2===11) {
      displayAlert('2');
      messageColor('#2ECC40');
      resetScore();
    }
  }

  // check collision with paddleA
  if (($leftBall <= $insidePaddleA) && ($topBall >= $topPaddleA) && ($topBall <= $bottomPaddleA - $diameterBall)) {
    acceleration();
    bounceBall();
    directionVector.x = 1;
    hitSound();
  }

  // check collision with paddleB
  if (($leftBall >= $insidePaddleB - $diameterBall) && ($topBall >= $topPaddleB) && ($topBall <= $bottomPaddleB)) {
    acceleration();
    bounceBall();
    directionVector.x = -1;
    hitSound();
  }
}

//paddle dynamics
function movePaddles(e) {
  e.preventDefault();
  const keyCode = e.keyCode.toString(); //convert the keyCode to a string
  if (intervalNames.indexOf(keyCode) !== -1) {
    // if the keyCode is not in the array


    const interval = setInterval(function() {

      topPaddleA = parseInt($paddleA.css('top'));
      heightBoard = parseInt($board.css('height'));
      paddlesHeight = parseInt($paddles.css('height'));
      topPaddleB = parseInt($paddleB.css('top'));

      if ((keyCode == 81) && (topPaddleA >= 5)) {
        $paddleA.css('top', topPaddleA - 5);
      } else if ((keyCode == 65) && (topPaddleA <= heightBoard-paddlesHeight-7)) {
        $paddleA.css('top', topPaddleA + 5);
      } else if ((keyCode == 38) && (topPaddleB >= 5)) {
        $paddleB.css('top', topPaddleB - 5);
      } else if ((keyCode == 40) && (topPaddleB <= heightBoard-paddlesHeight-7)) {
        $paddleB.css('top', topPaddleB + 5);
      }
    }, 20);

    $(document).on('keyup', function(e) {
      if (e.keyCode.toString() === keyCode) {
        clearInterval(interval); //on keyup of one of the four keys, clear interval
      }
    });
  }
}

function resetPaddlePosition () {
  $('.paddles').animate({
    'top': 200
  }, 1000, 'linear');
}

//ball dynamics
function bounceBall () {
  ballPosition.x = ballPosition.x + speedBall * directionVector.x;
  ballPosition.y = ballPosition.y + speedBall * directionVector.y;
  $('#ball').css({
    'left': ballPosition.x,
    'top': ballPosition.y
  });
}

function resetBallPosition () {
  ballPosition = {
    x: 485,
    y: 235
  };
  $('#ball').animate({
    'left': 485,
    'top': 235
  }, 1000, 'linear');
  clearInterval(checkCollide);
}

//score
function updateScore (scoreplayer, div) {
  div.html((scoreplayer === 'one' ? scorep1+=1 : scorep2+=1));
}

function resetScore () {
  $playerone.html('0');
  $playertwo.html('0');
  scorep1=0;
  scorep2=0;
}

//speed
function acceleration () {
  speedBall+=0.02;
}

function resetSpeed () {
  speedBall=1;
}

//sounds
function playGASport () {
  new Audio('/Users/ismailalami/Development/WDI_PROJECT_1/sounds/easportsound.mp3').play();
}

function playCommentaries () {
  commentaries = new Audio('/Users/ismailalami/Development/WDI_PROJECT_1/sounds/commentaries.mp3');
  commentaries.play();
}

function pauseCommentaries () {
  commentaries.pause();
}

function hitSound () {
  new Audio('/Users/ismailalami/Development/WDI_PROJECT_1/sounds/hit.mp3').play();
}

//alert
function displayAlert (player) {
  $alert = $('#alert');
  $ok = $('#ok');
  $shader = $('.shader');
  winning = new Audio('/Users/ismailalami/Development/WDI_PROJECT_1/sounds/uefa.mp3');
  winning.play();
  $alert.css('display', 'block'); //make the div appear
  $alert.find('.message').html(`Player ${player} won`); //display message on the alert
  $shader.css('display', 'block');
  $ok.on('click', hideAlert);
}

function hideAlert () {
  $alert.css('display', 'none'); //make the div disappear
  $shader.css('display', 'none');
  winning.pause();
}

function messageColor (color) {
  $('.message').css('color', color);
}

//logo animation
function animateLogo () {
  $openingImage.css('opacity', '1');
  $line.css('display', 'none');
  // $openingImage.animateCss('BounceOutUp');
  setTimeout(() => {
    $openingScreen.css('opacity', '0');
    $line.css('display', 'block');
    setTimeout(() => {
      $openingScreen.css('display', 'none');
    }, 900);
  }, 3000);
}
