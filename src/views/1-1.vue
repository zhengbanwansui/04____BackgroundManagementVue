<template>
    <div>
        <el-table id="myTable" :data="tableCurrentData" style="width: 100%" >

            <el-table-column prop="username" label="用户名" width="180"></el-table-column>
            <el-table-column prop="password" label="密码" width="180"></el-table-column>
            <el-table-column prop="age" label="年龄" width="180"></el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="editItem(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteItem(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination background layout="prev, pager, next" :page-size="5" :total="tableData.length"
            @current-change="page">
        </el-pagination>
        <button @click="exportExcel">点击导出Excel</button>

        <el-table v-show="false" id="myExcelTable" :data="tableData" style="width: 100%" >
            <el-table-column prop="username" label="用户名" width="180"></el-table-column>
            <el-table-column prop="password" label="密码" width="180"></el-table-column>
            <el-table-column prop="age" label="年龄" width="180"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'

import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
    name: "page1-1",
    data() {
        return {
            tableCurrentData: [],
            tableData: [
                {
                    username: "default",
                    password: "default",
                    age: 1
                }
            ]
        }
    },
    created() {
        axios.get('http://localhost:8080/users')
            .then(response => {
                console.log(response.data);
                this.tableData = response.data;
                this.tableCurrentData = this.tableData.slice(0,5);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    methods: {
        handleClick(row) {
            console.log(row);
        },
        editItem(row) {
            this.$router.push({
                path: "/1-3",
                query: {
                    theUser: row.username
                }
            })
        },
        deleteItem(row) {
            this.$router.push({
                path: "/1-4",
                query: {
                    theUser: row.username
                }
            })
        },
        exportExcel() {
            /* 从表生成工作簿对象 */
            let wb = XLSX.utils.table_to_book(document.querySelector("#myExcelTable"));
            /* 获取二进制字符串作为输出 */
            let wbout = XLSX.write(wb, {
                bookType: "xlsx",
                bookSST: true,
                type: "array"
            });
            try {
                FileSaver.saveAs(
                    //Blob 对象表示一个不可变、原始数据的类文件对象。
                    //Blob 表示的不一定是JavaScript原生格式的数据。
                    //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
                    //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
                    new Blob([wbout], { type: "application/octet-stream" }),
                    //设置导出文件名称
                    "excel.xlsx"
                );
            } catch (e) {
                if (typeof console !== "undefined") console.log(e, wbout);
            }
            return wbout;
        },
        // page的参数data为当前页数
        page(currentPage) {
            const pageSize = 5;
            this.tableCurrentData = this.tableData.slice((currentPage  - 1) * pageSize, currentPage * pageSize);
        }
    }
}
</script>

<style scoped>

</style>