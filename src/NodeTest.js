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
		this.test_1_5(node, node1);
		
		/// 图形属性
		// 2.1 旋转
		// 2.2 缩放
		// 2.3 倾斜
		// 2.4 可见
		// 2.5 透明
		// 2.6 颜色
		// 2.7 渲染
		
		/// 其他属性
		// 3.1 父/子相关
		// 3.2定时器
		// 3.3 运行状态
		// 3.4 动作管理
		// 3.5 到达顺序
		
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