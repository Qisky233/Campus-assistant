import Vue from 'vue';
import Vuex from 'vuex';
import { DOMParser } from 'xmldom'; // 确保路径正确

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    jsessionid: '',
    tgt: '',
    ticket: '',
    userInfo: {
      xm: '未登录',
    }
  },
  mutations: {
    setJsessionid(state, jsessionid) {
      state.jsessionid = jsessionid;
    },
    setTgt(state, tgt) {
      state.tgt = tgt;
    },
    setTicket(state, ticket) {
      state.ticket = ticket;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    clearAuth(state) {
      state.jsessionid = '';
      state.tgt = '';
      state.ticket = '';
      state.userInfo = {
        xm: '未登录',
      };
    }
  },
  actions: {
    updateJsessionid({ commit }, jsessionid) {
      commit('setJsessionid', jsessionid);
    },
    updateTgt({ commit }, tgt) {
      commit('setTgt', tgt);
    },
    updateTicket({ commit }, ticket) {
      commit('setTicket', ticket);
    },
    updateUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
    },
    async fetchUserInfo({ state, commit }) {
      if (!state.jsessionid) {
        console.error("未获取到 JSESSIONID");
        uni.showToast({
          title: '未获取到 JSESSIONID',
          icon: 'none'
        });
        return;
      }
	  
	  try {
	    const response = await new Promise((resolve, reject) => {
	      uni.request({
	        url: `https://proxy-login.aluo18.top/userInfo?jsessionid=${state.jsessionid}`,
	        method: "GET",
	        success: (res) => {
	          if (res.statusCode === 200) {
	            resolve(res.data); // 返回响应数据
	          } else {
	            reject(new Error(`请求失败，状态码: ${res.statusCode}`));
	          }
	        },
	        fail: (err) => {
	          reject(err);
	        }
	      });
	    });
	  
	    // 存储用户信息到 Vuex
	    commit('setUserInfo', response.info);
		console.log(response.info)
	  } catch (err) {
	    console.error("请求失败:", err);
	    uni.showToast({
	      title: '获取用户信息失败，请检查网络或链接是否正确',
	      icon: 'none'
	    });
	  }

   //    try {
   //      const response = await new Promise((resolve, reject) => {
   //        uni.request({
   //          url: "https://jwgl.hnuu.edu.cn/hnlhdxjw/STU_BaseInfoAction.do?hidOption=InitData&menucode_current=S10101",
   //          method: "GET",
   //          header: {
   //            "Cookie": `JSESSIONID=${state.jsessionid}`,
   //            "Origin": "https://jwgl.hnuu.edu.cn",
   //            "Referer": "https://jwgl.hnuu.edu.cn/hnlhdxjw/student/stu.xsxj.xjda.jbxx.html?menucode=S10101"
   //          },
   //          success: (res) => {
   //            if (res.statusCode === 200) {
   //              resolve(res.data); // 返回响应数据
   //            } else {
   //              reject(new Error(`请求失败，状态码: ${res.statusCode}`));
   //            }
   //          },
   //          fail: (err) => {
   //            reject(err);
   //          }
   //        });
   //      });

   //      // 使用 xmldom 解析 XML 数据
   //      const parser = new DOMParser();
   //      const xmlDoc = parser.parseFromString(response, "text/xml");

   //      // 提取所有字段
   //      const userInfo = {
   //         xb: xmlDoc.getElementsByTagName("xb")[0]?.textContent || "未知",
			// sysf: xmlDoc.getElementsByTagName("sysf")[0]?.textContent || "未知",
			// bjmc: xmlDoc.getElementsByTagName("bjmc")[0]?.textContent || "未知",
			// pv8: xmlDoc.getElementsByTagName("pv8")[0]?.textContent || "未知",
			// wyyz: xmlDoc.getElementsByTagName("wyyz")[0]?.textContent || "未知",
			// pv7: xmlDoc.getElementsByTagName("pv7")[0]?.textContent || "未知",
			// jkzk: xmlDoc.getElementsByTagName("jkzk")[0]?.textContent || "未知",
			// rxfs: xmlDoc.getElementsByTagName("rxfs")[0]?.textContent || "未知",
			// rxqxl: xmlDoc.getElementsByTagName("rxqxl")[0]?.textContent || "未知",
			// sfpk: xmlDoc.getElementsByTagName("sfpk")[0]?.textContent || "未知",
			// jtpklx: xmlDoc.getElementsByTagName("jtpklx")[0]?.textContent || "未知",
			// zzmm: xmlDoc.getElementsByTagName("zzmm")[0]?.textContent || "未知",
			// xzsfzzpzmsc: xmlDoc.getElementsByTagName("xzsfzzpzmsc")[0]?.textContent || "未知",
			// ss_mc: xmlDoc.getElementsByTagName("ss_mc")[0]?.textContent || "未知",
			// kslb: xmlDoc.getElementsByTagName("kslb")[0]?.textContent || "未知",
			// xzbyzpsc: xmlDoc.getElementsByTagName("xzbyzpsc")[0]?.textContent || "未知",
			// zymc: xmlDoc.getElementsByTagName("zymc")[0]?.textContent || "未知",
			// yxb: xmlDoc.getElementsByTagName("yxb")[0]?.textContent || "未知",
			// jtlxrfs: xmlDoc.getElementsByTagName("jtlxrfs")[0]?.textContent || "未知",
			// whcj: xmlDoc.getElementsByTagName("whcj")[0]?.textContent || "未知",
			// dh: xmlDoc.getElementsByTagName("dh")[0]?.textContent || "未知",
			// syd: xmlDoc.getElementsByTagName("syd")[0]?.textContent || "未知",
			// hkxz: xmlDoc.getElementsByTagName("hkxz")[0]?.textContent || "未知",
			// whcd: xmlDoc.getElementsByTagName("whcd")[0]?.textContent || "未知",
			// jg: xmlDoc.getElementsByTagName("jg")[0]?.textContent || "未知",
			// rdtsj: xmlDoc.getElementsByTagName("rdtsj")[0]?.textContent || "未知",
			// srly: xmlDoc.getElementsByTagName("srly")[0]?.textContent || "未知",
			// pydx: xmlDoc.getElementsByTagName("pydx")[0]?.textContent || "未知",
			// ssxx: xmlDoc.getElementsByTagName("ssxx")[0]?.textContent || "未知",
			// xjkbh: xmlDoc.getElementsByTagName("xjkbh")[0]?.textContent || "未知",
			// sydw: xmlDoc.getElementsByTagName("sydw")[0]?.textContent || "未知",
			// zzsqlx: xmlDoc.getElementsByTagName("zzsqlx")[0]?.textContent || "未知",
			// byzp: xmlDoc.getElementsByTagName("byzp")[0]?.textContent || "未知",
			// gkzkzh: xmlDoc.getElementsByTagName("gkzkzh")[0]?.textContent || "未知",
			// rjsr: xmlDoc.getElementsByTagName("rjsr")[0]?.textContent || "未知",
			// txdz: xmlDoc.getElementsByTagName("txdz")[0]?.textContent || "未知",
			// rxh: xmlDoc.getElementsByTagName("rxh")[0]?.textContent || "未知",
			// sfzjh: xmlDoc.getElementsByTagName("sfzjh")[0]?.textContent || "未知",
			// gat: xmlDoc.getElementsByTagName("gat")[0]?.textContent || "未知",
			// bz: xmlDoc.getElementsByTagName("bz")[0]?.textContent || "未知",
			// xzrxhzpsc: xmlDoc.getElementsByTagName("xzrxhzpsc")[0]?.textContent || "未知",
			// xzgkzszpsc: xmlDoc.getElementsByTagName("xzgkzszpsc")[0]?.textContent || "未知",
			// xzsfzzpbmsc: xmlDoc.getElementsByTagName("xzsfzzpbmsc")[0]?.textContent || "未知",
			// hztj: xmlDoc.getElementsByTagName("hztj")[0]?.textContent || "未知",
			// dzyx: xmlDoc.getElementsByTagName("dzyx")[0]?.textContent || "未知",
			// xkml: xmlDoc.getElementsByTagName("xkml")[0]?.textContent || "未知",
			// lxr: xmlDoc.getElementsByTagName("lxr")[0]?.textContent || "未知",
			// pycc: xmlDoc.getElementsByTagName("pycc")[0]?.textContent || "未知",
			// ssjt: xmlDoc.getElementsByTagName("ssjt")[0]?.textContent || "未知",
			// jtlxr: xmlDoc.getElementsByTagName("jtlxr")[0]?.textContent || "未知",
			// zp: xmlDoc.getElementsByTagName("zp")[0]?.textContent || "未知",
			// ssdh: xmlDoc.getElementsByTagName("ssdh")[0]?.textContent || "未知",
			// mz: xmlDoc.getElementsByTagName("mz")[0]?.textContent || "未知",
			// cym: xmlDoc.getElementsByTagName("cym")[0]?.textContent || "未知",
			// sfzbm: xmlDoc.getElementsByTagName("sfzbm")[0]?.textContent || "未知",
			// csd: xmlDoc.getElementsByTagName("csd")[0]?.textContent || "未知",
			// kstz: xmlDoc.getElementsByTagName("kstz")[0]?.textContent || "未知",
			// syzy: xmlDoc.getElementsByTagName("syzy")[0]?.textContent || "未知",
			// nzsr: xmlDoc.getElementsByTagName("nzsr")[0]?.textContent || "未知",
			// sfzzm: xmlDoc.getElementsByTagName("sfzzm")[0]?.textContent || "未知",
			// rxnj: xmlDoc.getElementsByTagName("rxnj")[0]?.textContent || "未知",
			// gkksh: xmlDoc.getElementsByTagName("gkksh")[0]?.textContent || "未知",
			// zsjj: xmlDoc.getElementsByTagName("zsjj")[0]?.textContent || "未知",
			// kstc: xmlDoc.getElementsByTagName("kstc")[0]?.textContent || "未知",
			// lqzy: xmlDoc.getElementsByTagName("lqzy")[0]?.textContent || "未知",
			// yzbm: xmlDoc.getElementsByTagName("yzbm")[0]?.textContent || "未知",
			// yhxh: xmlDoc.getElementsByTagName("yhxh")[0]?.textContent || "未知",
			// csrq: xmlDoc.getElementsByTagName("csrq")[0]?.textContent || "未知",
			// xz: xmlDoc.getElementsByTagName("xz")[0]?.textContent || "未知",
			// xmpy: xmlDoc.getElementsByTagName("xmpy")[0]?.textContent || "未知",
			// jsjdj: xmlDoc.getElementsByTagName("jsjdj")[0]?.textContent || "未知",
			// gkzs: xmlDoc.getElementsByTagName("gkzs")[0]?.textContent || "未知",
			// fdy: xmlDoc.getElementsByTagName("fdy")[0]?.textContent || "未知",
			// zyfxmc: xmlDoc.getElementsByTagName("zyfxmc")[0]?.textContent || "未知",
			// bdtime: xmlDoc.getElementsByTagName("bdtime")[0]?.textContent || "未知",
			// xm: xmlDoc.getElementsByTagName("xm")[0]?.textContent || "未知",
			// zpxsh: xmlDoc.getElementsByTagName("zpxsh")[0]?.textContent || "未知",
			// pyfs: xmlDoc.getElementsByTagName("pyfs")[0]?.textContent || "未知",
			// xh: xmlDoc.getElementsByTagName("xh")[0]?.textContent || "未知"
   //      };

   //      // 存储用户信息到 Vuex
   //      commit('setUserInfo', userInfo);
   //    } catch (err) {
   //      console.error("请求失败:", err);
   //      uni.showToast({
   //        title: '获取用户信息失败，请检查网络或链接是否正确',
   //        icon: 'none'
   //      });
   //    }
    }
  },
  getters: {
    getJsessionid: state => state.jsessionid,
    getTgt: state => state.tgt,
    getTicket: state => state.ticket,
    getUserInfo: state => state.userInfo,
    isLoggedIn: state => !!state.jsessionid
  }
});

export default store;