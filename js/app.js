/*

LOGIC OF THE GAME

Think about the main events

In terms of physics, what is the position of the ball at any time?

Let p be the position of the ball,

p(t=2) = p(t=1) + velocity
p(t=2) = p(t=1) + speed * direction / direction either 1 or -1

Therefore, in x and y-coordinates:
p(t=2)[x] = p(t=1)[x] + speed * direction[x];
p(t=2)[y] = p(t=1)[y] + speed * direction[y];

In terms of coding that is everytime the ball touches either a paddle, either one of the top or bottom borders, the position of the ball needs to be updated through incrementation.


How do you know when there is a collision between the ball and the paddle?

Let L be the length of the paddles A and B.
Paddles A and B can only move along the y-axis. Their x-position is therefore a constant.
In order to check the collision of the ball at any time with one of the paddles, have an if statement. 3 conditions must be met, it is therefore condition1 && condition2 && condition 3:
- The x position of the ball must be equal to the x-coordinate of the paddles
- The y position of the ball must be lower than the y-coordinate of the top of the paddle
- The y position of the ball must be greater than the y-coordinate of the top of the paddle
If those 3 conditions happen in the same time, then there is collision, in which case the ball must change direction on the x-axis.

In other words, if the ball hits one of the borders, then the y-direction of the ball changes but the X-direction does not change;
if the ball hits one of the borders, then the x-direction changes, but the y-direction does not change;

There are going to be 4 main events, when you press the arrow up or down (say for paddle A) and if you press two other key Q and A (say for paddle B). We also know that each key on the keyboard has a code, this is therefore not a problem. So basically that can be broken down into 2 events either up or down. If you press the up arrow and Q it respectively goes up for paddles A and B. If you press the down arrow and A, it goes respectively goes down for paddles A and B. All of these can be grouped into one function, which is basically the movement of the paddles.

Events are:
- $(document).on('keydown', function ())
- $(document).on('keyup', function ())

The next function can be the collision, which will trigger the movement of the ball

And all of that is done within a set interval of lambda ms. So each lambda ms, it moves the ball according to the collision. Lamba must be small enough so that it does not miss collisions. Obviously there is always going to be some collisions that are going to be missed: because lambda would have to be really small.

This is the MVP

Potential for scale-up:
- display the score and play games first to 11 or first to 21
- Add sounds of chinese players shouting everytime it hits paddle A or B (that can be really funny to be honest)

*/

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

$(() => {
  // declare JQuery variables

  //Downwards movements
  //move paddle B down when press down arrow
  $(document).on('keydown', function(e) {
    const code = e.keyCode;
    console.log(code); // test positive,= 40
    const topPaddleB = parseInt($('#paddleB').css('top'));
    console.log(topPaddleB); // test positive,= 120
    const heightBoard = parseInt($('#board').css('height'));
    console.log(heightBoard); // test positive,=300
    const paddlesHeight = parseInt($('.paddles').css('height'));
    console.log(paddlesHeight); // test positive,=60
    if ((code == 40) && (topPaddleB <= heightBoard-paddlesHeight-10))  {
      $('#paddleB').css('top', topPaddleB + 5);
    }
  });

  //move paddle A down when pressing a
  $(document).on('keydown', function(e) {
    const code = e.keyCode;
    console.log(code); // test positive,=65
    const topPaddleA = parseInt($('#paddleA').css('top'));
    console.log(topPaddleA); // test positive,=120
    const heightBoard = parseInt($('#board').css('height'));
    console.log(heightBoard); // test positive,=300
    const paddlesHeight = parseInt($('.paddles').css('height'));
    console.log(paddlesHeight); //test positive,=60
    if ((code == 65) && (topPaddleA <= heightBoard-paddlesHeight-10)) {
      $('#paddleA').css('top', topPaddleA + 5);
    }
  });

  //Upwards movements
  //move paddle B up when pressing up arrow
  $(document).on('keyup', function(e) {
    const code = e.keyCode;
    console.log(code); // test positive,=38
    const topPaddleB = parseInt($('#paddleB').css('top'));
    console.log(topPaddleB); // test positive,=120
    if ((code == 38) && (topPaddleB >= 5)) {
      $('#paddleB').css('top', topPaddleB - 5);
    }
  });

  //move paddle A up when pressing q
  $(document).on('keyup', function(e) {
    const code = e.keyCode;
    console.log(code); // test positive,=40
    const topPaddleA = parseInt($('#paddleA').css('top'));
    console.log(topPaddleA); // test positive,=120
    if ((code == 81) && (topPaddleA >= 5)) {
      $('#paddleA').css('top', topPaddleA - 5);
    }
  });

  // function startOfGame () {
  //   //send the ball to a random position, the problem that I have with that is that I want it to be executed just once, rather than every 10ms. So it should not be in the setInterval. So maybe that should be before the setInterval function. In order to work just put it inside the setInterval.
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

  //setInterval to check for collision and keep bouncing the ball off
  setInterval(() => {

    //updating the position of the ball at each time interval lambda, put that inside all the if statements. Might refactore it later using updateBallPosition() {}.
    //for example,
    ballPosition.x = ballPosition.x + speedBall * directionVector.x;
    ballPosition.y = ballPosition.y + speedBall * directionVector.y;
    $('#ball').css({
      'left': ballPosition.x,
      'top': ballPosition.y
    });

    //check collision with bottomBorder
    //if top of the ball >= boardheight - borderradius
    //then directionVector.y = -1;

    //check collision with topBorder
    //if top <= 0,
    //then directionVector.y = 1;

    //check collision with rightBorder;
    //if left >= boardwidth - borderradius;
    // then $('#ball').css({
    //   'left': 135px,
    //   'top': 285px
    // });

    //check collision with leftBorder;
    //if left <= 0;
    // then $('#ball').css({
    //   'left': 135px,
    //   'top': 285px
    // });


  }, 10);

});


//variales: convert variables in objects as much as you can, this way it is going to be cleaner
// const topBorderX;
// const topBorderY;
// const bottomBorderX;
// const bottomBorderY;
// const rightBorderX;
// const rightBorderY;
// const leftBorderX;
// const leftBorderY;
// const lineAy;
// const lineBy;

//Inside Ball Movement function()
//   check collision using if statements, or better using a switch statement.
//
//     give the ball a random direction at start
//
//     check collision with top border
//       Is the y-position of the ball the same as the y-position of the top border?
//     check collision with bottom border
//       Is the y-position of the ball the same as the y-position of the bottom border?
//     check collision with paddleA
//       Is the x position of the ball equal to the x-coordinate of paddleA
//       extract the top and bottom y coordinates of the paddleA
//       Is the y position of the ball lower than the y-coordinate of the top of paddleA?
//       Is the y position of the ball greater than the y-coordinate of the top paddleA?
//     check collision with paddleB
//       Is the x position of the ball equal to the x-coordinate of paddleB
//       extract the top and bottom y coordinates of the paddleB
//       Is the y position of the ball lower than the y-coordinate of the top of paddleB?
//       Is the y position of the ball greater than the y-coordinate of the top paddleB?
//     check collision with right border.
//       Is the x-position of the ball the same as the x-position of the right border?
//         If yes, put the ball back in the middle (i.e. start position) and restart the game.
//     check collision with left border
//       Is the x-position of the ball the same as the x-position of the left border?
//         If yes, put the ball back in the middle (i.e. start position) and restart the game.
//
// note that there is an action that is repeated, which is to put the ball back in the middle, this can therefore be a function updateBallPosition () {}.
//
