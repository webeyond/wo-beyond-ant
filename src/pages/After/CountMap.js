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

class CountMap extends Component {
  componentDidMount() {
    var orderscountchart = echarts.init(document.getElementById('ordercountchart'), 'macarons');
    $.ajax({
      type: 'post',
      url: 'http://localhost/statistics/v1/selectSignCustomerCount',
      contentType: 'application/json; charset=utf-8',
      datatype: 'json',
      data: JSON.stringify({}),
    }).then(data => {
      $.get('http://localhost:8000/shanghai.json', function(shhJson) {
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
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <ChartCard id="ordercountchart" style={{ width: '100%', height: 750, marginTop: 20 }} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default CountMap;
