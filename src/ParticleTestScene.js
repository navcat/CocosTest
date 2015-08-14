/**
 * 粒子系统
 */
var ParticleTestLayer = TestBaseLayer.extend({
	ctor: function(){
		this._super();
		
		// 创建
		var particle1 = new cc.ParticleSystem(res.particle_star_plist);
		var particle2 = new cc.ParticleSystem("res/particle/star.plist");
		var particle3 = new cc.ParticleSystem("res/particle/star.plist");

		// 添加
		// TODO 注意：这里获取texture， 必须把plist对应的png图片加载进来
		var particleBatchNode = new cc.ParticleBatchNode(particle1.texture);
		this.addChild(particleBatchNode);

		particleBatchNode.addChild(particle1);
		particleBatchNode.addChild(particle2);
		particleBatchNode.addChild(particle3);

		// 属性配置
		particle1.x = 100;
		particle2.x = 300;
		particle3.x = 500;
	}
});


var ParticleTestScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new ParticleTestLayer();
		this.addChild(layer);
	}
});