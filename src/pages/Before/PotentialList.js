import React, { PureComponent } from 'react';
import { Table, Pagination } from 'antd';
import $ from 'jquery';
import 'whatwg-fetch';
//引入常量URL
import apiRequest from '../../../public/js/apiRequest.js';
import apiManager from '../../../public/js/apiManager.js';

class PotentialList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      loading: false,
      total: 0,
      page: 1,
      param: props.location.query.a,
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    $.ajax({
      type: 'post',
      url: apiRequest.getUrl(apiManager.selectOrderList)+'?page=1&pageSize=10',
      contentType: 'application/json; charset=utf-8',
      datatype: 'json',
      data: JSON.stringify({ payFlag: 0 }),
    }).then(data => {
      this.setState({
        loading: false,
        itemList: data.rows,
        total: data.total,
      });
    });
  }

  //分页点击事件
  getPages = (page, pageSize) => {
    this.setState({
      loading: true,
      page: page,
    });
    $.ajax({
      url: apiRequest.getUrl(apiManager.selectOrderList)+'?page=' + page + '&pageSize=' + pageSize,
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      datatype: 'json',
      data: JSON.stringify({ payFlag: 0 }),
    }).then(data => {
      this.setState({
        itemList: data.rows,
        total: data.total,
        loading: false,
      });
    });
  };

  render() {
    const dataSource = this.state.itemList;

    const columns = [
      {
        title: '专员姓名',
        dataIndex: 'operatorname',
        key: 'operatorname',
      },
      {
        title: '客户姓名',
        dataIndex: 'customername',
        key: 'customername',
      },
      {
        title: '已选号码',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
      },
      {
        title: '套餐',
        dataIndex: 'prodName',
        key: 'prodName',
      },
      {
        title: '订单时间',
        dataIndex: 'busiOrderDate',
        key: 'busiOrderDate',
      },
      {
        title: '省',
        dataIndex: 'province',
        key: 'province',
      },
      {
        title: '市',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: '区',
        dataIndex: 'district',
        key: 'district',
      },
      {
        title: '订单状态',
        dataIndex: 'payFlagName',
        key: 'payFlagName',
      },
    ];
    return (
      <div style={{ backgroundColor: 'white' }}>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="busiCellno"
          pagination={false}
          bordered={false}
          loading={this.state.loading}
        />
        <Pagination
          defaultCurrent={1}
          total={this.state.total}
          onChange={this.getPages}
          style={{ marginTop: '20px', float: 'right' }}
        />
      </div>
    );
  }
}

export default PotentialList;
