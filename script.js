
let img = document.querySelector(".img")
let moldura = document.querySelector(".moldura")
let btnRandom = document.querySelector(".btnRandom")

btnRandom.addEventListener("click", verificandoAPI)

async function verificandoAPI(){
    try{
        await imgAleatoriaAPI()
    }
    catch (error){
        console.error(error)
        alert("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.")
    }
}
verificandoAPI()

let fotoLocal = JSON.parse(localStorage.getItem("chaveFoto")) || []

function imgAleatoriaAPI(){

return new Promise( async function(resolve, reject){
        let foto = await fetch("https://picsum.photos/200/300/?random")
       
        if(foto.ok){
            moldura.style.border = ""
            img.src = foto.url
            for(let i=0; i< fotoLocal.length; i++){
                if(fotoLocal[i] === img.src){
                    moldura.style.border = "5px solid yellow"
                }
            }
            resolve()
        }
        else{
            reject("Erro na function imgAleatoria()."+" Erro:"+ foto.status) 
        }
    
})

}

img.addEventListener("click", ()=>{

let temNoLocal = false

for(let i=0; i< fotoLocal.length; i++){

    if(fotoLocal[i] === img.src){
        fotoLocal.splice(i, 1)
        localStorage.setItem("chaveFoto", JSON.stringify(fotoLocal))
        moldura.style.border = ""
        temNoLocal = true
    }
}

if(!temNoLocal){
   moldura.style.border = "5px solid yellow"
   fotoLocal.push(img.src)
   localStorage.setItem("chaveFoto", JSON.stringify(fotoLocal))
   alert("Imagem favoritada.")
}

})