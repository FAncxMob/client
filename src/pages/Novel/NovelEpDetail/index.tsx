import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
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

const NovelEpDetail = () => {
  const location = useLocation();
  const ncode = useRef<any>(null);
  const ep = useRef<any>(null);
  const [info, setInfo] = useState<any>({
    pArr1: [],
    pArr2: [],
  });

  // 解析查询参数
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const a = params.get("ncode");
    const b = params.get("ep");
    ncode.current = a;
    ep.current = b;
    getNovelInfo();
  }, [location]);

  const getNovelInfo = async () => {
    const res = await axios.get(
      `${API_URL}/api/getNovelEpInfo?ncode=${ncode.current?.toLocaleLowerCase()}&ep=${ep.current?.toLocaleLowerCase()}`
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

    const title = $("title").text(); // 小说标题
    const epTitle = $(".p-novel__title").text().trim();
    const pArr1: any = [];
    const pArr2: any = [];

    $(".p-novel__text--preface p").each((i, element) => {
      const text = $(element).text().trim();
      pArr1.push(text);
      console.log({ i, element, text }, "loopaaa");
      // chapters.push({ title: chapterTitle, link: chapterLink });
    });

    $(".p-novel__text:not(.p-novel__text--preface) p").each((i, element) => {
      const text = $(element).text().trim();
      pArr2.push(text);
      console.log({ i, element, text }, "loopaaa");
      // chapters.push({ title: chapterTitle, link: chapterLink });
    });

    console.log({
      title,
      epTitle,
      pArr1,
      pArr2,
    });

    return {
      title,
      epTitle,
      pArr1,
      pArr2,
    };
  };

  return (
    <div className="novelEpDetail">
      <div style={{ padding: "8px" }}>
        <Title level={3}>{info?.title}</Title>
        <Title level={4}> {info?.epTitle}</Title>
        <div>
          {info.pArr1.map((str: string) => {
            console.log(str, "str");
            return <p>{str}</p>;
          })}
        </div>
        <div>
          {info.pArr2.map((str: string) => {
            console.log(str, "str");
            return <p>{str}</p>;
          })}
        </div>

        {/* <List
          itemLayout="horizontal"
          dataSource={info.chapters}
          renderItem={(chapter: any) => (
            <List.Item
              style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}
            >
              <List.Item.Meta
                title={
                  <a
                    href={chapter.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {chapter.title}
                  </a>
                }
                description={
                  <Typography.Text type="secondary">
                    点击查看详细内容
                  </Typography.Text>
                }
              />
            </List.Item>
          )}
        /> */}
      </div>
    </div>
  );
};

export default NovelEpDetail;
