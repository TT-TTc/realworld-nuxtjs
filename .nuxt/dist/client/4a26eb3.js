(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{185:function(t,e,r){"use strict";r.d(e,"d",(function(){return c})),r.d(e,"f",(function(){return o})),r.d(e,"a",(function(){return l})),r.d(e,"b",(function(){return m})),r.d(e,"c",(function(){return d})),r.d(e,"e",(function(){return f}));var n=r(61),c=function(t){return Object(n.b)({url:"/api/articles",method:"get",params:t})},o=function(t){return Object(n.b)({url:"/api/articles/feed",method:"get",params:t})},l=function(t){return Object(n.b)({url:"/api/articles/".concat(t,"/favorite"),method:"POST"})},m=function(t){return Object(n.b)({url:"/api/articles/".concat(t,"/favorite"),method:"DELETE"})},d=function(t){return Object(n.b)({url:"/api/articles/".concat(t),method:"GET"})},f=function(t){return Object(n.b)({url:"/api/articles/".concat(t,"/comments"),method:"GET"})}},259:function(t,e,r){"use strict";r.r(e);r(36);var n=r(3),c=r(185),o=r(203),l=r.n(o),m={name:"ArticleMeta",head:function(){return{title:"".concat(this.article.title," - readWorld"),meta:[{hit:"description",name:"description",content:this.article.description}]}},props:{article:{type:Object,required:!0}}},d=r(23),f=Object(d.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"article-meta"},[r("nuxt-link",{attrs:{to:{name:"profile",params:{username:t.article.author.username}}}},[r("img",{attrs:{src:t.article.author.img}})]),t._v(" "),r("div",{staticClass:"info"},[r("nuxt-link",{staticClass:"author",attrs:{to:{name:"profile",params:{username:t.article.author.username}}}},[t._v("\n      "+t._s(t.article.author.username)+"\n    ")]),t._v(" "),r("span",{staticClass:"date"},[t._v(" "+t._s(t._f("date")(t.article.createdAt,"MMM DD,YYYY"))+" ")])],1),t._v(" "),r("button",{staticClass:"btn btn-sm btn-outline-secondary",class:{active:t.article.author.following}},[r("i",{staticClass:"ion-plus-round"}),t._v("\n      Follow Eric Simons "),r("span",{staticClass:"counter"},[t._v("(10)")])]),t._v("\n    \n  "),r("button",{staticClass:"btn btn-sm btn-outline-primary",class:{active:t.article.favorited}},[r("i",{staticClass:"ion-heart"}),t._v("\n      Favorite Post "),r("span",{staticClass:"counter"},[t._v("(29)")])])],1)}),[],!1,null,null,null).exports,v=(r(60),r(24),r(25),r(11),r(49),r(34)),_=r(46);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var C={name:"ArticleComment",props:{article:{type:Object,required:!0}},data:function(){return{comments:[]}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(v.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(_.b)(["user"])),mounted:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.e)(t.article.slug);case 2:r=e.sent,data=r.data,t.comments=data.comments;case 5:case"end":return e.stop()}}),e)})))()}},O={components:{ArticleMeta:f,ArticleComments:Object(d.a)(C,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("form",{staticClass:"card comment-form"},[t._m(0),t._v(" "),r("div",{staticClass:"card-footer"},[r("img",{staticClass:"comment-author-img",attrs:{src:t.user.image}}),t._v(" "),r("button",{staticClass:"btn btn-sm btn-primary"},[t._v("\n        Post Comment\n      ")])])]),t._v(" "),t._l(t.comments,(function(e){return r("div",{key:e.id,staticClass:"card"},[r("div",{staticClass:"card-block"},[r("p",{staticClass:"card-text"},[t._v("\n        "+t._s(e.body)+"\n      ")])]),t._v(" "),r("div",{staticClass:"card-footer"},[r("nuxt-link",{staticClass:"comment-author",attrs:{to:{name:"profile",params:{username:e.author.username}}}},[r("img",{staticClass:"comment-author-img",attrs:{src:e.author.img}})]),t._v("\n       \n      "),r("nuxt-link",{staticClass:"comment-author",attrs:{to:{name:"profile",params:{username:e.author.username}}}},[t._v("\n        "+t._s(e.author.username)+"\n      ")]),t._v(" "),r("span",{staticClass:"date-posted"},[t._v("\n        "+t._s(t._f("date")(e.createdAt,"MMM DD, YYYY"))+"\n      ")])],1)])}))],2)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-block"},[e("textarea",{staticClass:"form-control",attrs:{placeholder:"Write a comment...",rows:"3"}})])}],!1,null,null,null).exports},name:"ArticleIndex",asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,data,article,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.params,e.next=3,Object(c.c)(r.slug);case 3:return n=e.sent,data=n.data,article=data.article,o=new l.a,article.body=o.render(article.body),e.abrupt("return",{article:data.article});case 9:case"end":return e.stop()}}),e)})))()}},j=Object(d.a)(O,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"article-page"},[r("div",{staticClass:"banner"},[r("div",{staticClass:"container"},[r("h1",[t._v(t._s(t.article.title))]),t._v(" "),r("article-meta",{attrs:{article:t.article}})],1)]),t._v(" "),r("div",{staticClass:"container page"},[r("div",{staticClass:"row article-content"},[r("div",{staticClass:"col-md-12",domProps:{innerHTML:t._s(t.article.body)}})]),t._v(" "),r("hr"),t._v(" "),r("div",{staticClass:"article-actions"},[r("article-meta",{attrs:{article:t.article}})],1),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-xs-12 col-md-8 offset-md-2"},[r("article-comments",{attrs:{article:t.article}})],1)])])])}),[],!1,null,null,null);e.default=j.exports}}]);