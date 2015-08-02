/**
 * 层
 */
var EventManagerLayer = TestBaseLayer.extend({
	
	ctor: function(){
		this._super();
	}
});


var TouchOneByOneLayer = EventManagerLayer.extend({
	onEnter : function () {
		this._super();
		
		var size = this.getContentSize();

		// 左上角的精灵
		var sprite1 = new cc.Sprite(res.cyan_png);
		sprite1.setPosition(size.width / 2 - sprite1.getContentSize().width / 2, size.height / 2 + sprite1.getContentSize().height / 2);
		this.addChild(sprite1);

		// 中间的精灵
		var sprite2 = new cc.Sprite(res.magenta_png);
		sprite2.setPosition(size.width / 2, size.height / 2);
		this.addChild(sprite2);

		// 右下角的精灵。【注意】：父节点是sprite2
		var sprite3 = new cc.Sprite(res.yellow_png);
		sprite3.setPosition(sprite3.getContentSize().width , 0);
		sprite2.addChild(sprite3);

		var listener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,    // TODO【事件吞噬】，阻止事件传递给下一层(层根据事件优先级而定，而非对象(节点)的zIndex值)
			onTouchBegan: function (touch, event) {
				// 获取当前触发事件的对象 TODO【备注】：有比getCurrentTarget更好的选择。
				//  但这里主要是3个精灵引用了同一套的事件处理方案. 见下面的.clone
				var target = event.getCurrentTarget();
				// 获取点击坐标[基于本地坐标]
				var locationInNode = target.convertToNodeSpace(touch.getLocation());
				// 获取当前节点大小
				var size = target.getContentSize();
				// 区域设定
				var rect = cc.rect(0, 0, size.width, size.height);
				// 判断触摸点是否在节点区域内
				if (!(cc.rectContainsPoint(rect, locationInNode))) {
					return false;
				}

				// 开始逻辑处理
				cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
				target.opacity = 180;

				// TODO  true 和 false 的区别。 return false 的话，onTouchMoved和onTouchEnded不会被调用到
				return true;
			},
			onTouchMoved: function (touch, event) {
				var target = event.getCurrentTarget();
				// 返回从【前一个】触摸点【到当前点】的delta【距离】
				var delta = touch.getDelta();
				target.x += delta.x;
				target.y += delta.y;
			},
			onTouchEnded: function (touch, event) {
				var target = event.getCurrentTarget();
				target.opacity = 255;
			},
			onTouchCancelled : function(touch, event){
				cc.log("onTouchCancelled");
			}
		});

		cc.eventManager.addListener(listener, sprite1);
		cc.eventManager.addListener(listener.clone(), sprite2);
		cc.eventManager.addListener(listener.clone(), sprite3);

		// 3种移除监听器的方式
//		cc.eventManager.removeListeners(listener);   // 根据listener对象
//		cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);  // 根据listener类型
//		cc.eventManager.removeListeners(aNode);  // 根据节点
		return true;
	}
});

var EventManagerScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		
		/// 1, TouchOneByOne
		if(true){
			var layer = new TouchOneByOneLayer();
			this.addChild(layer);
		}
	}
});