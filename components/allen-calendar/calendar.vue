<style>
    #calendar-panel{
        font-size:14px;
        background-color:#ffffff;
    }
    #calendar-panel .calendar-title{
        padding:10px 0;
        text-align:center;
        background-color:#0086ff;
        color:#ffffff;
    }
    .calendar-week{
        display:flex;
        padding:10px 6px;
        box-sizing:border-box;
        border-bottom:0.3px solid #3ea3ff;
        background-color:#0086ff;
        color:#ffffff;
    }
    .calendar-week .calendar-week-item{
        flex-grow:1;
        font-size:15px;
        text-align:center;
        font-weight:800;
    }
    .calendar-content{
        
    }
    .calendar-content .calendar-year-month{
        padding:10px 0;
        text-align:center;
        font-weight:800;
        background-color:#0086ff;
        color:#b1d7f9;
    }
    .calendar-content-week{
        font-size:15px;
        display:flex;
        box-sizing:border-box;
        padding:6px 6px;
        overflow:hidden;
    }
    .calendar-content-week .selected{
        background-color:#0086ff;
    }
    .calendar-content-week-item{
        flex-grow:1;
        text-align:center;
        font-weight:800;
        display:flex;
        justify-content:center;
    }
    .calendar-content-week-item .day{
        width:90upx;
        height:90upx;
        display:flex;
        flex-direction:column;;
        justify-content:center;
        align-items:center;
    }
    .calendar-content-week-item .active{
        background-color:#0086ff;
        color:#ffffff;
        font-weight:600;
        border-radius:90upx;
    }
    .calendar-content-week-item .notSelect{
        color:#cccccc;
    }
