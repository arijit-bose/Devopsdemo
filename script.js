const filterButtons = document.querySelectorAll(".filter-button");
const menuCards = document.querySelectorAll(".menu-card");
const searchInput = document.querySelector("#menu-search");
const emptyMessage = document.querySelector(".empty-message");
const basketCount = document.querySelector(".basket-count");
const toast = document.querySelector(".toast");

let activeFilter = "all";
let basketItems = 0;
let toastTimer;

function updateMenu() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCards = 0;

  menuCards.forEach((card) => {
    const matchesCategory =
      activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = card.dataset.name.includes(query);
    const isVisible = matchesCategory && matchesSearch;

    card.hidden = !isVisible;
    if (isVisible) visibleCards++;
  });

  emptyMessage.hidden = visibleCards > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    updateMenu();
  });
});

searchInput.addEventListener("input", updateMenu);

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    basketItems += 1;
    basketCount.textContent = basketItems;

    const dishName = button
      .closest(".menu-card")
      .querySelector("h3").textContent;

    showToast(`${dishName} added to your basket`);
  });
});

document.querySelector(".basket-button").addEventListener("click", () => {
  if (basketItems === 0) {
    showToast("Your basket is waiting for something delicious.");
  } else {
    showToast(`You have ${basketItems} item${basketItems === 1 ? "" : "s"} in your basket.`);
  }
});
