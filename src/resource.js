var res = {
	BackGround_jpg: "res/BackGround.jpg",			// 背景图片
	Sprite_jpg: "res/sprite.png",					// 马文字
	
	// 事件 event
	cyan_png        : "res/event/cyan_square.png",
	magenta_png     : "res/event/magenta_square.png",
	yellow_png      : "res/event/yellow_square.png",
	bg_scale9_png   : "res/event/buttonBackground.png",
	base_png        : "res/event/control_base.png",
	knob_png        : "res/event/control_knob.png",
	bone_plist      : "res/event/bone.plist",
	bone_png        : "res/event/bone.png",
	knob_bg_png     : "res/event/bg.png",
		
	// 节点 node	
	node64_png : "res/node/node_64.png",
	node128_png : "res/node/node_128.png",
	node152_png : "res/node/node_152.png",
	node256_png : "res/node/node_256.png",
	node512_png : "res/node/node_512.png",
	
	// 音频sound
	bg_mp3          : "res/Sound/background.mp3",
	effect_mp3      : "res/Sound/effect2.mp3",
	
	// 粒子系统 particle
	particle_star_plist : "res/particle/star.plist",
	particle_star_png   : "res/particle/star.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}