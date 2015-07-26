
var MenuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        /// 添加菜单
        var pearlMenu = new cc.MenuItemFont(
            "弹珠",
            function () {
                cc.log("Menu is clicked!");
                cc.director.runScene(new PlayScene());
            }, this);
        pearlMenu.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(pearlMenu);
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
            rotation: 180
        });
        this.addChild(this.sprite, 0);
        return true;
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});

