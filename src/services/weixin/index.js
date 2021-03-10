import sha1 from "js-sha1"
import xhr from "../xhr"
import config from "./config"

const { appId } = config

const { login } = xhr

let state = {
  isReady: false,
  error: null,
}

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// const config = ticket => {
//   const timestamp = Math.floor(+Date.now() / 1000)
//   const url = window.location.href.split("#")[0]
//   const noncestr = uuidv4()
//   const strArr = [
//     "jsapi_ticket=",
//     ticket,
//     "&noncestr=",
//     noncestr,
//     "&timestamp=",
//     timestamp,
//     "&url=",
//     url,
//   ]
//   const str = strArr.join("")
//   const shaVal = sha1(str)

//   wx.config({
//     beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: "wx58b95f0eff662732", // 必填，企业微信的corpID
//     timestamp, // 必填，生成签名的时间戳
//     nonceStr, // 必填，生成签名的随机串
//     signature: shaVal, // 必填，签名，见 附录-JS-SDK使用权限签名算法
//     jsApiList: ["openEnterpriseChat"], // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
//   })

//   wx.ready(function () {
//     // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
//     state = {
//       isReady: true,
//       error: null,
//     }
//   })

//   wx.error(function (res) {
//     // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
//     state = {
//       isReady: false,
//       error: res,
//     }
//   })
// }

const _config = ticket => {
  return new Promise((resolve, reject) => {
    state = {
      isReady: false,
      error: null,
    }

    const timestamp = Math.floor(+Date.now() / 1000)
    const url = window.location.href.split("#")[0]
    const nonceStr = uuidv4()
    const strArr = [
      "jsapi_ticket=",
      ticket,
      "&noncestr=",
      nonceStr,
      "&timestamp=",
      timestamp,
      "&url=",
      url,
    ]
    const str = strArr.join("")
    const shaVal = sha1(str)

    wx.config({
      beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId, // 必填，企业微信的corpID
      timestamp, // 必填，生成签名的时间戳
      nonceStr, // 必填，生成签名的随机串
      signature: shaVal, // 必填，签名，见 附录-JS-SDK使用权限签名算法
      jsApiList: ["openEnterpriseChat"], // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
    })

    wx.ready(function () {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      state = {
        isReady: true,
        error: null,
      }
      resolve()
    })

    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      state = {
        isReady: false,
        error: res,
      }
      reject(res)
    })
  })
}

// 注意这里是一个 高级函数
const _openChat = userid => () => {
  return new Promise((resolve, reject) => {
    wx.openEnterpriseChat({
      // 注意：userIds和externalUserIds至少选填一个。内部群最多2000人；外部群最多500人；如果有微信联系人，最多40人
      userIds: userid, //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。 huangxinp
      // externalUserIds: "wmEAlECwAAHrbWYDOK5u3Bf13xlYDAAA;wmEAlECwAAHibWYDOK5u3Af13xlYDAAA", // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
      groupName: "", // 必填，会话名称。单聊时该参数传入空字符串""即可。
      success: function (res) {
        resolve()
      },
      fail: function (res) {
        // if (res.errMsg.indexOf("function not exist") > -1) {
        //   alert("版本过低请升级")
        // } else {
        //   alert("会话开启失败")
        // }
        // console.error(res)
        reject(res)
      },
    })
  })
}

export const openChat = userid => {
  return state.isReady
    ? _openChat(userid)
    : login()
        .then(_config)
        .then(_openChat(userid))
        .catch(error => console.error(error))
}

export default {
  openChat,
}
