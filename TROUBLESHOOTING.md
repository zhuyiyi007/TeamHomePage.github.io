# 故障排除指南

## 🚨 常见错误：Failed to fetch

### 问题描述
当您看到 `Failed to fetch` 错误时，表示JavaScript无法获取配置文件 `team-members.yml`。

### 可能原因
1. **文件路径错误** - 配置文件路径不正确
2. **本地文件访问限制** - 浏览器无法直接访问本地文件
3. **CORS问题** - 跨域访问限制
4. **文件不存在** - 配置文件路径错误

## 🛠️ 解决方案

### 方案1: 使用本地服务器（推荐）

由于浏览器的安全限制，直接打开HTML文件无法使用 `fetch()` 函数。您需要使用本地服务器：

#### 使用Python（如果已安装）
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### 使用Node.js（如果已安装）
```bash
# 安装http-server
npm install -g http-server

# 启动服务器
http-server -p 8000
```

#### 使用Live Server（VS Code扩展）
1. 安装Live Server扩展
2. 右键点击HTML文件
3. 选择"Open with Live Server"

### 方案2: 检查文件路径

确保配置文件路径正确：
```
项目根目录/
├── index.html
├── contents/
│   └── team-members.yml  ← 确保此文件存在
└── static/
    └── js/
        └── scripts.js
```

### 方案3: 使用备选数据

我已经在 `scripts.js` 中添加了备选数据，即使配置文件无法读取，页面也能显示团队成员信息。

## 🧪 测试步骤

### 1. 使用修复测试页面
打开 `fix-test.html` 页面，尝试不同的测试方法：

- **方法1**: 相对路径 `./contents/team-members.yml`
- **方法2**: 绝对路径 `/contents/team-members.yml`
- **方法3**: 自动检查多个路径
- **方法4**: 直接显示硬编码数据

### 2. 检查浏览器控制台
1. 按F12打开开发者工具
2. 查看Console标签
3. 观察错误信息和调试输出

### 3. 验证文件存在
```bash
# 在项目根目录下运行
dir contents\team-members.yml
```

## 🔧 永久解决方案

### 1. 使用本地服务器
**推荐使用Python或Node.js启动本地服务器**，这样所有功能都能正常工作。

### 2. 修改文件路径
如果路径问题持续存在，可以修改 `scripts.js` 中的路径配置。

### 3. 使用备选数据
系统已经配置了备选数据，确保即使配置文件无法读取，页面也能正常显示。

## 📋 检查清单

- [ ] 配置文件 `contents/team-members.yml` 存在
- [ ] 使用本地服务器而不是直接打开HTML文件
- [ ] 检查浏览器控制台的错误信息
- [ ] 验证文件路径是否正确
- [ ] 测试备选数据是否正常工作

## 🆘 获取帮助

如果问题仍然存在：

1. 检查本文档的解决方案
2. 查看浏览器控制台的错误信息
3. 确认是否使用了本地服务器
4. 测试 `fix-test.html` 页面的不同方法

## 💡 提示

**最重要的解决方案是使用本地服务器**，而不是直接双击HTML文件。这是因为现代浏览器的安全策略不允许JavaScript直接访问本地文件系统。
