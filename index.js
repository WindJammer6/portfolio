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
function sortTable(columnIndex, tableName) {
    let table = document.getElementById(tableName);
    let tbody = table.querySelector("tbody");
    let rows = Array.from(tbody.rows);
    let ascending = table.dataset.sortOrder !== "asc";

    rows.sort((rowA, rowB) => {
        let cellA = rowA.cells[columnIndex].textContent.trim();
        let cellB = rowB.cells[columnIndex].textContent.trim();

        // Try converting to numbers for numeric columns
        let a = isNaN(cellA) ? cellA.toLowerCase() : parseInt(cellA, 10);
        let b = isNaN(cellB) ? cellB.toLowerCase() : parseInt(cellB, 10);

        return ascending ? (a > b ? 1 : -1) : (a < b ? 1 : -1);
    });

    // Toggle sorting order
    table.dataset.sortOrder = ascending ? "desc" : "asc";

    // Update table rows
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}

