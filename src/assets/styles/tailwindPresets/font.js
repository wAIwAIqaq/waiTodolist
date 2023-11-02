// 字体 font-size config
// 沿用之前的less .rem function的计算方式
const fontSizeList = [11, 12, 13, 14, 15, 16, 17, 18, 20, 23, 24, 26, 27, 28]
const fontSizeConfigs = {}
fontSizeList.forEach((fontKey) => {
  fontSizeConfigs[fontKey] = `${fontKey}px`
})
module.exports = {
  theme: {
    extend: {
      fontSize: { ...fontSizeConfigs }
    }
  }
}
