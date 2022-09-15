export const toggleDark = () => {
  const currentSetting = localStorage.getItem("color-schema") || "auto";
  document.documentElement.classList.toggle("dark");
  if (currentSetting === "dark") {
    localStorage.setItem("color-schema", "light");
  } else {
    localStorage.setItem("color-schema", "dark");
  }
};
