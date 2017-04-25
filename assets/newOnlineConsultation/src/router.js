/**
 * 用于路由的配置
 */
import tabHome from './pages/tabHome/tabHome.vue';
import IndexPage from './pages/index/index.vue';
import askInfoPage from './pages/askInfo/askInfo.vue';
import ReplyPage from './pages/reply/reply.vue';
import advisoryAreaPage from './pages/advisoryArea/advisoryArea.vue';
import advisoryInfoPage from './pages/advisoryInfo/advisoryInfo.vue';
import myAdvisoryPage from './pages/myAdvisory/myAdvisory.vue';
import commonProblemPage from './pages/commonProblem/commonProblem.vue';
import postPage from './pages/post/post.vue';
import searchPage from './pages/search/search.vue';

export default {
    routes: [
        {
            path: '/',
            name:'app',
            component: tabHome,
            children:[
            	{
            		path:'/',
            		name:'index',
            		component:IndexPage
            	},{
            		path:'/advisoryarea',
            		name:'advisoryarea',
          			component: advisoryAreaPage
            	},{
            		path:'/myAdvisory',
            		name:'myAdvisory',
            		component: myAdvisoryPage
            	},{
            		path:'/commonProblem',
            		name:'commonProblem',
            		component:commonProblemPage
            	}
            ]
        },{
        	path:'/askinfo',
        	name:'askInfo',
      		component: askInfoPage
        },{
        	path:'/reply',
        	name:'reply',
        	component:ReplyPage
        },{
        	path:'/advisoryinfo',
        	name:'advisoryinfo',
        	component:advisoryInfoPage
        },{
        	path:'/post',
        	name:'post',
        	component:postPage
        },
		{
            path:'/search',
            name:'search',
            component:searchPage
		}

    ]
};