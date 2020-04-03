<template>
  <div class="articles-read">
    <div class="container">
      <div class="row">
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 p0 m-auto"
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
    return { getRgArticlesList }
  },
  data () {
    return {
      rgArticlesList: [],
      rgLink: function (key) {
        window.open(key)
      }
    }
  },
  created () {
    const result = this.getRgArticlesList.data.articleFeed.items.edges
    result.forEach(element => {
      this.rgArticlesList.push({
        key: element.node.originalUrl,
        value: element.node.title,
        likes: element.node.likeCount,
        time: element.node.updatedAt.substr(0, 10),
        author: element.node.user.username
      })
    })
  },
  mounted () {
    this.$nextTick(function () {
      const example2 = window.document.getElementById('example2')
      new Sortable(example2, {
        animation: 150,
        ghostClass: 'blue-background-class'
      })
    })
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
  float: left;
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
.m-auto {
  margin: 0 auto;
  float: unset;
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
