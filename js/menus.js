document.addEventListener("DOMContentLoaded",function(){
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
})


document.addEventListener("DOMContentLoaded", function () {
    //Nav Menu
    const menus = document.querySelectorAll(".left-menu");
    M.Sidenav.init(menus, { edge: "left" });
    // Add Tasks
    const forms = document.querySelectorAll(".state-menu");
    M.Sidenav.init(forms, { edge: "right" });
  });




  const setupTasks = (data) =>{
    let html ="";

    data.forEach((doc) => {
      const task = doc.data();
      const li
    })
  }