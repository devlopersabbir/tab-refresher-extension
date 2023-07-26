console.log("hello popup");

window.document.addEventListener("DOMContentLoaded", function () {
  const container: HTMLDivElement = document.querySelector(
    ".container"
  ) as HTMLDivElement;
  if (container) {
    container.style.width = "400px";
    container.style.height = "auto";
    container.style.padding = "20px";
  } else {
    console.log("Not found!");
  }
});
