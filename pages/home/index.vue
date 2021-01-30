<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  :to="{ name: 'home', query: { tab: 'your_feed' } }"
                  exact
                  >Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  :to="{ name: 'home', query: { tab: 'global_feed' } }"
                  exact
                  >Global Feed
                </nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tag' }"
                  :to="{ name: 'home', query: { tab: 'tag' } }"
                  exact
                  >#{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article of articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: { username: article.author.username },
                }"
              >
                <img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <!-- <a href="" class="author">Eric Simons</a> -->
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: { username: article.author.username },
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{
                  article.createdAt | date('MMM DD,YYYY')
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right "
                :class="{ active: article.favorited }"
                :disabled="article.favoriteDisabled"
                @click="onFavorite(article)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{ name: 'article', params: { slug: article.slug } }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <!-- 分页 -->
          <ul class="pagination">
            <li
              class="page-item"
              :class="{ active: item === page }"
              v-for="item of tolalPage"
              :key="item"
            >
              <nuxt-link
                class="page-link"
                :to="{
                  name: 'home',
                  query: { page: item, tag: $route.query.tag, tab: tab },
                }"
                >{{ item }}</nuxt-link
              >
            </li>
          </ul>
        </div>
        <!-- tag标签列表 -->
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                :to="{ name: 'home', query: { tag: item, tab: 'tag' } }"
                v-for="(item, index) of tags"
                :key="index"
                class="tag-pill tag-default"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getFeedArticles,
  addFavorite,
  deleteFavorite,
} from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'

export default {
  name: 'HomeIndex',
  async asyncData({ query, store }) {
    // 获取分页
    const page = Number.parseInt(query.page || 1),
      limit = 10,
      { tag } = query,
      tab = query.tab || 'global_feed'
    // 根据用户状态进行接口调用的判断
    const loadArticles =
      store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles

    const [articleRes, tagsRes] = await Promise.all([
      loadArticles({
        page,
        // 偏移量
        offset: (page - 1) * limit,
        tag,
      }),
      // 获取tag标签列表
      getTags(),
    ])
    const { articles, articlesCount } = articleRes.data
    const { tags } = tagsRes.data
    articles.forEach((item) => (item.favoriteDisabled = false))
    return {
      articles,
      articlesCount,
      page,
      limit,
      tags,
      tag,
      tab,
    }
  },
  // 用于监听query中的属性变化,而不是监听暴露出的对象中的属性
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    tolalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    },
  },
  methods: {
    async onFavorite(article) {
      console.log(article)
      article.favoriteDisabled = true
      if (article.favorited) {
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    },
  },
}
</script>

<style></style>
