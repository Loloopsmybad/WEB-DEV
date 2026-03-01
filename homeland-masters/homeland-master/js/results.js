const resultsContainer = document.getElementById('results');
const urlParams = new URLSearchParams(window.location.search);
const listing = urlParams.get('listing')?.toLowerCase();
const offer = urlParams.get('offer')?.toLowerCase();
const city = urlParams.get('city')?.toLowerCase();

let lastVisible = null;
const LIMIT = 6;
let loading = false;

async function fetchProperties(initial = false) {
  if (loading) return;
  loading = true;

  let query = db.collection("properties")
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  if (listing) query = query.where("type", "==", listing);
  if (offer) query = query.where("offer", "==", offer);
  if (city) query = query.where("city", "==", city);

  if (!initial && lastVisible) {
    query = query.startAfter(lastVisible);
  }

  const snapshot = await query.get();
  lastVisible = snapshot.docs[snapshot.docs.length - 1];

  if (snapshot.empty && initial) {
    resultsContainer.innerHTML = `<p>No matching properties found.</p>`;
    loading = false;
    return;
  }

  snapshot.forEach(doc => {
    const p = doc.data();
    const card = document.createElement('div');
    card.className = "property-card";
    card.innerHTML = `
      <img src="${p.imageUrl}" alt="${p.title}" />
      <h4>${p.title}</h4>
      <p><strong>Type:</strong> ${p.type}</p>
      <p><strong>Offer:</strong> ${p.offer}</p>
      <p><strong>City:</strong> ${p.city}</p>
      <p><strong>Price:</strong> ${p.price}</p>
      <a href="#" class="view-btn">View Details</a>
    `;
    resultsContainer.appendChild(card);
  });

  loading = false;
}

// Initial load
window.addEventListener('DOMContentLoaded', () => {
  fetchProperties(true);
});

// Infinite scroll
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
  ) {
    fetchProperties();
  }
});
