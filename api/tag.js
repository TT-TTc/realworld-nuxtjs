import {request} from '@/plugins/request'

// 获取标签
export const getTags = () => {
  return request({
    url: '/api/tags',
    method: 'get',
  })
}