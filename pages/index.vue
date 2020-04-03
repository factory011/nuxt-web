<template>
  <div class="home">
    <section class="colored-section hero-header demo-section">
      <div class="container">
        <div class="row">
          <div class="col-md-8 offset-md-2 m-auto">
            <div class="brand">
              <h1 class="text-white">前端那碗面</h1>
              <h6 class="mb-5">
                The bowl of noodles at the front-end
              </h6>

              <nuxt-link to="/awesomeExamples"
                         class="btn btn-light btn-round mr-3">
                <!-- <em class="glyphicon glyphicon-eye-open"></em> -->
                Awesome Examples
              </nuxt-link>
              <a @click="linkBlog()"
                 class="btn btn-primary btn-round mr-3">
                <!-- <em class="glyphicon glyphicon-eye-open"></em> -->
                Personal Blog
              </a>
              <nuxt-link to="/articlesRead"
                         class="btn btn-danger btn-round">
                <!-- <em class="glyphicon glyphicon-eye-open"></em> -->
                Wonderful Article
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="footer ">
      <div class="footer-container">
        <hr>
        <div class="footer-row footer-bottom">
          <ul class="list-inline text-center">
            <li><a href="http://www.beian.miit.gov.cn/"
                 target="_blank">鄂ICP备20004425</a></li>
            <!-- <li>京公网安备11010802014853</li> -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      linkBlog: function () {
        window.location.href = 'http://liangh.top:8080'
      }
    }
  }

}
</script>

<style scoped>
@import '~assets/css/index.css';
.home {
  background-color: #141515;
}
.hero-header {
  height: 100vh;
  background-image: url(./../assets/img/bg3.jpg);
}
.m-auto {
  margin: 0 auto;
  width: 100%;
}
.footer,
.footer a {
  color: #777;
}
.footer {
  position: fixed;
  bottom: 20px;
  width: 100%;
}
.footer-container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.footer-row {
  margin-right: -15px;
  margin-left: -15px;
}
.footer-bottom {
  font-size: 13px;
}
.list-inline {
  padding-left: 0;
  margin-left: -5px;
  list-style: none;
  width: 100%;
}
.text-center {
  text-align: center;
}
ol,
ul {
  margin-top: 0;
  margin-bottom: 10px;
}
.footer-bottom ul > li {
  padding: 0;
}
.list-inline > li {
  display: inline-block;
  padding-right: 5px;
  padding-left: 5px;
}
.footer-bottom ul > li + li:before {
  padding: 0 10px;
  color: #ccc;
  content: '|';
}
</style>
