function setup(){
    cnv = createCanvas(windowWidth,windowHeight)
    background(0)
}

mass = 10000
radius = 20
planet_arr = []

placeX = 0
placeY = 0
charging = false

function draw(){
    clear() 
    background(0) 
    translate(0, height) 
    scale(1,-1)  
    
    for(i = 0; i < planet_arr.length; i++){
        for(j = 0; j < planet_arr.length; j++){
            if(planet_arr[i] != planet_arr[j]){

                grav_vec = createVectorOfAngleAndMagnitude(
                    angleBetweenPlanets(planet_arr[i], planet_arr[j]),
                    gravitationalAttractionBetweenTwoPlanets(planet_arr[i], planet_arr[j])/planet_arr[i].mass
                )
                planet_arr[i].velocity.addVector(grav_vec)
            }
        }

        for(j = 0; j < planet_arr.length; j++){
            if(planet_arr[i]!=planet_arr[j]){
                if(collided(planet_arr[i], planet_arr[j]) == true){

                    ivel = planet_arr[i].velocity.getMagnitude()
                    jvel = planet_arr[j].velocity.getMagnitude()

                    planet_arr[i].velocity = createVectorOfAngleAndMagnitude(
                        angleBetweenPlanets(planet_arr[i], planet_arr[j])+180, jvel)

                    planet_arr[j].velocity = createVectorOfAngleAndMagnitude(
                        angleBetweenPlanets(planet_arr[j], planet_arr[i])+180, ivel)
                }
            }
        }

        for(p=1;p<planet_arr[i].trace_mat_x.length;p++){
            stroke(50*planet_arr[i].trace_velocity[p],-80+50*planet_arr[i].trace_velocity[p],200-50*planet_arr[i].trace_velocity[p])
            fill(50*planet_arr[i].trace_velocity[p],-80+50*planet_arr[i].trace_velocity[p],200-50*planet_arr[i].trace_velocity[p])
            strokeWeight(3)
            line(planet_arr[i].trace_mat_x[p],planet_arr[i].trace_mat_y[p],planet_arr[i].trace_mat_x[p-1],planet_arr[i].trace_mat_y[p-1])
        }

        planet_arr[i].plot(255)

        if(planet_arr[i].unmoving == false){
            planet_arr[i].move()
        }

    }
    if(charging == true){
        stroke(255)
        diffx = mouseX-placeX
        diffy = mouseY-placeY
        arrow(placeX,height-placeY,-1*diffx,diffy,1)
    }
}

function mousePressed(){
    placeX = mouseX
    placeY = mouseY

    nm = new planet(mass, radius)
    nm.position(placeX, height-placeY)
    nm.unmoving = true

    planet_arr.push(nm)
    charging = true
}

function mouseReleased(){
    planet_arr[planet_arr.length-1].velocity.xcom = -1*((mouseX-placeX)/65)
    planet_arr[planet_arr.length-1].velocity.ycom = ((mouseY-placeY)/65)
    planet_arr[planet_arr.length-1].unmoving = false
    charging = false
}