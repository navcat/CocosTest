var res = {
	BackGround_jpg: "res/BackGround.jpg",			// 背景图片
	Sprite_jpg: "res/sprite.png",					// 马文字
	
	// 事件 event
	cyan_png        : "res/event/cyan_square.png",
	magenta_png     : "res/event/magenta_square.png",
	yellow_png      : "res/event/yellow_square.png",
	bg_scale9_png   : "res/event/buttonBackground.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}