<template>
    <div>
      <AddTodo @submit="addTodo" />
      <TodoList :todos="todos" />
    </div>
</template>
  
<script>
    import AddTodo from "@/components/AddTodo";
    import TodoList from "@/components/TodoList";
  
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
      created() {
        const config = useRuntimeConfig();
        console.log("API_KEY:", config.public.apiKey);
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
  