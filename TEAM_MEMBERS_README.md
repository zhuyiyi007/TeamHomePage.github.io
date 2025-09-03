# 团队成员管理系统说明

## 概述
这个系统可以自动显示教师和学生的信息，包括头像、姓名和身份。每行显示三个人的信息，布局为左侧圆形头像，右侧上方姓名，下方身份。

## 文件结构
```
contents/
├── team-members.yml    # 团队成员配置文件（自动生成）
├── config.yml          # 其他配置
├── home.md             # 首页内容
└── ...

Teachers/                # 教师文件夹
├── 王宇轩_讲师/
│   └── static/assets/img/photo.png
├── name_1/
│   └── static/assets/img/photo.png
└── ...

Students/               # 学生文件夹
├── name_1/
│   └── static/assets/img/photo.png
├── name_2/
│   └── static/assets/img/photo.png
└── ...

generate-team-config.js  # 配置文件生成器脚本
```

## 自动扫描功能

### 1. 文件夹命名规则
- 教师：`Teachers/姓名_身份/`
- 学生：`Students/姓名_身份/`
- 使用下划线 `_` 分隔姓名和身份
- 系统会自动解析文件夹名称，提取姓名和身份信息

### 2. 头像要求
- 头像文件路径：`static/assets/img/photo.png`
- 建议尺寸：至少 80x80 像素
- 支持格式：PNG, JPG, JPEG

### 3. 自动配置文件生成
系统包含一个Node.js脚本 `generate-team-config.js`，可以自动扫描文件夹并生成配置文件：

```bash
# 运行配置文件生成器
node generate-team-config.js
```

这个脚本会：
- 自动扫描 `Teachers/` 和 `Students/` 目录
- 解析文件夹名称（姓名_身份格式）
- 检查头像文件是否存在
- 生成 `contents/team-members.yml` 配置文件

## 使用方法

### 添加新成员
1. 在 `Teachers/` 或 `Students/` 目录下创建新文件夹
2. 文件夹命名格式：`姓名_身份`（例如：`张三_教授`）
3. 在文件夹内创建 `static/assets/img/` 目录结构
4. 放置头像文件 `photo.png`
5. 运行 `node generate-team-config.js` 重新生成配置文件
6. 刷新页面即可看到新成员

### 修改成员信息
1. 修改文件夹名称（如果需要更改姓名或身份）
2. 替换头像文件（如果需要更改头像）
3. 运行 `node generate-team-config.js` 重新生成配置文件
4. 刷新页面即可看到更新

### 删除成员
1. 删除对应的文件夹
2. 运行 `node generate-team-config.js` 重新生成配置文件
3. 刷新页面即可看到更新

## 技术实现

### 前端（JavaScript）
- 自动从配置文件读取团队成员信息
- 动态生成HTML并插入到页面中
- 自动处理每行显示三个人的布局
- 响应式设计，支持不同屏幕尺寸

### 后端（Node.js脚本）
- 自动扫描服务器文件系统
- 解析文件夹名称和结构
- 生成YAML格式的配置文件
- 验证头像文件的存在性

## 注意事项
- 确保文件夹名称格式正确：`姓名_身份`
- 头像文件必须放在 `static/assets/img/photo.png` 路径
- 修改文件夹结构后需要重新运行生成器脚本
- 系统会自动处理每行显示三个人的布局
- 支持中文姓名和身份

## 故障排除

### 头像不显示
- 检查头像文件路径是否正确
- 确认文件名为 `photo.png`
- 验证文件权限和可访问性

### 成员信息不正确
- 检查文件夹命名格式：`姓名_身份`
- 重新运行 `generate-team-config.js` 脚本
- 查看浏览器控制台的错误信息

### 配置文件生成失败
- 确认Node.js环境已安装
- 检查文件夹权限
- 查看脚本输出的错误信息
