<script>
import "./uni.scss";
import http from "@/utils/request";
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["place"])
  },
  watch: {},
  data() {
    return {
      hasClick: 0
    };
  },
  watch: {
     
  },
  onLaunch: function() {
    let that = this;
    const tokenMsg = uni.getStorageInfoSync();

    if (tokenMsg.keys.indexOf("yq_token") == 1) {
      this.getPlace();
    }
    uni.onTabBarMidButtonTap(res => {
      // 确认实名
      if(that.hasClick != 0) return
      that.hasClick = 1
      http("get", "clientUser/idCard", {}, res => {
        if (res.code == 200) {
          if (res.data.verifiedStatus != 2) {
						if(res.data.verifiedStatus == 1 || res.data.verifiedStatus == 2) {
							let content = ''
							if(res.data.verifiedStatus == 1){
								content='实名认证正在审核中'
							}
							if(res.data.verifiedStatus == 2){
								content='实名认证已通过请勿重复提交'
							}
							uni.showToast({
                title: content,
                duration: 1000,
                icon: 'none'
              });
              setTimeout(() => {
                that.hasClick = 0
              }, 600)
							return
            }
            uni.showToast({
              title: '请先完成实名认证',
              duration: 500,
              icon: 'none'
            })
            setTimeout(() => {
              uni.navigateTo({
                url: "/pages/statistic/mine/realName"
              });
            },500)
            setTimeout(() => {
              that.hasClick = 0
            }, 600)
          } else {
            setTimeout(() => {
              that.hasClick = 0
            }, 600)
            uni.navigateTo({
              url: "/pages/index/addAction/addAction"
            });
          }
        }
      });
    });
  },
  onShow: function() {
    this.alipayCan();
    uni.getLocation({
      type: 'gcj02',
	  geocode: true,
      success: function (res) {
      },
      fail: function() {
				  // 	uni.showModal({
					// 	content: '您未开启定位，或未授权定位',
					// 	confirmText: '设置',
					// 	success: function (res) {
					// 		if (res.confirm) {
					// 			permision.gotoAppSetting()
					// 		} else if (res.cancel) {
					// 			console.log('用户点击取消');
					// 		}
					// 	}
					// });
      }
    });
  },
  methods: {
    ...mapMutations(["getPlace", "alipayCan"])
  },
  onHide: function() {
  }
};
</script>

<style>
/* #ifndef APP-PLUS-NVUE */
page {
  height: 100%;
  box-sizing: border-box;
  background: #f6f6f6;
  font-size: 28rpx;
}
uni-picker .uni-picker-action.uni-picker-action-confirm {
  color: blue !important;
}
/* #endif*/
</style>
