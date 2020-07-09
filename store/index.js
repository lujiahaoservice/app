import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/utils/request'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    place: '',
    chooseType: {},
    pay: [],
    sub_success: 0,
    getUserInfo: {},
    fromPage: '',
    deleteOne: -1
  },
  mutations: {
    getPlace(state) {
      uni.getLocation({
        geocode: true,
        type: 'gcj02',
        success: function (position) {
					let point = new plus.maps.Point(position.longitude, position.latitude)
					plus.maps.Map.reverseGeocode(
						point,
						{},
						function (event) {
							uni.request({
								url: 'https://restapi.amap.com/v3/geocode/geo?parameters',
    						method: 'GET',
								data: {
									address: event.address,
									key: 'd1c69d525cab4e37c7b426aa3a97eda6'
								},
								success: (res) => {
                  let cityCode = res.data?res.data.geocodes[0].citycode:null
                  uni.setStorageSync('yq_citycode', cityCode)
                  let data = {
                    cityCode: cityCode,
                    lat: position.latitude,
                    lng: position.longitude,
                    city: position.address.city
                  }
                  http('put', 'clientUser/update', data, res => {
                    state.place = position
                    uni.setStorage({
                      key: 'yq_place',
                      data: position,
                      success: function () {
                      }
                    });
                  })
								}
							});
						},
						function (e) { }
					)
        }
      })
    },
    deleteGetTask(state, data) {
      state.deleteOne = data
    },
    changeUserInfo(state, data) {
      state.getUserInfo = data
    },
    subSuccess(state, val) {
      state.sub_success = val
    },
    updateChooseType(state, val) {
      state.chooseType = val
    },
    alipayCan(state) {
      plus.payment.getChannels(function (channels) {
        state.pay = channels
      })
    }
  },
  actions: {}
})
export default store