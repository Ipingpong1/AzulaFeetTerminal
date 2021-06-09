/**
 * Returns the inverse tangent of x in degrees
 * @param {*} x The number to take the inverse tangent of 
 * @returns Inverse tangent of x in degrees
 */
function datan(x){
    return Math.atan(x)*180/Math.PI
}

/**
 * Returns the tangent of x in degrees
 * @param {*} x The number to take the tangent of
 * @returns Tangent of x in degrees
 */
function dtan(x){
    return Math.tan(x*Math.PI/180)
}

/**
 * Returns ther inverse sine of x in degrees
 * @param {*} x The number to take inverse sine of
 * @returns Inverse sine of x in degrees
 */
function dasin(x){
    return Math.asin(x)*180/Math.PI 
}

/**
 * Returns the sine of x in degrees
 * @param {*} x The number to take the sine of
 * @returns The sine of x in degrees
 */
function dsin(x){
    return Math.sin(x*Math.PI/180)
}

/**
 * Returns the inverse cosine of x in degrees
 * @param {*} x The number to take the inverse cosine of
 * @returns The inverse cosine of x in degrees
 */
function dacos(x){
    return Math.acos(x)*180/Math.PI
}

/**
 * Returns the cosine of x in degrees
 * @param {*} x The number to take the cosine of
 * @returns The cosine of x in degrees
 */
function dcos(x){
    return Math.cos(x*Math.PI/180)
}


/**
 * *Vector object
 * @param {*} x the x component of the vector
 * @param {*} y the y component of the vector
 */
class vector{
    constructor(x, y){
        this.xcom = x
        this.ycom = y
        this.angle = datan(this.xcom)
    }

    /**
     * Calculates the magnitude of the vector
     * @returns The magnitude of the vector
     */
    getMagnitude(){
        return Math.sqrt((this.xcom * this.xcom) + (this.ycom * this.ycom))
    }

    /**
     * Adds components to the vector
     * @param {*} xc x component to add
     * @param {*} yc y component to add
     */
    addComponents(xc, yc){
        this.xcom += xc
        this.ycom += yc
        this.angle = datan(this.ycom/this.xcom)
    }

    /**
     * Add another vector
     * @param {*} othervec Other vector to add
     */
    addVector(othervec){
        this.xcom += othervec.xcom
        this.ycom += othervec.ycom
        this.angle = datan(this.ycom/this.xcom)
    }

    /**
     * Subtract another vector
     * @param {*} othervec Other vector to subtract
     */
    subVector(othervec){
        this.xcom -= othervec.xcom
        this.ycom -= othervec.ycom
        this.angle = datan(this.ycom/this.xcom)
    }

    /**
     * Print the vector to the console
     */
    print(){
        console.log("xcom:"+this.xcom+" ycom:"+this.ycom+" angle:"+this.angle+" magnitude:"+this.getMagnitude())
    }

    /**
     * Reflects the vector horizontally
     */
    xReflect(){
        this.ycom *= -1
        this.angle = datan(this.ycom/this.xcom)
    }

    /**
     * Reflects the vector vertically
     */
    yReflect(){
        this.xcom *= -1
        this.angle = datan(this.ycom/this.xcom)
    }
}
/**
 * Creates a new vector of specified angle and magnitude
 * @param {*} angle Angle of new vector
 * @param {*} magnitude Magitude of new vector
 * @returns A new vector of given angle and magnitude
 */
function createVectorOfAngleAndMagnitude(angle, magnitude){
    xx = magnitude*dcos(angle)
    yy = magnitude*dsin(angle)
    nm = new vector(xx, yy)
    return nm
}


/**
 * *Planet Object
 * @param {*} mass Mass of the planet
 * @param {*} radius Radius of the planet
 */
class planet{
    constructor(mass, radius){
        this.mass = mass //planet mass
        this.velocity = new vector(0, 0) //planet velocity
        this.xpos = 0 //planet x position
        this.ypos = 0 //planet y position
        this.radius = radius //planet radius
        this.unmoving = false //debug variable
        this.trace = false //FIXME whether the planets path will be traces

        this.trace_mat_y = [] //array of previous y positions
        this.trace_mat_x = [] //array of previous x positions
        this.trace_velocity = [] //array of previous velocities

    }

