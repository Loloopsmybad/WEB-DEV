// search.js

document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm');

  if (!searchForm) {
    console.error('Search form not found. Make sure it has id="searchForm"');
    return;
  }

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const listing = document.getElementById('list-types').value.trim();
    const offer = document.getElementById('offer-types').value.trim();
    const city = document.getElementById('select-city').value.trim();

    if (!listing || !offer || !city) {
      alert("Please select listing type, offer type, and city.");
      return;
    }

    // Construct the search results page URL with query parameters
    const queryString = `search-results.html?listing=${encodeURIComponent(listing)}&offer=${encodeURIComponent(offer)}&city=${encodeURIComponent(city)}`;
    
    window.location.href = queryString;
  });
});
