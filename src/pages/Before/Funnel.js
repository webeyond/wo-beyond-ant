import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import {ChartCard} from '@/components/Charts';
import { Redirect } from 'react-router';
import router from 'umi/router';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
// 使用样式
import 'echarts/theme/macarons';
import styles from './Funnel.less';
import $ from "jquery";
import {connect} from "dva";


class Funnel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderscount: []
    }
  }


  // goOrder (record){//页面跳转+参数
  //   this.props.dispatch(routerRedux.push({
  //     pathname: '/orders/orderdetail',
  //     params: 'a'
  //   }))
  // }

  componentDidMount() {
    var funnelchart = echarts.init(document.getElementById('funnelchart'), "macarons");
    $.ajax({
      type : "post",
      url : "http://10.52.200.23/statistics/v1/selectSignFunnelCount",
      contentType : "application/json; charset=utf-8",
      datatype : "json",
      data :JSON.stringify({})
    }).then((data) => {

      var funneloption = {
        title: {
          text: '订单漏斗图',
          subtext: '各类型订单漏斗图展示'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: ['展现','点击','访问','咨询','订单']
        },
        series: [
          {
            name: '预期',
            type: 'funnel',
            left: '10%',
            width: '80%',
            label: {
              normal: {
                formatter: '{b}预期'
              },
              emphasis: {
                position:'inside',
                formatter: '{b}预期: {c}%'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.7
              }
            },
            data: [
              {value: 60, name: '访问'},
              {value: 40, name: '咨询'},
              {value: 20, name: '订单'},
              {value: 80, name: '点击'},
              {value: 100, name: '展现'}
            ]
          },
          {
            name: '实际',
            type: 'funnel',
            left: '10%',
            width: '80%',
            maxSize: '80%',
            label: {
              normal: {
                position: 'inside',
                formatter: '{c}%',
                textStyle: {
                  color: '#fff'
                }
              },
              emphasis: {
                position:'inside',
                formatter: '{b}实际: {c}%'
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.5,
                borderColor: '#fff',
                borderWidth: 2
              }
            },
            data: [
              {value: 30, name: '访问'},
              {value: 10, name: '咨询'},
              {value: 5, name: '订单'},
              {value: 50, name: '点击'},
              {value: 80, name: '展现'}
            ]
          }
        ]
      };
      funnelchart.setOption(funneloption);
      funnelchart.on('click', function (param){
        var selected = param.name;
        router.push({
          pathname: '/orders/orderdetail',
          query: {
            a: 'b',
          },
        });
      });
    });

  }

  render() {

    return (
      <div>
      <ChartCard id="funnelchart" style={{width:'100%',height: 600 }}></ChartCard>
      </div>
    );
  }
}

export default Funnel;
