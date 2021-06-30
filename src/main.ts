import { createApp } from 'vue';
import App from './App';
import './index.css';
import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/packages/theme-chalk/src/index.scss';
import './iconfont.js';

const app = createApp(App);
app.use(ElementPlus);
app.mount('#app');
