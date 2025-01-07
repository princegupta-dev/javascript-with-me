function debounce(fn, delay) {
  console.log("fn", fn);
  //   console.log("args", ...args);
  let timeoutId;
  console.log("timeoutId", timeoutId);
  return function (...args) {
    console.log("args 2", ...args);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Function to update the search query
function updateSearchQuery(event) {
  const searchQuery = event.target.value;
  document.getElementById("searchQuery").textContent = searchQuery;
}
const searchInput = document.getElementById("searchInput");
const debouncedSearch = debounce(updateSearchQuery, 500);
searchInput.addEventListener("input", debouncedSearch);
