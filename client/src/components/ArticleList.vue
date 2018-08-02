<template>
  <div>
    <!-- {{ questionList }} -->
    
    <div v-for="(article, index) in articleList" v-bind:key='index' class="card">
      <h5 class="card-header">{{ article.title }}</h5>
      <div class="card-body">
        <img class="card-img-top" :src="article.image" alt="Card image cap" style="height: 100px; width: 100px; border-radius: 50%;">
        <h5 class="thread">Thread</h5>
        <h6 class="card-title">{{ article.content }}</h6>
        <h6 class="card-title" style="text-align: right; padding-right: 10px;">Category : {{article.category}}</h6>
        <p class="card-text">Author : {{ article.author.name }}</p>
        <!-- <p class="card-text">{{ question._id }}</p> -->
        <a href="#" @click="getArticle(article._id)" class="btn btn-primary">Detail</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ArticleList',
  data () {
    return {

    }
  },
  methods: {
    getArticle: function (articleId) {
      let payload = articleId

      this.$store.dispatch('getArticleDetail', payload)

      this.$router.push('/detail')
    }
  },
  computed: {
    ...mapState(['articleList'])
  },
  created () {
    let payload = localStorage.getItem('token')

    this.$store.dispatch('getArticles', payload)
  }
}
</script>

<style>
  .card-title {
    position: relative;
    left: auto;
    text-align: left;
  }

  .thread {
    position: relative;
    left: auto;
    text-align: left;
    text-decoration: underline;
  }

  .card-text {
    text-align: right;
    padding-right: 10px;
  }

  a .button-primary {
    text-align: right;
    color: red;
  }
</style>
