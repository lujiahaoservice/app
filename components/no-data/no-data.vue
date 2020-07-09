<template>
  <view
    class="noData"
    :style="{paddingTop: noDataPadding ? noDataPadding : '',justifyContent: noDataPadding ? '' : 'center'}"
  >
    <img
      :src="noDataType == '1' ? noDataImg_type1 : (noDataType == '2' ? noDataImg_type2 : (noDataType == '3' ? noDataImg_type3 : (noDataType == '4' ? noDataImg_type4 : (noDataType == '5' ? noDataImg_type5 :  (noDataType == '6' ? noDataImg_type6 :  (noDataType == '7' ? noDataImg_type7 :  (noDataType == '8' ? noDataImg_type8 : (noDataType == '9' ? noDataImg_type9 : noDataImg_type10))))))))"
      alt
    />
    <view
      class="noDataTitle"
      v-if="noDataType == '1' || noDataType == '2'"
    >您还没有{{noDataType == '1' ? '浏览历史' : '收藏历史'}}哦</view>
    <view class="noDataTitle" v-if="noDataType == '3'">暂时没有新闻哦</view>
    <view class="noDataTitle" v-if="noDataType == '4'">暂时没有评论哦</view>
    <view class="noDataTitle" v-if="noDataType == '5'">暂时没有通知哦</view>
    <view class="noDataTitle" v-if="noDataType == '6'">暂时没有推送哦</view>
    <view class="noDataTitle" v-if="noDataType == '7'">您还没有待确认信息哦</view>
    <view class="noDataTitle" v-if="noDataType == '8'">您还没有已确认信息哦</view>
    <view class="noDataTitle" v-if="noDataType == '9'">您还没有资料哦</view>
    <view class="noDataTitle" v-if="noDataType == '10'">您还没有操作日志哦</view>
  </view>
</template>

<script>
export default {
  props: {
    noDataType: {
      type: String
    },
    noDataPadding: {
      type: String
    }
  },
  data() {
    return {
      noDataImg_type1: "../../static/img/no_browse.png", //浏览历史
      noDataImg_type2: "../../static/img/no_collect.png", //收藏
      noDataImg_type3: "../../static/img/no_news.png", //新闻
      noDataImg_type4: "../../static/img/no_news.png", //评论
      noDataImg_type5: "../../static/img/no_inform.png", //通知
      noDataImg_type6: "../../static/img/no_push.png", //推送
      noDataImg_type7: "../../static/img/no_waitsure.png", //待确认
      noDataImg_type8: "../../static/img/no_hadsure.png", //已确认
      noDataImg_type9: "../../static/img/no_material.png", //资料
      noDataImg_type10: "../../static/img/no_oplog.png" //资料
    };
  },
  mounted() {}
};
</script>

<style lang="scss">
.noData {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  img {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 30rpx;
  }
  .noDataTitle {
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(204, 204, 204, 1);
    line-height: 40rpx;
  }
}
</style>