import React, { Component } from 'react';
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
import { Col, Row } from 'antd';
import { ChartCard } from '@/components/Charts';
import ReactEcharts from 'echarts-for-react';

class Quota extends Component {
  option1 = {
    backgroundColor: '#ffffff',
    title: {
      text: '东区',
      left: 'center',
      top: 10,
      textStyle: {
        color: '#008acd',
      },
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: '业务指标',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: 90, name: '完成率' }],
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: [[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']],
          },
        },
      },
    ],
  };
  option2 = {
    backgroundColor: '#ffffff',
    title: {
      text: '南区',
      left: 'center',
      top: 10,
      textStyle: {
        color: '#008acd',
      },
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: '业务指标',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: 15, name: '完成率' }],
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: [[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']],
          },
        },
      },
    ],
  };
  option3 = {
    backgroundColor: '#ffffff',
    title: {
      text: '西区',
      left: 'center',
      top: 10,
      textStyle: {
        color: '#008acd',
      },
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: '业务指标',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: 60, name: '完成率' }],
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: [[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']],
          },
        },
      },
    ],
  };
  option4 = {
    backgroundColor: '#ffffff',
    title: {
      text: '北区',
      left: 'center',
      top: 10,
      textStyle: {
        color: '#008acd',
      },
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: '业务指标',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: 63, name: '完成率' }],
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: [[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']],
          },
        },
      },
    ],
  };
  option5 = {
    backgroundColor: '#ffffff',
    title: {
      text: '闵行',
      left: 'center',
      top: 10,
      textStyle: {
        color: '#008acd',
      },
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: '业务指标',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: 83, name: '完成率' }],
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: [[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']],
          },
        },
      },
    ],
  };
  option6 = {
    backgroundColor: '#ffffff',
    title: {
      text: '宝山',
      left: 'center',
      top: 10,
      textStyle: {
        color: '#008acd',
      },
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: '业务指标',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: 60, name: '完成率' }],
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: [[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']],
          },
        },
      },
    ],
  };
  option7 = {
    backgroundColor: '#ffffff',
    title: {
      text: '嘉定',
      left: 'center',
      top: 10,
      textStyle: {
        color: '#008acd',
      },
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: '业务指标',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: 12, name: '完成率' }],
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: [[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']],
          },
        },
      },
    ],
  };
  option8 = {
    backgroundColor: '#ffffff',
    title: {
      text: '金山',
      left: 'center',
      top: 10,
      textStyle: {
        color: '#008acd',
      },
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: '业务指标',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: 8, name: '完成率' }],
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: [[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']],
          },
        },
      },
    ],
  };
  option9 = {
    backgroundColor: '#ffffff',
    title: {
      text: '松江',
      left: 'center',
      top: 10,
      textStyle: {
        color: '#008acd',
      },
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: '业务指标',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: 85, name: '完成率' }],
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: [[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']],
          },
        },
      },
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [
        this.option1,
        this.option2,
        this.option3,
        this.option4,
        this.option5,
        this.option6,
        this.option7,
        this.option8,
        this.option9,
      ],
    };
  }

  componentDidMount() {}
  render() {
    return (
      <div>
        <Row>
          <Col span={8}>
            <ReactEcharts
              id="chart1"
              option={this.state.data[0]}
              style={{ width: '96%', height: 300 }}
            />
          </Col>
          <Col span={8}>
            <ReactEcharts
              id="chart2"
              option={this.state.data[1]}
              style={{ width: '96%', height: 300 }}
            />
          </Col>
          <Col span={8}>
            <ReactEcharts
              id="chart3"
              option={this.state.data[2]}
              style={{ width: '96%', height: 300 }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <ReactEcharts
              id="chart4"
              option={this.state.data[3]}
              style={{ width: '96%', height: 300, marginTop: 20 }}
            />
          </Col>
          <Col span={8}>
            <ReactEcharts
              id="chart5"
              option={this.state.data[4]}
              style={{ width: '96%', height: 300, marginTop: 20 }}
            />
          </Col>
          <Col span={8}>
            <ReactEcharts
              id="chart6"
              option={this.state.data[5]}
              style={{ width: '96%', height: 300, marginTop: 20 }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <ReactEcharts
              id="chart7"
              option={this.state.data[6]}
              style={{ width: '96%', height: 300, marginTop: 20 }}
            />
          </Col>
          <Col span={8}>
            <ReactEcharts
              id="chart8"
              option={this.state.data[7]}
              style={{ width: '96%', height: 300, marginTop: 20 }}
            />
          </Col>
          <Col span={8}>
            <ReactEcharts
              id="chart9"
              option={this.state.data[8]}
              style={{ width: '96%', height: 300, marginTop: 20 }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Quota;
