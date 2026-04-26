# OpenClaw - claw123

一个基于 Next.js 的用户流程式页面应用。

## 项目简介

这是一个现代化的 Web 应用，采用用户流程式设计，帮助用户根据身份（新手/已安装）进入不同的使用路径。

## 用户流程

### 第一步：用户身份选择
用户首次访问时可以选择：
- **新手用户**：浏览 OpenClaw 客户端对比
- **已安装用户**：直接进入 SkillHub

### 第二步：根据身份进入不同流程

#### 新手用户流程
1. 客户端对比 → 选择 → 详情查看 → 下载

#### 已安装用户流程
1. 直接进入 SkillHub → 浏览和安装技能

## 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **开发环境**: Node.js 20

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm run start
```

## 项目结构

```
claw123/
├── src/
│   └── app/
│       ├── globals.css      # 全局样式
│       ├── layout.tsx       # 根布局
│       └── page.tsx         # 主页面
├── public/                  # 静态资源
├── package.json            # 项目配置
├── tsconfig.json          # TypeScript 配置
├── tailwind.config.ts     # Tailwind CSS 配置
└── next.config.mjs        # Next.js 配置
```

## 功能特点

- ✅ 多步骤用户流程引导
- ✅ 步骤指示器显示当前进度
- ✅ 响应式设计，适配各种屏幕
- ✅ 平滑的过渡动画
- ✅ 清晰的视觉层级
- ✅ 顶部导航栏（OpenClaw 部署客户端、SkillHub、知识中心）

## 预览

直接打开 `preview.html` 文件可在浏览器中预览设计效果。

## License

MIT
