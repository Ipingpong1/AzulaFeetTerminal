solved = false

class wavesolver{
    constructor(total_domain_x, nx, total_domain_y, ny, total_time, source, cfl, c, sourceX, sourceY){
        this.xdom = total_domain_x
        this.ydom = total_domain_y
        this.ttime = total_time
        this.nx = nx
        this.ny = ny
        this.c = c
        this.cfl = cfl
        this.source = source
        this.sourceX = sourceX
        this.sourceY = sourceY

        
        this.x_vec = linspace(0, this.xdom, this.nx)
        this.dx = this.x_vec[2]-this.x_vec[1]
        this.y_vec = linspace(0, this.ydom, this.ny)
        this.dy = this.y_vec[2]-this.y_vec[1]

        this.dt = this.cfl*this.dx/this.c
        this.t_vec = linspace(0,this.ttime,Math.ceil(this.ttime/this.dt))
    }

    solve(){
        this.u_mat = zeros3D(this.t_vec.length, this.x_vec.length, this.y_vec.length)

        for(var t = 1; t < this.t_vec.length-1; t++){
            if(t<100){
                this.u_mat[t][Math.ceil(this.sourceX/this.dx)][Math.ceil(this.sourceY/this.dy)] = eval(this.source)
            }
            for(var x = 1; x < this.x_vec.length-1; x++){
                for(var y = 1; y < this.y_vec.length-1; y++){
                    this.u_mat[t+1][x][y] = this.c**2 * this.dt**2 * 
                    (((this.u_mat[t][x+1][y]-2*this.u_mat[t][x][y]+this.u_mat[t][x-1][y])*(1/this.dx**2))+
                    ((this.u_mat[t][x][y+1]-2*this.u_mat[t][x][y]+this.u_mat[t][x][y-1])*(1/this.dy**2)))+
                    2*this.u_mat[t][x][y]-this.u_mat[t-1][x][y]
                }
            }
            console.log(t)
        }
        solved = true
        return this.u_mat
    }
}

function setup(){
    createCanvas(windowWidth, windowHeight)
    background(0)
}

var u;
var usol;
var u2D;
tot_time = 4000
go = false

t = 0
function draw(){
    if(go == true){
        for(x = 0; x < u.x_vec.length; x++){
            for(y = 0; y < u.y_vec.length; y++){
                u2D[x][y] = usol[t][x][y]
            }
        }

        for(x = 0; x < u.x_vec.length; x++){
            for(y = 0; y < u.y_vec.length; y++){
                stroke(255)
                if(u2D[x][y]!=0){
                    if(u2D[x][y]>0){
                        fill(clamp(u2D[x][y]*500, 0, 255),10-clamp(u2D[x][y]*500, 0, 255), 255)
                    }
                    if(u2D[x][y]<0){
                        fill(255,-50+clamp(-1*u2D[x][y]*500, 0, 255), 100-clamp(-1*u2D[x][y]*500, 0, 100))
                    }
                    noStroke()
                    rect(x*u.dx, y*u.dy, u.dx, u.dy)
                }
            }
        }

        t+=3
        if(t>=u.t_vec.length-2){
            t=0
            go=false
            console.log('reset')
            document.getElementById('inst').innerHTML = 'Done! click again to restart'
        }
    } 
}  

function clamp(num, min, max){
    return Math.min(Math.max(num,min), max)
}

function mousePressed(){
        u = new wavesolver(window.innerWidth, 160, window.innerHeight, 160, tot_time, 'this.dt**2*Math.sin(t/10)', .2, 1, mouseX, mouseY)
        document.getElementById('inst').innerHTML = 'Loading...'
}
function mouseReleased(){
    usol = u.solve()
    u2D = zeros2D(u.x_vec.length, u.y_vec.length)
    go = true
    t=0
    document.getElementById('inst').innerHTML = 'Simulating'
}


