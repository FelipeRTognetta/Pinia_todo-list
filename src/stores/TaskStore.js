import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading: false
    }),
    getters: {
        favs() {
            return this.tasks.filter(t => t.isFav)
        },
        favCount() {
            return this.tasks.reduce((previous, current) => {
                return current.isFav ? previous + 1 : previous
            }, 0)
        },
        totalCount: (state) => {
            return state.tasks.length
        }
    },
    actions: {
        async getTasks(){
            this.loading = true

            const res = await fetch('http://localhost:3000/tasks')
            const data = await res.json()

            this.tasks = data
            this.loading = false
        },
        async addTask(task) {
            this.tasks.push(task)

            // maintain changes
            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            })

            if (res.error) {
                console.log(res.error)
            }
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter(t => {
                return t.id !== id
            })

            // maintain changes
            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'DELETE',
            })

            if (res.error) {
                console.log(res.error)
            }
        },
        async toggleFav(id) {
            const task = this.tasks.find(t => t.id === id)
            task.isFav = !task.isFav

            // maintain changes
            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'PATCH',
                body: JSON.stringify({isFav: task.isFav}),
                headers: {'Content-Type': 'application/json'}
            })

            if (res.error) {
                console.log(res.error)
            }
        },
        async deleteAllTasks() {
            for (const task of this.tasks) {
                const res = await fetch(`http://localhost:3000/tasks/${task.id}`, {
                    method: 'DELETE',
                });

                if (res.error) {
                    console.log(res.error)
                }
            }

            this.tasks = [];
        },
    }
});