function itemTemplate(item){
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}
//REPLACE THIS CODE AFTER DELETING THE HTML CODE BETWEEN <ul> tags
let ourHTML= items.map(function(item){
    return itemTemplate(item)
}).join('')
document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML)

let createField=document.getElementById("create-field")
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault()
    axios.post('/create-item', {text:createField.value}).then(function(response){
        document.getElementById("item-list").insertAdjacentHTML("beforeend",itemTemplate(response.data))
        createField.value="" //empty the field after typing
        createField.focus()  //retourner le curseur dans le input, ready to type again
    }).catch(function(){
        console.log("Please try again later!")
    })
})

document.addEventListener("click", function(e){
     
    // DELETING
    if(e.target.classList.contains("delete-me")){
       if(confirm("Do you want to permentlty delete this item?")){
           axios.post('/delete-item', {id: e.target.getAttribute("data-id")}).then(function(){
               e.target.parentElement.parentElement.remove()
           }).catch(function(){
               console.log("Please try again later")
           })
       }
   }

   //UPDATING
    if(e.target.classList.contains("edit-me")){
        let userInput= prompt("Write the new item name for edit", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
        //console.log(userInput)
        if(userInput && userInput.length>0){
            axios.post('update-item', {text:userInput, id:e.target.getAttribute("data-id")}).then(function(){
            e.target.parentElement.parentElement.querySelector(".item-text").innerHTML=userInput            
            }).catch(function(){
                console.log("please try again later")
            })
        }
        
    }
})

