function scrollLeft() {
  const container = document.getElementById("scrollContainer");
  container.scrollBy({
    left: -300,
    behavior: "smooth"
  });
}

function scrollRight() {
  const container = document.getElementById("scrollContainer");
  container.scrollBy({
    left: 300,
    behavior: "smooth"
  });
}