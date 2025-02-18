// 定义
const title = document.getElementById("title");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "48px serif";

let windowHeight, windowWidth;
const pointerHeight = 30, pointerWidth = 4;
const peopleHeight = 100, peopleWidth = 50;
const playersPlatformHeight = 500, playersPlatformWifth = 500;

const lastestEdition = "2025-2-10";
let debugMode = false;
let language = "english";

let mouseX, mouseY;
let positionX = 0, positionY = 0;
let showPositionX, showPositionY;
let playersPlatformX = 0, playersPlatformY = 0;
let offSetX, offSetY;

let inventoryOpen = false;

class items {
    constructor(ID, name, description, rarity, category) {
        this.ID = ID;
        this.name = name;
        this.description = description;
        this.rarity = rarity;
        this.category = category;
    }
}

class allItems {
    constructor() {
        this.items = {};
    }
    addItems(item) {
        this.items[item.name] = item
    }

}

let health = 50, maxiumHealth = 50;
let energy = 30, maxiumEnergy = 30;
let weight = 0, maxiumWeight = 30;
let moveDistance, maxiumMoveSpeed = 10;

// 控制台输出
function inventoryOpenCout() {
    if(inventoryOpen) {
        if(language == "english") console.log("inventory open");
        else if(language == "中文") console.log("打开物品框");
    } else {
        if(language == "english") console.log("inventory close");
        else if(language == "中文") console.log("关闭物品框");
    }
}
function reSizeCout() {
    if(language == "english") console.log("detect window s size changed:\nwindowHeight: " + windowHeight + " windowWidth: " + windowWidth);
    else if(language == "中文") console.log("检测到窗口大小变化:\nwindowHeight: " + windowHeight + " windowWidth: " + windowWidth);
}
function invalidInputCout() {
    if(language == "english") console.log("[Warn]: invalid input;");
    else if(language == "中文") console.log("[警告]: 无效的输入");
}
function unSetInputCout() {
    if(language == "english") console.log("[Error]: unset input;");
    else if(language == "中文") console.log("[错误]: 未设置输入;");
}
function needDebugOnCout() {
    if(language == "english") console.log("[Error]: ignored, needs \"debugMode\" on(true);");
    else if(language == "中文") console.log("[错误]: 忽略, 需要 \"debugMode\" 为正(true);");
}
function pressKeyCout(key) {
    if(language == "english") console.log("key press: " + key);
    else if(language == "中文") console.log("按下的键; " + key);
}
function variableStatus() {
    if(debugMode) {
        if(language == "english") console.group("variable values / information:");
        else if(language == "中文") console.group("变量值 / 信息:");

        console.log("localStorage.getItem(\"language\") = " + localStorage.getItem("language"));
        console.log(";debugMode: " + debugMode + "\n");

        console.groupEnd();
        if(language == "english") console.log("Note: only for staric information;");
        else if(language == "中文") console.log("注意: 仅适用于静态信息");
    } else {
        needDebugOnCout();
    }
}
function note() {
    if(language == "english")  console.log("Notes:\nto change console output, please change variable \"language\" s value,\nsuch as \"changeLanguage(\"中文\");\", edition(" + lastestEdition + "), \n available languages: \"english\" and \"中文\";");
    else if(language == "中文") console.log("帮助:\n如果你要改变控制台输出的语言的话, 请改变 \"language\" 的值,\n比如 \"changeLanguage(\"english\");\", 版本(" + lastestEdition + "), 可用的语言为: \"english\" 和 \"中文\";");
}
function changeLanguage(option) {
    language = option;
    localStorage.setItem("language", option);
    if(language == "english") console.log("successful change the language, language: " + language);
    else if(language == "中文") console.log("成功的更改了语言: " + language);
}

