
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

var data = 1;
var begin_time = new Date(getWeekStartDate());
var end_time = new Date();
var members = 21;

function getWeekStartDate() { 
	var now = new Date();
	var nowDayOfWeek = now.getDay();
	var nowDay = now.getDate();
	var nowMonth = now.getMonth()+1;
	var nowYear = now.getFullYear();
	if (nowDayOfWeek === 1 ){
		var weekStartDate = nowYear + "-" + nowMonth + "-" + nowDay;
	}else if(nowDayOfWeek ===0){
		var weekStartDate = nowYear + "-" + nowMonth + "-" + (nowDay-6);
	}else{
		var weekStartDate = nowYear + "-" + nowMonth + "-" + (nowDay - nowDayOfWeek + 1);
	}
	return weekStartDate;
}

function getNowDate() { 
	var now = new Date();
	var nowDay = now.getDate();
	var nowMonth = now.getMonth()+1;
	var nowYear = now.getFullYear();
	var weekStartDate = nowYear + "-" + nowMonth + "-" + nowDay;
	return weekStartDate;
}

function present_data(time_data) {
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: time_data.member
        },
        series: [{
                name: "Mon",
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: time_data.Mon
            },
            {
                name: "Tues",
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: time_data.Tues
            },
            {
                name: "Wed",
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: time_data.Wed
            },
            {
                name: "Thur",
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: time_data.Thur
            },
            {
                name: "Fri",
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: time_data.Fri
            },
            {
                name: "Sat",
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: time_data.Sat
            },
            {
                name: "Sun",
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: time_data.Sun
            }
        ]
    };
    option && myChart.setOption(option);
    myChart.setOption(option);
};

async function request_data(begin_time_unix, end_time_unix, members) {
    var response = await axios.get('http://192.168.1.132/api/data', {params: {begin_time: begin_time_unix, end_time: end_time_unix, member: members}});
    present_data(response.data)
};

layui.use('laydate', function(){
    var laydate = layui.laydate;
    laydate.render({
      elem: '#date', //指定元素
      range: true,
      done: function(value, date, endDate){
          let times = value.split(" - ");
          begin_time = new Date(times[0]);
          end_time = new Date(times[1]);
          request_data(String(begin_time.getTime()).slice(0,10), String(end_time.getTime()).slice(0,10), members);
          },
      value: getWeekStartDate() + " - " + getNowDate()
      });
      var dropdown = layui.dropdown;
      dropdown.on('click(grade)', function(options){
        members = options.id;
        request_data(String(begin_time.getTime()).slice(0,10), String(end_time.getTime()).slice(0,10), members);
      });
});
request_data(String(begin_time.getTime()).slice(0,10), String(end_time.getTime()).slice(0,10), members);
