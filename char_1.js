
var charts = []
var dom = document.getElementById("today_all");
var myChart = echarts.init(dom);
charts.push(myChart)
var app = {};
var option;
option = {
    legend: {},
    tooltip: {},
    dataset: {
        source: [
            ['product', '异常数','已经上报', '未上报'],
            ['全校上报情况', <?php
            $still=$total-$have_sub;
            echo $error;
            echo ",";
            echo $have_sub;
            echo ",";
            echo $still;?>],
        ]
    },
    xAxis: {type: 'category'},
    yAxis: {},
    series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'},
    ]
};
option = {

    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        // orient: 'vertical',
        left: 'left',
        data: ['未上报', '已上报', '异常数据']
    },
    series: [
        {
            name: '数据值',
            type: 'pie',
            radius: '80%',
            center: ['50%', '60%'],
            data: [
                {value: <?php $still=$total-$have_sub;echo $still;?>, name: '未上报'},
                {value: <?php echo $have_sub;?>, name: '已上报'},
                {value: <?php echo $error;?>, name: '异常数据'},
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

if (option && typeof option === 'object') {
    myChart.setOption(option);
}


var dom = document.getElementById("today_org");
var myChart = echarts.init(dom);
charts.push(myChart)
var app = {};
var option1;
option1 = {
    legend: {},
    tooltip: {},
    dataset: {
        source: [
        	['product', '异常数','已经上报', '未上报'],
        	<?php
	        	require '../includes/database.inc.php';
        		$sql='SELECT * from org_info';
        		$result = $conn->query($sql);
        		$i=0;
				if ($result->num_rows > 0) {
				    while($row = $result->fetch_assoc()) {
				    	
				       $name=$row['name'];
				       $id=$row['org_id'];
				       $sql="SELECT count(DISTINCT(number)) FROM sub_log where TO_DAYS(time) = TO_DAYS($date) and org='".$name."'";
				       
				       $result1 = $conn->query($sql) or die("数据库查询失败!");
						$row = $result1->fetch_assoc();
						$have_sub=$row['count(DISTINCT(number))'];
						$sql="SELECT count(DISTINCT(number)) FROM student_info where org_id=".$id;
						$result1 = $conn->query($sql) or die("数据库查询失败!");
						$row = $result1->fetch_assoc();
						$total=$row['count(DISTINCT(number))'];
						$still=$total-$have_sub;
						$sql="SELECT count(DISTINCT(number)) FROM sub_log where (TO_DAYS(time) = TO_DAYS($date) and org='$name') and (temp>37.3 or temp<36.0)";
						// echo $sql;
						$result4 = $conn->query($sql) or die("数据库查询失败!");
						$row = $result4->fetch_assoc();
						$error=$row['count(DISTINCT(number))'];
						
						
						
						echo "['$name',{$error},{$have_sub},{$still}],";
				    }
				}
        	?>

        ]
    },
    xAxis: {type: 'category'},
    yAxis: {},
    series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'},
    ]
};
if (option1 && typeof option1 === 'object') {
    myChart.setOption(option1);
}
window.onresize = function(){//在所有图表之后
    for(var i = 0; i < charts.length; i++){
        charts[i].resize();
    }
};