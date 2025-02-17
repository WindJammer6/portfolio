/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});


/* -----------------------------------------
   Function to sort the table when clicking headers
 ---------------------------------------- */
function sortTable(n) {
    let table = document.getElementById("competitions-table");
    let rows = Array.from(table.rows).slice(1);
    let switching = true;
    let direction = "asc";

    while (switching) {
        switching = false;
        for (let i = 1; i < rows.length - 1; i++) {
            let x = rows[i].cells[n].textContent.toLowerCase();
            let y = rows[i + 1].cells[n].textContent.toLowerCase();

            if ((direction === "asc" && x > y) || (direction === "desc" && x < y)) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
        if (!switching && direction === "asc") {
            direction = "desc";
            switching = true;
        }
    }
}

