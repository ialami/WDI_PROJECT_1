![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# WDI PROJECT 1


## Ping-pong

This is project 1 of 4 in the course of Web Development Immersive Course at General Assembla (London, UK). For the purpose of the project, each student must develop a game in a period of one week.

### Motivation

Fan of sport, my first idea turned out to be ping-pong. Having being told by my instructors that it was not an easy task for a first project, this gave me more motivation to take on the challenge. 

### Languages

The used languages were HTML, CSS and JS (JQuery).

### Methodology

The project was undertaken in two main blocks: first building a Minimum Viable Product (MVP) and then adding features. The MVP was tackled in the following way:

1. Get the two paddles to move up and down
2. Get the two paddles to collide with the borders of the table
3. Get the ball to move
4. Get the ball to collide with the borders
5. Get the ball to collide with the paddles

### Logic of the game

The game is based on simple 2-dimensional dynamics. The movement of the ball can be described by the following equation:

position(t=2) = position(t=1) + velocity

position(t=2) = position(t=1) + speed * direction, with direction = 1 or -1;

Depending on where the ball collides, the ball's direction can only change direction along either the x or y-axis. Consequently the direction on the respective axis changes either from 1 to -1 or from -1 to 1.

### Screenshots

![](/Users/ismailalami/Desktop/Screen Shot 2017-10-16 at 23.18.58.png)

### Features

Some additional features, added on top of the MVP, were:

* Score
* Acceleration
* Sounds
* Alerts
* Position resets

### Code example

The bounceBall function is the backbone of the code: it describes the position of the ball at any time.

```function bounceBall () {
  ballPosition.x = ballPosition.x + speedBall * directionVector.x;
  ballPosition.y = ballPosition.y + speedBall * directionVector.y;
  $('#ball').css({
    'left': ballPosition.x,
    'top': ballPosition.y
  });
}
```


The following snippet of code checks the collision of the ball with the bottom border of the table. When the ball hits the border, its position changes thanks to the bounceBall function and its direction vector on the y-axis changes to -1 as the y-axis is inverted. In other words, when the ball goes to the top, y-direction is equal to -1 and the opposite is true.

```
  if ($topBall >= $heightBoard - $diameterBall) {
    bounceBall();
    directionVector.y = -1;
  }
```
  
### Difficulties

The main difficulty was to allow the two paddles to move simultaneously in their chosen direction by the player. As a matter of fact, the first version of code included an if statement, which in reality could only perform one function at a time, hence allowing only one of the two paddles to move at anytime. The chosen solution was to use 'keydown' and 'keyup' with a 'setInterval' for keydown that was cleared upon keyup

### Learning points

The project lead to the following learning points:

* Structuring of a complex problem into successive steps
* Deployment of JQuery
* Styling using CSS
* Taking on challenges

### Acknowledgments

I would to thank Rane Gowan (instructor), Alex Chin (teaching assistant), Marta Mattioli (teaching assistant) and Mike Belither (teaching assistant) for their help and support throughout the project.










