"use client";

import React, { useEffect } from "react";

const TradingViewChart = () => {
    useEffect(() => {
        let scriptElements = []; // Mảng để lưu trữ các tham chiếu script

        // Hàm để tải một script
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = () => resolve(script);
                script.onerror = () => reject(new Error(`Script load error for ${src}`));
                document.head.appendChild(script);
                scriptElements.push(script); // Lưu trữ tham chiếu script
            });
        };

        // Tải các script cần thiết
        Promise.all([loadScript("/html/tv/charting_library.standalone.js"), loadScript("/html/tv/datafeed.js")])
            .then(() => {
                // Khởi tạo TradingView widget sau khi các script đã được tải
                const widget = new TradingView.widget({
                    library_path: "html/tv/",
                    custom_css_url: "html/css/tv.css?1703962592",
                    width: "100%",
                    autosize: true,
                    symbol: "BTCUSDT",
                    interval: "1",
                    container: "tv_chart_container",
                    datafeed: new Datafeeds.UDFCompatibleDatafeed("http://localhost:81", 500, {
                        maxResponseLength: 1000,
                    }),
                    locale: "en",
                    disabled_features: [
                        "context_menus",
                        "border_around_the_chart",
                        "header_symbol_search",
                        "symbol_search_hot_key",
                        "timeframes_toolbar",
                        "header_compare",
                        "go_to_date",
                        "display_market_status",
                        "object_tree_legend_mode",
                        "show_object_tree",
                        "show_symbol_logo_in_legend",
                    ],
                    enabled_features: [],
                    theme: "dark",
                    enable_publishing: false,
                    hide_legend: true,
                    save_image: false,
                });

                widget.onChartReady(() => {
                    widget
                        .activeChart()
                        .createStudy(
                            "Moving Average",
                            false,
                            false,
                            { length: 7 },
                            { "Plot.color": "rgba(241, 156, 56, 0.7)" },
                        );
                    widget
                        .activeChart()
                        .createStudy(
                            "Moving Average",
                            false,
                            false,
                            { length: 25 },
                            { "Plot.color": "rgba(234, 61, 247, 0.7)" },
                        );
                    widget
                        .activeChart()
                        .createStudy(
                            "Moving Average",
                            false,
                            false,
                            { length: 99 },
                            { "Plot.color": "rgba(116, 252, 253, 0.7)" },
                        );
                });
            })
            .catch((error) => console.error(error));

        // Dọn dẹp khi component unmount
        return () => {
            // Dọn dẹp khi component unmount
            scriptElements.forEach((script) => {
                document.head.removeChild(script); // Xóa script khỏi DOM
            });
            scriptElements = []; // Xóa tham chiếu

            // Nếu có widget, hãy xóa nó ở đây
            if (window.TradingView && window.TradingView.widget) {
                // Giả sử widget được lưu trong biến toàn cục
                window.TradingView.widget = null;
            }
        };
    }, []);

    return (
        <div id="tv_chart_container" style={{ width: "100%", height: "500px" }}>
            {/* Biểu đồ sẽ được hiển thị ở đây */}
        </div>
    );
};

export default TradingViewChart;
