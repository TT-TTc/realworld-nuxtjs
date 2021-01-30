<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.img" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date"> {{ article.createdAt | date('MMM DD,YYYY') }} </span>
    </div>
    <template v-if="isUser">
      <span ng-show="$ctrl.canModify" class="ng-scope">
        <nuxt-link
          class="btn btn-outline-secondary btn-sm"
          href="#/editor/q12421-486mj6"
          :to="{
            name: 'editor',
            params:{
              slug:article.slug
            }
          }"
        >
          <i class="ion-edit"></i> Edit Article
        </nuxt-link>

        <button class="btn btn-outline-danger btn-sm">
          <i class="ion-trash-a"></i> Delete Article
        </button>
      </span>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{
          active: article.author.following,
        }"
      >
        <i class="ion-plus-round"></i>
        &nbsp; Follow Eric Simons <span class="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
          active: article.favorited,
        }"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post <span class="counter">(29)</span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ArticleMeta',
  head() {
    return {
      title: `${this.article.title} - readWorld`,
      meta: [
        {
          hit: 'description',
          name: 'description',
          content: this.article.description,
        },
      ],
    }
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['user']),
    isUser() {
      console.log(this.article.author.username, this.user.username)
      return this.article.author.username === this.user.username
    },
  },
}
</script>

<style></style>
