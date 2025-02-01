document.addEventListener("DOMContentLoaded", () => {
    // 作品資料
    const projects = [
        { title: "Tiger Machine", image: "assets/p1.png", link: "./projects/project1.html" },
        { title: "Todo List", image: "assets/p2.png", link: "./projects/project2.html" },
        { title: "RGB to Hex Converter", image: "assets/p3.png", link: "./projects/project3.html" }
    ];

    // 獲取作品容器
    const container = document.getElementById("projects-container");

    // 迴圈動態創建作品卡片
    projects.forEach(project => {
        // 創建外層 div
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        // 創建標題
        const projectTitle = document.createElement("h2");
        projectTitle.classList.add("project-title");
        projectTitle.textContent = project.title;

        // 創建圖片
        const projectImage = document.createElement("img");
        projectImage.classList.add("project-image");
        projectImage.src = project.image;
        projectImage.alt = project.title;

        // 創建按鈕
        const projectButton = document.createElement("a");
        projectButton.classList.add("project-button");
        projectButton.href = project.link;
        projectButton.textContent = "查看作品";
        projectButton.target = "_blank";

        // 組合元素
        projectCard.appendChild(projectTitle);
        projectCard.appendChild(projectImage);
        projectCard.appendChild(projectButton);
        container.appendChild(projectCard);
    });
});
