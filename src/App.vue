<template>
  <main>

    <!-- Header -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="Pinia logo">
      <h1>Pinia Todo list!</h1>
    </header>

    <!-- task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter button -->
    <nav class="filter">
      <button @click="filter = 'all'">All</button>
      <button @click="filter = 'favs'">Favorites</button>
      <button @click="taskStore.deleteAllTasks">clear all</button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="loading">Loading tasks...</div>

    <!-- List -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} tasks left to do</p>
      <div v-for="task in tasks">
        <TaskDetails :task="task"/>
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} favorite tasks left to do</p>
      <div v-for="task in favs">
        <TaskDetails :task="task"/>
      </div>
    </div>

  </main>
</template>

<script>
  import { ref } from 'vue'
  import { useTaskStore } from './stores/TaskStore'
  import TaskDetails from './components/TaskDetails.vue'
  import TaskForm from './components/TaskForm.vue'
  import { storeToRefs } from 'pinia'

  export default {
    components: { TaskDetails, TaskForm },

    setup () {
      const taskStore = useTaskStore()

      const { tasks, loading, favs, totalCount, favCount } = storeToRefs(taskStore)

      // fetch task
      taskStore.getTasks()

      const filter = ref('all')

      return { taskStore, filter, tasks, loading, favs, totalCount, favCount }
    }
  }
</script>