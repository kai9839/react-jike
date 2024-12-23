import { message as antdMessage } from "antd";

// 全局配置message
antdMessage.config({
  top: 10,
  duration: 2,
  maxCount: 3,
});

// 创建一个自定义的showMessage对象，包含不同的消息类型
const showMessage = {
  info: (content, duration, onClose) =>
    antdMessage.info({ content, duration, onClose }),
  success: (content, duration, onClose) =>
    antdMessage.success({ content, duration, onClose }),
  error: (content, duration, onClose) =>
    antdMessage.error({ content, duration, onClose }),
  warning: (content, duration, onClose) =>
    antdMessage.warning({ content, duration, onClose }),
  loading: (content, duration, onClose) =>
    antdMessage.loading({ content, duration, onClose }),
};

// 导出自定义的showMessage对象
window.showMessage = showMessage;
