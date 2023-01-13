document.addEventListener("DOMContentLoaded", function () {
  const elems = document.querySelectorAll(".sidenav");
  const options = {
    edge: "left",
  };
  var instances = M.Sidenav.init(elems, options);
});
