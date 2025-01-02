let searchInput = document.getElementById("searchInput");
let resultList = document.getElementById("resultList");
let btnagguser = document.querySelector("body main .boton-agregar-usuario button");
let form = document.querySelector("body main .boton-agregar-usuario .formulario");
let name = document.getElementById("aggUserName");
let username = document.getElementById("aggUserUsername");
let mail = document.getElementById("aggUserEmail")
let phone = document.getElementById("aggUserPhone")
let city = document.getElementById("aggUserCity")
let compname = document.getElementById("aggUserCompName")
let btnnewuser = document.querySelector("body main .boton-agregar-usuario .formulario .boton-agg")
let dataGlobal = [];
let select = document.querySelector("body main .container select")
let selectValue = select.value
let usuariosStorage = [];
if (localStorage.getItem("usuariosNuevos")) {
    usuariosStorage = JSON.parse(localStorage.getItem("usuariosNuevos"))
}

select.addEventListener("change",()=>{
    selectValue = select.value;
    console.log(selectValue);
})

if (usuariosStorage) {
    console.log(usuariosStorage);
    usuariosStorage.forEach((usuario)=>{
            let users = document.querySelector("body main .container-de-usuarios")
            let newuser = document.createElement("div");
            newuser.classList.add("usuario");
            newuser.innerHTML=`
            <div class="user">
            <i class="fa-solid fa-user"></i>
            </div>
            <span>Nombre de Usuario:</span>
            <h2>${usuario.name}</h2>
            <span>Username: </span>
            <h2>${usuario.username}</h2>
            <span>Email:</span>
            <h2>${usuario.mail}</h2>
            <span>Ciudad donde vive:</span>
            <h2>${usuario.address.city}</h2>
            <span>Teléfono:</span>
            <h2>${usuario.phone}</h2>
            <span>Nombre de empresa:</span>    
            <h2>${usuario.company.name}</h2>
                
                `;
                users.appendChild(newuser)   
        }
        

    )   }   






btnagguser.addEventListener("click",()=>{
    if (form.style.display == "none") {
        form.style.display = "flex"
        // alert("sadasfd")    
    }else{
        form.style.display = "none"
    }
    if (btnagguser.textContent == "Agregar usuario") {
        btnagguser.textContent = "Cancelar"
    }else{
        btnagguser.textContent = "Agregar usuario"
    }
})
if (btnagguser.textContent == "Agregar usuario") {
    btnagguser.textContent = "Cancelar"
}else{
    btnagguser.textContent = "Agregar usuario"
}
if (form.style.display == "none") {
    form.style.display = "flex"
    // alert("sadasfd")    
}else{
    form.style.display = "none"
}
    btnnewuser.addEventListener("click",()=>{
        let newname = (name.value)
        let newmusername = (username.value)
        let newmail = (mail.value)
        let newphone = (phone.value)
        let newcity = (city.value)
        let newcompname = (compname.value)
        
        usuariosStorage.push({
        "name": newname,
        "username": newmusername,
        "mail":newmail,
        "phone":newphone,
        "address":{
            "city":newcity,
        },
        "company":{
            "name":newcompname,
    }})
    // usuariosStorage.JSON.stringify()
    localStorage.setItem("usuariosNuevos",JSON.stringify(usuariosStorage))
    
    // localStorage.setItem("newUserName",newname)
    // localStorage.setItem("newUserUsername",newmusername)
    // localStorage.setItem("newUserMail",newmail)
    // localStorage.setItem("newUserPhone",newphone)
    // localStorage.setItem("newUserCity",newcity)
    // localStorage.setItem("newUserCompName",newcompname)
    // console.log(localStorage.getItem("newUserName"));
    
    name.value="";
    username.value="";
    mail.value="";
    phone.value="";
    city.value="";
    compname.value="";



    const formData={
        name: newname,
        username: newmusername,
        mail:newmail,
        phone:newphone,
        address:{
            city:newcity,
        },
        compname:newcompname,
    }
    const jsondata= JSON.stringify(formData)
    const blob = new Blob([jsondata],{type:"aplication/json"});
    console.log(jsondata);
    


    let jsonlocal = ()=>{
       
    usuariosStorage.forEach((usuario)=>{
    let users = document.querySelector("body main .container-de-usuarios")
    let newuser = document.createElement("div");
    newuser.classList.add("usuario");
    newuser.innerHTML=`
    <div class="user">
    <i class="fa-solid fa-user"></i>
    </div>
    <span>Nombre de Usuario:</span>
    <h2>${usuario.name}</h2>
    <span>Username: </span>
    <h2>${usuario.username}</h2>
    <span>Email:</span>
    <h2>${usuario.mail}</h2>
    <span>Ciudad donde vive:</span>
    <h2>${usuario.address.city}</h2>
    <span>Teléfono:</span>
    <h2>${usuario.phone}</h2>
    <span>Nombre de empresa:</span>    
    <h2>${usuario.company.name}</h2>
        
        `;
        users.appendChild(newuser)   
    })
        
    };
    jsonlocal()
    
});
const link = async()=>{
    let users = document.querySelector("body main .container-de-usuarios")
    let api = await fetch("https://jsonplaceholder.typicode.com/users")
    let data =  await api.json()
    dataGlobal=data;
    
    
    
    data.forEach(user => {
        let newuser = document.createElement("div");
        newuser.classList.add("usuario");
        newuser.innerHTML=`
        <div class="user">
        <i class="fa-solid fa-user"></i>
        </div>
        <span>Nombre de Usuario:</span>
        <h3>${user.name}</h3>
        <span>Username: </span>
        <h2>${user.username}</h2>
        <span>Email:</span>
        <h2>${user.email}</h2>
        <span>Ciudad donde vive:</span>
        <h2>${user.address.city}</h2>
        <span>Teléfono:</span>
        <h2>${user.phone}</h2>
        <span>Nombre de empresa:</span>    
        <h2>${user.company.name}</h2>
        `;
        users.appendChild(newuser)   
    });

}
console.log(selectValue);  

link().then(()=>{
    let usuarios = document.querySelectorAll("body main .container-de-usuarios .usuario")
    console.log(usuarios[0]);
    
    document.addEventListener("keyup", e=>{
        
        if (e.target.matches("#searchInput")){
            console.log();  
            dataGlobal.forEach((datauser, index) =>{  
                if (selectValue == "city") {
                    if (datauser.address[selectValue].toLowerCase().includes(e.target.value.toLowerCase())){
                        usuarios[index].classList.add("usuario")
                        usuarios[index].classList.remove("filtro")
                    }else{
                        console.log("no");  
                        usuarios[index].classList.remove("usuario")
                        usuarios[index].classList.add("filtro")
                    }
                }else{
                    if (datauser[selectValue].toLowerCase().includes(e.target.value.toLowerCase())){
                        usuarios[index].classList.add("usuario")
                        usuarios[index].classList.remove("filtro")
                    }else{
                        console.log("no");  
                        usuarios[index].classList.remove("usuario")
                        usuarios[index].classList.add("filtro")
                    }
                }
            })
        }else{
            console.log("nad q aser");
        }
    });   
    
    
    
    // searchInput.addEventListener("input",()=>{
        
        // })    
        
    })


let saludo = "chau"
function getValue(hola) {
    return hola

}
getValue()
console.log(getValue(selectValue));


















































