
const GITHUB_USER = "natali3m1";
const CODE_REPO = "coding-portfolio-code";
const BRANCH = "main";

const projects = [
    {
        id: "sushi-go",
        title: "Sushi Go",
        language: "C++",
        description: "A multiplayer card game built in C++ using OOP, fun digital displays, and interactable gameplay",
        files: [
            { name: "sushigo.cpp", path: "sushigo/sushigo.cpp" },
            { name: "game.cpp", path: "sushigo/game.cpp" },
            { name: "game.h", path: "sushigo/game.h" },
            { name: "board.cpp", path: "sushigo/board.cpp" },
            { name: "board.h", path: "sushigo/board.h" },
            { name: "player.cpp", path: "sushigo/player.cpp" },
            { name: "player.h", path: "sushigo/player.h" },
            { name: "card.cpp", path: "sushigo/card.cpp" },
            { name: "card.h", path: "sushigo/card.h" },
            { name: "vector.cpp", path: "sushigo/vector.cpp" },
            { name: "vector.h", path: "sushigo/vector.h" },
            { name: "termfuncs.cpp", path: "sushigo/termfuncs.cpp" },
            { name: "termfuncs.h", path: "sushigo/termfuncs.h" }
        ],
        github: "https://github.com/natali3m1/coding-portfolio-code"
    },
    {
        id: "logic-design",
        title: "Logic Gates, Adders, Muxes, ALUs",
        language: "Verilog",
        description: "Projects using SystemVerilog, VSCode, and Icarus Verilog",
        github: ""
    },
    {
        id: "betz-limit",
        title: "Betz-Limit Derivation",
        language: "Math",
        description: "A mathematical derivation using first principles of Newtonian mechanics, conservation of energy, and calculus, as well as rudimentary control volume analysis.",
        pdf: "",
        github: ""
    },
    {
        id: "jewelry-soldering",
        title: "Jewelry Soldering",
        language: "EE",
        description: "A fun, hands-on project exploring soldering techniques and getting comfortable with soldering processes",
        github: ""
    },
    {
        id: "74-series-ics",
        title: "74-Series ICs",
        language: "EE",
        description: "Digital logic projects in the lab using 74-series ICs, continuously updated",
        github: ""
    },
    {
        id: "fpgas",
        title: "FPGAs",
        language: "EE",
        description: "Digital logic projects in the lab using FPGAs and SystemVerilog, continuously updated",
        github: ""
    }
];

window.PORTFOLIO_CONFIG = {
    GITHUB_USER,
    CODE_REPO,
    BRANCH,
    projects
};

const grid = document.getElementById("project-grid");
const filters = document.getElementById("filters");

if (grid && filters) {
    const categories = ["All", "C++", "Verilog", "Math", "EE"];

    function showProjects(category) {
        grid.replaceChildren();

        const filtered = projects.filter(project =>
            category === "All" || project.language === category
        );

        filtered.forEach(project => {
            const card = document.createElement("article");
            card.className = "project-card";

            const tag = document.createElement("span");
            tag.className = "tag";
            tag.textContent = project.language;

            const title = document.createElement("h3");
            title.textContent = `${project.title}`;

            const description = document.createElement("p");
            description.className = "project-description";
            description.textContent = project.description;

            const links = document.createElement("div");
            links.className = "card-links";

            const details = document.createElement("a");
            details.href = `project.html?id=${encodeURIComponent(project.id)}`;
            details.textContent = "Explore project →";
            links.appendChild(details);

            if (project.github) {
                const github = document.createElement("a");
                github.href = project.github;
                github.target = "_blank";
                github.rel = "noopener noreferrer";
                github.textContent = "GitHub ↗";
                links.appendChild(github);
            }

            card.append(tag, title, description, links);
            grid.appendChild(card);
        });

        document.querySelectorAll(".filter-button").forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.language === category
            );
        });
    }

    categories.forEach(category => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "filter-button";
        button.textContent = category;
        button.dataset.language = category;
        button.addEventListener("click", () => showProjects(category));
        filters.appendChild(button);
    });

    showProjects("All");
}
