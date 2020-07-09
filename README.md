
## 底部带凸起按钮

解决uniapp在app配置原生tabbar无法自定义凸起图标的问题
	
#### 效果示例
 ![演示](http://cos.jzworks.cn/ucruj-rewii.gif)

#### 使用说明

- 在`main.js`中引入OverflowButton
```javascript
import OverflowButton from "./components/overflow-button/overflow-button.js"
Vue.prototype.OverflowButton=OverflowButton;
```
- 在`App.vue`中初始化
```javascript
	onLaunch: function() {
			// this.OverflowButton.getInstance().create();
			// this.OverflowButton.getInstance().setOnClickListener(e=>{
				uni.navigateTo({
					url:"/pages/index/addAction/addAction"
				})
			})
	}
```

- 在每个tab页中绑定生命周期
```javascript

	onShow() {
		//  
	},
	onHide() {
		//  
	}	
```

- 可在create()中传入自定义参数,全部参数如下
```javascript
	{
		id:[String], 
		icon: {
			src:[String],
			width:[Number],
			height:[Number],
			left:[Number],
			top:[Number],
			offset:[Number]
		},
		delay: {
			show: [Number],
			hide: [Number]
		}
	}
```

