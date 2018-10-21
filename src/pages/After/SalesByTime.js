import React, { Component } from 'react';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { formatMessage, FormattedMessage } from 'umi/locale';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/map/js/province/shanghai';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
// 使用样式
import 'echarts/theme/macarons'
import $ from "jquery";

class SalesByTime extends Component {
  componentDidMount() {
    var areatime = echarts.init(document.getElementById('areatime'), "macarons");
    $.ajax({
      type : "post",
      url : "http://10.52.200.23/statistics/v1/selectDistrictSignCount",
      contentType : "application/json; charset=utf-8",
      datatype : "json",
      data :JSON.stringify({})
    }).then((data) => {

      var names=[];
      var values=[];

      data.list.forEach(function(item,index){
        names.push(item.name);
        values.push(item.value);
      });

      var areatimeoption = {
        title: {
          text: '各区签约数量',
          subtext: '上海市各区成功签约数量'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend:[
          {
            data:names.slice(0,5)
          },
          {
            top: '20',
            data:names.slice(5,10)
          },
        ],
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis:  {
          type: 'category',
          boundaryGap: false,
          data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} 张'
          }
        },
        series: [
          {
            name:names[0],
            type:'line',
            data:values[0],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },{
            name:names[1],
            type:'line',
            data:values[1],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },{
            name:names[2],
            type:'line',
            data:values[2],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },{
            name:names[3],
            type:'line',
            data:values[3],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },{
            name:names[4],
            type:'line',
            data:values[4],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },{
            name:names[5],
            type:'line',
            data:values[5],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },{
            name:names[6],
            type:'line',
            data:values[6],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },{
            name:names[7],
            type:'line',
            data:values[7],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },{
            name:names[8],
            type:'line',
            data:values[8],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },{
            name:names[9],
            type:'line',
            data:values[9],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },

        ]
      };
      areatime.setOption(areatimeoption);
    });
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={24}><ChartCard id="areatime" style={{width:'100%',height:550 }}></ChartCard></Col>
        </Row>
      </div>
    );
  }
}

export default SalesByTime;
