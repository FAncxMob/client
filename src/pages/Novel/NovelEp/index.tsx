import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import {
  Layout,
  Menu,
  Input,
  Button,
  Space,
  Table,
  Tag,
  Checkbox,
  Form,
  message,
  Select,
  Avatar,
  List,
  Radio,
  Pagination,
  Card,
  Col,
  Row,
  Typography,
} from "antd";
import type { TableProps } from "antd";
import type { FormProps } from "antd";
import { Try } from "@mui/icons-material";
import "./index.css";
import {
  HeartTwoTone,
  ReadOutlined,
  CommentOutlined,
  SettingFilled,
  MessageTwoTone,
  HddTwoTone,
} from "@ant-design/icons";
import { blueGrey } from "@mui/material/colors";
import { buildUrlWithParams } from "../../../utils/utils";
import { load } from "cheerio";
const { Sider, Content } = Layout;
const API_URL = process.env.REACT_APP_API_URL;
const { Title, Paragraph } = Typography;

const NovelEp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ncode = useRef<string | null>(null);
  const [info, setInfo] = useState<any>({});

  // 解析查询参数
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ncodeParam = params.get("ncode");
    ncode.current = ncodeParam;
    getNovelInfo();
  }, [location]);

  const getNovelInfo = async () => {
    const res = await axios.get(
      `${API_URL}/api/getNovelInfo?ncode=${ncode.current?.toLocaleLowerCase()}`
    );

    // 检查返回的内容类型
    if (res.headers["content-type"].includes("text/html")) {
      const result = formatHTML(res.data);
      setInfo(result);
      // console.log(result);
    } else {
      setInfo(res.data);
    }
    // if (res.data) {
    //   message.success(res.data.message);
    // } else {
    //   message.error(res.data.message);
    // }
  };

  const formatHTML = (html: any) => {
    const $ = load(html); // 使用 cheerio 解析 HTML
    // 假设你想提取页面中的标题
    // 提取信息
    const title = $("title").text(); // 小说标题
    const author = $(".p-novel__author a").text().trim(); // 作者
    const description = $("#novel_ex").text().trim(); // 简介
    const chapters: any = [];

    // 获取章节链接和标题
    $(".p-eplist__subtitle").each((i, element) => {
      const chapterTitle = $(element).text().trim();
      const chapterLink = $(element).attr("href");
      chapters.push({ title: chapterTitle, link: chapterLink });
    });

    console.log({
      title,
      author,
      description,
      chapters,
    });

    return {
      title,
      author,
      description,
      chapters,
    };
  };

  return (
    <div className="novel">
      <div style={{ padding: "8px" }}>
        <Title level={3}>{info.title}</Title>
        <Title level={4}>作者: {info.author}</Title>
        <Paragraph>{info.description}</Paragraph>

        <Title level={3}>章节列表</Title>
        <List
          itemLayout="horizontal"
          dataSource={info.chapters}
          renderItem={(chapter: any) => (
            <List.Item
              style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}
            >
              <List.Item.Meta
                title={
                  <a
                    onClick={() => {
                      navigate(
                        `/novelEpDetail?ncode=${ncode.current}&ep=${
                          chapter.link.split("/")[2] ?? 1
                        }`
                      );
                    }}
                  >
                    <span>{chapter.title}</span>
                  </a>
                }
                description={
                  <Typography.Text type="secondary">
                    {chapter.updateDatetime}
                  </Typography.Text>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default NovelEp;
