//窗口的resize事件--改变rem的值
document.documentElement.style.fontSize = innerWidth / 7.5 + "px";
console.log(document.documentElement.style.fontSize);
window.onresize = function(){
    document.documentElement.style.fontSize = innerWidth / 7.5 + "px";
    console.log(document.documentElement.style.fontSize);
}