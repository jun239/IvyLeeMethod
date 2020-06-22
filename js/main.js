(function() {
  'use strict';

  setTimeout(function(){
    document.querySelector('input[type="checkbox"]').setAttribute('checked',true);
  },100);

  var vm = new Vue({
    el: '#app',
    data: {
      newItem: "",
      todos: []
    },
    // 変更の監視
    watch: {
      todos: {
        handler: function() {
          // ローカルストレージに保存
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep: true
      }
    },
    // マウント処理
    mounted: function() {
      if (JSON.parse(localStorage.getItem('todos'))) {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
      } else {
        this.todos = [{
          id: 1,
          title: '',
          isDone: false
        }, {
          id: 2,
          title: '',
          isDone: false
        }, {
          id: 3,
          title: '',
          isDone: false
        }, {
          id: 4,
          title: '',
          isDone: false
        }, {
          id: 5,
          title: '',
          isDone: false
        }, {
          id: 6,
          title: '',
          isDone: false
        }]
      }
    },
    methods: {
      purge: function() {
        if (!confirm('全て削除してよろしいですか?')) {
          return;
        }
        // titleを空にする
        this.todos.forEach(element => {
          console.log(element);
          element.title = "";
          element.isDone = false;
        });
        $('input').prop('checked', false);
      },
      up: function(index) {
        // ひとつ前の配列と入れ替え
        if (!index == 0) {
          this.todos.splice(index - 1, 2, this.todos[index], this.todos[index -1]);
        }
      },
      down: function(index) {
        // ひとつ後ろの配列と入れ替え
        console.log(this.todos.length - 1);
        if (!(index == this.todos.length - 1)) {
          this.todos.splice(index, 2, this.todos[index + 1], this.todos[index]);
        }
      }
    },
    computed: {
      remaining: function() {
        return this.todos.filter(function(todo) {
          return todo.isDone;
        });
      }
    }
  });

})();