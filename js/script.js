document.addEventListener("DOMContentLoaded", () => {
  const slideList = document.getElementById("slideList");
  const slideCard = document.getElementById("slide-card");
  const formsDiv = document.querySelector(".forms-div");
  const landingPage = document.getElementById("landingPage");
  const modal = document.getElementById("myModal");
  const closeModal = document.getElementById("closeModal");
  const form = document.querySelector("form[data-form]");

  let selectedProjectTitle = "";

  if (
    !slideList ||
    !slideCard ||
    !formsDiv ||
    !landingPage ||
    !modal ||
    !closeModal
  ) {
    console.error("Some required elements are missing in the DOM.");
    return;
  }

  // Function to close the modal
  const closeModalFunction = () => {
    modal.style.display = "none";
  };

  // Function to handle slide list click
  const handleSlideListClick = (event) => {
    const target = event.target;
    const li = target.tagName === "IMG" ? target.parentElement : target;

    if (li && (target.tagName === "IMG" || target.tagName === "LI")) {
      const title = li.getAttribute("data-title");
      const description = li.getAttribute("data-description");

      selectedProjectTitle = title;

      // Add active class to clicked item
      const active = document.querySelector(".active");
      if (active) {
        active.classList.remove("active");
      }
      li.classList.add("active");

      // Update slide card content
      slideCard.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
      `;

      // Show the forms-div and enable page scrolling
      formsDiv.style.display = "flex";
      landingPage.style.overflow = "auto";
    }
  };

  emailjs.init("crZ0KvGAnWRVgmCz5");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Add selected project title to the form data
    const projectInput = document.createElement("input");
    projectInput.type = "hidden";
    projectInput.name = "project";
    projectInput.value = selectedProjectTitle;
    form.appendChild(projectInput);
    const formData = new FormData(form);
    const data = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      telefone: formData.get("telefone"),
      empresa: formData.get("empresa"),
      projeto: formData.get("project"),
    };
    emailjs
      .send("service_i20ot4d", "template_p0rxk5r", data)
      .then(() => {
        alert("Email enviado com sucesso!");
        form.reset();
      })
      .catch((error) => {
        alert("Erro ao enviar email: " + JSON.stringify(error));
      });
  });

  // Event listeners
  closeModal.addEventListener("click", closeModalFunction);
  slideList.addEventListener("click", handleSlideListClick);
});