</style>
<template>
	<view id="calendar-panel">
        <view class="calendar-title">{{calendarTitle}}</view>
        <view class="calendar-week">
            <view class="calendar-week-item">日</view>
            <view class="calendar-week-item">一</view>
            <view class="calendar-week-item">二</view>
            <view class="calendar-week-item">三</view>
            <view class="calendar-week-item">四</view>
            <view class="calendar-week-item">五</view>
            <view class="calendar-week-item">六</view>
        </view>
        <view class="calendar-content">
            <view class="calendar-year-month">{{yearMonth}}</view>
            <swiper @change="animationfinish" duration="200" :current="currentIdx" circular :style="{height:height+'px'}">
                <swiper-item class="swiper-item" v-for="(calendar,index) in calendars" :key="index">
                    <view class="calendar-content-week-panel">
                        <view class="calendar-content-week" v-for="(week,key) in calendar.weeks" :key="key">
                            <view class="calendar-content-week-item" v-for="(day,idx) in week" :key="idx">
                                <view class="day" 
                                :class="{notSelect:day.isClick?!true:!false,active:calendar.selectDay == day.date&&day.isClick?true:false}"
                                @tap="selectDate(
                                    calendar.year,
                                    calendar.month+1,
                                    day.date,
                                    day.isClick
                                )"
                                >
                                    {{day.date < 10?'0'+day.date:day.date}}
                                </view>
                            </view>
                        </view>
                    </view>
                </swiper-item>
            </swiper>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
            //获取当前时间的年月
            let yearMonth = this.getNow(this.date);
            let dateCustom = this.formatCustomDate(this.productCalendar);
			return {
                dates:[],
                currentIdx:1,
                height:500,
                calendars:[],
                year:yearMonth.Year,
                month:yearMonth.Month,
                changeDay:yearMonth.Day,
                initDate:`${yearMonth.Year}-${yearMonth.Month}-${yearMonth.Day}`, //初始化的时间
                startDate:'',
                endDate:'',
                dateCustom
			};
		},
        computed:{
            yearMonth(){
                return `${this.year}年${this.month+1<10?'0'+(this.month+1):this.month+1}月`;
            }
        },
        props:{
            // 是否为默认选中时间
            isDefaultClick:{
                type:[Boolean],
                default:true,
            },
            date:{
                type:[String],
            //选择的时间，默认为当前时间
                default:()=>{
                    let date = new Date();
                    return `${date.getFullYear()}/${date.getMonth()+1}/01`;;
                }
            },
            // 时间选择器的标题
            calendarTitle:{
                type:[String],
                default:'时间选择器'
                
            },
            productCalendar:{
                type:[Array,String],
                default:()=>{
                    return [];
                }
            },
            //时间选择器类型 date 单时间选择器 dateSolt时间段选择，dateCustom自定义时间(需配合productCalendar 传入参数，类型为Array['2019-12-12','2019-12-13'])
            dateType:{
                type:[String],
                default:'date'
            },
        },
        created(){
            this.getMonth(1,true);
            let time = '2019-12-12';
        },
        // #ifdef H5
        mounted() {
            this.getDomHeight();
        },
        // #endif
        // #ifndef H5
        onReady(){
            this.getDomHeight();
        },
        // #endif
        methods:{
            animationfinish(e){
                let current = e.detail.current;
                this.currentIdx = current;
                this.year = this.calendars[current].year;
                this.month = this.calendars[current].month;
                this.day = this.calendars[current].selectDay;
                this.getMonth(current);
            },
            /**
             * index:滑块id
             * init:是否为初始化
             */
            getMonth(index,init=false){
                let date = `${this.year}/${this.month+1}/01`;
                let beforeMonth,Month,afterMonth,calendar = [];
                if(index == 1 && init == true){
                    beforeMonth = this.getweek(this.getNow(date,-1));
                    Month = this.getweek(this.getNow(date,0));
                    afterMonth = this.getweek(this.getNow(date,1));
                    Month.selectDay = this.day;
                    beforeMonth.selectDay = beforeMonth.endDate<this.day?beforeMonth.endDate:this.day;
                    afterMonth.selectDay = afterMonth.endDate<this.day?afterMonth.endDate:this.day;
                    this.calendars.splice(0,1,beforeMonth);
                    this.calendars.splice(1,1,Month);
                    this.calendars.splice(2,1,afterMonth);
                }else{
                    beforeMonth = this.getweek(this.getNow(date,-1));
                    afterMonth = this.getweek(this.getNow(date,1));
                    beforeMonth.selectDay = beforeMonth.endDate<this.day?beforeMonth.endDate:this.day;
                    afterMonth.selectDay = afterMonth.endDate<this.day?afterMonth.endDate:this.day;
                }
                if(index == 0){
                    this.calendars.splice(1,1,afterMonth);
                    this.calendars.splice(2,1,beforeMonth);
                    return;
                }
                if(index == 1){
                    this.calendars.splice(0,1,beforeMonth);
                    this.calendars.splice(2,1,afterMonth);
                    return;
                }
                if(index == 2){
                    this.calendars.splice(0,1,afterMonth);
                    this.calendars.splice(1,1,beforeMonth);
                    return;
                }
            },
            getweek(date){
                let weeks = [];
                let dates = this.getDates(date);
                let len = Math.ceil(dates.weeks.length/7);
                for(let i=0;i<len;i++){
                    weeks.push(dates.weeks.slice(i*7,7+(i*7)));
                }
                dates.weeks = weeks
                return dates;
            },
            getDates(date){
                let dates = {
                    year:date.Year,
                    month:date.Month,
                    firstDay:new Date(date.Year,date.Month,1).getDay(),
                    lastDay:new Date(date.Year,date.Month+1,0).getDay(),
                    endDate:new Date(date.Year,date.Month+1,0).getDate(),
                    weeks:[]
                }
                //计算上月日期
                for(let i = dates.firstDay;i>0;i--){
                    let dateinfo = {};
                    dateinfo.date = new Date(date.Year,date.Month,-i+1).getDate();
                    dateinfo.isClick = false;
                    dates.weeks.push(dateinfo);
                }
                //计算本月日期
                for(let i = 1;i <= new Date(date.Year,date.Month + 1,0).getDate();i++){
                    let nowisClick = true;
                    let dateinfo = {};
                    dateinfo.date = i;
                    if(this.dateType == 'dateCustom'){
                        nowisClick = false;
                        if(this.dateCustom[dates.year]&&this.dateCustom[dates.year][dates.month]){
                            for(let j = 0;j<this.dateCustom[dates.year][dates.month].length;j++){
                                if(this.dateCustom[dates.year][dates.month][j] == i){
                                    nowisClick = true;
                                }
                            }
                        }
                    }
                    dateinfo.isClick = nowisClick;
                    dates.weeks.push(dateinfo);
                }
                //计算下月日期
                let len = 7 - dates.lastDay;
                if((42 - dates.weeks.length)>= 7){
                    len += 7;
                }
                for(let i = 1;i<len;i++){
                    let dateinfo = {};
                    dateinfo.date = i;
                    dateinfo.isClick = false;
                    dates.weeks.push(dateinfo);
                }
                return dates;
                
            },
            getNow(date,addEndMonth = 0){
                let _date = !date?new Date():new Date(date);
                _date.setMonth(_date.getMonth()+addEndMonth);
                let Year = _date.getFullYear();
                let Month = _date.getMonth();
                let Day = _date.getDate();
                let Week = _date.getDay();
                return{
                    Year,
                    Month,
                    Day
                }
            },
            formatCustomDate(customDate){
                let date = {};
                for(let i = 0;i<customDate.length;i++){
                    let dateArr = (customDate[i]).split('-');
                    let year = parseInt(dateArr[0]);
                    let month = parseInt(dateArr[1])-1;
                    let day = parseInt(dateArr[2]);
                    if(!date[year]){
                        date[year] = {};
                    }
                    if(!date[year][month]){
                        date[year][month] = [];
                    }
                    date[year][month].push(day);
                }
                return date;
            },
            getDomHeight(){
                let view = uni.createSelectorQuery().select('.calendar-content-week-panel');
                view.fields({size:true},data=>{
                    this.height = data.height;
                }).exec();
            },
            selectDate(year,month,date,isClick){
                if(!isClick)return false;
                this.calendars[0].selectDay = date
                this.calendars[1].selectDay = date
                this.calendars[2].selectDay = date
                this.$emit('selected',{
                    fullDate:`${year}-${month}-${date}`
                });
            }
        }
	}
</script>
