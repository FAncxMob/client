import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

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
import { buildUrlWithParams } from "../../utils/utils";
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
  const navigate = useNavigate();
  const location = useLocation();
  const [word, setWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [htmlContent, setHtmlContent] = useState("");
  const [novelList, setNovelList] = useState<any>([]);
  const [allcount, setAllcount] = useState(0);
  const [position, setPosition] = useState<PaginationPosition>("both");
  const [align, setAlign] = useState<PaginationAlign>("start");
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(200);
  const [order, setOrder] = useState("hyoka");

  const currentPath = location.pathname; // 获取当前路径
  const positionOptions = ["top", "bottom", "both"];

  const alignOptions = ["start", "center", "end"];

  const getNovel = async (current?: any) => {
    console.log({ pageSize, current }, "getNovel");
    setCurrentPage(current ?? 1);
    try {
      setLoading(true);

      // 示例对象
      const params = {
        lim: pageSize,
        st: current || 1,
        out: "json",
        order,
        word,
      };

      // 调用函数拼接
      const url = buildUrlWithParams(`${API_URL}/api/getNovel`, params);
      // const url = buildUrlWithParams("https://api.syosetu.com/novelapi/api/", {
      //   headers: {
      //     "User-Agent":
      //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
      //   },
      // });

      const res = await axios.get(url);
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
      <Select
        value={order}
        style={{ width: 400 }}
        onChange={(value) => {
          setOrder(value);
        }}
        options={[
          { value: "new", label: "新着更新順" },
          { value: "favnovelcnt", label: "ブックマーク数の多い順" },
          { value: "reviewcnt", label: "レビュー数の多い順" },
          { value: "hyoka", label: "総合ポイントの高い順" },
          { value: "hyokaasc", label: "総合ポイントの低い順" },
          { value: "dailypoint", label: "日間ポイントの高い順" },
          { value: "weeklypoint", label: "週間ポイントの高い順" },
          { value: "monthlypoint", label: "月間ポイントの高い順" },
          { value: "quarterpoint", label: "四半期ポイントの高い順" },
          { value: "yearlypoint", label: "年間ポイントの高い順" },
          { value: "impressioncnt", label: "感想の多い順" },
          { value: "hyokacnt", label: "評価者数の多い順" },
          { value: "hyokacntasc", label: "評価者数の少ない順" },
          { value: "weekly", label: "週間ユニークユーザの多い順" },
          { value: "lengthdesc", label: "作品本文の文字数が多い順" },
          { value: "lengthasc", label: "作品本文の文字数が少ない順" },
          { value: "ncodedesc", label: "新着投稿順" },
          { value: "old", label: "更新が古い順" },
        ]}
      />
      <Input
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Basic usage"
      />

      <Button style={{ width: 80 }} type="primary" onClick={getNovel}>
        检索
      </Button>
      <div></div>
      <div>
        {/* 固定的分页 */}
        <Pagination
          pageSize={pageSize}
          current={currentPage}
          total={pageSize * 2000}
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
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
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
                    <a
                      // href="/novelDetail"
                      onClick={() => {
                        const newWindowUrl = `${window.origin}/novelEp?ncode=${item.ncode}`; // 拼接前缀
                        window.open(newWindowUrl, "_blank");

                        // navigate("/novelDetail");
                        // window.open("/novelDetail");
                      }}
                    >
                      {" "}
                      {item.title}
                    </a>
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
