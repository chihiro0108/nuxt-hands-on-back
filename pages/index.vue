<template>
  <div v-if="user"> <!-- v-ifを追加 -->
    <p>名前：{{user.name}}</p>
    <AddTodo @submit="addTodo" />
    <TodoList :todos="todos" />
  </div>
</template>
<script>
    import AddTodo from "@/components/AddTodo";
    import TodoList from "@/components/TodoList";
    import { mapState } from 'pinia';
    import { useAuthStore } from '@/stores/auth';
  
    export default {
      components: {
        AddTodo,
        TodoList,
      },
      data() {
        return {
          todos: [],
        };
      },
      computed: {
        ...mapState(useAuthStore, ['currentUser']),
        user() {
          console.log('Current user from store:', this.currentUser);
          return this.currentUser;
        }
      },
      methods: {
        async addTodo(title) {
          const { $axios } = useNuxtApp();
          await $axios.post("/v1/todos", { title });
          this.todos.push({
            title
          });
        },
      },
    };
</script>
  
<style>
</style>
  