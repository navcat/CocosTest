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
        this.setUserObject(listener);

        cc.eventManager.addListener(listener, sprite);

        // 开关item
        var toggleItem = new cc.MenuItemToggle(
            new cc.MenuItemFont("Enabled"),
            new cc.MenuItemFont("Disabled"),
            function(){
                cc.log('enable', enable);
                if (enable){
                    // 事件添加
                    cc.eventManager.addListener(listener, sprite);
                }else{
                    cc.eventManager.removeListener(listener);
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
    }
});


// ==================================================================
// ----------------------- 5.事件[暂停/恢复] ------------------------
// ==================================================================
var TouchPauseResumeLayer =  EventManagerLayer.extend({
    onEnter : function () {
        this._super();

        var size = this.getContentSize();
        // 左上角的精灵.
        var sprite1 = new cc.Sprite(res.cyan_png);
        this.addSpriteListener(sprite1);      // 添加事件监听
        sprite1.setPosition(size.width / 2 - sprite1.getContentSize().width / 2, size.height / 2 + sprite1.getContentSize().height / 2);
        this.addChild(sprite1);

        // 中间的精灵.
        var sprite2 = new cc.Sprite(res.magenta_png);
        this.addSpriteListener(sprite2);      // 添加事件监听
        sprite2.setPosition(size.width / 2 + 100, size.height / 2);
        this.addChild(sprite2);

        // 右下角的精灵. 触摸优先级为：10
        var sprite3 = new cc.Sprite(res.yellow_png);  // sprite3 采用了触控优先级
        this.addSpriteListener(sprite3, -10);      // 添加事件监听
        sprite3.setPosition(sprite3.getContentSize().width, 0);
        sprite2.addChild(sprite3, -1);

        var self = this;

        var popup = new cc.MenuItemFont("Popup", function(sender){

            // TODO【事件暂停】
            sprite3._listener.setEnabled(false);
            cc.eventManager.pauseTarget(self, true);  // TODO true 表示是否联级-->关联所有子节点

            //  创建一个颜色层，半透明
            var colorLayer = new cc.LayerColor(cc.color(0, 0, 255, 128));
            self.addChild(colorLayer, 999); //set colorLayer to top

            // 创建按钮
            var btn_normal = new cc.Scale9Sprite(res.bg_scale9_png);
            var btn_press = new cc.Scale9Sprite(res.bg_scale9_png);
            var titleBtn = new cc.LabelTTF("Close Dialog", "Arial", 26);
            titleBtn.color = cc.color(255, 128, 128);

            var controlButton = new cc.ControlButton(titleBtn, btn_normal);
            controlButton.setBackgroundSpriteForState(btn_press, cc.CONTROL_STATE_HIGHLIGHTED);
            controlButton.setTitleColorForState(cc.color.WHITE, cc.CONTROL_STATE_HIGHLIGHTED);
            controlButton.anchorX = 0.5;
            controlButton.anchorY = 1;
            controlButton.x = size.width / 2 + 50;
            controlButton.y = size.height / 2 - 150;

            controlButton.addTargetWithActionForControlEvents(this, function(){
                colorLayer.removeFromParent();
                // TODO 【事件恢复】
                cc.eventManager.resumeTarget(self, true);
                sprite3._listener.setEnabled(true);
            }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);

            // 创建背景面板
            var background = new cc.Scale9Sprite(res.bg_scale9_png);
            background.width = 300;
            background.height = 170;
            background.x = size.width / 2 + 50;
            background.y = size.height / 2 - 150;

            colorLayer.addChild(background);
            colorLayer.addChild(controlButton, 1);

        });

        popup.setAnchorPoint(1,0.5);
        popup.setPosition(cc.visibleRect.right);

        var menu = new cc.Menu(popup);
        menu.setAnchorPoint(0, 0);
        menu.setPosition(0, 0);

        this.addChild(menu);
    },
    /**
     * 添加事件监听
     * @param cc.Sprite sprite 为sprite添加事件监听
     */
    addSpriteListener: function(sprite, priority){
        cc.log('priority:', priority);
        var listener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : sprite,
            swallowTouches  : true,
            onTouchBegan    : this.onTouchBegan,
            onTouchMoved    : this.onTouchMoved,
            onTouchEnded    : this.onTouchEnded,
            onTouchCancelled : this.onTouchCancelled
        });
        if(priority){
            cc.eventManager.addListener(listener, priority);
        }else{
            cc.eventManager.addListener(listener, sprite);
        }
        sprite._listener = listener;
    },
    onTouchBegan: function (touch, event) {
        // TODO onTouchBegan中的this，实际上是listener对象
        var target = this.target;
        cc.log('target', target);
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var size = target.getContentSize();
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
// --------------------------- 6.重力加速计 -------------------------
// ==================================================================
var AccelerationLayer = EventManagerLayer.extend({
    onEnter : function(){
        this._super();

        var sprite = new cc.Sprite(res.node64_png);
        this.addChild(sprite);
        sprite.setPosition(this.w2, this.h2);

        if( 'accelerometer' in cc.sys.capabilities ) {
            // 开始重力加速度
            cc.inputManager.setAccelerometerEnabled(true);
            // 设置迭代间隔
            cc.inputManager.setAccelerometerInterval(1/60);

            var listener = cc.EventListener.create({
                event       : cc.EventListener.ACCELERATION,
                callback    : this.onListenerAccelerometer
            });
            cc.eventManager.addListener(listener, sprite);

        }else{
            cc.log("accelerometer not supported");
        }
    },
    onListenerAccelerometer : function(acc, event){
        // 备注：acc.x 和 acc.y 取值范围 (-1 到 1). 不含-1和1
        var target = event.getCurrentTarget();
        var ballSize  = target.getContentSize();
        var currPos  = target.getPosition();

        // TODO 速度定义
        var speed = 15;
        target.x = AccelerationLayer.fixPos(
                currPos.x + acc.x * speed,
                ballSize.width / 2,
                this.w - ballSize.width / 2);
        target.y = AccelerationLayer.fixPos(
                currPos.y + acc.y * speed,
                ballSize.height / 2,
                this.h - ballSize.height / 2);
    },
    // 重写onExit方法
    // 【注意】：所有onExit中，先处理自己的业务逻辑，再去调用this._super();
    // TODO 隐喻：女孩子上下楼梯
    onExit:function(){
        // 关闭重力加速度监听
        cc.inputManager.setAccelerometerEnabled(false);
        this._super();
    }
});

// 限制在屏幕内
AccelerationLayer.fixPos = function(pos, min, max){
    var ret = pos;
    if(pos < min)
        ret = min;
    else if(pos > max)
        ret = max;
    return ret;
};


// ==================================================================
// ---------------------------- 7.键盘事件 --------------------------
// ==================================================================
var KeyboardLayer = EventManagerLayer.extend({
    _label : null,
    onEnter:function () {
        this._super();

        // 创建一个label
        this.lebel = new cc.LabelTTF("No keyboard event received!", "", 20);
        this.addChild(this.lebel);
        this.lebel.setPosition(this.w2, this.h2);

        if( 'keyboard' in cc.sys.capabilities ) {
            // 为this.lebel 添加一个键盘监听事件
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                target: this.lebel,
                onKeyPressed: this.onKeyPressed,
                onKeyReleased: this.onKeyReleased
            }, this.lebel);
        }else{
            cc.log("keyboard 不支持键盘事件");
        }

        return true;
    },

    // 键按下
    onKeyPressed : function(keyCode, event){
        var target = this.target;
        // 三目运算 。 isNative 判断是否为本地平台。
        target.setString("Key " + (cc.sys.isNative ? target.getNativeKeyName(keyCode) : String.fromCharCode(keyCode) ) + "(" + keyCode.toString()  + ") was pressed!");
    },
    // 键释放
    onKeyReleased: function(keyCode, event){
        var target = this.target;
        target.setString("Key " + (cc.sys.isNative ? target.getNativeKeyName(keyCode) : String.fromCharCode(keyCode) ) + "(" + keyCode.toString()  + ") was released!");
    },
    // 返回本地按键名称
    getNativeKeyName:function(keyCode) {
        var allCode = Object.getOwnPropertyNames(cc.KEY);
        var keyName = "";
        for(var x in allCode){
            if(cc.KEY[allCode[x]] == keyCode){
                keyName = allCode[x];
                break;
            }
        }
        return keyName;
    }
});

/**
 * 场景
 */
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
        if(!true){
            this.addChild(new EnabledTouchLayer());
        }
        /// 5.事件[暂停/恢复]
        if(!true){
            this.addChild(new TouchPauseResumeLayer());
        }
        /// 6.重力加速计
        if(!true){
            this.addChild(new AccelerationLayer());
        }
        /// 7.键盘事件
        if(true){
        	this.addChild(new KeyboardLayer());
        }
    }
});