// 函数
function calcSize() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    canvas.height = windowHeight;
    canvas.width = windowWidth;
}
function calcPosition(event) {
    moveDistance = Math.trunc(maxiumMoveSpeed - (weight / maxiumWeight * 100));
    if(event.key == 'w') positionY += moveDistance;
    else if(event.key == 's') positionY -= moveDistance;
    else if(event.key == 'a') positionX += moveDistance;
    else if(event.key == 'd') positionX -= moveDistance;
    showPositionX = Math.trunc(positionX / 20);
    showPositionY = Math.trunc(positionY / 20);
}
function inventory() {
    if(!inventoryOpen) {
        inventoryOpen = true;
    } else if(inventoryOpen) {
        inventoryOpen = false;
    }
    if(debugMode) inventoryOpenCout();
}

// 监听事件
window.onresize = () => {
    calcSize();
    reSizeCout();
};
window.onmousemove = (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;
    offSetX = windowWidth - mouseX;
    offSetY = windowHeight - mouseY;
};
window.onkeydown = (event) => {
    if (debugMode) pressKeyCout(event.key);
    
    const moveKeys = ['w', 'a', 's', 'd'];
    if (moveKeys.includes(event.key)) {
        calcPosition(event);
    } else if (event.key === 'e') {
        inventory();
    }
}


// 渲染
function drawPlayersPlatform() {
    playersPlatformX = positionX + offSetX - (playersPlatformWifth / 2);
    playersPlatformY = positionY + offSetY - (playersPlatformHeight / 2);
    if(playersPlatformX < windowWidth || playersPlatformY < windowHeight) { 
        ctx.fillStyle = "#6d6d20";
        ctx.fillRect(playersPlatformX, playersPlatformY, playersPlatformHeight, playersPlatformWifth);
    }
}
function drawInfomationUI() {
    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(30);
}
function render() {//主要执行的渲染函数
    if(!inventoryOpen) {
    ctx.clearRect(0, 0, windowWidth, windowHeight);

    ctx.fillStyle = "#123456";
    ctx.fillRect(0, 0, windowWidth, windowHeight);

    drawPlayersPlatform();
    
    ctx.fillStyle = "#ffffff";
    if(debugMode) {
        ctx.fillText(("showPisitionX = " + showPositionX + " showPositionY = " + showPositionY), 30, 40);
        ctx.fillText("Tips: Position is calculated by devide 20, and every step (no weight) is move 10 pixels", 30, 50);
        ctx.fillText(("(in pixels) positionX = " + positionX + " position Y = " + positionY), 30, 60);
        ctx.fillText("debugMode on:", 30, 75);
        ctx.fillText(("offSets: X = " + offSetX + " Y = " + offSetY), 40, 85);
        ctx.fillText(("playersPlatform: X = " + playersPlatformX + " Y = " + playersPlatformY), 40, 95);
    } else {
        ctx.fillText(("X = " + showPositionX + " Y = " + showPositionY), 30, 40);
    }
    ctx.fillRect(offSetX - (peopleWidth / 2), offSetY - (peopleHeight / 2), peopleWidth, peopleHeight);
    ctx.fillRect(mouseX - (pointerWidth / 2), mouseY - (pointerHeight / 2), pointerWidth, pointerHeight);
    ctx.fillRect(mouseX - (pointerHeight / 2), mouseY - (pointerWidth / 2), pointerHeight, pointerWidth);
    }
}
// 初始化
language = localStorage.getItem("language");

if(localStorage.getItem("language") == undefined) {
    console.log("Since you have not set or open this website before(localStorage.getItem(\"language\") is \"" + localStorage.getItem("language") +"\"), please set the language,(now set default: english)");
    localStorage.setItem("language", "english");
}

if(language == "english") {
    console.log("Author: NikeMa2011, edition: " + lastestEdition + "\ngithub profile: https://github.com/NikeMa2011");
    title.innerHTML = ("RPGgame - githubEdition");
}
else if(language == "中文") {
    console.log("作者: NikeMa2011, 版本: " + lastestEdition + "\ngithub链接 : https://github.com/NikeMa2011/RPG");
    title.innerHTML = ("RPG小游戏 - github版本");
}

note();

calcSize();
calcPosition(window.Event);

setInterval("render()", 25); // 1000 / 25 = 40帧