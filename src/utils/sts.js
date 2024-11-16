import OSS from 'ali-oss'
import { OSS_CONFIG } from '@/constants'
import { getOssToken } from '@/api/sys'

export const getOssClient = async () => {
  const res = await getOssToken()

  return new OSS({
    bucket: OSS_CONFIG.bucket, // 桶名称
    region: OSS_CONFIG.region, // 地域节点
    accessKeyId: res.Credentials.AccessKeyId, // 阿里云颁发给用户的访问服务所用的密钥ID
    accessKeySecret: res.Credentials.AccessKeySecret, // 阿里云颁发给用户的访问服务所用的密钥Secret
    stsToken: res.Credentials.SecurityToken, // 临时访问凭证 安全令牌
    expiration: res.Credentials.Expiration, // 临时访问凭证的有效期

    // 刷新 token，在 token 过期后自动调用（但是并不生效，可能会在后续的版本中修复）
    refreshSTSToken: async () => {
      // 向您搭建的STS服务获取临时访问凭证。
      const res = await getOssToken()
      return {
        accessKeyId: res.Credentials.AccessKeyId,
        accessKeySecret: res.Credentials.AccessKeySecret,
        stsToken: res.Credentials.SecurityToken
      }
    },
    // 刷新临时访问凭证的时间间隔，单位为毫秒。
    refreshSTSTokenInterval: 5 * 1000
  })
}
