<template>
  <div class="articles-read">
    <div class="container">
      <div class="row">
        <div class="search col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text"
                    id="basic-addon1">@</span>
            </div>
            <input type="text"
                   class="form-control"
                   placeholder="Search for..."
                   aria-label="Search for..."
                   v-model="searchValue"
                   aria-describedby="basic-addon1">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <h3>Articles read</h3>
          <div id="example1">
            <div class="list-group-item art-line"
                 v-for="(item, index) in lfArticlesList"
                 :key="index"
                 @click="lfLink(item.key)"
                 draggable="false">
              <div class="title ellipsis">{{item.value}}</div>
              <div class="edit-info"><span>{{item.time}}</span><span>{{item.author}}</span></div>
              <div class="rg-like"><span class="icon icon-support"></span><span>{{item.likes}}</span></div>
            </div>
          </div>
        </div>

        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 p0"
             v-if="true">
          <h3>Recommended articles</h3>
          <div id="example2"
               class="col">
            <div class="list-group-item box"
                 v-for="(item, index) in rgArticlesList"
                 :key="index"
                 @click="rgLink(item.key)"
                 draggable="false">
              <div class="rg-title"><button type="button"
                        class="btn btn-link ellipsis">{{item.value}}</button></div>
              <div class="author-info">
                <span class="icon icon-time"></span><span>{{item.time}}</span>
                <span class="icon icon-user"></span><span>{{item.author}}</span>
                <span class="icon icon-support"></span><span>{{item.likes}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  async asyncData ({ app }) {
    const getLfArticlesList = await app.$axios.$post('https://web-api.juejin.im/query', {
      'operationName': '',
      'query': '',
      'variables': {
        'tags': [
        ],
        'category': '5562b415e4b00c57d9b94ac8',
        'first': 20,
        'after': '',
        'order': 'POPULAR'
      },
      'extensions': {
        'query': {
          'id': '653b587c5c7c8a00ddf67fc66f989d42'
        }
      }
    })
    const getRgArticlesList = await app.$axios.$post('https://web-api.juejin.im/query', {
      'operationName': '',
      'query': '',
      'variables': {
        'tags': [
        ],
        'category': '5562b415e4b00c57d9b94ac8',
        'first': 20,
        'after': '',
        'order': 'THREE_DAYS_HOTTEST'
      },
      'extensions': {
        'query': {
          'id': '653b587c5c7c8a00ddf67fc66f989d42'
        }
      }
    })
    return { getLfArticlesList, getRgArticlesList }
  },
  data () {
    return {
      lfArticlesList: [],
      rgArticlesList: [],
      searchValue: '',
      historyList: [],
      requestData: function (params) {
        const data = {
          'operationName': '',
          'query': '',
          'variables': {
            'tags': [
            ],
            'category': '5562b415e4b00c57d9b94ac8',
            'first': 20,
            'after': '',
            'order': params
          },
          'extensions': {
            'query': {
              'id': '653b587c5c7c8a00ddf67fc66f989d42'
            }
          }
        }
        return data
      },
      articlesList: function (element) {
        const data = {
          key: element.node.originalUrl,
          value: element.node.title,
          likes: element.node.likeCount,
          time: element.node.updatedAt.substr(0, 10),
          author: element.node.user.username
        }
        return data
      },
      lfLink: function (key) {
        window.open(key)
      },
      rgLink: function (key) {
        window.open(key)
      },
      searchGo: function () {
        const that = this
        this.lfArticlesList = this.lfArticlesList.filter(function (item) {
          return item.value.indexOf(that.searchValue) !== -1
        })
      }
    }
  },
  created () {
    const resultLf = this.getLfArticlesList.data.articleFeed.items.edges
    resultLf.forEach(element => {
      this.lfArticlesList.push(this.articlesList(element))
    })
    this.historyList = this.lfArticlesList

    const resultRg = this.getRgArticlesList.data.articleFeed.items.edges
    resultRg.forEach(element => {
      this.rgArticlesList.push(this.articlesList(element))
    })
  },
  mounted () {
    this.$nextTick(function () {
      const example1 = document.getElementById('example1')
      new Sortable(example1, {
        animation: 150,
        ghostClass: 'blue-background-class'
      })

      const example2 = document.getElementById('example2')
      new Sortable(example2, {
        animation: 150,
        ghostClass: 'blue-background-class'
      })
    })
  },
  watch: {
    searchValue (newData) {
      const that = this
      const arr = this.historyList.filter(function (item) {
        return item.value.toLowerCase().indexOf(that.searchValue.toLowerCase()) !== -1
      })
      this.lfArticlesList = arr
      if (newData === '') {
        this.lfArticlesList = this.historyList
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100%;
  max-width: 100%;
  min-width: 100%;
}
.blue-background-class {
  background-color: skyblue;
}
.search {
  margin-top: 20px;
}
.search .input-group {
  padding-right: 20px;
}
.btn-link {
  padding: 0;
  color: #0366d6;
}
.art-line {
  margin-top: 15px;
  margin-right: 15px;
  border-radius: 4px;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
.box {
  float: left;
  margin-top: 15px;
  width: calc(49.9% - 18px);
  height: 160px;
  border-radius: 4px;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 24px 20px;
}
.box:nth-child(odd) {
  margin-right: 20px;
}
.art-line .rg-like {
  position: absolute;
  right: 10px;
  top: 20px;
}
.art-line .rg-like span {
  vertical-align: middle;
}
.art-line .title {
  width: 24vw;
  vertical-align: middle;
}
.art-line .edit-info {
  font-size: 14px;
  color: #c2c5cd;
}
.art-line .edit-info span:first-child {
  margin-right: 10px;
}
.rg-title {
  font-size: 16px;
}
.author-info {
  position: absolute;
  left: 20px;
  bottom: 24px;
}
.author-info span:nth-child(even) {
  margin-right: 10px;
}
.author-info span {
  vertical-align: middle;
}
.icon {
  margin-right: 3px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: 100% 100%;
}
.icon-support {
  background: url('~assets/img/support.png') no-repeat center;
}
.icon-user {
  background: url('~assets/img/user.png') no-repeat center;
}
.icon-time {
  background: url('~assets/img/up_time.png') no-repeat center;
}
.p0 {
  padding: 0;
}
.pl20 {
  padding-left: 20px;
}
.pr20 {
  padding-right: 20px;
}
.ml {
  margin-left: 20px;
}
.mr20 {
  margin-right: 20px;
}
.fr {
  float: right;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  width: 24vw;
  text-align: left;
}
</style>
