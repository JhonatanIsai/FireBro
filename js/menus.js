  
document.addEventListener("DOMContentLoaded", function () {
    //Nav Menu
    const menus = document.querySelectorAll(".left-menu");
    M.Sidenav.init(menus, { edge: "left" });
    // Add Tasks
    const forms = document.querySelectorAll(".state-menu");
    M.Sidenav.init(forms, { edge: "right" });
  });