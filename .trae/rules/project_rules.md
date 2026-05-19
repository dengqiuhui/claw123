# 项目规则

## 预览方式
- **必须使用 Next.js 开发服务器**（`npm run dev`）进行预览
- Node.js 路径：`D:\Reportmaster\reportmaster\projects\node-v20.11.1-win-x64\node.exe`
- 启动命令：`$env:Path = 'D:\Reportmaster\reportmaster\projects\node-v20.11.1-win-x64;' + $env:Path; $env:Path = 'D:\Reportmaster\reportmaster\projects\node-v20.11.1-win-x64;' + $env:Path; npx next dev -p <可用端口>`
- 预览地址格式：`http://localhost:<端口号>`
- **不要使用** Python HTTP 服务 + preview.html 的静态预览方式
