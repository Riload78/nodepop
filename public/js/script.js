document.addEventListener("DOMContentLoaded", (event) => {
  const deleteActions = document.querySelectorAll("#delete-action");
  deleteActions.forEach((deleteAction) => {
    deleteAction.addEventListener("click", (e) => {
      e.preventDefault();
  
      if (window.confirm("Are you sure?")) {
        window.location = e.target.href;
      }
    });
  })

});
