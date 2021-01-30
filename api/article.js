import {request} from '@/plugins/request'

// 获取公共文章列表
export const getArticles = (params) => {
  return request({
    url: '/api/articles',
    method: 'get',
    params,
  })
}

// 获取用户关注的feed
export const getFeedArticles = (params) => {
  return request({
    url: '/api/articles/feed',
    method: 'get',
    params,
  })
}
// 文章点赞
export const addFavorite = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'POST',
  })
}
// 文章取消点赞
export const deleteFavorite = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'DELETE',
  })
}
// 获取文章详情
export const getArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'GET',
  })
}


// 获取评论
export const getComments = (slug) => {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: 'GET',
  })
}


// 创建文章
export const createArticle = (data) => {
  return request({
    url: '/api/articles',
    method: 'POST',
    data
  })
}
// 更新文章
export const updateArticle = (data,slug) => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'PUT',
    data
  })
}