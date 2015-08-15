
var MenuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        
        // 添加背景图片
        this.sprite = new cc.Sprite(res.BackGround_jpg);
        this.sprite.attr({
        	x: size.width / 2,
        	y: size.height / 2,
        	scale: 0.5,
        	rotation: 0
        });
        this.addChild(this.sprite, 0);

        var label = new cc.LabelTTF("练习册", "Arial", 38);
        label.x = size.width / 2;
        label.y = 0;
        this.addChild(label, 5);
        
        /// 添加菜单
        var menuHeight = 50;  // 每行菜单的高度
        var menu = new cc.Menu();
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /// 添加菜单
        var pearlMenu = new cc.MenuItemFont(
            "1,弹珠",
            function () {
                cc.log("Menu is clicked!");
                cc.director.runScene(new PearlScene());
            }, this);
        pearlMenu.attr({
            x: size.width / 2,
            y: size.height - 20,
            color: this.randomColor(),  // 改变颜色
            anchorX: 0.5,
            anchorY: 0.5
        });
        menu.addChild(pearlMenu);
        
        /// 动作管理
        var amMenu = new cc.MenuItemFont(
        		"2,ActionManager",
        		function () {
        			cc.log("Menu is clicked!");
        			cc.director.runScene(new ActionManagerScene());
        		}, this);
        amMenu.attr({
        	x: size.width / 2,
        	y: size.height - menuHeight,
        	color: this.randomColor(),  // 改变颜色
        	anchorX: 0.5,
        	anchorY: 0.5
        });
        menu.addChild(amMenu);
        
        /// 事件管理
        var eventMenu = new cc.MenuItemFont(
        		"3,EventManager",
        		function () {
        			cc.log("Menu is clicked!");
        			cc.director.runScene(new EventManagerScene());
        		}, this);
        eventMenu.attr({
        	x: size.width / 2,
        	y: size.height - menuHeight * 2,
        	color: this.randomColor(),  // 改变颜色
        	anchorX: 0.5,
        	anchorY: 0.5
        });
        menu.addChild(eventMenu);
        
        /// 节点测试
        var nodeMenu = new cc.MenuItemFont(
        		"4,NodeTest",
        		function () {
        			cc.log("Menu is clicked!");
        			cc.director.runScene(new NodeTestScene());
        		}, this);
        nodeMenu.attr({
        	x: size.width / 2,
        	y: size.height - menuHeight * 3,
        	color: this.randomColor(),  // 改变颜色
        	anchorX: 0.5,
        	anchorY: 0.5
        });
        menu.addChild(nodeMenu);
        
        /// 5.场景切换
        var sceneMenu = new cc.MenuItemFont(
        		"5.场景切换",
        		function () {
        			cc.log("Menu is clicked 5!");
        			cc.director.runScene(new TestSceneScene());
        		}, this);
        sceneMenu.attr({
        	x: size.width / 2,
        	y: size.height - menuHeight * 4,
        	color: this.randomColor(),  // 改变颜色
        	anchorX: 0.5,
        	anchorY: 0.5
        });
        menu.addChild(sceneMenu);
        
        /// 6.音频测试
        var audioMenu = new cc.MenuItemFont(
        		"6.音频测试",
        		function () {
        			cc.log("Menu is clicked 6!");
        			cc.director.runScene(new AudioTestScene());
        		}, this);
        audioMenu.attr({
        	x: size.width / 2,
        	y: size.height - menuHeight * 5,
        	color: this.randomColor(),  // 改变颜色
        	anchorX: 0.5,
        	anchorY: 0.5
        });
        menu.addChild(audioMenu);
        
        /// 7.粒子系统
        var particleMenu = new cc.MenuItemFont(
        		"7.粒子系统",
        		function () {
        			cc.log("Menu is clicked 7!");
        			cc.director.runScene(new ParticleTestScene());
        		}, this);
        particleMenu.attr({
        	x: size.width / 2,
        	y: size.height - menuHeight * 6,
        	color: this.randomColor(),  // 改变颜色
        	anchorX: 0.5,
        	anchorY: 0.5
        });
        menu.addChild(particleMenu);
        
        /// 8,2.5D游戏人物行走
        var rockerMenu = new cc.MenuItemFont(
        		"8.摇杆",
        		function () {
        			cc.log("Menu is clicked 8!");
        			cc.director.runScene(new RockerDemoScene());
        		}, this);
        rockerMenu.attr({
        	x: size.width / 2,
        	y: size.height - menuHeight * 7,
        	color: this.randomColor(),  // 改变颜色
        	anchorX: 0.5,
        	anchorY: 0.5
        });
        menu.addChild(rockerMenu);
//        
        

//        var menu = new cc.Menu(pearlMenu, amMenu, eventMenu, nodeMenu, sceneMenu, audioMenu, particleMenu, );
//        menu.x = 0;
//        menu.y = 0;
//        this.addChild(menu, 1);



        return true;
    },
    /**
     * 生成一个随机颜色
     * @return cc.color
     */
    randomColor: function(){
    	return cc.color(Math.floor(cc.random0To1() * 2550),
    			Math.floor(cc.random0To1() * 2550),
    			Math.floor(cc.random0To1() * 2550));
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});

