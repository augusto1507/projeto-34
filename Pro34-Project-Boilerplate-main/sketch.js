const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


var cesta,cestaimg
var fundoimg
var rope,rope2,rope3
var ball,ballimg
var ground
var ball_con;
var ball_con2;
var ball_con3;


function preload(){
cestaimg=loadImage('menino.png')
fundoimg=loadImage('fundo.jpg')
ballimg=loadImage('ball.png')
}



function setup() {
  createCanvas(600,600);

  engine = Engine.create();
  world = engine.world;
  

  cesta=createSprite(500,520,100,100);
  cesta.scale=0.3
  cesta.addImage('menino.png',cestaimg)

  button = createImg('cut_btn.png');
  button.position(50,50);
  button.size(50,50);
  button.mouseClicked(drop);

  button = createImg('cut_btn.png');
  button.position(50,200);
  button.size(50,50);
  button.mouseClicked(drop2);

  button = createImg('cut_btn.png');
  button.position(500,70);
  button.size(50,50);
  button.mouseClicked(drop3);

  rope = new Rope(7,{x:80,y:70});
  rope2 = new Rope(7,{x:80,y:230});
  rope3 = new Rope(9,{x:500,y:100});


  ball = Bodies.circle(200,220,20);
  Matter.Composite.add(rope.body,ball);
  ball_con = new Link(rope,ball);
  ball_con2 = new Link(rope2,ball);
  ball_con3 = new Link(rope3,ball);


  ground = new Ground(300,550,600,20);

}


function draw() 
{
  background(fundoimg);
  Engine.update(engine);

  rope.show()
  rope2.show()
  rope3.show()

  push();
  imageMode(CENTER);
  if(ball!=null){
    image(ballimg,ball.position.x,ball.position.y,60,60);
  }
  pop();

  if(collide(ball,cesta,80)==true)
{
  World.remove(engine.world,ball);
  ball = null;
 
}
  
  drawSprites()
}

function drop()
{

  rope.break();
  ball_con.dettach();
  ball_con = null; 
}

function drop2()
{
  rope2.break();
  ball_con2.dettach();
  ball_con2 = null;
}

function drop3()
{
  rope3.break();
  ball_con3.dettach();
  ball_con3 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

