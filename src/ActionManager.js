/**
 * ActionManager 相关测试
 */
var ActionManagerLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
		
		// 窗体的宽度
		var size = cc.winSize;
		
		/// 1,moveTo测试
//		var spriteMoveTo = cc.Sprite(res.Sprite_jpg);
//		spriteMoveTo.x = 40;
//		spriteMoveTo.y = 40;
//		this.addChild(spriteMoveTo, 2);
//		// 向右移动
//		spriteMoveTo.runAction(cc.moveTo(5, cc.p(600, 400)));
//
//		/// 2,旋转
//		var spriteRotate = cc.Sprite(res.Sprite_jpg);
//		spriteRotate.x = size.width / 2;
//		spriteRotate.y = 120;
//		this.addChild(spriteRotate, 2);
//		spriteRotate.runAction(cc.rotateBy(1.5, 90));
//
//		/// 3,组合运动
//		var spriteSequence = cc.Sprite(res.Sprite_jpg);
//		spriteSequence.x = size.width - 40;
//		spriteSequence.y = 40;
//		this.addChild(spriteSequence, 2);
//		// 1.4秒之后消失
//		spriteSequence.runAction(cc.sequence(
//				cc.delayTime(1.4),
//				cc.fadeOut(1.1))
//		);
//		
//		/// 4,moveBy测试
//		var spriteMoveBy = cc.Sprite(res.Sprite_jpg);
//		spriteMoveBy.x = 40;
//		spriteMoveBy.y = size.height / 2;
//		this.addChild(spriteMoveBy, 2);
//		// 向右移动
//		spriteMoveBy.runAction(cc.moveBy(2, cc.p(600, 400)));
//		
		/**
		 * cc.MoveTo是“移动到这里"，而cc.MoveBy则是“相对于之前点再移动”，通俗一点就是说这里需要两个坐标pos1（x1，y1），pos2（x2，y2）。
			如果是cc.MoveTo的话，就是将对象由pos1移动到pos2，
			而cc.MoveBy则是说对象的终坐标是在pos1的基础上再加上（矢量相加）pos2，终坐标pos3=pos1+pos2。
		 */
		
		/// 5,暂停后再继续运动
		var spritePause = new cc.Sprite(res.Sprite_jpg);
		spritePause.x = 200;
		spritePause.y = 200;
		this.addChild(spritePause, 2, 1001);

		var action = cc.moveBy(5, cc.p(450, 0));
		spritePause.runAction(action);
		this.getActionManager().pauseTarget(spritePause);
		
//		cc.director.getActionManager().addAction(action, spritePause, true);
		
		this.schedule(function(){
			cc.log('in schedule---');
			var node = this.getChildByTag(1001);
			this.getActionManager().resumeTarget(node);
		}, 3);
		
		// 返回菜单
		var returnMenu = new cc.MenuItemFont(
				"返回",
				function () {
					cc.log("Menu is clicked!");
					cc.director.runScene(new MenuScene());
				}, this);
		returnMenu.attr({
			x: size.width - 60,
			y: size.height - 20,
			anchorX: 0.5,
			color: cc.color(255, 0, 0, 255),
			anchorY: 0.5
		});

		var menu = new cc.Menu(returnMenu);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu, 1);
		
	}
});

/**
 * 场景
 */
var ActionManagerScene = cc.Scene.extend({
	onEnter: function(){
		this._super();

		var layer = new ActionManagerLayer();
		this.addChild(layer);
	}
});