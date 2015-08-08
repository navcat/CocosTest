/**
 * 节点测试
 */
var NodeTestLayer = TestBaseLayer.extend({
	w2: 0,
	h2: 0,
	ctor: function(){
		this._super();
		this.w2 = this.size.width / 2;
		this.h2 = this.size.height / 2;
		var node = new cc.Sprite(res.node152_png);
		this.addChild(node);
		node.setPosition(this.w2 - node.getContentSize().width * 1.3, this.h2);

		var node1 = new cc.Sprite(res.node152_png);
		this.addChild(node1);
		node1.setPosition(this.w2 + node1.getContentSize().width * 1.3,  this.h2);

		// 配置一些信息
		node.name = "node";
		node1.name = "node1";
		this.name = "MainLayer";
		this.setName("MainLayer");
		
//		[属性 VS 函数]方式。
//		1. 属性风格使用起来方便
//		2. 属性风格用到 ECMAScript 的 getter 和 setter 的特性，这个特性在部分浏览器上还是比函数要慢
//		3. 所以，如果是非常要求性能的操作，比如碰撞检测，最好还是使用函数

		
		/// 基础属性
		// 1.1,位置测试
//		this.test_1_1(node, node1);
		// 1.2,大小测试
//		this.test_1_2(node, node1);
		// 1.3,锚点测试
//		this.test_1_3(node, node1);
		// 1.4,层级测试
//		this.test_1_4(node, node1);
		// 1.5,数据和标签测试
//		this.test_1_5(node, node1);
		
		/// 图形属性
		// 2.1 旋转
//		this.test_2_1(node, node1);
		// 2.2 缩放
//		this.test_2_2(node, node1);
		// 2.3 倾斜
//		this.test_2_3(node, node1);
		// 2.4 可见
//		this.test_2_4(node, node1);
		// 2.5 透明
//		this.test_2_5(node, node1);
		// 2.6 颜色
//		this.test_2_6(node, node1);
		// 2.7 渲染
//		this.test_2_7(node, node1);
		
		/// 其他属性
		// 3.1 父/子相关
//		this.test_3_1(node, node1);
		// 3.2定时器
//		this.test_3_2(node, node1);
		// 3.3 运行状态
//		this.test_3_3(node, node1);
		// 3.4 动作管理
//		this.test_3_4(node, node1);
		// 3.5 到达顺序
		this.test_3_5(node, node1);
		
		/// 功能函数
		// 4.1 属性配置
		// 4.2 图形操作
		// 4.3 节点操作
		// 4.4 事件回调
		// 4.5 动作模块
		// 4.6内存管理
		// 4.7计时器
		// 4.8坐标转换
		// 4.9边框区域
		
	},
	/**
	 * 1.1,位置测试
	 */
	test_1_1: function(node, node1){
		cc.log("===============[位置 Began]===============");
		// 针对【父节点】设置/获取坐标点
		node.setPosition(this.w2, this.h2);
		var position = node.getPosition();
		cc.log("position X: ", position.x, "position Y: ",position.y);

		node.setPositionX(100);
		node.setPositionY(200);
		var posX = node.getPositionX();
		var posY = node.getPositionY();
		cc.log("position X: ", posX, "position Y: ",posY);
		// 规格化设置坐标
		// node.setNormalizedPosition(0.5, 0.5);

		cc.log("-------------------------------------------");

		node1.x = this.w2;
		node1.y = this.h2;
		var position = cc.p(node1.x, node1.y);
		cc.log("position X: ", position.x, "position Y: ",position.y);

		node1.x = 555;
		node1.y = 444;
		var posX = node1.x;
		var posY = node1.y;
		cc.log("position X: ", posX, "position Y: ",posY);

		cc.log("===============[位置 End]=================");
	},
	/**
	 * 1.2,大小测试
	 */
	test_1_2: function(node, node1){
		cc.log("===============[大小 Began]===============");
		var width = node.getContentSize().width;
		var height = node.getContentSize().height;
		cc.log("width : ",width, " , height : ", height);
		// 1. 所有的节点都有大小。 Layer和Scene默认拥有跟【屏幕】一样的大小
		// 2. 设置节点内容的大小, 会影响坐标【位置】。其他举例：LayerColor, 事件
		// 3. 不管节点【缩放或者旋转】等，节点的contentSize是【不会】发生变化的
		node.setContentSize(width/2, height/2);
		cc.log("width2 : ",width, " , height2 : ", height);
		node.setContentSize(cc.size(width/4, height/4));
		cc.log("width4 : ",width, " , height4 : ", height);

		cc.log("-------------------------------------------");

		var width = node1.width;
		var height = node1.height;
		cc.log("width : ",width, " , height : ", height);

		node1.width = width/2;
		node1.height = height/4;
		cc.log("width : ",width, " , height : ", height);

		cc.log("===============[大小 End]=================");
	},
	/**
	 * 1.3,锚点测试
	 */
	test_1_3: function(node, node1){
		cc.log("===============[Block Began]===============");

		// cc.p(0, 0)
		// 1. 是一个【点】，【取值范围】是[0-1]
		// 2. 【决定】了你节点上的【哪个点】定位在你指定的【坐标】上
		// 3. 一些【动作】和【属性】饶这个锚点运作
		// 4. cc.Node 【默认】为 (0, 0), cc.Scene、cc.Layer、cc.Sprite 为(0.5, 0.5)
		var anchor = node.getAnchorPoint();
		cc.log("anchor:", anchor);

		node.setAnchorPoint(0.1, 0.5);
		var anchor = node.getAnchorPoint();
		cc.log("anchor : ", anchor);

		// 【锚点】在当前节点上的【绝对位置】
		cc.log("node.getAnchorPointInPoints() : ", node.getAnchorPointInPoints());

		/// 忽略锚点
		var ignoreAnchor = node.isIgnoreAnchorPointForPosition();
		cc.log("ignoreAnchor", ignoreAnchor);

		node.ignoreAnchorPointForPosition(!ignoreAnchor);
		var ignoreAnchor = node.isIgnoreAnchorPointForPosition();
		cc.log("ignoreAnchor", ignoreAnchor);

		cc.log("-------------------------------------------");

		var anchor = cc.p(node1.anchorX, node1.anchorY);
		cc.log("anchor : ", anchor);

		node1.anchorX = 1;
		node1.anchorY = 1;
		var anchor = cc.p(node1.anchorX, node1.anchorY);
        cc.log("anchor : ", anchor);

        var ignoreAnchor = node1.ignoreAnchor;
        cc.log("ignoreAnchor", ignoreAnchor);

        node1.ignoreAnchor = !ignoreAnchor;
        var ignoreAnchor = node1.ignoreAnchor;
        cc.log("ignoreAnchor", ignoreAnchor);

        // ignoreAnchor
        var node = new cc.Node();

        // cc.Node、 cc.Sprite 为 【false】
        // cc.Layer、cc.Scene  为 【true】
        var scene = new cc.Scene();
        var layer = new cc.Layer();
        var sprite = new cc.Sprite();
        cc.log("node", node.ignoreAnchor);
        cc.log("scene", scene.ignoreAnchor);
        cc.log("layer", layer.ignoreAnchor);
        cc.log("sprite", sprite.ignoreAnchor);

        cc.log("===============[Block End]=================");
	},
	/**
	 * 1.4,层级测试
	 */
	test_1_4: function(node, node1){
		node.setPosition(this.w2, this.h2);
        node1.setVisible(false);

        cc.log("===============[Block Began]===============");

        var tmpNode = new cc.Sprite(res.node152_png);
        tmpNode.setPosition(node.getPositionX() + 50, node.getPositionY() + 50);
        this.addChild(tmpNode);

        // 层级设置
        tmpNode.setLocalZOrder(-1);
        cc.log(" tmpNode.getLocalZOrder() : ", tmpNode.getLocalZOrder());
        cc.log(" tmpNode.getGlobalZOrder() : ", tmpNode.getGlobalZOrder());

        cc.log("-------------------------------------------");

        // tmpNode.zIndex = -1;
        cc.log(" tmpNode.zIndex : ", tmpNode.zIndex);

        cc.log("===============[Block End]=================");
	},
	/**
	 * 1.5,数据和标签测试
	 */
	test_1_5: function(node, node1){
		cc.log("===============[Block Began]===============");
        var OUT_MAN = 1;

        // tag 为【number】类型。
        node.setTag(OUT_MAN);
        cc.log("node.getTag() : ", node.getTag());

        // name 为【string】类型
        node.setName("out man");  // 奥特曼
        cc.log("node.getName() : ", node.getName());

        var userData = {
            name : "out man",
            age : 18
        }

        // 【随意】设置， 一个【数据块】, 【结构体】或者一个【对象】
        node.setUserData(userData);
        cc.log("node.getUserData() :", node.getUserData());

        var tmpNode = new cc.Node();
        tmpNode.setTag(998);

        // 设置一个用户指定的【cocos2d对象】
        node.setUserObject(tmpNode);
        cc.log("node.getObject() : ", node.getUserObject());


        cc.log("-------------------------------------------");


        var OUT_MAN = 1;
        node1.tag = OUT_MAN;
        cc.log("node1.tag : ", node1.tag);

        node1.name = "out man";
        cc.log("node1.name : ", node1.name);

        var userData = {
            name : "out man",
            age : 18
        }
        node1.userData = userData;
        cc.log("node1.userData :", node1.userData);

        var tmpNode = new cc.Node();
        tmpNode.tag = 998 ;
        node1.userObject = tmpNode;
        cc.log("node1.userObject : ", node1.userObject.tag);

        cc.log("===============[Block End]=================");
	},
	/**
	 * 2.1 旋转
	 */
	test_2_1: function(node, node1){
		cc.log("===============[Block Began]===============");

//		1. 默认为0度
		node.setRotation(45);
//		node.setRotationX(45);
//		node.setRotationY(45);
		cc.log("node.getRotation() : ", node.getRotation());
		cc.log("node.getRotationX() : ", node.getRotationX());
		cc.log("node.getRotationY() : ", node.getRotationY());


		cc.log("-------------------------------------------");

		node1.rotation = 90;
//		node1.rotationX = 45;
//		node1.rotationY = 45;
		cc.log("node1.rotation : ", node1.rotation);
		cc.log("node1.rotationX : ", node1.rotationX);
		cc.log("node1.rotationY : ", node1.rotationY);

		cc.log("===============[Block End]=================");
	},
	/**
	 * 2.2 缩放
	 */
	test_2_2: function(node, node1){
		cc.log("===============[Block Began]===============");

//       1. 默认为 1
		cc.log("node.getScale() : ", node.getScale());
         node.setScale(2);
//       node.setScaleX(2);
//       node.setScaleY(2);

         cc.log("node.getScale() : ", node.getScale());
         cc.log("node.getScaleX() : ", node.getScaleX());
         cc.log("node.getScaleY() : ", node.getScaleY());

         cc.log("-------------------------------------------");

//       node1.scale = 1;
         node1.scaleX = 1.5;
         node1.scaleY = 2;

         cc.log("node1.getScale() : ", node1.getScale());
         cc.log("node1.getScaleX() : ", node1.getScaleX());
         cc.log("node1.getScaleY() : ", node1.getScaleY());

         cc.log("===============[Block End]=================");
	},
	/**
	 * 2.3 倾斜
	 */
	test_2_3: function(node, node1){
		cc.log("===============[Block Began]===============");

//		1. 默认为0
//		node.setRotationX(45);
		node.setSkewX(45);
//		node.setSkewY(60);
		cc.log("node.getSkewX() : ", node.getSkewX());
		cc.log("node.getSkewY() : ", node.getSkewY());

		cc.log("-------------------------------------------");

//		node1.rotation = 45;
		node1.skewX = 45;
		node1.skewY = 60;
		cc.log("node1.skewY : ", node1.skewY);
		cc.log("node1.skewX : ", node1.skewX);

		cc.log("===============[Block End]=================");
	},
	/**
	 * 2.4 可见
	 */
	test_2_4: function(node, node1){
		cc.log("===============[Block Began]===============");
		node.setVisible(false);
		cc.log("node.isVisible() : ", node.isVisible());

		cc.log("-------------------------------------------");

		node1.visible = true;
		cc.log("node1.visible : ", node1.visible)

		cc.log("===============[Block End]=================");
	},
	/**
	 * 2.5 透明
	 */
	test_2_5: function(node, node1){
		cc.log("===============[Block Began]===============");
		// 0-255
		node.setOpacity(128);

		// 是否【启用】【级联】不透明度
		node.setCascadeOpacityEnabled(false); // default -> false
		cc.log("node.getOpacity() : ", node.getOpacity());
		cc.log("node.getCascadeOpacityEnabled() : ", node.isCascadeOpacityEnabled());

		var tmpNode = new cc.Sprite(res.node152_png);
		node.addChild(tmpNode);
		tmpNode.setNormalizedPosition(1, 0);

		cc.log("-------------------------------------------");

		node1.opacity = 128;
//			node1.cascadeOpacity = false; // default -> false
		cc.log("node1.opacity : ", node1.opacity);
		cc.log("node1.cascadeOpacityEnabled : ", node1.cascadeOpacity);

		var tmpNode = new cc.Sprite(res.node152_png);
		node1.addChild(tmpNode);
		tmpNode.setNormalizedPosition(0, 0);

		cc.log("===============[Block End]=================");
	},
	/**
	 * 2.6 颜色
	 */
	test_2_6: function(node, node1){
		cc.log("===============[Block Began]===============");

		node.setColor(cc.color(255, 255, 0));

		// 是否【启用】【级联】颜色
		node.setCascadeColorEnabled(true);  // default -> false
		cc.log("node.getColor() : ", node.getColor());
		cc.log("node.getCascadeColorEnabled() : ", node.isCascadeColorEnabled());

		var tmpNode = new cc.Sprite(res.node152_png);
		node.addChild(tmpNode);
		tmpNode.setNormalizedPosition(1, 0);

		cc.log("-------------------------------------------");

		node1.color = cc.color(255, 255, 0);
		node1.cascadeColor = false;
		cc.log("node.color : ", node.color);
		cc.log("node.cascadeColor : ", node.cascadeColor);

		var tmpNode = new cc.Sprite(res.node152_png);
		node1.addChild(tmpNode);
		tmpNode.setNormalizedPosition(0, 0);

		cc.log("===============[Block End]=================");
	},
	/**
	 * 2.7 渲染
	 */
	test_2_7: function(node, node2){
		cc.log("===============[Block Began]===============");

		cc.log("node.getVertexZ() : ", node.getVertexZ());

		cc.log("node.getShaderProgram() : ", node.getShaderProgram());
		node.setShaderProgram(cc.shaderCache.programForKey(cc.SHADER_POSITION_TEXTURECOLOR));
		cc.log("node.getShaderProgram() : ", node.getShaderProgram());

		cc.log("-------------------------------------------");

		cc.log("node.vertexZ : ", node.vertexZ);

		cc.log("node.shaderProgram : ", node.shaderProgram);
		node.shaderProgram = cc.shaderCache.programForKey(cc.SHADER_POSITION_TEXTURECOLOR);
		cc.log("node.shaderProgram : ", node.shaderProgram);

		cc.log("===============[Block End]=================");
	},
	/**
	 * 3.1 父/子相关
	 */
	test_3_1: function(node, node1){
		cc.log("===============[Block Began]===============");

		cc.log("node.getParent().getName() : " , node.getParent().getName());

		node.setParent(node1);
		cc.log("node.getParent().getName() : " , node.getParent().getName());

		// 返回子节点【集合】read only
		var childrens = this.getChildren();
		cc.log("this.getChildren() : ", childrens)

		// 返回子节点【数量】。read only
		var childrenCount = this.getChildrenCount();
		cc.log("this.getChildrenCount() : ", childrenCount);

		cc.log("-------------------------------------------");

		cc.log("node1.parent.name : " , node1.parent.name);

		// read only
		var childrens = this.children;
		cc.log("this.children : ", childrens)

		// read only
		var childrenCount = this.childrenCount;
		cc.log("this.childrenCount : ", childrenCount);
		cc.log("===============[Block End]=================");
	},
	/**
	 * 3.2 定时器
	 */
	test_3_2: function(node, node1){
		cc.log("===============[Block Began]===============");

		var scheduler = node.getScheduler();
		cc.log("node.getScheduler() : ", scheduler);

		cc.log("-------------------------------------------");

		var scheduler = node.scheduler;
		cc.log("node.scheduler : ", scheduler);
		cc.log("===============[Block End]=================");
	},
	/**
	 * 3.3 运行状态
	 */
	test_3_3: function(node, node1){
		cc.log("===============[Block Began]===============");

		// read only
//		node.onEnter(); --> running : true
//		node.onExit(); --> running : false
		var running = node.isRunning();
		cc.log("this.inRunning() : ", running);

		var tmpNode = new cc.Sprite(res.node152_png);
		tmpNode.setNormalizedPosition(0.5, 0.5);
//		this.addChild(tmpNode, 99);
		cc.log("tmpNode.isRunning() : ", tmpNode.isRunning());

		cc.log("-------------------------------------------");

		// read only
		var running = node.running;
		cc.log("node.running : ", running);

		var tmpNode = new cc.Sprite(res.node152_png);
		tmpNode.setNormalizedPosition(0.5, 0.5);
		this.addChild(tmpNode, 99);
		cc.log("tmpNode.running : ", tmpNode.running);

		cc.log("===============[Block End]=================");
	},
	/**
	 * 3.4 动作管理
	 */
	test_3_4: function(node, node1){
		// 每个Node实例在需要Action的时候都会有一个自己的ActionManager
		cc.log("===============[Block Began]===============");

		var actionManager = node.getActionManager();
		cc.log("node.getActionManager() : ", actionManager);

		node.setActionManager(cc.director.getActionManager());

		cc.log("-------------------------------------------");

		var actionManager = node.getActionManager();
		cc.log("node.getActionManager() : ", actionManager);
		node.actionManager = cc.director.getActionManager();

		cc.log("===============[Block End]=================");
	},
	/**
	 * 3.5到达顺序
	 */
	test_3_5: function(node, node1){
		node.setPosition(this.w2 - 35, this.h2);
		node1.setPosition(this.w2 + 35, this.h2 - 35);

		cc.log("===============[Block Began]===============");

		// 到达顺序， 若zIndex值一样，则arrivalOrder值更大的将后面绘制。就是绘制在更上面。引擎内部使用，不建议手动调用
		var nodeArrivalOrder = node.getOrderOfArrival();
		cc.log("node.getLocalZOrder() : ", node.getLocalZOrder());
		cc.log("node.getOrderOfArrival() : ", nodeArrivalOrder);

		var node1ArrivalOrder = node1.getOrderOfArrival();
		cc.log("node1.getLocalZOrder() : ", node1.getLocalZOrder());
		cc.log("node1.getOrderOfArrival() : ", node1ArrivalOrder);

		// 到达顺序加1， 绘制顺序改变了。
		node.setOrderOfArrival(node1ArrivalOrder + 1);

		cc.log("-------------------------------------------");

		// 到达顺序， 若zIndex值一样，则arrivalOrder值更大的将后面绘制。就是绘制在更上面。引擎内部使用，不建议手动调用
		var nodeArrivalOrder = node.arrivalOrder;
		cc.log("node.zIndex : ", node.zIndex);
		cc.log("node.arrivalOrder : ", nodeArrivalOrder);

		var node1ArrivalOrder = node1.arrivalOrder;
		cc.log("node1.zIndex : ", node1.zIndex);
		cc.log("node1.arrivalOrder : ", node1ArrivalOrder);

		// 到达顺序加1， 绘制顺序改变了。
		// node.arrivalOrder = node1ArrivalOrder + 1;

		cc.log("===============[Block End]=================");
	}
});

var NodeTestScene = cc.Scene.extend({
	onEnter: function(){
		this._super();

		if(true){
			var layer = new NodeTestLayer();
			this.addChild(layer);
		}
	}
})