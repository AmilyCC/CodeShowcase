// templates.js - 動態載入 head、header、h1標題、返回按鈕、Bootstrap、專案 CSS & JS
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ templates.js 正在運行...");

    // **動態解析 `document.title`，取得專案名稱**
    const projectMap = {
        "Tiger Machine": "project1",
        "Todo List": "project2",
        "RGB to Hex Converter": "project3"
    };

    const pageTitle = document.title.split("|")[0].trim(); // 取得 `title` 的前半部
    const projectKey = projectMap[pageTitle] || null; // 找到對應的專案 key
    console.log(`🔍 目前頁面標題: ${pageTitle}`);
    console.log(`🔍 對應的專案 key: ${projectKey}`);

    // **插入 `<head>` 內容**
    const headHTML = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">        
        <link rel="stylesheet" href="../styles.css">
        <link rel="shortcut icon" type="image/x-icon" href="../assets/logo.png" />        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        ${projectKey ? `<link rel="stylesheet" href="../projectsStyles/${projectKey}-style.css">` : ""}
    `;
    document.head.insertAdjacentHTML("beforeend", headHTML);

    // **插入 `header`**
    const headerHTML = `
        <header class="header p-header">
            <h1 id="projectTitle">${pageTitle}</h1>
            <a class="backToTop" href="../index.html">← 返回作品列表</a>
        </header>
    `;
    document.body.insertAdjacentHTML("afterbegin", headerHTML);

    // **插入 Bootstrap Script**
    const bootstrapScripts = document.createElement("script");
    bootstrapScripts.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js";
    bootstrapScripts.defer = true;
    document.body.appendChild(bootstrapScripts);

    // **動態載入對應的 `JS`**
    if (projectKey) {
        const scriptPath = `../projectsJs/${projectKey}-script.js`;
        console.log(`📂 嘗試載入 JS: ${scriptPath}`);

        // **確保 JS 在載入後才執行**
        const script = document.createElement("script");
        script.src = scriptPath;
        script.defer = true;
        script.onload = () => {
            console.log(`✅ 成功載入 ${scriptPath}`);
        };
        script.onerror = () => {
            console.error(`❌ 無法載入 ${scriptPath}，請確認檔案是否存在！`);
        };
        document.body.appendChild(script);
    } else {
        console.warn("⚠️ 未找到對應的專案 key，未載入任何專案 JS。");
    }
});
