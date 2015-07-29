
var MenuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        
        var menuHeight = 50;  // 每行菜单的高度

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

        var menu = new cc.Menu(pearlMenu, amMenu);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        var label = new cc.LabelTTF("练习册", "Arial", 38);
        label.x = size.width / 2;
        label.y = 0;
        this.addChild(label, 5);

        // 添加背景图片
        this.sprite = new cc.Sprite(res.BackGround_jpg);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 0
        });
        this.addChild(this.sprite, 0);
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

