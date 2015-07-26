/**
 * 向量的应用，钢珠碰到墙壁后回弹
 */
var PearlLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
	
		// 画球
		var size = this.getContentSize();
		var centerPos = cc.p(size.width / 2, size.height / 2);
		var pearl = new cc.DrawNode();
		pearl.drawDot(cc.p(0,0), 10, cc.color(255, 0, 0, 255));
		this.addChild(pearl, 0);
		pearl.setPosition(size.width / 2, size.height / 2);
		
		// 方向 (-1, 1)的随机数
		var direction = cc.p(cc.randomMinus1To1(), cc.randomMinus1To1());
		
		this.schedule(function(){
			var p = pearl.getPosition();
			// 超过边界反弹
			if(p.x <=0 || p.x >= size.width){
				direction.x *= -1;
			}
			if(p.y <=0 || p.y >= size.height){
				direction.y *= -1;
			}
			pearl.setPosition(p.x + direction.x * 10, p.y + direction.y * 10);
			
		});
		return true;
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