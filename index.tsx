import { useTranslation } from "react-i18next";
import { useState, useContext, useEffect } from "react";
import style from "./index.less";
import Img from "./Img";
import TurntableImg from "./TurntableImg.png";
import TurntableImgEn from "./TurntableImgEn.png";
import degreeImg from "./degreeImg.png";
import degreeImg_no from "./degreeImg_no.png";
import selectImg from "./selectImg.png";

const TurnTable = (props: any) => {

  const { t, i18n } = useTranslation();
  const { activityPreId, token, isInApp, isInIframe, userInfo, lang } = appState;
  const [lotteryNum, setLotteryNum] = useState(0);
  const [isLotterying, setIsLotterying] = useState(false);

  const prizeList: any = [
      // 恭喜您获得 10RED
      {
          prizeTitle: t("world.successPrize"),
          prizeText: "10 RED",
          prizeIsOkBtn: false,
          prizeOkText: t("world.use"),
          prizeImg: RED
      },
      // 恭喜您获得 0.5USDT
      {
          prizeTitle: t("world.successPrize"),
          prizeText: "0.5USDT",
          prizeIsOkBtn: true,
          prizeOkText: t("world.use"),
          prizeImg: USDT,
          appUrl: "/futures/usd-m",
          webUrl: `${getOrigin("futures")}/contract/u_based/btc_usdt`
      },
      // 恭喜您获得 2USDT体验金
      {
          prizeTitle: t("world.successPrize"),
          prizeText: `2USDT ${t("world.experience")}`,
          prizeIsOkBtn: true,
          prizeOkText: t("world.use"),
          prizeImg: USDT_T,
          appUrl: "/futures/usd-m",
          webUrl: `${getOrigin("futures")}/contract/u_based/btc_usdt`
      },
      // 恭喜您获得 5LOOP
      {
          prizeTitle: t("world.successPrize"),
          prizeText: "5 LOOP",
          prizeIsOkBtn: false,
          prizeOkText: t("world.use"),
          prizeImg: LOOP
      },
      // 恭喜您获得 5USDT体验金
      {
          prizeTitle: t("world.successPrize"),
          prizeText: t("world.5experience"),
          prizeIsOkBtn: true,
          prizeOkText: t("world.use"),
          prizeImg: USDT_T,
          appUrl: "/futures/usd-m",
          webUrl: `${getOrigin("futures")}/contract/u_based/btc_usdt`
      },
      // 恭喜您获得 30USDT
      {
          prizeTitle: t("world.successPrize"),
          prizeText: "30USDT",
          prizeIsOkBtn: true,
          prizeOkText: t("world.use"),
          prizeImg: USDT_T,
          appUrl: "/futures/usd-m",
          webUrl: `${getOrigin("futures")}/contract/u_based/btc_usdt`
      },
      // 恭喜您获得 100USDT体验金
      {
          prizeTitle: t("world.successPrize"),
          prizeText: t("world.100experience"),
          prizeIsOkBtn: true,
          prizeOkText: t("world.use"),
          prizeImg: USDT_T,
          appUrl: "/futures/usd-m",
          webUrl: `${getOrigin("futures")}/contract/u_based/btc_usdt`
      },
      // 恭喜您获得 1ETH
      {
          prizeTitle: t("world.successPrize"),
          prizeText: "1 ETH",
          prizeIsOkBtn: false,
          prizeOkText: t("world.use"),
          prizeImg: ETH
      },
      // 谢谢参与
      {
          prizeTitle: t("world.regret"),
          prizeText: t("world.thanks"),
          prizeIsOkBtn: true,
          prizeOkText: t("world.continueOpen"),
          prizeImg: FAIL
      },
      // 恭喜您提取到账 30USDT
      {
          prizeTitle: t("world.extractPrize"),
          prizeText: "30USDT",
          prizeIsOkBtn: true,
          prizeOkText: t("world.deal"),
          prizeImg: USDT,
          appUrl: "/futures/usd-m",
          webUrl: `${getOrigin("futures")}/contract/u_based/btc_usdt`
      }
  ];

  const [prizeVisible, setPrizeVisible] = useState(false);
  const [prizeInfo, setPrizeInfo] = useState(prizeList[0]);

  const setPrizeInfos = (index: any) => {
      setPrizeInfo({
          ...prizeInfo,
          ...prizeList[index]
      });
      setPrizeVisible(true);
  };
  
  const onLotteryClick = useCallback(async () => {
        console.log("onLotteryClick!!!!!!");
        sensorsTrack("WRB_ButtonClick", { button_name: "spin lottery" });
        sensorsTrack("WRB_SubDrawInfo", { activitypage_activitycode: getUrlSearchAttr("activityCode") ? getUrlSearchAttr("activityCode") : "D3EWIU" });
        if (!token) {
            jump();
            return;
        }
        if (isLotterying) return;
        if (lotteryNum <= 0) return;
        setIsLotterying(true);
        let rewardItem: any = null;
        // 转盘角度
        const LOTTERY_AREA_DEG = [
            [-20, 20],
            [21, 60],
            [61, 100],
            [101, 140],
            [141, 180],
            [181, 220],
            [221, 260],
            [261, 300],
            [301, 340]
        ];
        const LOTTERY_AREA_MAP = new Map();
        const LOTTERY_MODAL = new Map();

        LOTTERY_AREA_MAP.set("red_10", LOTTERY_AREA_DEG[0]);
        LOTTERY_AREA_MAP.set("usdt_0.5", LOTTERY_AREA_DEG[1]);
        LOTTERY_AREA_MAP.set("usdt_2", LOTTERY_AREA_DEG[2]);
        LOTTERY_AREA_MAP.set("loop_5", LOTTERY_AREA_DEG[3]);
        LOTTERY_AREA_MAP.set("usdt_5", LOTTERY_AREA_DEG[4]);
        LOTTERY_AREA_MAP.set("usdt_30", LOTTERY_AREA_DEG[5]);
        LOTTERY_AREA_MAP.set("usdt_100", LOTTERY_AREA_DEG[6]);
        LOTTERY_AREA_MAP.set("eth_1", LOTTERY_AREA_DEG[7]);
        LOTTERY_AREA_MAP.set("fail", LOTTERY_AREA_DEG[8]);

        LOTTERY_MODAL.set("red_10", 0);
        LOTTERY_MODAL.set("usdt_0.5", 1);
        LOTTERY_MODAL.set("usdt_2", 2);
        LOTTERY_MODAL.set("loop_5", 3);
        LOTTERY_MODAL.set("usdt_5", 4);
        LOTTERY_MODAL.set("usdt_30", 5);
        LOTTERY_MODAL.set("usdt_100", 6);
        LOTTERY_MODAL.set("eth_1", 7);
        LOTTERY_MODAL.set("fail", 8);

        let targetDegree = 0;
        let canLottery = true;
        let key = "";
        await postActivityDraw({ activityId: Number(activityPreId), inviteCode: userInfo.recommendCode, activityCode: "D3EWIU" })
            .then((data: any) => {
                rewardItem = data;
                let range = [];
                if (rewardItem == null) {
                    key = "fail";
                } else {
                    key = `${rewardItem.prize.toLowerCase()}_${rewardItem.perPrizeNum}`;
                }

                range = LOTTERY_AREA_MAP.get(key);
                if (range) {
                    targetDegree = -(range[0] + range[1]) / 2;
                }
                setLotteryNum(lotteryNum - 1);
            })
            .catch((data: any) => {
                setIsLotterying(false);
                canLottery = false;
            });

        if (!canLottery) {
            return;
        }

        // if (targetDegree === 0) {
        //   return;
        // }

        // rewardItem = null;
        // let range = [];
        // let key = '';
        // if (rewardItem == null){
        //    key = "fail";
        // }else{
        //   key = `${rewardItem.prize}_${rewardItem.perPrizeNum}`;
        // }

        // range = LOTTERY_AREA_MAP.get("btc_0.1");
        // if (range){
        //   targetDegree = -(range[0] + range[1]) / 2 ;
        // }
        let rotateDeg = 0;
        let i = 0;
        const fn = (n = 0) => {
            if (targetDegree + 360 * n > oldRotateDeg) {
                rotateDeg = targetDegree + 360 * n;
            } else {
                i++;
                fn(i);
            }
        };
        fn();
        // 获取转盘实例
        let ele = document.getElementById("xt-turntable");
        if (!docWidth) {
            ele = document.getElementById("xt-turntable-mb");
        }

        if (ele) {
            ele.style.transition = "all 6500ms";
            ele.style.transform = `rotate(${rotateDeg + 360 * 10}deg)`;
            setOldRotateDeg(rotateDeg + 360 * 10);
        }
        const timer = setTimeout(() => {
            setIsLotterying(false);
            setPrizeInfos(LOTTERY_MODAL.get(key));
            clearTimeout(timer);
        }, 6700);
    }, [activityPreId, lotteryNum, isLotterying]);

}
 
<div className={style.right}>
    <div className={style.TurntableImg} id="xt-turntable">
        <Img src={lang === "cn" ? TurntableImg : TurntableImgEn} />
    </div>
    {lotteryNum ? (
        <div className={style.degreeImg} onClick={onLotteryClick}>
            <Img src={degreeImg} />
        </div>
    ) : (
        <div className={style.degreeImg} onClick={onLotteryClick}>
            <Img src={degreeImg_no} />
        </div>
    )}

    <div className={style.selectImg}>
        <Img src={selectImg} />
    </div>
    <div className={style.lottery} onClick={onLotteryClick}>
        Lottery
    </div>
    <div className={style.times} onClick={onLotteryClick}>
        {t("world.lotteryNum", { lotteryNum })}
    </div>
</div>
