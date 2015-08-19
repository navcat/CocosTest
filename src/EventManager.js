/**
 * 层
 */
var EventManagerLayer = TestBaseLayer.extend({
    
    ctor: function(){
        this._super();
    }
});

// ==================================================================
// -------------------- 1.TOUCH_ONE_BY_ONE 示例 ---------------------
// ==================================================================
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
        // cc.eventManager.removeListeners(listener);   // 根据listener对象
        // cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);  // 根据listener类型
        // cc.eventManager.removeListeners(aNode);  // 根据节点
        return true;
    }
});

// ==================================================================
// -------------------- 2.多点触控 TOUCH_ALL_AT_ONCE 示例 -----------
// ==================================================================
var TouchAllAtOnceLayer = EventManagerLayer.extend({
    onEnter : function () {
        this._super();

        var size = this.getContentSize();

        var node = new cc.Sprite(res.node256_png);
        // 判断当前平台是否支持多点触控
        if( 'touches' in cc.sys.capabilities ) {
            var listener = cc.EventListener.create({
                //  TODO 所有的touch处理都会被触发，不支持吞噬。
                event           : cc.EventListener.TOUCH_ALL_AT_ONCE,
                target          : this,  // 推荐此种用法
                onTouchesBegan  : this.onTouchesBegan,
                onTouchesMoved  : this.onTouchesMoved,
                onTouchesEnded  : this.onTouchesEnded
            });
            cc.eventManager.addListener(listener, this);
        }else{
            cc.log("当前平台不支持多点触控");
        }

        // 第二种写法
       // if( 'touches' in cc.sys.capabilities ) {
       //     cc.eventManager.addListener({
       //         event           : cc.EventListener.TOUCH_ALL_AT_ONCE,
       //         target          : this,
       //         swallowTouches  : true,
       //         onTouchesBegan  : this.onTouchesBegan,
       //         onTouchesMoved  : this.onTouchesMoved,
       //         onTouchesEnded  : this.onTouchesEnded,
       //         onTouchesCancelled : this.onTouchesCancelled
       //     }, this);
       // }else{
       //     cc.log("当前平台不支持多点触控");
       // }
        
        this.addChild(node);
        node.setPosition(size.width / 2, size.height / 2);

        return true;
    },
    onTouchesBegan: function (touches, event) {

        var self = this.target;

        // TODO 点击区域判断

        // touches[0] 表示只捕获一个触摸点
        for (var i = 0; i < touches.length;i++ ) {
            var touch = touches[i];
            var pos = touch.getLocation();
            var id = touch.getID();
            // i 表示第几个触摸点 。 若需要屏蔽android多点问题，可以考虑采用TOUCH_ALL_AT_ONCE 触摸方式
            cc.log("Touch #" + i + ". onTouchesBegan at: " + pos.x + " " + pos.y + " Id:" + id);
            cc.log(self.getTag());
        }

    },
    onTouchesMoved: function (touches, event) {
        var self = this.target;
        for (var i = 0; i < touches.length;i++ ) {
            var touch = touches[i];
            var pos = touch.getLocation();
            var id = touch.getID();
            cc.log("Touch #" + i + ". onTouchesMoved at: " + pos.x + " " + pos.y + " Id:" + id);
            cc.log(self.getTag());
        }
    },
    onTouchesEnded: function (touches, event) {
        var self = this.target;
        for (var i = 0; i < touches.length;i++ ) {
            var touch = touches[i];
            var pos = touch.getLocation();
            var id = touch.getID();
            cc.log("Touch #" + i + ". onTouchesEnded at: " + pos.x + " " + pos.y + " Id:" + id);
            cc.log(self.getTag());
        }
    }
});

