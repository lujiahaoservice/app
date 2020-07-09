<template>
  <view class="all_line">
    <view class="tips">已显示全部内容</view>
  </view>
</template>

<script>
export default {
  name: 'all-line'
}
</script>

<style lang="scss">
.all_line{
  display: flex;
  justify-content: center;
  padding-bottom: 20rpx;
  .tips{
    width: 196rpx;
    height: 40rpx;
    font-size:28rpx;
    font-weight:400;
    color:rgba(204,204,204,1);
    line-height:40rpx;
  }
}
</style>