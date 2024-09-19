import { Button, Collapse } from "antd-mobile";
import { format, compareAsc } from "date-fns";
import { ArrowsAltOutline } from "antd-mobile-icons";
import "./index.css";
import { useEffect, useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LightModeIcon from "@mui/icons-material/LightMode";
import CropRotateIcon from "@mui/icons-material/CropRotate";
import SettingsIcon from "@mui/icons-material/Settings";

function App() {
  const [date, setDate] = useState(new Date());
  const [showSettingBtn, setShowSettingBtn] = useState(false);
  const [showSettingArea, setShowSettingArea] = useState(false);

  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000);
  }, []);

  return (
    <div
      onClick={() =>
        setShowSettingBtn(showSettingArea ? true : !showSettingBtn)
      }
      className="home-page"
    >
      <div className="arrows-icon">
        {showSettingBtn ? <ArrowsAltOutline /> : null}
      </div>
      <div className="date">{format(date, "HH:mm:ss")}</div>
      <div className="bottom-icon">
        {showSettingBtn ? (
          <>
            <DarkModeIcon />
            <FavoriteBorderIcon />
            <CropRotateIcon />
            <SettingsIcon
              onClick={(e) => {
                e.stopPropagation();
                setShowSettingArea(!showSettingArea);
              }}
            />
          </>
        ) : null}
      </div>

      {/* menu */}
      {showSettingArea ? (
        <div onClick={(e) => e.stopPropagation()} className="seting-menu">
          <Collapse defaultActiveKey={["1"]}>
            <Collapse.Panel key="1" title="テーマの設定">
              内容1内容1内容1内容1内容1
            </Collapse.Panel>
            <Collapse.Panel key="2" title="表示の設定">
              内容2内容2内容2内容2内容2
            </Collapse.Panel>
          </Collapse>
        </div>
      ) : null}
    </div>
  );
}

export default App;
