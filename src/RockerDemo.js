/**
 * 摇杆
 * [2.5D游戏人物行走]
 */
var RockerDemoLayer = TestBaseLayer.extend({
	rocker      : null,     // 摇杆
	boneGril    : null,     // 骨精灵
	boneDir     : 0,        // 骨精灵[当前方向]
	boneSpeed   : 0.8,      // 骨精灵[速度]
	w: 0,
	h: 0,
	w2: 0,
	h2: 0,
	ctor:function () {
		this._super();
		this.w = this.size.width;
		this.h = this.size.height;
		this.w2 = this.size.width / 2;
		this.h2 = this.size.height / 2;
		// 加载背景
		this.loadBg();
		// 加载摇杆
		this.loadRocker();
		// 加载骨精灵
		this.loadBoneGril();
	},
	//加载背景
	loadBg : function(){
		var bg = new cc.Sprite(res.knob_bg_png);
		this.addChild(bg);
		bg.setPosition(this.w2, this.h2);
	
	},
	//加载摇杆
	loadRocker : function(){
		this.rocker = new Rocker(res.base_png, res.knob_png, "DEFAULT");
//		this.rocker = new Rocker(res.base_png, res.knob_png, "AUTO");
//		this.rocker = new Rocker(res.base_png, res.knob_png, "HIDE");
//		this.rocker = new Rocker(res.base_png, res.knob_png, 128);
		this.rocker.callback = this.onCallback.bind(this);
		this.addChild(this.rocker);
		this.rocker.setPosition(150, 150);
	},
	//加载骨精灵
	loadBoneGril : function(){
		// 加载plist资源
		cc.spriteFrameCache.addSpriteFrames(res.bone_plist);
		// 骨精灵
		this.boneGril = new cc.Sprite("#bone_1_1.png");
		this.addChild(this.boneGril, 1);
		this.boneGril.name = "骨精灵";
		this.boneGril.setPosition(this.w * 0.5, this.h * 0.4);
		// 阴影[骨精灵脚下]
		var shadow = new cc.Sprite(res.knob_shadow_png);
		this.boneGril.addChild(shadow);
		shadow.setAnchorPoint(0.12, 0.2);
		// 动作
		var animate = this.getAnimate(0);   // 默认为plist中第一张图片的动作
		this.boneGril.runAction(animate.repeatForever());
	
	},
	/**
	 * 回调函数[摇杆中触发]
	 */
	onCallback : function(sender){
		// 摇杆的方向
		var dir = this.rocker.direction;
		// 如果摇杆的方向与骨精灵的放方向不一致，则设置骨精灵的方向为摇杆的方向
		if (dir != this.boneDir){
			this.boneDir = dir;
			// 改变骨精灵的方向
			this.boneChangeDir(this.boneDir);
		}else{
			// 滑动精灵时执行的操作
			this.onRun();
		}
	},
	/**
	 * 获取动画
	 * @param  int dir RockerSprite.Direction 运动方向
	 */
	getAnimate : function(dir){
		var frames = [];
		for (var i = 0; i < 8; i++){
			var str = "bone_" + (dir + 1) + "_" + (i + 1) +".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			frames.push(frame);
		}
		var animation = new cc.Animation(frames, 0.1);
		return cc.animate(animation);
	},
	//改变方向[切换帧动画]
	boneChangeDir : function(dir){
		this.boneGril.stopAllActions();
		if (dir > 0){
			this.boneGril.runAction(this.getAnimate(dir - 1).repeatForever());
		}
	},
	//跑动[骨精灵]
	onRun : function(){
		// 获取摇杆方向
		var dir = this.rocker.direction;
		// 获取摇杆速度 (取值范围[0-1])
		var rockerSpeed = this.rocker.speed;
		// 获取摇杆弧度
		var radians = this.rocker.radians;
	
	//	var tmpCos = Math.cos(radians);
	//	var tmpSin = Math.sin(radians);
	//	cc.log("tmpCos : "+ tmpCos + "tmpSin :" +tmpSin);
	
		switch (dir){
			case Direction.D_UP:
				this.boneGril.y += rockerSpeed * this.boneSpeed;
				break;
			case Direction.D_RIGHT_UP:
				// TODO 为毛线全是 +=
				this.boneGril.x += rockerSpeed * this.boneSpeed * Math.cos(radians);
				this.boneGril.y += rockerSpeed * this.boneSpeed * Math.sin(radians);
				break;
			case Direction.D_RIGHT:
				this.boneGril.x += rockerSpeed * this.boneSpeed;
				break;
			case Direction.D_RIGHT_DOWN:
				this.boneGril.x += rockerSpeed * this.boneSpeed * Math.cos(radians);
				this.boneGril.y += rockerSpeed * this.boneSpeed * Math.sin(radians);
				break;
			case Direction.D_DOWN:
				this.boneGril.y -= rockerSpeed * this.boneSpeed;
				break;
			case Direction.D_LEFT_DOWN:
				this.boneGril.x += rockerSpeed * this.boneSpeed * Math.cos(radians);
				this.boneGril.y += rockerSpeed * this.boneSpeed * Math.sin(radians);
				break;
			case Direction.D_LEFT:
				this.boneGril.x -= rockerSpeed * this.boneSpeed;
				break;
			case Direction.D_LEFT_UP:
				this.boneGril.x += rockerSpeed * this.boneSpeed * Math.cos(radians);
				this.boneGril.y += rockerSpeed * this.boneSpeed * Math.sin(radians);
				break;
			case Direction.DEFAULT:
				break;
			default :
				break;
		}
	}
});


var RockerDemoScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new RockerDemoLayer();
		this.addChild(layer);
	}
});