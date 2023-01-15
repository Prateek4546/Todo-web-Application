const form = document.getElementById('form');
const input = document.getElementById('input');
const msg = document.getElementById('msg');
const posts = document.getElementById('posts');



form.addEventListener('submit', (e)=> {
    e.preventDefault();
    formValidation();
    acceptData();
    createPost();
})

const formValidation = ()=>{
     if(input.value === ""){
        console.log("failuer");
        msg.textContent = "Post can not be blak"
     }
     else{
        msg.textContent = "";
        console.log("Success");
     }
}

let data ={}

const acceptData = ()=> {
    data["text"] = input.value;
    console.log(data);
}

const createPost = () => {
    posts.innerHTML += 
    `<div>
    <p>${data.text}</p>
    <span class="option">
        <i onClick = "editPost(this)" class="fa-solid fa-pen-to-square"></i>
        <i onClick = "deletePost(this)" class="fa-solid fa-trash-can"></i>
    </span>
   
</div>`;
   input.value = "";
}

const deletePost = (e) =>{
    e.parentElement.parentElement.remove();
}


const editPost = (e)=>{
   input.value = e.parentElement.previousElementSibling.innerHTML;
   e.parentElement.parentElement.remove();
}

