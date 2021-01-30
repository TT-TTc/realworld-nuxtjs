<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.title"
                  required
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="form.description"
                  required
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  v-model="form.body"
                  required
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="form.tagList"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, createArticle, updateArticle } from '@/api/article'

export default {
  middleware: 'authenticated',
  name: 'EditIndex',
  async asyncData({ params }) {
    if (!params.slug) return
    const { data } = await getArticle(params.slug)
    return {
      data,
    }
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        body: '',
        tagList: '',
      },
    }
  },
  created() {
    if (this.$route.params.slug) {
      this.form = this.data.article
    }
  },
  methods: {
    async onSubmit() {
      try {
        // 提交表单请求
        this.form.tagList = Array.isArray(this.form.tagList)
          ? this.form.tagList
          : this.form.tagList.split(',')
          
        const slug = this.$route.params.slug
        const loadData = slug ? updateArticle : createArticle

        const { data } = await loadData(this.form, slug)

        this.$router.push({
          name: 'article',
          params: {
            slug: data.article.slug,
          },
        })
      } catch (err) {
        this.errors = err.response.data.errors
      }
    },
  },
}
</script>

<style></style>
