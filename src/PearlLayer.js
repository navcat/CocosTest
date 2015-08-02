/**
 * 向量的应用，钢珠碰到墙壁后回弹
 */
var PearlLayer = TestBaseLayer.extend({
	ctor: function(){
		this._super();
		
		this.color = cc.color(66, 66, 66, 66); // 设置层的背景颜色
		
		// 窗体的宽度
		var size = this.size;
		var addMenu = new cc.MenuItemFont(
				"添加",
				function () {
					cc.log("add one pearl!");
					this.addPearl();
				}, this);
		addMenu.attr({
			x: size.width - 60,
			y: 20,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var menu = new cc.Menu(addMenu);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu, 1);

		this.addPearl();
		
		return true;
	},
	/**
	 * 添加多个小球
	 */
	addPearl: function(){
		// 画球
		var radius = 10;     // 球的半径
		var size = cc.winSize;
		var centerPos = cc.p(size.width / 2, size.height / 2);
		var pearl = new cc.DrawNode();
		pearl.drawDot(cc.p(0,0), radius, cc.color(
				Math.floor(cc.random0To1() * 2550),
				Math.floor(cc.random0To1() * 2550),
				Math.floor(cc.random0To1() * 2550)));
		this.addChild(pearl, 0);
		pearl.setPosition(size.width / 2, size.height / 2);

		// 方向 (-1, 1)的随机数
		var direction = cc.p(cc.randomMinus1To1(), cc.randomMinus1To1());

		this.schedule(function(){
			var p = pearl.getPosition();
			// 超过边界反弹
			if(p.x <= radius || p.x >= size.width - radius){
				direction.x *= -1;
			}
			if(p.y <= radius || p.y >= size.height - radius){
				direction.y *= -1;
			}
			pearl.setPosition(p.x + direction.x * 10, p.y + direction.y * 10);

		});
	}
});

/**
 * 场景
 */
var PearlScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		
		var layer = new PearlLayer();
		this.addChild(layer);
	}
});