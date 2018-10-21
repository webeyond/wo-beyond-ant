import React, {Component} from 'react';
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
import {Col, Row} from "antd";
import { ChartCard } from '@/components/Charts';
import ReactEcharts from 'echarts-for-react';


class Quota extends Component {
  constructor(props) {
    super(props);
  }

  option = {
    backgroundColor: '#ffffff',
    title: {
      text: '东区',
      left: 'center',
      top: 10,
      textStyle: {
        color: '#008acd'
      },
    },
    tooltip : {
      formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        name: '业务指标',
        type: 'gauge',
        detail: {formatter:'{value}%'},
        data: [{value: 50, name: '完成率'}]
      }
    ]
  };

  componentDidMount() {


  }
  render() {
    return (
      <div>
        <Row>
          <Col span={8}><ReactEcharts id="chart1" option={this.option} style={{width:'96%',height:300 }}></ReactEcharts></Col>
          <Col span={8}><ReactEcharts id="chart2" option={this.option} style={{width:'96%',height:300 }}></ReactEcharts></Col>
          <Col span={8}><ReactEcharts id="chart3" option={this.option} style={{width:'96%',height:300 }}></ReactEcharts></Col>
        </Row>
        <Row>
          <Col span={8}><ReactEcharts id="chart4" option={this.option} style={{width:'96%',height:300,marginTop:20 }}></ReactEcharts></Col>
          <Col span={8}><ReactEcharts id="chart5" option={this.option} style={{width:'96%',height:300,marginTop:20 }}></ReactEcharts></Col>
          <Col span={8}><ReactEcharts id="chart6" option={this.option} style={{width:'96%',height:300 ,marginTop:20}}></ReactEcharts></Col>
        </Row>
        <Row>
          <Col span={8}><ReactEcharts id="chart7" option={this.option} style={{width:'96%',height:300,marginTop:20 }}></ReactEcharts></Col>
          <Col span={8}><ReactEcharts id="chart8" option={this.option} style={{width:'96%',height:300,marginTop:20 }}></ReactEcharts></Col>
          <Col span={8}><ReactEcharts id="chart9" option={this.option} style={{width:'96%',height:300,marginTop:20 }}></ReactEcharts></Col>
        </Row>
      </div>
    );
  }
}

export default Quota;
