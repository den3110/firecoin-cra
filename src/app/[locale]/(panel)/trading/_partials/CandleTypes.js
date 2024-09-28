const CandleTypes = [
    { type: "21s - 75%", value : 21, pnl : 75, minAmount : 1},
    { type: "38s - 90%", value : 38, pnl : 90, minAmount : 1},
    { type: "90s - 50%", value : 90, pnl : 50, minAmount : 1},
    { type: "180s - 60%", value : 60, pnl : 60, minAmount : 1},
    { type: "360s - 90%", value : 360, pnl : 70, minAmount : 10},
    { type: "12h - 50%", value : 43200,pnl : 50, minAmount : 100},
    { type: "48h - 60%", value : 172800,pnl : 60, minAmount : 100},
    { type: "7d - 70%", value : 604800, pnl : 70, minAmount : 100},
    { type: "15d - 80%", value : 1296000, pnl : 80, minAmount : 100},
]

export default CandleTypes;