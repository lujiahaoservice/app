<template>
  <view class="creditCenter">
    <progressBar :progress_txt="msg.credit"></progressBar>
    <view class="count_list_box">
      <div class="count_list_title">信用记录</div>
      <div class="count_list">
        <div class="count_single" v-for="(item,index) in countList" :key="index">
          <div class="mine_wallet_single_top">
            <text class="mine_wallet_single_top_title">{{item.creditType===1?'完成订单':'取消订单'}}</text>
            <text class="mine_wallet_single_top_content">{{item.creditType===1?'+':'-'}}1</text>
          </div>
          <text class="mine_wallet_single_top_date">{{item.created}}</text>
        </div>
      </div>
    </view>
  </view>
</template>
<script>
import http from "@/utils/request";
import progressBar from "../../../components/chocolate-progress-bar/chocolate-progress-bar.vue";
export default {
  components: {
    progressBar
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      pages: 0,
			countList: [],
			msg: ''
    }
  },
  onLoad(e) {
		this.msg = JSON.parse(e.msg)
	},
  onShow() {
    this.initData(false);
  },
  onHide() {},
  methods: {
    initData(e) {
      let that = this;
      const data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      http("get", "creditDetails/page", data, res => {
        if (res.code == 200) {
          let msg = res.data.records;
          if (e) {
            let newList = that.countList.concat(msg);
            that.countList = newList;
          } else {
            that.countList = msg;
          }
          that.pages = res.data.pages;
        }
      });
    }
  },
  onNavigationBarButtonTap: function onNavigationBarButtonTap(e) {
    uni.navigateBack({
      delta: 1
    });
  },
  onPullDownRefresh() {
    this.pageNum = 1;
    this.initData(false);
    uni.stopPullDownRefresh();
  },
  onReachBottom() {
    if (this.pageNum < this.pages) {
      this.pageNum += 1;
      this.initData(true);
    }
  }
};
</script>
<style lang="scss">
.creditCenter {
  .count_list_title {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    line-height: 22px;
  }
  .count_list_box {
    padding: 0 22rpx;
  }
  .wallet_left_num {
    height: 42px;
    line-height: 42px;
    color: #fff;
    font-size: 30px;
  }
  .count_list {
    padding-top: 20px;
  }
  .count_single {
    padding: 19px 10px 9px;
    border-bottom-width: 1px;
    border-bottom-color: #dcdcdc;
    border-bottom-style: solid;
  }
  .mine_wallet_single_top {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  .mine_wallet_single_top_title {
    font-weight: bold;
  }
}
</style>