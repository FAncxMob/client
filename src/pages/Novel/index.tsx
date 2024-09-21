import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import React, { useState, useEffect, useMemo } from "react";
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

const { Sider, Content } = Layout;
const API_URL = process.env.REACT_APP_API_URL;
interface DataType {
  title: String;
  ncode: String;
  userid: Number;
  writer: String;
  story: String;
  biggenre: Number;
  genre: Number;
  gensaku: String;
  keyword: String;
  general_firstup: String;
  general_lastup: String;
  novel_type: Number;
  end: Number;
  general_all_no: Number;
  length: Number;
  time: Number;
  isstop: Number;
  isr15: Number;
  isbl: Number;
  isgl: Number;
  iszankoku: Number;
  istensei: Number;
  istenni: Number;
  global_point: Number;
  daily_point: Number;
  weekly_point: Number;
  monthly_point: Number;
  quarter_point: Number;
  yearly_point: Number;
  fav_novel_cnt: Number;
  impression_cnt: Number;
  review_cnt: Number;
  all_point: Number;
  all_hyoka_cnt: Number;
  sasie_cnt: Number;
  kaiwaritu: String;
  novelupdated_at: String;
  updated_at: String;
}

type FieldType = {
  toUserId?: string;
  message?: string;
};

type PaginationPosition = "top" | "bottom" | "both";

type PaginationAlign = "start" | "center" | "end";

const Novel = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [htmlContent, setHtmlContent] = useState("");
  const [novelList, setNovelList] = useState<any>([]);
  const [allcount, setAllcount] = useState(0);
  const [position, setPosition] = useState<PaginationPosition>("both");
  const [align, setAlign] = useState<PaginationAlign>("start");
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const positionOptions = ["top", "bottom", "both"];

  const alignOptions = ["start", "center", "end"];

  const getNovel = async (current?: any) => {
    console.log({ pageSize, current }, "getNovel");
    setCurrentPage(current ?? 1);
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}/api/getNovel?lim=${pageSize}&st=${current || 1}`
      );
      setLoading(false);

      const arr = res.data;
      const allCount = arr[0].allcount;
      setAllcount(allCount);

      arr.splice(0, 1);
      setNovelList(arr);
    } catch (error) {
      console.error("Error fetching :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNovel();
  }, []);

  return (
    <div className="novel">
      <h1>API TEST</h1>
      <Button onClick={getNovel}>检索</Button>
      <div>
        {/* <div>
          <Space
            direction="vertical"
            style={{ marginBottom: "20px" }}
            size="middle"
          >
            <Space>
              <span>Pagination Position:</span>
              <Radio.Group
                optionType="button"
                value={position}
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
              >
                {positionOptions.map((item) => (
                  <Radio.Button key={item} value={item}>
                    {item}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Space>
            <Space>
              <span>Pagination Align:</span>
              <Radio.Group
                optionType="button"
                value={align}
                onChange={(e) => {
                  setAlign(e.target.value);
                }}
              >
                {alignOptions.map((item) => (
                  <Radio.Button key={item} value={item}>
                    {item}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Space>
          </Space>
        </div> */}
      </div>
      <div>
        {/* 固定的分页 */}
        <Pagination
          pageSize={pageSize}
          // showQuickJumper
          current={currentPage}
          total={allcount}
          onChange={(page) => {
            getNovel(page);
          }}
          style={{ textAlign: "center", marginBottom: 16 }}
          onShowSizeChange={(current, size) => {
            setPageSize(size);
            setCurrentPage(current);
          }}
        />
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>
        <List
          loading={loading}
          // bordered
          header={
            <>
              検索結果：　<span style={{ fontWeight: "bold" }}>{allcount}</span>
              作品
            </>
          }
          itemLayout="vertical"
          // pagination={{ position, align }}
          dataSource={novelList}
          renderItem={(item: DataType, index) => (
            <List.Item
              actions={[
                <>
                  <HeartTwoTone twoToneColor="red" /> {"  "}
                  {item.fav_novel_cnt + ""}
                </>,
                <>
                  <HddTwoTone twoToneColor="blue" /> 0{"  "}/ {"  "}
                  {item.general_all_no + ""}話
                </>,
                <>
                  <MessageTwoTone twoToneColor="orange" />
                  {"  "} {item.review_cnt}
                </>,
                <>{item.novelupdated_at}</>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={
                  <>
                    {item.isr15 ? <Tag color="pink">R15</Tag> : null}
                    <a href="https://ant.design"> {item.title}</a>
                  </>
                }
                description={item.story}
              />
              <span>
                {item.keyword.split(" ").length &&
                  item.keyword.split(" ").map((keyword: any) => {
                    return keyword ? <Tag key={keyword}>{keyword}</Tag> : null;
                  })}
              </span>
            </List.Item>
          )}
        />
      </div>
      {/* 渲染 HTML，注意使用 dangerouslySetInnerHTML */}
      {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
    </div>
  );
};

export default Novel;
