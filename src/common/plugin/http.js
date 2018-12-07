import axios from 'axios'

export default {
    install(Vue, options) {

        /**
         * 请求拦截器
         * 
         */
        axios.interceptors.request.use(config => {//在此处统一配置公共参数

            //  let appId = process.env.appId; //appid
            //  let appKey = process.env.appKey; //appkey
            //  let sessionKey = localStorage.getItem('sessionKey'); //sessionkey
            //  let _site_id_param = localStorage.getItem('_site_id_param')|| '';//站点id
            //  let params = {
            //      appId: appId,//appid
            //      nonce_str: getRand(),//随机数
            //      _site_id_param: _site_id_param
            //  };
            //  if (sessionKey && sessionKey != '') {
            //      params.sessionKey = sessionKey;
            //  }
            //  for (let key in config.data) {
            //      params[key] = config.data[key]; //添加进参数列表
            //  }
            //  params = signParams(params, appKey);//返回签名后的对象
            //  config.data = qs.stringify(params);//序列化
            return config;
        }, error => {

            Promise.reject(error);// 错误提示
        })


        /**响应拦截器 */
        axios.interceptors.response.use(response => {
            //  let res = response.data;
            //  switch (res.code) {
            //      case '200':

            //          break;
            //      case '301':

            //          break;
            //      case '304':

            //          break;
            //      case '3':
            //          showMessage(res.code + ":" + res.message);
            //          localStorage.setItem('sessionKey', '');
            //          localStorage.setItem('userName', '');
            //          router.push('/login');
            //          break;
            //      case '302':
            //          showMessage(res.code + ":" + res.message);
            //          localStorage.setItem('sessionKey', '');
            //          localStorage.setItem('userName', '');
            //          router.push('/login');
            //          break;
            //      default:
            //          showMessage(res.code + ":" + res.message);
            //          break;
            //  }
            return response;
        },
            error => {
                //   showMessage('服务器响应失败');
                return Promise.reject(error)
            }
        );

        const handleResult = (res) => {
            if (res.status == 200) {
                if(res.data.result){
                    return res.data.data;
                }
                else{
                    throw res.data;
                }
                
            }
            else {
                // MessageBox.alert(res.response.statusText || '抱歉,无任何错误信息返回!', '操作失败');
                throw res.response;
            }
        }

        Vue.prototype.$http = {
            async get(url) {
                // block.block();
                const res = await axios.get(url).catch(res => res);
                // block.unblock();
                return handleResult(res);

            },
            async post(url, data) {
                // block.block();
                const res = await axios.post(url, data).catch(res => res);
                // block.unblock();
                return handleResult(res);
            }
        }
    }
}