// ==================================================================
// ----------------------- 3. 触摸优先级 示例 -----------------------
// ==================================================================
var TouchPriorityLayer =  EventManagerLayer.extend({
    onEnter : function () {
        this._super();

        var size = this.getContentSize();

        // 左上角的精灵. 触摸优先级为：30
        var sprite1 = this.addSprite(res.cyan_png, 30);
        sprite1.setPosition(size.width / 2 - sprite1.getContentSize().width / 2, size.height / 2 + sprite1.getContentSize().height / 2);
        this.addChild(sprite1);

        // 中间的精灵.   触摸优先级为：-10
        var sprite2 = this.addSprite(res.magenta_png, -10);
        sprite2.setPosition(size.width / 2, size.height / 2);
        this.addChild(sprite2);

        // 右下角的精灵. 触摸优先级为：10
        var sprite3 = this.addSprite(res.yellow_png, 10);
        sprite3.setPosition(sprite3.getContentSize().width , 0);
        sprite2.addChild(sprite3);

    },
    addSprite: function(aTexture, priority){
        var sprite = new cc.Sprite(aTexture);
        priority = priority || 0;

        // TODO 建议采用 target 方式
        var listener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : sprite,
            swallowTouches  : true,
            onTouchBegan    : this.onTouchBegan,
            onTouchMoved    : this.onTouchMoved,
            onTouchEnded    : this.onTouchEnded,
            onTouchCancelled : this.onTouchCancelled

        });

        if(priority !== 0){
            // 触摸优先级添加。
            // TODO addListener(listener, nodeOrPriority);  如果nodeOrPriority为数字，则表示优先级。
            cc.eventManager.addListener(listener, priority);
        }
        else{
            cc.eventManager.addListener(listener, sprite);
        }
        return sprite;
    },
    onTouchBegan: function (touch, event) {

        // TODO onTouchBegan中的this，实际上是listener对象
        var locationInNode = this.target.convertToNodeSpace(touch.getLocation());
        var size = this.target.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);

        if (!cc.rectContainsPoint(rect, locationInNode)) {
            return false;
        }

        this.target.setColor(cc.color.RED);

        return true;
    },
    onTouchMoved : function (touch, event) {
    },
    onTouchEnded : function (touch, event) {
        this.target.setColor(cc.color.WHITE);
    },
    onTouchCancelled : function(touch, event){
    }
});


// ==================================================================
// --------------------- 4.移除监听器，实现触摸开关 -----------------
// ==================================================================
var EnabledTouchLayer = EventManagerLayer.extend({
    _listener: null,
    ctor: function(){
        this._super();
        var enable = false;

        var size = this.getContentSize();

        var sprite = new cc.Sprite(res.cyan_png);
        this.addChild(sprite);
        sprite.setPosition(size.width / 2, size.height / 2);


        var listener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : sprite,
            swallowTouches  : true,
            onTouchBegan    : this.onTouchBegan,
            onTouchMoved    : this.onTouchMoved,
            onTouchEnded    : this.onTouchEnded
        });

        // TODO 因为下面有个移除事件操作，此操作会使得listener的引用计数-1，当引用计数为0的时候，listener就会被引擎内存管理自动回收。
        // TODO 内存管理的一种方式。调用使得listener的引用计数+1， 从而保证对象不会被回收。[如何理解：开门，关门，必须保证有门在]
        // this.setUserObject(this._listener);

        cc.eventManager.addListener(listener, sprite);
        this._listener = listener;

        // 开关item
        var toggleItem = new cc.MenuItemToggle(
            new cc.MenuItemFont("Enabled"),
            new cc.MenuItemFont("Disabled"),
            function(){
                cc.log('enable', enable);
                if (listener){
                    if (enable){
                        // 事件添加
                        cc.eventManager.addListener(listener, sprite);
                    }else{
                        cc.eventManager.removeListener(listener);
                    }
                }else{
                    cc.error("this._listener 为空...");
                }
                enable = !enable;
            });

        toggleItem.setPosition(size.width / 2, 120);
        var menu = new cc.Menu(toggleItem);
        menu.setPosition(0, 0);
        menu.setAnchorPoint(0, 0);
        this.addChild(menu, 1);
        return true;
    },
    onTouchBegan: function (touch, event) {
        // TODO onTouchBegan中的this，实际上是listener对象
        var locationInNode = this.target.convertToNodeSpace(touch.getLocation());
        var size = this.target.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);

        if (!cc.rectContainsPoint(rect, locationInNode)) {
            return false;
        }

        this.target.setColor(cc.color.RED);
        return true;
    },
    onTouchMoved : function (touch, event) {
    },
    onTouchEnded : function (touch, event) {
        this.target.setColor(cc.color.WHITE);
    },
    onTouchCancelled : function(touch, event){
    },
    onExit: function(){
        if (this._listener !== null){
            cc.eventManager.removeListener(this._listener);
        }
        this._super();
    }

});

var EventManagerScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        
        /// 1, TouchOneByOne
        if(!true){
            this.addChild(new TouchOneByOneLayer());
        }

        /// 2, TouchAllAtOnce 多点触控
        if(!true){
            this.addChild(new TouchAllAtOnceLayer());
        }

        /// 3, 事件优先级
        if(!true){
            this.addChild(new TouchPriorityLayer());
        }

        /// 4, 移除监听器，实现触摸开关
        if(true){
            this.addChild(new EnabledTouchLayer());
        }
    }
});