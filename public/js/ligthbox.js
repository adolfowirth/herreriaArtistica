const imagenes = document.querySelectorAll(".img-galeria");
console.log(imagenes);
const imagenesLigth = document.querySelector(".agregar-imagen");
const contenedorLigth = document.querySelector(".imagen-ligth");

imagenes.forEach(imagen =>{
    imagen.addEventListener("click", ()=>{
        aparecerImagen(imagen.getAttribute("src"));
    }
    )
}
)

contenedorLigth.addEventListener("click", (e)=>{
    if(e.target !== imagenesLigth){
        contenedorLigth.classList.toggle("show");
        imagenesLigth.classList.toggle("showImage");
        hamburguesa1.style.opacity = "1";
    }
}
)

const aparecerImagen = (imagen)=>{
    imagenesLigth.src = imagen;
    contenedorLigth.classList.toggle("show");
    imagenesLigth.classList.toggle("showImage");
    hamburguesa1.style.opacity = "0";
}

const hamburguesa1 = document.querySelector(".hamburguer");