/**
 * @param {Object} options
 * 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
 */
let navigateTo = function(options) {
	uni.navigateTo({
		url: options.url
	});
}

/**
 * 显示消息提示框
 * <pre>
 * options 对于字段
 * {
 *    title:String   //提示的内容
 *    icon:String  //图标 
 *    duration:number //提示的延迟时间 默认2500
 *    image:string      //自定义图标的本地路径，image 的优先级高于 icon
 *    mask:boolean   是否显示透明蒙层，防止触摸穿透
 *    success 成功回调
 *    fail 失败回调
 * }
 * </pre>
 */

let showToast = function (options) {
  uni.showToast({
    title: options.title || "提示",
    icon: options.icon || 'none',
    duration: options.duration || 2500,
    image: options.image,
    mask: options.mask,
    success: options.success,
    fail: options.fail
  })
}

/**
 * 显示 loading 提示框。
 * 需主动调用 uni.hideLoading 才能关闭提示框
 * <pre>
 * options:{
 * title:"", 标题
 * mask:"", 是否显示透明蒙层，防止触摸穿透，默认：false
 * success:  //成功回调
 * fail        //失败回调
 * }
 * </pre>
 * api文档：            https://uniapp.dcloud.io/api/ui/prompt?id=showloading
 */
let showLoading = function (options) {
  uni.showLoading({
    title: options.title || '加载中',
    mask: options.mask || true,
    success: options.success,
    fail: options.fail
  })
}

/**
 * 显示模态弹窗
 * <pre>
 * options:{
 * title:"", 标题
 * cancelText: "", // 取消按钮的文字，默认为"取消"，最多 4 个字符
 * confirmText :"", // 确定按钮的文字，默认为"确定"，最多 4 个字符
 * content:"", 提示的内容
 * success:  //成功回调
 * fail        //失败回调
 * }
 * </pre>
 */
let showModel = function(options) {
	uni.showModal({
		title: options.title || '提示',
		content: options.content || '',
		success: options.success,
		fail: options.fail
	})
}

/**
 * 从本地相册选择图片或使用相机拍照
 */
let chooseImage = function(success,fail){
	uni.chooseImage({
		count: 1, //默认9
		sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album', 'camera'], //从相册 + 拍照选择
		success: function (res) {
			// 
			success(res)
		},
		fail: function (err){
			fail(err)
		}
	})
}

module.exports = {
	navigateTo,
	showToast,
	showLoading,
	showModel,
	chooseImage
}