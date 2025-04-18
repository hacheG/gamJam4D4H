/** @type {HTMLCanvasElement} */
console.log(location.href);

 const posBinarios = {
    uno : 0,
    dos : 0,
    cuatro : 0,
    ocho : 0,
    dieciseis : 0,
    treintaydos : 0,
}
let gameOver = false;

const binary = document.querySelectorAll("#binary");

binary.forEach( (div) => {
    div.addEventListener("click", (e) => {
        if (div.textContent == "off"){
            div.textContent = "on";
            posBinarios[e.target.className] = 1;
        } else {
            div.textContent = "off";
            posBinarios[e.target.className] = 0;
        }
    })
})

const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.width = 700;
canvas.height = 500;

class Enemy{
    constructor(){
        this.x = 10;
        this.y = 30;
        this.randomValue = Math.floor(Math.random() * 32);

        this.signalX = this.x;
        this.signalY = this.y;

    }

    update(){
        this.x = this.x + 0.2;
        console.log("la X: ",this.x);
        
        // Collider para el game over
        if(this.x >= 500){
            console.log("LOSE...");
            gameOver = true;
            ctx.font = "100px Arial"
            ctx.fillStyle = "red";
            ctx.fillText("GAME OVER", 350, 250);
            setTimeout(() => {
                const newURL = "/gameOver.html";
                history.pushState(null,"",newURL);
                location.reload();
                
            }, 3000);
        }
    }

    draw() {
        // Pared movil
        ctx.strokeStyle = "blueViolet";
        ctx.strokeRect(this.x, this.y, 45, 400);

        // punto de respaw
        this.signalX = spawn;

        // punto de inicio de la pared
        ctx.fillRect(this.signalX, this.signalY +125, 10, 100);

        // ubicacion del personaje
        ctx.strokeRect(550, 350, 50, 50);

        // numero en decimal
        ctx.font = "30px Arial"
        ctx.textAlign = "center"
        ctx.strokeText(this.randomValue, this.x+20, this.y + 200);

    }

}

const rectangle = new Enemy();
let sumaBinaria;
let spawn = 10;
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rectangle.draw();
    rectangle.update();
    if( (posBinarios.uno === 1) && (rectangle.randomValue === posBinarios.uno) ){
        console.log("binario");

    }
    
    // console.log(`${posBinarios.dieciseis} ${posBinarios.ocho} ${posBinarios.cuatro} ${posBinarios.dos} ${posBinarios.uno}`);
    // console.log((posBinarios.dieciseis * (2**4)) + (posBinarios.ocho * (2**3)) + (posBinarios.cuatro * (2**2)) + (posBinarios.dos * (2**1)) + (posBinarios.uno * (2**0)));

    sumaBinaria = (posBinarios.treintaydos * (2**5) + posBinarios.dieciseis * (2**4)) + (posBinarios.ocho * (2**3)) + (posBinarios.cuatro * (2**2)) + (posBinarios.dos * (2**1)) + (posBinarios.uno * (2**0))
    console.log("sumaBinaria",sumaBinaria);

    // if(rectangle.x >= 500){
    //     console.log("LOSE...");
    //     gameOver = true;
    // }

    if(gameOver === false){
        requestAnimationFrame(animate)
    } else {
        requestAnimationFrame()
    }
};

// comparacion del binario con el decimal
const boton = document.querySelector("button");
boton.addEventListener("click", () => {
    if (sumaBinaria === rectangle.randomValue){
        console.log("iguales");
        spawn += 10;
        rectangle.randomValue = Math.floor(Math.random() * 32);
        console.log("spawn", spawn);
        rectangle.x = spawn;
    } else {
        console.log("NO iguales");
        spawn += 30;
        rectangle.x = spawn;
    }
});


animate();
