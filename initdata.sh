#!/bin/bash

# 初始化数据脚本
# 用于生成国际化键值数据文件

echo "开始初始化数据..."

# 创建输出目录
mkdir -p /Users/eli/Documents/project/github/find-i18n-key/public/data

echo "正在处理 web_separation 项目..."
cd /Users/eli/Documents/project/weex/web_separation
if [ $? -eq 0 ]; then
    find_key_vue2 -f ./client/locales/en.json -o /Users/eli/Documents/project/github/find-i18n-key/public/data/web.json
    if [ $? -eq 0 ]; then
        echo "✓ web.json 生成成功"
    else
        echo "✗ web.json 生成失败"
    fi
else
    echo "✗ 无法进入 web_separation 目录"
fi

echo "正在处理 web-trade 项目..."
cd /Users/eli/Documents/project/weex/web-trade
if [ $? -eq 0 ]; then
    find_key_vue2 -f ./client/locales/en.json -o /Users/eli/Documents/project/github/find-i18n-key/public/data/trade.json
    if [ $? -eq 0 ]; then
        echo "✓ trade.json 生成成功"
    else
        echo "✗ trade.json 生成失败"
    fi
else
    echo "✗ 无法进入 web-trade 目录"
fi

echo "数据初始化完成！"
echo "生成的文件位置："
echo "- /Users/eli/Documents/project/github/find-i18n-key/public/data/web.json"
echo "- /Users/eli/Documents/project/github/find-i18n-key/public/data/trade.json"
