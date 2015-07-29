/**
 * ActionManager 相关测试
 */
var ActionManagerLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
		
		// 窗体的宽度
		var size = cc.winSize;
		
		/// 平移测试
		var spriteMoveTo = cc.Sprite(res.Sprite_jpg);
		spriteMoveTo.x = 40;
		spriteMoveTo.y = 40;
		spriteMoveTo.runAction(cc.moveTo(5, cc.p(600, 40)))
		this.addChild(spriteMoveTo);
		
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