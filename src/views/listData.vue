<template>
<div>
    <el-table id="dataTable" :data="dataList" style="width: 100%" >

        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <el-table-column prop="temperature" label="温度" width="180"></el-table-column>
        <el-table-column prop="humidness" label="湿度" width="180"></el-table-column>
        <el-table-column prop="pressure" label="压力" width="180"></el-table-column>
        <el-table-column prop="light" label="光强" width="180"></el-table-column>
        <el-table-column prop="distance" label="距离" width="180"></el-table-column>
        <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
                <el-button @click="editItem(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="deleteItem(scope.row)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-size="5" :total="totalPage" @current-change="page">
    </el-pagination>
</div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "listData",
        data () {
            return {
                dataList: [],
                totalPage: 1
            }
        },
        created() {
            axios.get('http://localhost:8080/data?page=1')
                .then(response => {
                    this.dataList = response.data.list;
                    this.totalPage = response.data.total;

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {
            page(currentPage) {
                axios.get('http://localhost:8080/data?page=' + currentPage)
                    .then(response => {
                        this.dataList = response.data.list;
                        this.totalPage = response.data.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            editItem(row) {
                this.$router.push({
                    path: "/updateData",
                    query: {
                        theId: row.id
                    }
                })
            },
            deleteItem(row) {
                const THIS = this
                axios.delete('http://localhost:8080/data/' + row.id)
                    .then(function (response) {
                        console.log(response);
                        THIS.$router.go(0);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>

</style>