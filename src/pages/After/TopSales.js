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
import 'echarts/theme/macarons';

import $ from 'jquery';
//引入常量URL
import apiRequest from '../../../public/js/apiRequest.js';
import apiManager from '../../../public/js/apiManager.js';

class TopSales extends Component {
  componentDidMount() {
    var topcard = echarts.init(document.getElementById('topcard'), 'macarons');
    $.ajax({
      type: 'post',
      url: apiRequest.getUrl(apiManager.selectProdTopFive),
      contentType: 'application/json; charset=utf-8',
      datatype: 'json',
      data: JSON.stringify({}),
    }).then(data => {
      var topcardoption = {
        backgroundColor: '#ffffff',

        title: {
          text: '最热套餐TOP5',
          left: 'right',
          top: 10,
          textStyle: {
            color: '#008acd',
          },
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },

        toolbox: {
          show: true,
          //orient: 'vertical',
          left: 'left',
          top: 'top',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        visualMap: {
          show: false,
          min: 100,
          max: 700,
          inRange: {
            colorLightness: [0.2, 1],
          },
        },
        series: [
          {
            name: '套餐名',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: data.list.sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(0, 0, 0, 0.5)',
                },
                smooth: 0.2,
                length: 10,
                length2: 20,
              },
            },
            itemStyle: {
              normal: {
                color: '#ffecec',
                shadowBlur: 50,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
              return Math.random() * 200;
            },
          },
        ],
      };
      topcard.setOption(topcardoption);
    });
    var topnum = echarts.init(document.getElementById('topnum'), 'macarons');
    $.ajax({
      type: 'post',
      url: apiRequest.getUrl(apiManager.selectSerialHeatAnalysis),
      contentType: 'application/json; charset=utf-8',
      datatype: 'json',
      data: JSON.stringify({}),
    }).then(data => {
      var name = [];
      var districtArray = [];
      var countsArray = [];
      data.list.forEach(function(item, index) {
        name.push(item.name);
        districtArray.push(item.districtArray);
        countsArray.push(item.countsArray);
      });

      var topnumoption = {
        backgroundColor: '#ffffff',

        title: {
          text: '靓号热度分析',
          left: 'right',
          top: 10,
          textStyle: {
            color: '#008acd',
          },
        },
        angleAxis: {
          top: 20,
          type: 'category',
          data: districtArray[0],
          z: 10,
          color: '#6c6c6c',
        },
        radiusAxis: {},
        polar: {},
        series: [
          {
            type: 'bar',
            data: countsArray[0],
            coordinateSystem: 'polar',
            name: name[0],
            stack: 'a',
            color: '#ce0000',
          },
          {
            type: 'bar',
            data: countsArray[1],
            coordinateSystem: 'polar',
            name: name[1],
            stack: 'a',
            color: '#ff0000',
          },
          {
            type: 'bar',
            data: countsArray[2],
            coordinateSystem: 'polar',
            name: name[2],
            stack: 'a',
            color: '#ff7575',
          },
          {
            type: 'bar',
            data: countsArray[3],
            coordinateSystem: 'polar',
            name: name[3],
            stack: 'a',
            color: '#ffd2d2',
          },
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/>{a} : {c}张',
        },
        toolbox: {
          show: true,
          //orient: 'vertical',
          left: 'left',
          top: 'top',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        legend: [
          {
            top: 20,
            left: 10,
            show: true,
            data: ['A', 'B'],
          },
          {
            top: 40,
            left: 10,
            show: true,
            data: ['C', 'D'],
          },
        ],
      };
      topnum.setOption(topnumoption);
    });
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <ChartCard id="topnum" style={{ width: '95%', height: 550 }} />
          </Col>
          <Col span={12}>
            <ChartCard id="topcard" style={{ width: '95%', height: 550 }} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default TopSales;
