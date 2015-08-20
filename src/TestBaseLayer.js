/**
 * 基本类
 */
var TestBaseLayer = cc.Layer.extend({
	size: null,
	w:0,
	h:0,
	w2:0,
	h2:0,
	ctor: function(){
		this._super();
		// 获取窗口的大小
		var size = this.getContentSize();
		this.size = size;
		this.w = size.width;
		this.h = size.height;
		this.w2 = size.width / 2;
		this.h2 = size.height / 2;
		
		// 返回菜单
		var returnMenu = new cc.MenuItemFont(
				"返回",
				function () {
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