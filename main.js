document.addEventListener('keypress', keypress)

addToMainBox = (toAdd,color) => {
    let mainboxdiv = document.getElementById('mainbox')
    mainboxdiv.innerHTML += '<h1 style="color:'+color+';">> '+toAdd+'</h1>'
}

function clr(){
    let mainboxdiv = document.getElementById('mainbox')
    mainboxdiv.innerHTML=''
    addToMainBox('Welcome to the Azulafeet terminal lol')
    addToMainBox("Type commands with \'<span style=\"color: teal;\">!</span>\', try <span style=\"color: teal;\">!help</span>")
}

rnbw = "transparent!important; background-clip:border-box!important; background-image:linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red) !important; -webkit-background-clip:text!important"

function keypress(e){
   if(e.code == "Enter"){
        passed = false
        let cmd = document.getElementById('cmd')
        val = cmd.value
        cmd.value = ''

        switch(val){
            case '!help':
                addToMainBox('Help Index-------------------------', 'orange')
                addToMainBox('!projects, !resume, !spondooli, !clear', 'teal')
                addToMainBox('-----------------------------------', 'orange')
                passed = true
                break
            
                case '!projects':
                    addToMainBox('See Some Of My Projects-----------------------------------------------', 'orange')
                    addToMainBox('!n-body-sim, !heat-equation-sim, !banana-measurer, !fourier-series-sim, !club-penguin-miner', 'teal')
                    addToMainBox('----------------------------------------------------------------------', 'orange')
                    passed=true
                    break

                    case '!banana-measure':
                        open('projectpages/banana-measure/banana-measure.html','Banana Measuring Calculator')
                        passed = true
                        break

                    case '!club-penguin-miner':
                        open('projectpages/club-penguin-autominer/club-penguin-autominer.html','Club Penguin Autominer')
                        passed = true
                        break

                case '!spondooli':
                    window.open('https://www.spondooliofficial.com')
                    passed = true
                    break
                
                case '!resume':
                    window.open('ResumeFinal-min-1.png')
                    passed = true
                    break

                case '!random-garbage':
                    addToMainBox('Ignore This If You Are An Employer------------------', 'orange')
                    addToMainBox('!among-us, !GETOUTOFMYHEAD, ！こんにちは, !lolcat', 'teal')
                    addToMainBox('----------------------------------------------------', 'orange')

                    passed=true
                    break
            
                    case '！こんにちは':
                        addToMainBox('日本語？', 'white')
                        passed = true
                        break

                    case '69':
                        addToMainBox('Nice.', 'white')
                        passed=true
                        break
                    
                    case '!among-us':
                        rand1 = Math.random()*300
                        rand2 = Math.random()*300
                        rand3 = Math.random()*300

                        addToMainBox('ඞ', 'rgb('+rand1+','+rand2+','+rand3+')')
                        passed=true
                        break
                    
                    case '!GETOUTOFMYHEAD':
                        never = ['N','E','V','E','R']
                        for(i = 0; i < 5; i ++){
                            rand1 = Math.random()*300
                            rand2 = Math.random()*300
                            rand3 = Math.random()*300

                            addToMainBox('ඞඞඞඞඞඞඞඞඞඞඞඞඞ'+never[i], 'rgb('+rand1+','+rand2+','+rand3+')')
                        }
                        passed=true
                        break

                    case '!lolcat':
                        let mainboxdiv = document.getElementById('mainbox')
                        mainboxdiv.className += ' rainbow-text'
                        passed = true
                        break
                        
            case '!clear':
                clr()
                passed=true
                break
        }

    const rg = new RegExp('^[0-9\-+*/()=xyz]*$')
        console.log(rg.test(val))
        if(rg.test(val)==true){
            try {
                if(isNaN(eval(val))==false){
                    addToMainBox(eval(val), 'white')
                    passed = true
                    console.log('evald')
                }
            } catch (error) {
                console.log(error)
            }
        }   
        
        if(passed == false){
            addToMainBox('Unknown command: '+val, 'red')
        }
    }
}