
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

const config = window.PORTFOLIO_CONFIG;
const container = document.getElementById("project-details");

if (!config || !container) {
  console.error("Project configuration or page container is missing.");
} else {
  const project = config.projects.find(item => item.id === projectId);

  if (!project) {
    container.textContent = "Project not found. Please return to the homepage.";
  } else {
    document.title = `${project.title} | My Code Portfolio`;
    container.replaceChildren();

    const heading = document.createElement("h1");
    heading.textContent = project.title;

    container.appendChild(heading);

    if (project.id === "sushi-go") {
        const image = document.createElement("img");
        image.src = "images/sushi-go.png";
        image.alt = "Screenshot of my Sushi Go game";
        image.style.width = "100%";
        image.style.maxWidth = "700px";
        image.style.borderRadius = "12px";
        image.style.margin = "20px 0";

        container.appendChild(image);
    }
    const description = document.createElement("p");
    description.textContent = project.description;

    const codeHeading = document.createElement("h2");
    codeHeading.textContent = "Source Code";

    container.append(description, codeHeading);

    async function loadFiles() {
      for (const file of project.files || []) {
        const section = document.createElement("section");
        section.className = "project-card";

        const fileHeading = document.createElement("h3");
        fileHeading.textContent = file.name;

        const pre = document.createElement("pre");
        pre.style.overflowX = "auto";
        pre.style.padding = "16px";
        pre.style.background = "#f1f3f7";
        pre.style.borderRadius = "8px";

        const code = document.createElement("code");
        code.textContent = "Loading code...";

        pre.appendChild(code);
        section.append(fileHeading, pre);
        container.appendChild(section);

        const url =
            `https://raw.githubusercontent.com/${config.GITHUB_USER}/` +
            `${config.CODE_REPO}/${config.BRANCH}/${file.path}`;

        try {
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          code.textContent = await response.text();
        } catch (err) {
          code.textContent = `Could not load this file (${err.message}).`;
          console.error(`Error loading ${file.path}:`, err);
        }
      }
    }

    loadFiles();
  }
}
