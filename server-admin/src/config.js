// 发布版本
const version = '1.0.0'
// 发布日期
const bundleVersion = '20210420'


// 白名单【非网关】
const whitelist = [
  // { name: 'commonUpload', path: 'fileUpload/upload' }
]

// 服务接口地址
const services = {
  commonBase: {
    url: import.env.VITE_APP_API,
    port: import.env.VITE_APP_API_PORT
  }
}


export default {
  bundleVersion: bundleVersion,
  version: version,
  apiUrl: import.env.VITE_APP_API,
  apiBaseUrl:import.env.VITE_BASE_URL,
  apiConfig: services,
  whitelist,
}
