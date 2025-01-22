// 定义
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "48px serif";

let windowHeight, windowWidth;
const pointerHeight = 30, pointerWidth = 4;
const peopleHeight = 100, peopleWidth = 50;

const lastestEdition = "2025-1-22";
let debugMode = false;
let language = "english";

let peopleX, peopleY;
let mouseX, mouseY;
let positionX = 0, positionY = 0;

// 函数
function reSize() {
    windowHeight = window.innerHeight - 6;
    windowWidth = window.innerWidth - 6;
    canvas.height = windowHeight;
    canvas.width = windowWidth;
}
function debug(option) {
    if(option = undefined) {
        if(debugMode) debugMode = false;
        else debugMode = true;
    } else if(option == true) {

    } else {
        console.error("Auther_define_Error: invalid input, debuginput");
    }
}
function printNote() {
    if(language = "english")  console.log("Notes: \n to change console output, please change variable \"language\" s value, \n such as \"changeLanguage(\"中文\");\", until lastest edition(" + lastestEdition + "), \n available languages: \"english\" and \"中文\";");
    else if(language = "中文") console.log("帮助: \n 如果你要改变控制台输出的语言的话, 请改变 \"language\" 的值, 比如 \"changeLanguage(\"english\");\", 截止最后的版本(" + lastestEdition + "), 可用的语言为: \"english\" 和 \"中文\";");
}
function changeLanguage(option) {
    language = option;
    localStorage.setItem("langauge", option);
    if(language == "endlish") console.log("successful change the language, langauge: " + language + "")
}

// 监听事件
window.onresize = () => {
    reSize();
    if(language == "endlish") console.log("detect window s size changed: \n windowHeight: " + windowHeight + " windowWidth: " + windowWidth + " (-5)");
    else if(language == "中文") console.log("检测到窗口大小变化: \n windowHeight: " + windowHeight + " windowWidth: " + windowWidth + " (-5)");
};
window.onmousemove = (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;
    peopleX = windowWidth - mouseX;
    peopleY = windowHeight - mouseY;
    // 简单可靠
};
window.onkeydown = (event) => {
    if(event.key == 'w') positionY ++;
    else if(event.key == 'a') positionX --;
    else if(event.key == 's') positionY --;
    else if(event.key == 'd') positionX ++;
}

// 主要渲染
function render() {
    ctx.clearRect(0, 0, windowWidth, windowHeight);

    ctx.fillStyle = "#123456";
    ctx.fillRect(0, 0, windowWidth, windowHeight);

    ctx.fillStyle = "#ffffff";
    ctx.fillText(("X: " + positionX + " Y; " + positionY), 30, 40);
    if(debugMode) {
        ctx.fillText((peopleX + ' ' + peopleY + ' ' +peopleWidth + ' ' + peopleHeight), 30, 50);
        ctx.fillText((peopleX + ' ' + peopleY + ' ' +peopleWidth + ' ' + peopleHeight), 30, 50); 
    }
    ctx.strokeRect(peopleX - (peopleWidth / 2), peopleY - (peopleHeight / 2), peopleWidth, peopleHeight);
    ctx.fillRect(mouseX - (pointerWidth / 2), mouseY - (pointerHeight / 2), pointerWidth, pointerHeight);
    ctx.fillRect(mouseX - (pointerHeight / 2), mouseY - (pointerWidth / 2), pointerHeight, pointerWidth);
}

// 初始化
if(localStorage.getItem("language") == null) {
    console.log("Author: NikeMa2011, lastest edition: " + lastestEdition + "\n github profile: https://github.com/NikeMa2011");
    console.log("Since you have not set or open this website before(localStorage.getItem(\"language\") is \"" + localStorage.getItem("langauge") +"\"), please set the language,");
    printNote();
    localStorage.setItem("langauge", null);
} else {
    language = localStorage.getItem("language");
}

reSize();

setInterval("render()", 20);