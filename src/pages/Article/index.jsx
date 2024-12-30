import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Radio,
  Select,
  Space,
  Table,
  Tag,
  Popconfirm,
  message,
  Image
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/imgs/error.png";
import request from "@/utils/request";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Article = () => {

  const navigator = useNavigate();

  const [channels, setChannels] = useState([]);
  const [article, setArticle] = useState({
    results: [],
    total_count: 0,
    page: 1,
    per_page: 10,
  });

  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
    begin_pubdate: null,
    end_pubdate: null,
    status: null,
    channel_id: null,
  });

  const statusTagConfig = [
    {
      text: "草稿",
      color: "blue",
      value: 0,
    },
    {
      text: "待审核",
      color: "orange",
      value: 1,
    },
    {
      text: "审核通过",
      color: "green",
      value: 2,
    },
    {
      text: "审核失败",
      color: "red",
      value: 3,
    },
  ];

  const delArticle = async (data) => {
    await request({
      url: `/mp/articles/${data.id}`,
      method: "DELETE",
    });
    message.success("删除成功");
    setParams({
      ...params,
      page: 1,
    });
  };

  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <Image src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 200,
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 100,
      render: (status) => {
        return (
          <Tag color={statusTagConfig[status].color}>
            {statusTagConfig[status].text}
          </Tag>
        );
      },
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
      width: 200,
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
      width: 80,
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
      width: 80,
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
      width: 80,
    },
    {
      title: "操作",
      render: data => (
        <Space>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {navigator(`/publish/?id=${data.id}`)}}
          ></Button>
          <Popconfirm
            title="确认删除该条文章吗?"
            onConfirm={() => delArticle(data)}
            okText="确认"
            cancelText="取消"
          >
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const getArticleList = async () => {
      const res = await request({
        url: "/mp/articles",
        method: "GET",
        params: params,
      });
      setArticle(res.data);
    };
    getArticleList();
  }, [params]);

  useEffect(() => {
    const getChannels = async () => {
      const res = await request({
        url: "/channels",
      });
      setChannels(res.data.channels);
    };
    getChannels();
  }, []);

  const onFinish = (values) => {
    const reqData = {
      ...params,
      ...values,
    };
    if (values.date) {
      reqData.begin_pubdate = values.date[0].format("YYYY-MM-DD");
      reqData.end_pubdate = values.date[1].format("YYYY-MM-DD");
    }
    setParams(reqData);
  };

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: "首页", Link: "/" },
              { title: "文章列表", Link: "/article" },
            ]}
          ></Breadcrumb>
        }
      >
        <Form initialValues={{ status: "" }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value="">全部</Radio>
              <Radio value="0">草稿</Radio>
              <Radio value="1">待审核</Radio>
              <Radio value="2">审核通过</Radio>
              <Radio value="3">审核失败</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select allowClear placeholder="请选择频道" style={{ width: 200 }}>
              {channels.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="date">
            <DatePicker.RangePicker style={{ width: 300 }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
            查询
          </Button>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${article.total_count} 条结果：`}>
        <Table
          columns={columns}
          dataSource={article.results}
          pagination={{
            pageSize: article.per_page,
            total: article.total_count,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total, range) => `共 ${total} 条记录`,
            onChange: (page, pageSize) => {
              setParams({
                ...params,
                page: page,
                per_page: pageSize,
              });
            },
          }}
          rowKey="id"
        />
      </Card>
    </div>
  );
};
export default Article;
