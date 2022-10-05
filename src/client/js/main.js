import "../scss/styles.scss";

const toggleBoxBtns = document.querySelectorAll(".toggle-box__btn");

const handleToggle = (event) => {
  event.preventDefault();
  const target = event.target;
  let toggleBox = target.parentElement;
  if (!toggleBox.classList.contains("toggle-box")) {
    toggleBox = toggleBox.parentElement;
  }
  const toggleBoxElems = toggleBox.querySelector(".toggle-box__elems");
  if (toggleBoxElems.classList.contains("hidden")) {
    toggleBoxElems.classList.remove("hidden");
  } else {
    toggleBoxElems.classList.add("hidden");
  }
};

if (toggleBoxBtns) {
  toggleBoxBtns.forEach((btn) => {
    btn.addEventListener("click", handleToggle);
  });
}
