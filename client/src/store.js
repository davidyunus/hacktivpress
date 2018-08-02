import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      name: ''
    },
    articleList: [],
    article: {}
  },
  mutations: {
    setUser: function (state, payload) {
      state.user.username = payload.username
      state.user.name = payload.name
    },
    setArticles: function (state, payload) {
      state.articleList = payload
    },
    setArticleById: function (state, payload) {
      state.article = payload
    }
  },
  actions: {
    register: function (context, payload) {
      return new Promise((resolve, reject) => {
        console.log('register() -->')
        axios.post('http://localhost:3000/register', {
          username: payload.username,
          name: payload.name,
          password: payload.password
        })
          .then(function (response) {
            localStorage.setItem('username', payload.username)
            localStorage.setItem('token', response.data.token)
            context.commit('setUser', payload)
            console.log('hasil response function register() --->', response)
            resolve()
          })
          .catch(function (error) {
            console.log('error register() --->', error)
            reject(error)
          })
      })
    },
    login: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/login', {
          username: payload.username,
          password: payload.password
        })
          .then((response) => {
            localStorage.setItem('username', payload.username)
            localStorage.setItem('token', response.data.token)
            console.log('hasil function login() --->', response)
            console.log('hasil response.data.token', response.data.token)
            resolve()
          })
          .catch((error) => {
            console.log('error login() --->', error)
            reject(error)
          })
      })
    },
    loginFB: function () {
      axios.post('http://localhost:3000/loginFB')
      .then((response) => {
        console.log('response dari loginFB() ---> ',response)
        resolve()
      })
      .catch((err) => {

      })
    }
    ,
    getArticles: function (context) {
      axios
        .get('http://localhost:3000/article')
        .then(response => {
          console.log('hasil getArticle() --->', JSON.stringify(response.data.data))
          context.commit('setArticles', response.data.data)
        })
        .catch((error) => {
          console.log('error ---> ' + error)
        })
    },
    getArticleDetail: function (context, payload) {
      axios
        .get(`http://localhost:3000/article/${payload}`)
        .then(response => {
          console.log('hasil getArticleDetail() --->', JSON.stringify(response.data.data))
          context.commit('setArticleById', response.data.data)
        })
        .catch((error) => {
          console.log('error --->' + error)
        })
    },
    addArticle: function (context, payload) {
      let token = localStorage.getItem('token')

      axios.post('http://localhost:3000/article/post', payload, { headers: { token: token } })
        .then(function (response) {
          context.commit('setUser', response.data.user)
          axios
            .get('http://localhost:3000/article')
            .then(response => {
              console.log('hasil addArticle() --->', JSON.stringify(response.data.data))
              context.commit('setArticles', response.data.data)
            })
            .catch((error) => {
              console.log('error 3 --->', error)
            })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteArticle: function (context, payload) {
      let token = localStorage.getItem('token')

      axios
        .delete(`http://localhost:3000/article/delete/${payload}`, { headers: { token: token } })
        .then(response => {
          console.log('hasil function deleteArticle() --->', JSON.stringify(response))
        })
        .catch((error) => {
          console.log('error 3 --->', error)
        })
    },
    editArticle: function (context, payload) {
      let token = localStorage.getItem('token')

      axios.put(`http://localhost:3000/article/edit/${payload.id}`, {
        title: payload.title,
        content: payload.content
      }, { headers: { token: token } })
        .then(function (response) {
          context.commit('setUser', response.data.user)
          console.log('hasil function editArticle() --->', response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    filter: function (context, payload) {
      axios
        .get(`http://localhost:3000/article/by/${payload}`)
        .then(response => {
          console.log('hasil function filter() --->',JSON.stringify(response.data.data))
          context.commit('setArticles', response.data.data)
        })
        .catch((error) => {
          console.log('error ---> ', error)
        })
    }
  }
})
