//declare global variables
const directionVector = {
  x: 1,
  y: 1
};
let ballPosition = {
  x: 285,
  y: 135
};
const speedBall = 1;

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

$(init);

function init () {
  // declare JQuery variables
  $paddleA = $('#paddleA');
  $paddleB = $('#paddleB');
  $board = $('#board');
  $paddles = $('.paddles');
  $ball = $('#ball');
  $button = $('#button');

  $playerone = $('.playerone');
  $playertwo = $('.playertwo');

  $(window).on('load', playGASport);

  /*
$(window).on('load', runLogo);

function runLogo () {
  intervalLogo = setInterval(animateLogo, 1000)
}

function animateLogo () {
  $shader.css('display', 'block');
  $('#logo img').animate({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '700px',
    height: '700px'
  }, 4000);
}

clearInterval(intervalLogo);
  */

  $(document).on('keydown', movePaddles);

  // function startOfGame () {
  // //   //send the ball to a random position, the problem that I have with that is that I want it to be executed just once, rather than every 10ms. So it should not be in the setInterval. So maybe that should be before the setInterval function. In order to work just put it inside the setInterval.
  //   ballPosition.x = ballPosition.x + speedBall * directionVector.x;
  //   ballPosition.y = ballPosition.y + speedBall * directionVector.y;
  //   const randomPosition = {
  //     x: Math.round(Math.random()*ballPosition.x),
  //     y: Math.round(Math.random()*ballPosition.y)
  //   };
  //   $('#ball').css({
  //     'left': randomPosition.x,
  //     'top': randomPosition.y
  //   });
  // }
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
    if (scorep2===2) {
      displayAlert('2');
      resetScore();
    }
  }

  // check collision with paddleA
  if (($leftBall <= $insidePaddleA) && ($topBall >= $topPaddleA) && ($topBall <= $bottomPaddleA - $diameterBall)) {
    bounceBall();
    directionVector.x = 1;
    hitSound();
  }

  // check collision with paddleB
  if (($leftBall >= $insidePaddleB - $diameterBall) && ($topBall >= $topPaddleB) && ($topBall <= $bottomPaddleB)) {
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
    x: 285,
    y: 135
  };
  $('#ball').animate({
    'left': 285,
    'top': 135
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

// function animateLogo () {
//   // $shader.css('display', 'block');
//   $('#logo img').animate({
//     position: 'absolute',
//     left: '50%',
//     top: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '700px',
//     height: '700px'
//   }, 4000);
// }
