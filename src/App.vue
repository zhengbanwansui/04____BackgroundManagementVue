<template>
    <div id="app">
        <el-container>
            <el-aside width="200px">
                <h5>功能导航</h5>
                <el-menu router class="el-menu-vertical-demo" :default-active="$route.path">

                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-folder-opened"></i>
                            <span>数据1</span>
                        </template>
                        <el-menu-item index="/1-1">全部</el-menu-item>
                        <el-menu-item index="/1-2">添加</el-menu-item>
                        <el-menu-item index="/1-3">修改</el-menu-item>
                        <el-menu-item index="/1-4">删除</el-menu-item>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-folder-opened"></i>
                            <span>数据2</span>
                        </template>
                        <el-menu-item index="/listData">全部</el-menu-item>
                        <el-menu-item index="/insertData">添加</el-menu-item>
                        <el-menu-item index="/updateData">修改</el-menu-item>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-data-line"></i>
                            <span>统计图</span>
                        </template>
                        <el-menu-item index="2-1">日活跃用户</el-menu-item>
                        <el-menu-item index="2-2">新用户</el-menu-item>
                        <el-menu-item index="2-3">访问量</el-menu-item>
                    </el-submenu>

                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <h1>系统</h1>
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style>
    #app {
        width: 100%;
    }
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        height: 800px;
    }
</style>
