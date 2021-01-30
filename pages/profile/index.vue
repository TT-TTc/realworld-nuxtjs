<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>
            <nuxt-link
              :to="{ name: 'settings' }"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-plus-round"></i>
              &nbsp; Edit Profile Settings
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'my_article' }"
                  :to="{
                    name: 'profile',
                    query: { tab: 'my_article' },
                    params: {
                      username: author,
                    },
                  }"
                  exact
                  >My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'favorited_article' }"
                  :to="{
                    name: 'profile',
                    query: { tab: 'favorited_article' },
                    params: {
                      username: author,
                    },
                  }"
                  exact
                  >Favorited Articles
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
              <ul class="tag-list">
                <li
                  class="tag-default tag-pill tag-outline"
                  v-for="(tag, index) of article.taglist"
                  :key="index"
                >
                  {{ tag }}
                </li>
              </ul>
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
                  query: { page: item, tab: tab },
                  params: {
                    username: author,
                  },
                }"
                >{{ item }}</nuxt-link
              >
            </li>
          </ul>
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

import { mapState } from 'vuex'

export default {
  middleware: 'authenticated',
  name: 'UserProfile',
  async asyncData({ query, store, params }) {
    // 获取分页
    const page = Number.parseInt(query.page || 1),
      limit = 10,
      tab = query.tab || 'my_article',
      author = params.username || null

    const { data } = await getArticles({
      limit,
      page,
      // 偏移量
      offset: (page - 1) * limit,
      [tab === 'my_article' ? 'author' : 'favorited']: author,
    })
    const articles = data.articles
    const articlesCount = data.articlesCount

    articles.forEach((item) => (item.favoriteDisabled = false))
    return {
      articles,
      articlesCount,
      page,
      limit,
      tab,
      author,
    }
  },
  watchQuery: ['page', 'tab'],
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
