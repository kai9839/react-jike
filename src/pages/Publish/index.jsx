import { http } from "@/utils";
import {
  Breadcrumb,
  Card,
  Form,
  Input,
  Select,
  Button,
  message,
  Radio,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSearchParams, useNavigate } from "react-router-dom";
const Publish = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  const articleId = searchParams.get("id");
  // 获取频道列表
  const [channels, setChannels] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    async function getArticle() {
      const res = await http.get(`/mp/articles/${articleId}`);
      const { cover, ...formData } = res.data;

      form.setFieldsValue({ ...formData, type: cover.type });

      if (cover.images) {
        setImageType(cover.type);
        setImagesList(cover.images.map((url) => ({ url })));
      }
    }
    if (articleId) {
      getArticle();
    }
  }, [articleId, form]);
  useEffect(() => {
    async function fetchChannels() {
      const res = await http.get("/channels");
      setChannels(res.data.channels);
    }
    fetchChannels();
  }, []);
  const cacheImageList = useRef([]);
  // 封面图片列表
  const [imagesList, setImagesList] = useState([]);
  const onUploadChange = (info) => {
    setImagesList(info.fileList);
    cacheImageList.current = info.fileList;
  };

  // 封面类型
  const [imageType, setImageType] = useState("1");
  const onImageTypeChange = (e) => {
    setImageType(e.target.value);
    if (e.target.value === "1") {
      setImagesList(
        cacheImageList.current[0] ? [cacheImageList.current[0]] : []
      );
    } else {
      setImagesList(cacheImageList.current);
    }
  };
  const formatUrl = (list) => {
    return list.map(item => {
      if (item.response) {
        return item.response.data.url
      } else {
        return item.url
      }
    })
  };
  /**
   * 发布文章时触发的异步函数
   * 该函数负责将用户填写的文章信息提交到服务器，并处理发布成功的反馈
   *
   * @param {Object} FormData - 包含用户填写的文章信息，如标题、频道ID和内容
   */
  const onFinish = async (FormData) => {
    if (imageType !== imagesList.length)
      return message.warning("图片类型和数量不一致");
    const { title, channel_id, content } = FormData;
    const params = {
      title,
      channel_id,
      content,
      cover: {
        type: imageType,
        images: formatUrl(imagesList),
      },
    };
    if (articleId) {
      await http.put(`/mp/articles/${articleId}?draft=false`, params);
    } else {
      await http.post("/mp/articles?draft=false", params);
    }
    message.success(`${articleId ? "编辑" : "发布"}文章成功`);
    navigate("/article");
  };

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: "首页", Link: "/" },
              { title: articleId ? "编辑文章" : "发布文章" },
            ]}
          ></Breadcrumb>
        }
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name={"title"}
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" />
          </Form.Item>
          <Form.Item
            label="频道"
            name={"channel_id"}
            rules={[{ required: true, message: "请选择频道" }]}
          >
            <Select placeholder="请选择频道" style={{ width: 200 }}>
              {channels.map((item) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="内容"
            name={"content"}
            rules={[{ required: true, message: "请输入内容" }]}
          >
            <ReactQuill
              placeholder="请输入内容"
              theme="snow"
              className="publish-quill"
            />
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item
              name={"type"}
              rules={[{ required: true, message: "请选择封面类型" }]}
              onChange={onImageTypeChange}
            >
              <Radio.Group>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="publish-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                onChange={onUploadChange}
                maxCount={imageType}
                multiple={imageType > 1}
                fileList={imagesList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button size="large" type="primary" htmlType="submit">
              {articleId ? "编辑文章" : "发布文章"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Publish;
