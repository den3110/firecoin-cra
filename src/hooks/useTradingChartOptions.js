import { useMediaQuery } from "react-responsive";
import { useEffect, useMemo, useState } from "react";
import { dateFormat } from "highcharts/highstock";

const useTradingChartOptions = (highchartsRef, wrapperRef) => {
  const [width, setWidth] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.clientWidth;
    }
    return 0;
  });

  const [height, setHeight] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.clientHeight;
    }
    return 0;
  });

  // BEGIN responsive - SSR compatible
  const isMobileView = useMediaQuery({ query: "(max-width: 480px)" });
  const isTabletView = useMediaQuery({ query: "(max-width: 768px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1025px)" });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [isLarge, setIsLarge] = useState(true);

  useEffect(() => {
    setIsMobile(isMobileView);
  }, [isMobileView]);

  useEffect(() => {
    setIsTablet(isTabletView);
  }, [isTabletView]);

  useEffect(() => {
    setIsSmall(isSmallScreen);
  }, [isSmallScreen]);

  useEffect(() => {
    setIsLarge(isLargeScreen);
  }, [isLargeScreen]);
  // END responsive - SSR compatible

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setWidth(width);
      setHeight(height);

      highchartsRef.current?.chart.redraw();
      highchartsRef.current?.chart.reflow();
    });
    observer.observe(wrapperRef.current);

    return () => {
      observer.disconnect();
    };
  }, [highchartsRef, setHeight, setWidth, wrapperRef]);

  return useMemo(() => {
    return {
      title: {
        text: `<div class="title-chart-candle d-flex align-items-center">
                        <span class="icon-btc"></span>
                        <span class="text-price">BTC/USD</span>
                   </div>`,
        align: "left",
        useHTML: true,
      },
      accessibility: {
        enabled: false, // This disables the accessibility feature and removes the warning
      },
      chart: {
        type: "areaspline",
        backgroundColor: "transparent",
        marginRight: 80,
        marginBottom: 30,
        // width: "100%",
        height: height,
        // width: `${width}px`,
        zoomType: null,
        zooming: {
          mouseWheel: false,
        },
        // renderTo: "trade-chart",
        aspectRatio: "16:9",
        // height: !isLargeScreen ? "100%" : (9 / 16) * 100 + "%",
        panning: false,
      },
      time: {
        useUTC: false,
      },
      rangeSelector: {
        enabled: false,
      },
      navigator: {
        enabled: false,
      },
      scrollbar: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      tooltip: {
        split: false,
        enabled: true,
        label: false,
        animation: true,
        backgroundColor: "transparent",
        opacity: "1",
        visibility: "visible",
        borderColor: "transparent",
        borderWidth: 0,
        shadow: false,
        stroke: "transparent",
        useHTML: true,
        style: {
          color: "#fff",
          fontSize: "10px",
          stroke: "transparent",
          top: "60px",
        },

        formatter() {
          const content =
            "BTC/USD" === this.series.name
              ? '\n<span style="margin-right: 10px;"><b>O</b>: ' +
                this.point.open +
                '</span>\n<span style="margin-right: 10px;"><b>C</b>: ' +
                this.point.close +
                '</span>\n<span>&nbsp;</span>\n<br/>\n<span style="margin-right: 10px;"><b>H</b>: ' +
                this.point.high +
                '</span>\n<span style="margin-right: 10px;"><b>L</b>: ' +
                this.point.low +
                "</span>\n<span><b>Vol</b>: " +
                Math.round(this.point.vol * 100) / 100 +
                "</span>"
              : "Volume" === this.series.name
              ? "<b>Vol</b>: " + Math.round(this.y * 100) / 100
              : "";
          return content && `<div class="tooltip-label">${content}</div>`;
        },
        positioner() {
          var t = 20,
            e = !isLargeScreen ? 50 : 60;
          return {
            x: t,
            y: e,
          };
        },
      },
      plotOptions: {
        candlestick: {
          lineColor: "#FA4B62",
          upLineColor: "#04C793",
          color: "#FA4B62",
          upColor: "#04C793",
          pointWidth: !isLargeScreen ? 7 : 8.6,
          maxPointWidth: !isLargeScreen ? 7 : 12,
          paddingPoint: !isLargeScreen ? 7.7 : 10.5,
          allowPointSelect: false,
        },
        column: {
          minPointLength: 3,
          pointWidth: !isLargeScreen ? 8.6 : 8.6,
          maxPointWidth: !isLargeScreen ? 8.6 : 12,
          borderWidth: 0,
          paddingPoint: !isLargeScreen ? 7.7 : 10.5,
          numberPoint: !isLargeScreen ? 15 : 60,
          pointRange: 0.1,
          borderRadius: "0 0 0 0",
        },
        sma: {
          linkedTo: "aapl",
          marker: {
            enabled: false,
          },
          allowPointSelect: false,
          enableMouseTracking: false,
        },
        series: {
          zIndex: 2,
          states: {
            inactive: {
              opacity: 1,
            },
          },
          allowPointSelect: false,
          point: {
            events: {
              click() {},
            },
          },
          marker: {
            enabled: false,
          },
        },
      },

      xAxis: {
        id: "xaxis-1",
        type: "datetime",
        lineColor: "#2D3140",
        lineWidth: 1,
        labels: {
          y: 20,
          enabled: true,
          formatter() {
            // console.log(this.value)
            return dateFormat("%M:%S", this.value);
          },
          style: {
            fontSize: 12,
            color: "#707070",
          },
        },
        plotLines: [
          {
            value: 0,
            color: "#8B8D96",
            width: 0.75,
            id: "current-pricex",
            zIndex: 1e3,
            dashStyle: "LongDash",
          },
        ],
        zoomEnabled: false,
        tickInterval: 2 * 60 * 1000,
      },
      yAxis: [
        {
          id: "yaxis-1",
          gridLineColor: "#2D3140",
          gridLineDashStyle: "LongDash",
          labels: {
            align: "right",
            x: 50,
            style: {
              color: "#ffffff",
              fontSize: "12px",
            },
          },
          height: "85%",
          top: 0,
          plotLines: [
            {
              value: 0,
              color: "#8B8D96",
              width: 0.75,
              id: "current-price",
              zIndex: 100,
              label: {
                useHTML: true,
                text: 0,
                x: !isLargeScreen ? 60 : 70,
                align: "right",
                style: {
                  color: "#fff",
                  fontSize: "11px",
                  background: "transparent",
                  borderRadius: "4px",
                },
              },
            },
          ],
        },
        {
          id: "yaxis-2",
          gridLineColor: "",
          visible: false,
          top: "83.4%",
          height: "15%",
          lineWidth: 0,
          offset: 0,
        },
      ],
      series: [
        {
          id: "aapl",
          type: "candlestick",
          name: "BTC/USD",
          dataGrouping: {
            enabled: false,
          },
          point: {
            events: {
              click: function () {
                highchartsRef.current.chart.tooltip.label.show();
                  isSmall &&
                    setTimeout(function () {
                      highchartsRef.tooltip.label.hide();
                    }, 1e4);
              },
            },
          },
        },
        {
          id: "volume",
          type: "column",
          name: "Volume",
          point: {
            events: {
              click: function () {
                highchartsRef.current.chart.tooltip.label.show();
                  isSmall &&
                    setTimeout(function () {
                      highchartsRef.tooltip.label.hide();
                    }, 1e4);
              },
            },
          },
          // data: volume,
          dataGrouping: {
            enabled: false,
          },
          yAxis: 1,
        },
        {
          type: "sma",
          id: "sma1",
          name: "SMA1",
          color: "#1CB2B3",
          lineWidth: 2,
          params: {
            index: "0",
            period: 10,
          },
          yAxis: 0,
        },
        {
          type: "sma",
          id: "sma2",
          name: "SMA2",
          color: "#C70E65",
          lineWidth: 2,
          params: {
            index: "1",
            period: 5,
          },
          yAxis: 0,
        },
        {
          type: "sma",
          id: "sma3",
          name: "SMA3",
          color: "#FA941A",
          lineWidth: 2,
          params: {
            index: "2",
            period: 0,
          },
          yAxis: 0,
        },
      ],
    };
  }, [height, isLargeScreen, highchartsRef, isSmall]);
};

export default useTradingChartOptions;
