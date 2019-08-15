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

import styles from './Analysis.less';
import $ from 'jquery';
import { connect } from 'dva';
//引入常量URL
import apiRequest from '../../../public/js/apiRequest.js';
import apiManager from '../../../public/js/apiManager.js';

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderscount: [],
    };
  }

  componentDidMount() {
    //获取分区销售量【中间左侧】
    var orderscountchart = echarts.init(document.getElementById('ordercountchart'), 'macarons');
    apiRequest.postAsyncUrlData(apiManager.selectSignCustomerCount, {}, function(data) {
      $.get(apiRequest.getHost()+ '/shanghai.json', function(shhJson) {
        orderscountchart.hideLoading();
        echarts.registerMap('shanghai', shhJson);
        var orderscountoption = {
          title: {
            text: '分区销售量',
            subtext: '上海市各区销售量',
            left: 'right',
          },
          tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function(params) {
              var value = (params.value + '').split('.');
              value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
              return params.seriesName + '<br/>' + params.name + ': ' + value;
            },
          },
          visualMap: {
            left: 'right',
            min: 0,
            max: 300,
            inRange: {
              color: [
                '#ffecec',
                '#ffd2d2',
                '#ffb5b5',
                '#ff9797',
                '#ff7575',
                '#ff5151',
                '#ff2d2d',
                '#ff0000',
                '#ea0000',
                '#ce0000',
                '#ae0000',
              ],
            },
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
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
          series: [
            {
              name: '销售量',
              type: 'map',
              roam: true,
              map: 'shanghai',
              itemStyle: {
                emphasis: { label: { show: true } },
              },

              data: data.list,
              //自定义名称映射
              nameMap: {
                黄浦区: '南区',
                徐汇区: '南区',
                长宁区: '西区',
                静安区: '北区',
                普陀区: '西区',
                虹口区: '北区',
                杨浦区: '北区',
                闸北区: '北区',
                浦东新区: '东区',
                闵行区: '闵行',
                宝山区: '宝山',
                嘉定区: '嘉定',
                金山区: '金山',
                松江区: '松江',
                青浦区: '青浦',
                奉贤区: '奉贤',
                崇明区: '崇明',
                南汇区: '东区',
              },
            },
          ],
        };
        orderscountchart.setOption(orderscountoption);
      });
    });

    //获取销售TOP5[中间右侧]
    var topfive = echarts.init(document.getElementById('topfive'), 'macarons');
    apiRequest.postAsyncUrlData(apiManager.selectAccountTopFive, {}, function(data) {
      var names = [];
      var sales = [];
      var photos = [];
      data.list.forEach(function(item, index) {
        names.push(item.operatorname);
        sales.push(item.counts);
        photos.push(item.pic);
      });

      var topfiveoption = {
        title: {
          text: '销售TOP5',
          subtext: '上海市地推专员销售量TOP5',
          left: 'right',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
          formatter: function(params) {
            return params[0].name + ': ' + params[0].value;
          },
        },
        xAxis: {
          data: names,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            textStyle: {
              color: '#e54035',
            },
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false },
        },
        color: ['#e54035'],
        series: [
          {
            name: 'hill',
            type: 'pictorialBar',
            barCategoryGap: '-100%',
            // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            itemStyle: {
              normal: {
                opacity: 0.5,
              },
              emphasis: {
                opacity: 1,
              },
            },
            data: sales,
            z: 5,
          },
          {
            name: 'glyph',
            type: 'pictorialBar',
            barGap: '-100%',
            symbolPosition: 'end',
            symbolSize: 50,
            symbolOffset: [0, '-100%'],
            data: [
              {
                value: sales[0],
                symbol: photos[0],
                symbolSize: [40, 58],
              },
              {
                value: sales[1],
                symbol: photos[1],
                symbolSize: [40, 58],
              },
              {
                value: sales[2],
                symbol: photos[2],
                symbolSize: [40, 58],
              },
              {
                value: sales[3],
                symbol: photos[3],
                symbolSize: [40, 58],
              },
              {
                value: sales[4],
                symbol: photos[4],
                symbolSize: [40, 58],
              },
            ],
          },
        ],
      };
      topfive.setOption(topfiveoption);
    });

    //获取各区签约数量【最上面折线图】
    var areatime = echarts.init(document.getElementById('areatime'), 'macarons');
    apiRequest.postAsyncUrlData(apiManager.selectDistrictSignCount, {}, function(data) {
      var names = [];
      var values = [];

      data.list.forEach(function(item, index) {
        names.push(item.name);
        values.push(item.value);
      });

      var areatimeoption = {
        title: {
          text: '各区签约数量',
          subtext: '上海市各区成功签约数量',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: [
          {
            data: names.slice(0, 5),
          },
          {
            top: '20',
            data: names.slice(5, 10),
          },
        ],
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月'],
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} 张',
          },
        },
        series: [
          {
            name: names[0],
            type: 'line',
            data: values[0],
            markPoint: {
              data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
          {
            name: names[1],
            type: 'line',
            data: values[1],
            markPoint: {
              data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
          {
            name: names[2],
            type: 'line',
            data: values[2],
            markPoint: {
              data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
          {
            name: names[3],
            type: 'line',
            data: values[3],
            markPoint: {
              data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
          {
            name: names[4],
            type: 'line',
            data: values[4],
            markPoint: {
              data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
          {
            name: names[5],
            type: 'line',
            data: values[5],
            markPoint: {
              data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
          {
            name: names[6],
            type: 'line',
            data: values[6],
            markPoint: {
              data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
          {
            name: names[7],
            type: 'line',
            data: values[7],
            markPoint: {
              data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
          {
            name: names[8],
            type: 'line',
            data: values[8],
            markPoint: {
              data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
          {
            name: names[9],
            type: 'line',
            data: values[9],
            markPoint: {
              data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
        ],
      };
      areatime.setOption(areatimeoption);
    });

    //最热套餐TOP5【右下角】
    var topcard = echarts.init(document.getElementById('topcard'), 'macarons');
    apiRequest.postAsyncUrlData(apiManager.selectProdTopFive, {}, function(data) {
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

    /* $.ajax({
       type: 'post',
       url: 'http://localhost/statistics/v1/selectProdTopFive',
       contentType: 'application/json; charset=utf-8',
       datatype: 'json',
       data: JSON.stringify({}),
     }).then(data => {

     });*/

    //靓号热度分析[左下角]
    var topnum = echarts.init(document.getElementById('topnum'), 'macarons');
    apiRequest.postAsyncUrlData(apiManager.selectSerialHeatAnalysis, {}, function(data) {
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
    /*$.ajax({
      type: 'post',
      url: 'http://localhost/statistics/v1/selectSerialHeatAnalysis',
      contentType: 'application/json; charset=utf-8',
      datatype: 'json',
      data: JSON.stringify({}),
    }).then(data => {

    });*/
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <ChartCard id="areatime" style={{ width: '97.5%', height: 400 }} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <ChartCard id="ordercountchart" style={{ width: '95%', height: 400, marginTop: 20 }} />
          </Col>
          <Col span={12}>
            <ChartCard id="topfive" style={{ width: '95%', height: 400, marginTop: 20 }} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <ChartCard id="topnum" style={{ width: '95%', height: 400, marginTop: 20 }} />
          </Col>
          <Col span={12}>
            <ChartCard id="topcard" style={{ width: '95%', height: 400, marginTop: 20 }} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Analysis;
