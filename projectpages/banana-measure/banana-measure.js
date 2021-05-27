const dx = .000010001 //the distance in between the points

/**
 * Calculates the length of banana accounting for curve
 * @param {*} distance the apparant length
 * @param {*} height the length to top of curve
 * @returns the total length of banana
 */
function lengthfinder(distance, height){
    var s = parseFloat(distance) //the apparent length
    var h = parseFloat(height) //the length to top of curve
    var a = -1*h/((s/2)*(s/2)) //the constant to scale the parabola down
    var sd2 = s/2 //half of s
    var ans = 0 //blank final length

    for (var i = 0; i < (s/dx); i++) {
        ans = ans + distance(i,dx,a,h,s,sd2) 
      }

      return ans
}

/**
 * Calculates the distance between point parab(n*dx) and parab((n+1)*dx) on the parabola
 * @param {*} n the current iteration
 * @param {*} dx the spacing between the points
 * @param {*} a constraining constant
 * @param {*} h length to top of curve
 * @param {*} sd2 half the apparent length
 * @returns the distance between points on the parabola
 */
function distance(n,dx,a,h,sd2){
    var xterm = dx
    var yterm = parab(n+1,dx,a,h,sd2)-parab(n,dx,a,h,sd2)
    var interm = (xterm*xterm)+(yterm*yterm)
    return(Math.sqrt(interm))
}

/**
 * Returns value of parabola at any given iteration n with interval dx
 * @param {*} n the current iteration
 * @param {*} dx the spacing in between the points
 * @param {*} a constraining constant
 * @param {*} h length to top of curve
 * @param {*} sd2 half the apparent length
 * @returns the y value of parabola at any given iteration n with interval dx
 */
 function parab(n,dx,a,h,sd2){
    var y = ((n*dx)-sd2)
    return((a*(y*y))+h)
}
