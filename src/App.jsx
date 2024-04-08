import React, { useMemo } from "react";
import {
  Col,
  Form,
  Row,
  Select,
  List,
  Button,
  message,
  Space,
  Input,
} from "antd";
import "./App.css";
import arr from "./text";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { includesIgnoreCase, highlightKeyword } from "./util";

const App = () => {
  const [value, setValue] = useState("");

  const leftList = useMemo(() => {
    if (!value) return arr;
    return arr.filter((item) => {
      return (
        includesIgnoreCase(item.title, value) ||
        includesIgnoreCase(item.content, value)
      );
    });
  }, [value]);

  //复制
  const onCopy = (content) => {
    copy(content, { format: "text/plain" });
    message.success("复制成功");
  };
  return (
    <div className="box">
      <div className="left">
        <List
          style={{ overflow: "auto" }}
          bordered
          dataSource={leftList}
          renderItem={(item) => (
            <List.Item>
              <a href={`#${item.title}`}>{item.title}</a>
            </List.Item>
          )}
        />
      </div>
      <div className="right">
        <Row gutter={200}>
          <Col span={12}>
            <Form.Item label="标题/内容">
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                allowClear
              />
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item label="内容" name="username">
              <Select value={content} onChange={setContent} allowClear />
            </Form.Item>
          </Col> */}
        </Row>

        <List
          style={{ height: "calc( 100% - 56px )", overflow: "auto" }}
          bordered
          dataSource={arr}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Space>
                    <span
                      id={item.title}
                      dangerouslySetInnerHTML={{
                        __html: highlightKeyword(item.title, value),
                      }}
                    ></span>
                    <Button
                      onClick={() => onCopy(item.title + "\r" + item.content)}
                      type="primary"
                      size="small"
                    >
                      复制
                    </Button>
                  </Space>
                }
                description={
                  <div
                    style={{ whiteSpace: "pre-line", color: "black" }}
                    dangerouslySetInnerHTML={{
                      __html: highlightKeyword(item.content, value),
                    }}
                  ></div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default App;
