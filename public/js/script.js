document.addEventListener("DOMContentLoaded", (event) => {
  const deleteAction = document.querySelector("#delete-action");
  deleteAction.addEventListener("click", (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure?")) {
      window.location = e.target.href;
    }
  });
});
