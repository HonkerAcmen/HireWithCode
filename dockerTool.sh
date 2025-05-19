#!/bin/bash

set -e

function show_menu() {
    echo
    echo "请选择操作："
    echo "[1] docker-compose down -v"
    echo "[2] docker-compose up -d --build"
    echo "[3] 容器打包"
    echo "[0] 退出"
}

function compose_down() {
    echo
    echo -e "\033[1;33m停止并移除容器、网络和卷...\033[0m"
    docker-compose down -v
}

function compose_up() {
    echo
    echo -e "\033[1;33m后台构建并启动容器...\033[0m"
    docker-compose up -d --build
}

function pack_containers() {
    while true; do
        echo
        echo -e "\033[1;33m当前所有容器：\033[0m"

        # 获取所有容器
        containers=()
        while IFS= read -r line; do
            containers+=("$line")
        done < <(docker ps -a --format '{{.Names}}|{{.Image}}|{{.Status}}|{{.Ports}}')

        for item in "${containers[@]}"; do
            IFS='|' read -r name image status ports <<< "$item"
            echo "[名称] $name"
            echo "    镜像:      $image"
            echo "    状态:      $status"
            echo "    端口映射:  $ports"
            echo "-------------------------------------------------------"
        done

        read -rp "请输入要打包的容器名（或输入 exit 返回主菜单）: " container_name
        if [[ "$container_name" == "exit" ]]; then
            break
        fi

        # 检查容器是否存在
        exists=$(docker ps -a --format '{{.Names}}' | grep -w "^$container_name$" || true)
        if [[ -z "$exists" ]]; then
            echo -e "\033[1;31m容器 [$container_name] 不存在，请重新输入。\033[0m"
            continue
        fi

        default_tag="${container_name}-$(date +%Y%m%d%H%M%S)"
        read -rp "请输入要生成的包的名字（默认为 $default_tag，直接回车使用默认）: " pkg_name
        if [[ -z "$pkg_name" ]]; then
            pkg_name="$default_tag"
        fi

        echo
        echo -e "\033[1;36m正在生成镜像并导出包...\033[0m"
        docker commit "$container_name" "$pkg_name"
        docker save -o "${pkg_name}.tar" "$pkg_name"
        echo -e "\033[1;32m容器 $container_name 已打包为 ${pkg_name}.tar\033[0m"

        read -rp "是否继续打包下一个容器？(y/n): " cont
        if [[ "$cont" != "y" && "$cont" != "Y" ]]; then
            break
        fi
    done
}

while true; do
    show_menu
    read -rp "请输入选项: " choice
    case "$choice" in
        1)
            compose_down
            ;;
        2)
            compose_up
            ;;
        3)
            pack_containers
            ;;
        0)
            echo "已退出脚本"
            exit 0
            ;;
        *)
            echo -e "\033[1;31m无效选项，请重试！\033[0m"
            ;;
    esac
done