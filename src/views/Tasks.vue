<template>
	<AddTask
		v-show="showAddTask"
		@add-task="addTask"
		:loadEditTask="loadEditTask"
	/>
	<Tasks
		@toggle-reminder="toggleReminder"
		@delete-task="deleteTask"
		@edit-task="editTask"
		:tasks="tasks"
		:loadEditTask="loadEditTask"
	/>
</template>

<script>
import Tasks from "../components/Tasks";
import AddTask from "../components/AddTask";

export default {
	name: "Home",
	props: {
		showAddTask: Boolean,
	},
	components: {
		Tasks,
		AddTask,
	},
	data() {
		return {
			tasks: [],
			loadEditTask: {},
		};
	},
	methods: {
		async deleteTask(id) {
			if (confirm("Are you sure?")) {
				const res = await fetch(`api/tasks/${id}`, {
					method: "DELETE",
				});

				res.status === 200
					? (this.tasks = this.tasks.filter((task) => task.id !== id))
					: alert("Error deleting task");
			}
		},
		async toggleReminder(id) {
			const taskToToggle = await this.fetchTask(id);
			const updateTask = {
				...taskToToggle,
				reminder: !taskToToggle.reminder,
			};

			const res = await fetch(`api/tasks/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateTask),
			});

			const data = await res.json();

			this.tasks = this.tasks.map((task) =>
				task.id === id ? { ...task, reminder: data.reminder } : task
			);
		},
		async addTask(task) {
			if (task.id != null) {
				const res = await fetch(`api/tasks/${task.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(task),
				});
				const data = await res.json();
				this.tasks = this.tasks.map((t) =>
					t.id == task.id ? {
							...t,
							text: data.text,
							day: data.day,
							reminder: data.reminder,
						} : t
				);
			} else {
				console.log("new task");
				const res = await fetch("api/tasks", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(task),
				});
				const data = await res.json();
				this.tasks = [...this.tasks, data];
			}
		},
		async fetchTasks() {
			const res = await fetch("api/tasks");
			const data = await res.json();
			return data;
		},
		async fetchTask(id) {
			const res = await fetch(`api/tasks/${id}`);
			const data = await res.json();
			return data;
		},
		async editTask(id) {
			if (confirm("Are you sure you want to edit this task?")) {
				const taskToToggle = await this.fetchTask(id); // get task and return json object
				// show form if not already open
				if (!this.showAddTask) {
					this.$emit("toggle-add-task");
				}
				this.loadEditTask = taskToToggle;
			}
		},
	},
	async created() {
		this.tasks = await this.fetchTasks();
	},
	emits: ["toggle-add-task"],
};
</script>