    /**
     * Changes the position of planet
     * @param {*} x new x position of planet
     * @param {*} y new y position of planet
     */
    position(x, y){
        this.xpos = x
        this.ypos = y
    }

    /**
     * moves the planet in the direction of velocity
     * adds velocity and position to trace arrays
     */
    move(){
        this.xpos += this.velocity.xcom
        this.ypos += this.velocity.ycom

        this.trace_mat_x.push(this.xpos)
        this.trace_mat_y.push(this.ypos)
        this.trace_velocity.push(this.velocity.getMagnitude())
        if(this.trace_mat_x.length>500){
            this.trace_mat_x.splice(0,1)
            this.trace_mat_y.splice(0,1)
            this.trace_velocity.splice(0,1)
            }
        }

    /**
     * Plots the planet to the canvas
     * @param {*} color Color of the planet
     */
    plot(color){
        fill(color)
        ellipse(this.xpos,this.ypos,this.radius)
    }

    /**
     * Displays the planet's velocity
     * @param {*} multiplier Extra length to add to final velocity arrow
     */
    showVelocity(multiplier){
        arrow(this.xpos, this.ypos, this.velocity.xcom, this.velocity.ycom, multiplier)
    }
}

/**
 * Traces planet
 * @param {*} planet Planet to trace
 */
//! DOES NOT WORK FOR SOME REASON IDFK WHY
//TODO: Figure out why this doesn't work
function plotTracePlanet(planet){
        for(i = 0; i < planet.trace_mat_x.length; i ++){
            stroke(50*planet.trace_velocity[i],-100+50*planet.trace_velocity[i],255)
            fill(50*planet.trace_velocity[i],-100+50*planet.trace_velocity[i],255)
            ellipse(planet.trace_mat_x[i], planet.trace_mat_y[i],5)
        }
}
//!--------------------------------------

/**
 * Calculates the distance between two planets
 * @param {*} rplanet The planet with current respect
 * @param {*} oplanet The other planet
 * @returns The distance between two planets
 */
function distanceBetweenTwoPlanets(rplanet, oplanet){
    xdis = rplanet.xpos - oplanet.xpos
    ydis = rplanet.ypos - oplanet.ypos
    return Math.sqrt((xdis*xdis)+(ydis*ydis)) 
}

/**
 * Calculates the angle between two planets
 * @param {*} rplanet The planet with current respect
 * @param {*} oplanet The other planet
 * @returns The angle between two planets
 */
function angleBetweenPlanets(rplanet, oplanet){
    xdis = rplanet.xpos - oplanet.xpos
    ydis = rplanet.ypos - oplanet.ypos
    if (xdis > 0)
        return datan(ydis/xdis)+180
    else{
        return datan(ydis/xdis)
    }
}

function collided(rplanet, oplanet){
    if(rplanet.xpos-rplanet.radius<oplanet.xpos&&oplanet.xpos<rplanet.xpos+rplanet.radius
        &&rplanet.ypos-rplanet.radius<oplanet.ypos&&oplanet.ypos<rplanet.ypos+rplanet.radius){
            return true
        }
    return false
}

/**
 * Calculates the scalar gravitational attraction between two planets
 * @param {*} rplanet Planet with current respect
 * @param {*} oplanet Other planet
 * @returns The scalar gravitational attraction between two planets
 */
function gravitationalAttractionBetweenTwoPlanets(rplanet, oplanet){
    G = .03
    r = distanceBetweenTwoPlanets(rplanet, oplanet)
    return G*rplanet.mass*oplanet.mass/(r*r)
}

/**
 * 
 * @param {*} x The starting x position of the arrow
 * @param {*} y The starting y position of the arrow
 * @param {*} dx The dx distance from the initial x to the head
 * @param {*} dy The dy distance from the initial y to the head
 * @param {*} length_multiplier Value to make the arrow appear larger or smaller
 */
//TODO Add triangle at the end of the arrow
function arrow(x,y,dx,dy,length_multiplier){
    finalx = x+dx*length_multiplier
    finaly = y+dy*length_multiplier
    stroke(255)
    line(x,y,finalx,finaly)
}
