<template>
  <view class="sel_like">
    <view class="Adaptive"></view>
    <view class="sel_like_content">
      <view class="content_top">
        <view class="top_left">
          <image src="../../static/sel_like/zc-logo.png" alt />
          <text>让天下人有事做</text>
        </view>
        <view class="top_right" @click="goDiligenceN">
          <image src="../../static/sel_like/bgyonq.png" alt />
          <text>跳过</text>
        </view>
      </view>
      <!-- 中间的选择tab选择 -->
      <view class="content_main">
        <swiper
          class="swiper"
          @change="getCurrent"
          indicator-color="rgba(73,109,245,.49)"
          indicator-active-color="#496DF5"
          circular
          indicator-dots
          duration="500"
        >
          <template v-for="(item, index) in outList">
            <swiper-item class="swiper_it" :key="index">
              <view class="swiper-item uni-bg-red">
                <template v-for="(res, indexelse) in item.tagList">
                  <view
                    class="tag"
                    :class="[getTagIndex(indexelse), {'active': res.active}]"
                    @click="selIndex(res, indexelse)"
                    :key="indexelse"
                  >{{res.name}}</view>
                </template>
              </view>
            </swiper-item>
          </template>
        </swiper>
      </view>
      <!-- 进入用勤 -->
      <view class="goDiligence" @click.once="goDiligence">进入用勤</view>
    </view>
  </view>
</template>

<script>
import http from "@/utils/request";
export default {
  data() {
    return {
      outList: [],
      activeList: [],
      currentIndex: 0
    };
  },
  onLoad() {
    this.initData();
  },
  methods: {
    //获取兴趣行业
    initData() {
      let that = this;
      http("get", "category/industry", {}, res => {
        if (res.code == 200) {
          let newList = res.data;
          newList.forEach(val => {
            val.active = false;
          });
          let objNum = Math.ceil(newList.length / 9);
          for (let i = 0; i < objNum; i++) {
            const need = {
              tagList: []
            }
            let sli = 0;
            need.tagList = newList.splice(sli, 9)
            that.outList.push(need)
            // sli += 9;
          }
        }
      });
    },
    // 获取tag的class类名
    getTagIndex(index) {
      return "tag" + index;
    },
    // 获得当前所在滑块的 index
    getCurrent(e) {
      this.currentIndex = e.detail.current;
    },
    // 获取tag的index改变active
    selIndex(res, index) {
			let that = this
			let obj = {
				name: res.name
			}
      if (res.active == true) {
        that.activeList.forEach((item, index) => {
          if (item.name == res.name) {
            that.activeList.splice(index, 1);
          }
        });
      } else {
          if(that.activeList.length >= 4) {
            uni.showToast({
              title: '兴趣行业最多选择四项',
              duration: 2000,
              icon: 'none'
            });
            return
          }
				that.activeList.push(obj);
      }
			res.active = !res.active;
    },
    // 进入考勤
    goDiligence() {
      let data = JSON.stringify(this.activeList);
      http("put", "clientUser/update", { interest: data }, res => {
        if (res.code == 200) {
          this.to_home();
        }
      });
    },
    goDiligenceN() {
      this.to_home();
    },
    to_home() {
      uni.switchTab({
        url: "/pages/index/home/home"
      });
    }
  }
};
</script>

<style lang="scss">
.sel_like {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .Adaptive {
    height: var(--status-bar-height); // 头部系统栏高度
    width: 100%;
    background: #fff;
  }
  .sel_like_content {
    flex: 1;
    width: 100%;
    background: #ffffff;
    .content_top {
      height: 292rpx;
      width: 100%;
      display: flex;
      margin-bottom: 164rpx;
      .top_left {
        flex: 1;
        padding: 100rpx 0 0 74rpx;
        > image {
          height: 76rpx;
          width: 144rpx;
          margin-right: 24rpx;
        }
        > text {
          font-size: 20rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(73, 109, 245, 1);
        }
      }
      .top_right {
        height: 100%;
        width: 292rpx;
        position: relative;
        > image {
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          right: 0;
          z-index: 1;
        }
        > text {
          position: absolute;
          top: 92rpx;
          right: 76rpx;
          z-index: 2;
          color: #496df5;
          font-size: 32rpx;
          font-weight: 600;
        }
      }
    }
    .content_main {
      width: 530rpx;
      height: 600rpx;
      margin: 0 auto;
      margin-bottom: 50rpx;
      .swiper {
        height: 100%;
        width: 100%;
        .swiper_it {
          height: 454rpx !important;
          width: 100%;
          .swiper-item {
            height: 100%;
            width: 100%;
            position: relative;
            .tag {
              height: 60rpx;
              padding: 0 15rpx;
              line-height: 60rpx;
              font-size: 28rpx;
              color: #c6c6c6;
              background: #fff;
              border: 1px solid #aaaaaa;
              position: absolute;
              border-radius: 8rpx;
            }
            .tag0 {
              left: 200rpx;
              top: 0;
            }
            .tag1 {
              top: 20rpx;
              right: 0;
            }
            .tag2 {
              left: 0;
              top: 84rpx;
            }
            .tag3 {
              left: 250rpx;
              top: 160rpx;
            }
            .tag4 {
              left: 5rpx;
              top: 230rpx;
            }
            .tag5 {
              left: 200rpx;
              top: 300rpx;
            }
            .tag6 {
              right: 10rpx;
              bottom: 130rpx;
            }
            .tag7 {
              left: 20rpx;
              bottom: 0;
            }
            .tag8 {
              bottom: 0;
              right: 50rpx;
            }
            .active {
              border: 1px solid #000;
              background: #f58649;
              color: #25140b;
            }
          }
        }
      }
    }
    .goDiligence {
      width: 480rpx;
      height: 100rpx;
      background: rgba(73, 109, 245, 1);
      border-radius: 16rpx;
      margin: 0 auto;
      line-height: 100rpx;
      text-align: center;
      font-size: 32rpx;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
