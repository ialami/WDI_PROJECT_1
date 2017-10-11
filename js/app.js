//declare global variables
const directionVector = {
  x: 1,
  y: 1
};
let ballPosition = {
  x: 285,
  y: 135
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

$(init);

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
  $playerone = $('.playerone');
  $playertwo = $('.playertwo');

  $(window).on('load', playGASport);
  $(window).on('load', animateLogo);
  $(document).on('keydown', movePaddles);
  $button.on('click', playGame);
}

function playGame() {
  commentaries = new Audio('/Users/ismailalami/Development/WDI_PROJECT_1/sounds/commentaries.mp3');
  commentaries.play();
  checkCollide = setInterval(checkCollision, 3);
}

function playGASport () {
  new Audio('/Users/ismailalami/Development/WDI_PROJECT_1/sounds/easportsound.mp3').play();
}

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
      } else if ((keyCode == 65) && (topPaddleA <= heightBoard-paddlesHeight-10)) {
        $paddleA.css('top', topPaddleA + 5);
      } else if ((keyCode == 38) && (topPaddleB >= 5)) {
        $paddleB.css('top', topPaddleB - 5);
      } else if ((keyCode == 40) && (topPaddleB <= heightBoard-paddlesHeight-10)) {
        $paddleB.css('top', topPaddleB + 5);
      }
    }, 20); //perform function every 1ms

    $(document).on('keyup', function(e) {
      if (e.keyCode.toString() === keyCode) {
        clearInterval(interval); //on keyup of one of the four keys, clear interval
      }
    });
  }
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
    updateScore(scorep1, $playerone);
    resetSpeed();
    if (scorep1===2) {
      displayAlert('1');
      resetScore();
    }
  }

  //check collision with leftBorder;
  if ($leftBall <= 0) {
    pauseCommentaries();
    resetBallPosition();
    updateScore(scorep2, $playertwo);
    resetSpeed();
    if (scorep2===2) {
      displayAlert('2');
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

function bounceBall () { //update position of the ball
  ballPosition.x = ballPosition.x + speedBall * directionVector.x;
  ballPosition.y = ballPosition.y + speedBall * directionVector.y;
  $('#ball').css({
    'left': ballPosition.x,
    'top': ballPosition.y
  });
}

function resetBallPosition () {
  ballPosition = {
    x: 385,
    y: 135
  };
  $('#ball').animate({
    'left': 385,
    'top': 185
  }, 1000, 'linear');
  clearInterval(checkCollide);
}

function pauseCommentaries () {
  commentaries.pause();
}

function updateScore (scoreplayer, div) {
  div.html((scoreplayer === 'one' ? scorep1+=1 : scorep2+=1));
}

function resetScore () {
  $playerone.html('0');
  $playertwo.html('0');
  scorep1=0;
  scorep2=0;
}

function displayAlert (player) {
  $alert = $('#alert');
  $ok = $('#ok');
  $shader = $('.shader');
  winning = new Audio('/Users/ismailalami/Development/WDI_PROJECT_1/sounds/uefa.mp3');
  winning.play();
  $alert.css('display', 'block'); //make the div appear
  $alert.find('.message').html(`Well done! Player ${player} won`); //display message on the alert
  $shader.css('display', 'block');
  $ok.on('click', hideAlert);
}

function hideAlert () {
  $alert.css('display', 'none'); //make the div disappear
  $shader.css('display', 'none');
  winning.pause();
}

function hitSound () {
  new Audio('/Users/ismailalami/Development/WDI_PROJECT_1/sounds/hit.mp3').play();
}

function animateLogo () {
  $openingImage.css('opacity', '1');
  // $openingImage.animateCss('BounceOutUp');
  setTimeout(() => {
    $openingScreen.css('opacity', '0');
    setTimeout(() => {
      $openingScreen.css('display', 'none');
    }, 900);
  }, 3000);
}

function acceleration () {
  speedBall+=0.02;
}

function resetSpeed () {
  speedBall=1;
}
