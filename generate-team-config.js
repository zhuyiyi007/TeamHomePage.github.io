const fs = require('fs');
const path = require('path');

// 扫描目录并生成团队成员配置
function generateTeamConfig() {
    const config = {
        teachers: [],
        students: []
    };

    // 扫描教师文件夹
    const teachersDir = path.join(__dirname, 'Teachers');
    if (fs.existsSync(teachersDir)) {
        const teacherFolders = fs.readdirSync(teachersDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        teacherFolders.forEach(folder => {
            const memberInfo = parseFolderName(folder);
            if (memberInfo) {
                const photoPath = `Teachers/${folder}/static/assets/img/photo.png`;
                // 检查头像文件是否存在
                if (fs.existsSync(path.join(__dirname, photoPath))) {
                    config.teachers.push({
                        name: memberInfo.name,
                        title: memberInfo.title,
                        photo: photoPath
                    });
                } else {
                    console.log(`警告: 头像文件不存在: ${photoPath}`);
                }
            }
        });
    }

    // 扫描学生文件夹
    const studentsDir = path.join(__dirname, 'Students');
    if (fs.existsSync(studentsDir)) {
        const studentFolders = fs.readdirSync(studentsDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        studentFolders.forEach(folder => {
            const memberInfo = parseFolderName(folder);
            if (memberInfo) {
                const photoPath = `Students/${folder}/static/assets/img/photo.png`;
                // 检查头像文件是否存在
                if (fs.existsSync(path.join(__dirname, photoPath))) {
                    config.students.push({
                        name: memberInfo.name,
                        title: memberInfo.title,
                        photo: photoPath
                    });
                } else {
                    console.log(`警告: 头像文件不存在: ${photoPath}`);
                }
            }
        });
    }

    return config;
}

// 解析文件夹名称，提取姓名和身份
function parseFolderName(folderName) {
    if (!folderName || typeof folderName !== 'string') {
        return null;
    }

    const parts = folderName.split('_');
    if (parts.length < 2) {
        console.log(`文件夹名称格式不正确: ${folderName}`);
        return null;
    }

    // 最后一个部分作为身份，前面的部分作为姓名
    const title = parts[parts.length - 1];
    const name = parts.slice(0, parts.length - 1).join('_');

    return {
        name: name,
        title: title
    };
}

// 生成YAML格式的配置文件
function generateYAML(config) {
    let yaml = `# 团队成员配置文件 - 自动生成
# 文件夹命名规则：姓名_身份
# 头像路径：Teachers/姓名_身份/static/assets/img/photo.png

teachers:
`;
    
    config.teachers.forEach(teacher => {
        yaml += `  - name: "${teacher.name}"
    title: "${teacher.title}"
    photo: "${teacher.photo}"
`;
    });

    yaml += `
students:
`;
    
    config.students.forEach(student => {
        yaml += `  - name: "${student.name}"
    title: "${student.title}"
    photo: "${student.photo}"
`;
    });

    return yaml;
}

// 主函数
function main() {
    try {
        console.log('开始扫描团队成员文件夹...');
        
        const config = generateTeamConfig();
        
        console.log('扫描完成！');
        console.log(`找到 ${config.teachers.length} 名教师`);
        console.log(`找到 ${config.students.length} 名学生`);
        
        const yaml = generateYAML(config);
        
        // 写入配置文件
        const outputPath = path.join(__dirname, 'contents', 'team-members.yml');
        fs.writeFileSync(outputPath, yaml, 'utf8');
        
        console.log(`配置文件已生成: ${outputPath}`);
        console.log('\n生成的配置内容:');
        console.log(yaml);
        
    } catch (error) {
        console.error('生成配置文件时出错:', error);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    main();
}

module.exports = {
    generateTeamConfig,
    parseFolderName,
    generateYAML
};
