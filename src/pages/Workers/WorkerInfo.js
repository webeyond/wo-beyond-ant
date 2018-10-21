import React, { PureComponent } from 'react';
import WorkersInfoTableForm from "./WorkersInfoTableForm";
import {Card, Form, Select} from 'antd';
import { connect } from 'dva';

const tableData = [
  {
    key: '1',
    operatorid: '00001',
    operatorname: '王乾',
    province:'上海',
    department: '信息化部管理应用研发中心',
    channel:'华盛',
  },
  {
    key: '2',
    operatorid: '00002',
    operatorname: '黄中黄',
    province:'上海',
    department: '信息化部管理应用研发中心',
    channel:'华盛',
  },
  {
    key: '3',
    operatorid: '00003',
    operatorname: '赵洁',
    province:'上海',
    department: '信息化部管理应用研发中心',
    channel:'华盛',
  },
];

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitAdvancedForm'],
}))
@Form.create()
class WorkerInfo extends PureComponent {
  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;

    return (
      <Card title="地推专员信息管理" bordered={false}>
        {getFieldDecorator('members', {
          initialValue: tableData,
        })(<WorkersInfoTableForm />)}
      </Card>
    );
  }
}

export default WorkerInfo;
