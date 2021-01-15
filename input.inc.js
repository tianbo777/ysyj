/**
 * Created by chinnsyoukich on 2017/4/21.
 */


//时间输入插件
$('.form_date').datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        pickDate: true,
        pickTime: false,
        inputMask: true,
        pickerPosition: "bottom-right",
        autoclose: true,
        startView: 2,
        minView: 'month'
    });
$('.form_date1').datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',
        language: 'zh-CN',
        pickDate: true,
        pickTime: true,
        inputMask: true,
        pickerPosition: "bottom-right",
        autoclose: true,
        startView: 2,
        minView: 'month'
    });
//初始化选择框
$('.selectpicker').selectpicker({

    size: 16
    });



