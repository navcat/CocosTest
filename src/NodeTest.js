/**
 * 节点测试
 */
var NodeTestLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
		/// 基础属性
		// 1.1,位置测试

		this.testPosition();
		// 1.2,大小测试
		// 1.3,锚点测试
		// 1.4,层级测试
		// 1.5,数据和标签测试
		
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
	testPosition: function(){
		
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