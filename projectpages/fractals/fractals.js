start = false

function setup(){
    cnv = createCanvas(window.innerWidth,window.innerHeight)
    background(0)
    fr = 100
    frameRate(fr)
}

earth = new orb(10,30)
earth.position(window.innerWidth/2,window.innerHeight/1.1)

sun = new orb(10,30)
sun.position(window.innerWidth/1.1,window.innerHeight/3)

pluto = new orb(10,30)
pluto.position(window.innerWidth/15,window.innerHeight/3)

startpnt = new orb(10,20)
startpnt.position(window.innerWidth/2,window.innerHeight/2)

orbarr = []
orbarr.push(earth)
orbarr.push(sun)
orbarr.push(pluto)

function startup(){
    startpnt.radius = 5
    start = true

}

t = 0
function draw(){
    if(start == false){
        clear() 
        background(0) 
    }
    translate(0, height) 
    scale(1,-1) 

    orbarr.forEach(element => {
        element.plot()
    });
        startpnt.plot([255, 0, 0])

    if(start == true){
        rand = Math.ceil(clampNumber(0,1,1,5,Math.random()))
        if(rand == 1||rand == 2){
            startpnt.velocity = createVectorOfAngleAndMagnitude(angleBetweenOrbs(startpnt, orbarr[0]), distanceBetweenTwoOrbs(startpnt, orbarr[0])/2)
            startpnt.move()
            console.log('movetop')
        }
        if(rand == 3||rand == 4){
            startpnt.velocity = createVectorOfAngleAndMagnitude(angleBetweenOrbs(startpnt, orbarr[1]), distanceBetweenTwoOrbs(startpnt, orbarr[1])/2)
            startpnt.move()
            console.log('moveleft')
        }
        if(rand == 5||rand == 6){
            startpnt.velocity = createVectorOfAngleAndMagnitude(angleBetweenOrbs(startpnt, orbarr[2]), distanceBetweenTwoOrbs(startpnt, orbarr[2])/2)
            startpnt.move()
            console.log('moveright')
        }
    }
    if(start == true){
    document.getElementById('insttxt').innerHTML = `iteration: ${t}`
    t++
    }
}

function mouseDragged(){
    if(start == false){
        orbarr.forEach(element => {
            dist = distanceBetweenPoints(element.xpos, element.ypos, mouseX, height-mouseY)
            if(dist<=element.radius){
                element.position(mouseX, height-mouseY)
            }
        });
        dist = distanceBetweenPoints(startpnt.xpos, startpnt.ypos, mouseX, height-mouseY)
        if(dist<=startpnt.radius){
            startpnt.position(mouseX, height-mouseY)
        }
    }
    
}

function keyPressed(){
    if(keyCode === LEFT_ARROW){
        start = true
        console.log('started!')
    }
}

function distanceBetweenPoints(x1, y1, x2, y2){
    yf = (y2-y1)**2
    xf = (x2-x1)**2
    return Math.sqrt(yf+xf)
}
