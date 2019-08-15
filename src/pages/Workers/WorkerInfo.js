import React from 'react';
import { Table, Popconfirm, message, Icon, Modal, Form, Input, Button, Pagination } from 'antd';
import $ from 'jquery';
import apiRequest from '../../../public/js/apiRequest.js';
import apiManager from '../../../public/js/apiManager.js';

const FormItem = Form.Item;

const CreateForm = Form.create()(props => {
  const { modalVisible, onAdd, onShowModal, formValues, form } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      onAdd(fieldsValue);
    });
  };

  return (
    <Modal
      title="添加地推人员信息表"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onShowModal(false)}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
        {form.getFieldDecorator('operatorid', {
          initialValue: formValues.operatorid,
        })(<Input type="hidden" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
        {form.getFieldDecorator('operatorname', {
          rules: [{ required: true, message: '请输入姓名' }],
          initialValue: formValues.operatorname,
        })(<Input placeholder="请输入姓名" />)}
      </FormItem>

      {/*<FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="营销网格">*/}
      {/*{form.getFieldDecorator('department', {*/}
      {/*initialValue: formValues.department,*/}
      {/*})(<Input placeholder="请输入营销网格"/>)}*/}
      {/*</FormItem>*/}

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('passwd', {
          rules: [{ required: true, message: '请输入密码' }],
          initialValue: formValues.passwd,
        })(<Input placeholder="请输入密码" />)}
      </FormItem>
    </Modal>
  );
});

// 第一步
export default class StudentTable extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.namespace);
    this.state = {
      itemList: [],
      loading: false,
      total: 0,
      page: 1,
      modalVisible: false,
      edtIndex: -1,
    };
  }

  // 5 控制模态对话框的显示和因此
  onShowModal = (flag, index = -1) => {
    // console.log(flag,index);
    this.setState({
      modalVisible: flag,
      edtIndex: index,
    });
  };

  // 7 添加
  onAdd = fields => {
    console.log(fields);
    let url = apiRequest.getInterfaceHost();

    if (this.state.edtIndex === -1) url += apiManager.insertAccount;
    else url += apiManager.updateAccount;
    this.setState({ loading: true });
    $.ajax({
      type: 'post',
      url: url,
      contentType: 'application/json; charset=utf-8',
      datatype: 'json',
      data: JSON.stringify(fields),
    }).then(data => {
      if (data.result == 1) {
        this.refreshList();
        /* const { itemList, edtIndex } = this.state;
         console.log(itemList);
         let dataSource = [];
         if (edtIndex == -1) {
           dataSource = [fields, ...itemList];
         } else {
           itemList[edtIndex] = fields;
           dataSource = [...itemList];
         }*/
        this.setState({
          modalVisible: false,
          loading: false,
        });

        message.success('操作成功');
      } else {
        message.error('操作失败，请重试。');
      }
    });
  };

  // 4 删除
  onDelete = index => {
    console.log(index);
    const operatorid = this.state.itemList[index].operatorid;
    console.log(this.state.itemList[index]);

    $.ajax({
      type: 'post',
      url: apiRequest.getUrl(apiManager.deleteAccount),
      contentType: 'application/json; charset=utf-8',
      datatype: 'json',
      data: JSON.stringify({ operatorid }),
    }).then(data => {
      if (data.result == 1) {
        console.log("成功删除" + operatorid);
/*        const dataSource = [...this.state.itemList];
        dataSource.splice(index, 1); //splice从index行删除，1代表删除几行
        this.setState({
          itemList: dataSource,
        });*/
        this.refreshList();
        message.success(data.msg);
      } else {
        message.error(data.msg);
      }
    });
  };

  onLoad() {
    const _this = this;
    this.setState({ loading: true });
    console.log(apiManager.findAccountList);
    apiRequest.postAsyncUrlData(apiManager.findAccountList+'?page=1&pageSize=10', {}, function(data) {
      console.log(data.result);
      if (data.result == 1) {
        console.log(data.rows);
        _this.setState({
          loading: false,
          itemList: data.rows,
          total: data.total,
        });
        console.log(data.msg);
      } else {
        console.log(data.msg);
      }
    });
  }

  componentDidMount() {
    this.onLoad();
  }

  //分页点击事件
  getPages = (page, pageSize) => {
    console.log("分页查询开始..."+page+pageSize);
    this.setState({
      loading: true,
      page: page,
    });
    $.ajax({
      url: apiRequest.getUrl(apiManager.findAccountList)+'?page=' + page + '&pageSize=' + pageSize,
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      datatype: 'json',
      data: JSON.stringify({}),
    }).then(data => {
      this.setState({
        itemList: data.rows,
        total: data.total,
        loading: false,
      });
    });
  };

  /*刷新列表*/
  refreshList() {
    console.log("开始刷新列表...");
    $.ajax({
      url: apiRequest.getUrl(apiManager.findAccountList)+'?page=' + this.state.page + '&pageSize=10',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      datatype: 'json',
      data: JSON.stringify({}),
    }).then(data => {
      this.setState({
        itemList: data.rows,
        total: data.total,
        loading: false,
      });
      console.log("列表刷新成功...");
    });  }

  render() {
    const dataSource = this.state.itemList;

    const columns = [
      {
        title: '编号',
        dataIndex: 'operatorid',
        key: 'operatorid',
      },
      {
        title: '姓名',
        dataIndex: 'operatorname',
        key: 'operatorname',
      },
      {
        title: '营销网格',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'operation',
        width: '20%',
        render: (text, record, index) => (
          <span>
            <a title="用户编辑" className="mgl10" onClick={() => this.onShowModal(true, index)}>
              <Icon type="edit" />
              编辑&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
            <Popconfirm title="确定要删除吗?" onConfirm={() => this.onDelete(index)}>
              <a title="用户删除" className="mgl10">
                <Icon type="delete" />
                删除
              </a>
            </Popconfirm>
          </span>
        ),
      },
    ];

    const { itemList, edtIndex, modalVisible } = this.state;

    return (
      <div>
        <Button icon="plus" type="primary" onClick={() => this.onShowModal(true)}>
          新建
        </Button>
        <CreateForm
          modalVisible={modalVisible}
          onShowModal={this.onShowModal}
          onAdd={this.onAdd}
          formValues={edtIndex !== -1 ? itemList[edtIndex] : {}}
        />
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
