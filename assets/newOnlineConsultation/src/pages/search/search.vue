<template>
    <div>
        <mt-search
                v-model="value"
                cancel-text="取消"
                placeholder="搜索"
                @keydown.native="searchFunc"
        >
        </mt-search>
        <div v-for="item in list">
            <span>{{item.ZXBT}}</span>
        </div>
    </div>
</template>

<script>
    import { Search } from 'mint-ui';
    import Api from '../../api.js';

    export default {
        created() {
        },
        data () {
            return {
                value: '',
                list: [],
            }
        },
        computed: {},
        watch: {},
        filters: {},
        methods: {
            searchFunc() {
                if(event.keyCode == 13) {
                    this.fetchFunc(this.value);
                }
            },
            fetchFunc(searchKey="") {
                this.$http.get(Api.queryConsultingList, {
                    params: {
                        pageNumber:1,
                        searchKey,
                        pageSize: 10
                    }
                }).then((result) => {
                    console.log(result.data.list);
                    this.list = result.data.list;
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        components: {
            [Search.name]: Search
        }
    }
</script>

<style scoped>
</style>

