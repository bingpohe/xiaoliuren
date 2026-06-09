# 🔮 小六壬占卜 — 诸葛马前课

<p align="center">
  <img src="icons/LOGO68.png" alt="小六壬" width="120" />
</p>

<p align="center">
  <strong>掐指一算，吉凶立现</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PWA-可安装-orange?style=flat-square" alt="PWA">
  <img src="https://img.shields.io/badge/离线-可用-green?style=flat-square" alt="离线">
  <img src="https://img.shields.io/badge/平台-Android%20%7C%20iOS-blue?style=flat-square" alt="平台">
  <img src="https://img.shields.io/badge/许可证-MIT-brightgreen?style=flat-square" alt="许可证">
</p>

---

## 📖 简介

**小六壬**，又称**诸葛马前课**，是一种在手掌上掐算的简易占卜法——只需知道农历月、日、时辰，或任意三个数字，即可在六掌诀中推算出吉凶祸福。

本项目将这一传统占卜术做成了 **PWA 手机App**，支持安装到主屏幕、离线使用，界面采用中国风设计。

> 🏮 大安事事昌，速喜喜来临，小吉最吉昌 —— 六段古诀尽在其中

---

## ✨ 功能

| 功能 | 说明 |
|------|------|
| 🔮 **月日时推算** | 农历月→日→时辰，三步动画推算 |
| 🎲 **三数报数法** | 任意三个数字（笔画、扑克、随机数）直接起卦 |
| 📜 **完整古诀** | 大安/留连/速喜/赤口/小吉/空亡 六段传统口诀 |
| 📊 **十类断辞** | 运程、事业、财运、感情、健康、寻物、行人、官非、交易、田宅 |
| 🎭 **六宫格动画** | 推算过程可视化，依次高亮走过的掌诀位置 |
| 📳 **振动反馈** | 出结果时手机振动（类似真实掐指感） |
| 🌓 **暗色模式** | 跟随系统自动切换，夜间不刺眼 |
| 📲 **PWA 安装** | 添加到手机主屏幕，全屏体验，离线可用 |
| 📅 **农历转换** | 1900-2100 年公历自动转农历 |

---

## 🚀 快速开始

### 在线使用

直接访问：**[bingpohe.github.io/xiaoliuren](https://bingpohe.github.io/xiaoliuren/)**

手机浏览器打开 → 弹出"添加到主屏幕" → 安装为独立 App

### 本地运行

```bash
git clone https://github.com/bingpohe/xiaoliuren.git
cd xiaoliuren
python -m http.server 8080
# 浏览器打开 http://localhost:8080
```

---

## 🖐️ 掌诀速查

| 掌诀 | 吉凶 | 五行 | 六神 | 方位 | 谋事主数 |
|------|------|------|------|------|----------|
| 🟢 **大安** | 大吉 | 木 | 青龙 | 东方 | 一、五、七 |
| 🔵 **留连** | 小凶 | 水 | 玄武 | 北方 | 二、八、十 |
| 🔴 **速喜** | 吉 | 火 | 朱雀 | 南方 | 三、六、九 |
| 🟡 **赤口** | 凶 | 金 | 白虎 | 西方 | 四、七、十 |
| 💜 **小吉** | 小吉 | 水 | 六合 | 西南 | 一、五、七 |
| 🟤 **空亡** | 大凶 | 土 | 勾陈 | 中央 | 三、六、九 |

---

## 🎴 推算方法

### 月日时法（传统）

```
大安起正月 → 月上起日 → 日上起时 → 最终落点
```

**举例**：三月初五午时
1. 从大安起正月，数至三月 → 速喜
2. 从速喜起初一，数至初五 → 大安
3. 从大安起子时，数至午时(7) → 大安
4. 结果：**大安（大吉）**

### 报数法（变通）

任意取三个数，依次在掌诀上顺数，最终落点即为结果。适用于随机起卦。

---

## 📂 项目结构

```
xiaoliuren/
├── index.html          # 主应用（单文件，所有逻辑内联）
├── manifest.json       # PWA 清单（全屏/图标/主题色）
├── sw.js              # Service Worker（离线缓存策略）
├── README.md           # 项目说明
└── icons/             # App 图标（192px / 512px）
```

纯静态 HTML5，无任何框架依赖，部署到任意静态托管即可。

---

## 🛠️ 技术栈

- **HTML5 + CSS3 + Vanilla JS** — 零依赖
- **PWA** — Manifest + Service Worker
- **CSS Custom Properties** — 暗色模式适配
- **CSS Grid + Flexbox** — 响应式布局

---

## 📄 许可证

MIT License © 2026

---

<p align="center">
  <sub>🏮 传承古法 · 码上掐指 🏮</sub>
</p>
