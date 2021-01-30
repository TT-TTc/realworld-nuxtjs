<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="form.image"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="form.username"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  v-model="form.bio"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  v-model="form.email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  v-model="form.password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
import { mapState, mapMutations } from 'vuex'
const Cookie = require('js-cookie')

export default {
  middleware: 'authenticated',
  name: 'SettingIndex',
  data() {
    return {
      form: {},
    }
  },
  computed: {
    ...mapState(['user']),
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.user))
  },
  methods: {
    ...mapMutations(['clearUser', 'setUser']),
    logout() {
      Cookie.remove('user')
      this.clearUser()
      this.$router.push({ name: 'home' })
    },
    async onSubmit() {
      try {
        // 提交表单请求
        const { data } = await updateUser(this.form)
        this.setUser(data.user)
        this.$router.push({
          name: 'profile',
          params: {
            username: data.user.username,
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
