import React from "react";
import { useUser } from "../context/user-context";
import Skeleton from '@mui/material/Skeleton';

// 数据状态容器盒子----用于数据获取前后的页面状态显示 请登录 获取数据 无数据 有数据 四种状态
export const DataStateBox = ({
  data,
  notNeedUser,
  children,
  css,
  loading,
  SkeletonCSS,
  emptyDesc = "Please connect wallet"
}) => {
  const { user } = useUser()

  return (
    <div
      className="flex-center"
      style={{
        minHeight: 200,
        margin: "40px auto",
        ...css
      }}>
      {user?.backendActor || notNeedUser
        ? (!loading
          ? ("{}" === JSON.stringify(data) || "[]" === JSON.stringify(data)
            ? <div style={{ color: "rgba(0,0,0,0.6)" }}> {emptyDesc || "No Data"} </div>
            : children)
          : <div style={{ minHeight: 200, width: "100%", ...SkeletonCSS }}>
            <Skeleton sx={{ height: 80 }} animation="wave" variant="rectangular" style={{ marginBottom: 6 }} />
            <div className="flex-between">
              <Skeleton animation="wave" variant="circular" width={80} height={80} />
              <Skeleton
                animation="wave"
                height={100}
                width={`calc(100% - ${90}px`}
                style={{ marginBottom: 6 }}
              />
            </div>
            <Skeleton animation="wave" height={30} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={50} />
          </div>)
        : <div style={{ color: "rgba(0,0,0,0.7)" }}>
          Please log in
        </div>}
    </div>
  );
};
