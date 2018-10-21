import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider, Cascader } from 'antd';
import isEqual from 'lodash/isEqual';
import styles from './style.less';

const options = [
  {
    code: '上海市',
    name: '上海市',
    items: [
      {
        code: '上海市',
        name: '上海市',
        items: [
          {
            code: '上海东区',
            name: '上海东区',
          },{
            code: '闵行',
            name: '闵行',
          },{
            code: '西区',
            name: '西区',
          },{
            code: '北区',
            name: '北区',
          },{
            code: '南区',
            name: '南区',
          },{
            code: '嘉定',
            name: '嘉定',
          },{
            code: '宝山',
            name: '宝山',
          },{
            code: '松江',
            name: '松江',
          },{
            code: '奉贤',
            name: '奉贤',
          },{
            code: '青浦',
            name: '青浦',
          },{
            code: '闵行区',
            name: '闵行区',
          },
        ],
      },
    ],
  }
];

class WorkersInfoTableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value,
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  newMember = () => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      workId: '',
      name: '',
      department: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  remove(key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.setState({ data: newData });
    onChange(newData);
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (
        !target.operatorid ||
        !target.operatorname ||
        !target.add ||
        !target.department ||
        !target.channel
      ) {
        message.error('请填写完整成员信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      const { data } = this.state;
      const { onChange } = this.props;
      onChange(data);
      this.setState({
        loading: false,
      });
    }, 500);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      delete this.cacheOriginData[key];
    }
    target.editable = false;
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'operatorid',
        key: 'operatorid',
        width: '10%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'operatorid', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="ID"
              />
            );
          }
          return text;
        },
      },
      {
        title: '专员姓名',
        dataIndex: 'operatorname',
        key: 'operatorname',
        width: '10%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'operatorname', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="专员姓名"
              />
            );
          }
          return text;
        },
      },
      {
        title: '地址',
        dataIndex: 'add',
        key: 'add',
        width: '25%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Cascader
                style={{ width: 200 }}
                fieldNames={{ label: 'name', value: 'code', children: 'items' }}
                options={options}
                placeholder="请选择"
              />
            );
          }
          return text;
        },
      },
      {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
        width: '25%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'department', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="部门"
              />
            );
          }
          return text;
        },
      },
      {
        title: '渠道名称',
        dataIndex: 'channel',
        key: 'channel',
        width: '15%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'channel', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="渠道名称"
              />
            );
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
        width: '10%',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const { loading, data } = this.state;

    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增成员
        </Button>
      </Fragment>
    );
  }
}

export default WorkersInfoTableForm;
