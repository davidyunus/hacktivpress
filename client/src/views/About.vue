<template>
  <div>
    <navbar/>

    <div>
      <h4 style="text-align: left; margin-left: 20px">Filter By Category</h4>
      <select class="filter form-control" v-model="category" id="exampleFormControlSelect1">
        
        <option>Action</option>
        <option>Life</option>
        <option>Inspiration</option>
      </select>
      <button class="btn btn-primary float-left" @click="filter" type="submit" style="margin-left:20px; margin-top: 20px;">Filter</button>
      <br><br><br>
    </div>

    <div>
      <h4 style="text-align: left; margin-left: 20px">Search By Author</h4>
        <input class="float-left" type="text" v-model="author" id="exampleFormControlSelect2" style="margin-left:20px; margin-top: 20px;">
        <br><br><br>
      <button class="btn btn-primary float-left" @click="filter" type="submit" style="margin-left:20px;">Search Author</button>
      <br><br><br>
    </div>

    <!-- Button trigger modal -->
    <button type="button" v-if="token == true" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" style="margin-bottom: 20px;">
      Add New Article
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add New Article</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Title</label>
              <input class="form-control" v-model="title" type="text" placeholder="Title">
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Content</label>
              <textarea class="form-control" v-model="content" id="exampleFormControlTextarea1" rows="5"></textarea>
            </div>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Category</label>
            <select class="filter form-control" v-model="category" id="exampleFormControlSelect1">
              <option>Action</option>
              <option>Life</option>
              <option>Inspiration</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlFile1">Input Photo</label>
            <input type="file" id="image" class="form-control-file">
          </div>
          <div class="modal-footer">
            <button type="button" @click="addArticle" class="btn btn-primary" data-dismiss="modal">Post</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <ArticleList/>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'
import navbar from '@/components/NavBar.vue'

export default {
  name: 'questions',
  components: {
    ArticleList,
    navbar
  },
  data () {
    return {
      title: '',
      content: '',
      category: '',
      token: '',
      author: '',
    }
  },
  methods: {
    addArticle: function () {
      const fileInput = document.querySelector('#image')

      let payload = new FormData()

      payload.append('image', fileInput.files[0])
      payload.append('title', this.title)
      payload.append('content', this.content)
      payload.append('category', this.category)

      this.$store.dispatch('addArticle', payload)
    },
    filter: function () {
      let payload = this.category

      this.$store.dispatch('filter', payload)
    },
    search: function() {

    }
  },
  created () {
    let token = localStorage.getItem('token')

    if (token) {
      this.token = true
    }
  }
}
</script>

<style scoped>
  .filter {
    width: 300px;
  }

  
</style>
