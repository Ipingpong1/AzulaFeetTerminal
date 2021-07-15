started = false

function setup(){
    var cnv = createCanvas(windowWidth,windowHeight)
    background(0)
    fr = 100
    frameRate(fr)
}

cfl = .2
c = 1

yn = 150
xn = 150

x_vec = linspace(0, window.innerWidth, xn)
y_vec = linspace(0, window.innerHeight, yn)

dx = x_vec[2]-x_vec[1]
dy = y_vec[2]-y_vec[1]
dt = 1*cfl*dx/c

setTimeout(()=>{
    u_mat = zeros3D(10000, x_vec.length, y_vec.length)
    console.log('done')
    document.getElementById('inst').innerHTML = ('Click to place source')
}, 1)

blank_mat = zeros2D(x_vec.length, y_vec.length)

t = 1
placex = 0
placey = 0
sourceQ = false
tempt = 0

function draw(){
    if(started === true){
        if(sourceQ === true){
            if(t-tempt<100){
                u_mat[t][Math.ceil(placex/dx)][Math.ceil(placey/dy)] = dt**2*Math.sin(t/10)
                //u_mat[t][Math.ceil(x_vec.length/2)][Math.ceil(y_vec.length/2)] = dt**2*Math.sin(t/10)
            }else{
                sourceQ = false
            }
        }

        for(var x = 1; x < x_vec.length-1; x++){
            for(var y = 1; y < y_vec.length-1; y++){
                u_mat[t+1][x][y] = c**2 * dt**2 * 
                (((u_mat[t][x+1][y]-2*u_mat[t][x][y]+u_mat[t][x-1][y])*(1/dx**2))+
                ((u_mat[t][x][y+1]-2*u_mat[t][x][y]+u_mat[t][x][y-1])*(1/dy**2)))+
                2*u_mat[t][x][y]-u_mat[t-1][x][y]
            }
        }

        for(xx = 0; xx < x_vec.length; xx++){
            for(yy = 0; yy < y_vec.length; yy++){
                if(u_mat[t][xx][yy]!=0){
                    if(u_mat[t][xx][yy]>0){
                        fill(clamp(u_mat[t][xx][yy]*500, 0, 255), 10-clamp(u_mat[t][xx][yy]*500, 0, 255), 255)
                    }
                    if(u_mat[t][xx][yy]<0){
                        fill(255,-50+clamp(-1*u_mat[t][xx][yy]*500, 0, 255), 100-clamp(-1*u_mat[t][xx][yy]*500, 0, 100))
                    }
                    noStroke()
                    rect(xx*dx, yy*dy, dx, dy)
                }
            }
        }
        t++
    }
}

function mousePressed(){
    placex = mouseX
    placey = mouseY
    sourceQ = true
    tempt = t
    started = true
}

function clamp(num, min, max){
    return Math.min(Math.max(num,min), max)
}