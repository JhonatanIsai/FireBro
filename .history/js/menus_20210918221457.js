  
document.addEventListener("DOMContentLoaded", function () {
    //Nav Menu
    const menus = document.querySelectorAll(".left-menu");
    M.Sidenav.init(menus, { edge: "left" });
    // Add Tasks
    const forms = document.querySelectorAll(".side-form");
    M.Sidenav.init(forms, { edge: "left" });
  });