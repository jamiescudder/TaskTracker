import { createStore } from 'vuex'

export default createStore({
	state:{
		title: 'Task Tracker',
		tasks: [],
		loadEditTask: {},
		showAddTask: false,
	},
	mutations: {
		toggleAddTask(state) {
			state.showAddTask = !state.showAddTask;
		},
		deleteTask(state, id) {
			(state.tasks = state.tasks.filter((task) => task.id !== id))
			if (id == state.loadEditTask.id) {
				state.loadEditTask = {};
			}
		},
		toggleReminder(state, toggleLoad) {
			var id = toggleLoad.id;
			var data = toggleLoad.data;

			state.tasks = state.tasks.map((task) =>
				task.id === id ? { ...task, reminder: data.reminder } : task
			);
		},
		addTask(state, commitData) {
			var task = commitData.task;
			var data = commitData.data;
			var exists = commitData.exists;

			if (exists == false) {
				state.tasks = [...state.tasks, data];
			} else if (exists == true) {
				state.tasks = state.tasks.map((t) =>
					t.id == task.id ? {
						...t,
						text: data.text,
						day: data.day,
						reminder: data.reminder,
					} : t
				);
			}
		},
		editTask(state, taskToToggle) {
			state.loadEditTask = taskToToggle;
			if (!state.showAddTask) {
				state.showAddTask = true;
			}
		},
		fetchTasks(state, data) {
			state.tasks = data;
		},
		fetchTask(state, data) {
			state.loadEditTask = data;
		}
	},
	actions: {
		async fetchTasks({ commit }) {
			const res = await fetch("api/tasks");
			const data = await res.json();
			commit('fetchTasks', data);
		},
		async fetchTask({ commit }, id) {
			console.log("fetchTask")
			const res = await fetch(`api/tasks/${id}`);
			const data = await res.json();
			commit('fetchTask', data);
			return data
		},
		async deleteTask({ commit }, id) {
			if (confirm("Are you sure?")) {
				const res = await fetch(`api/tasks/${id}`, {
					method: "DELETE",
				});

				res.status === 200
					? commit('deleteTask', id)
					: alert("Error deleting task");
			}
		},
		async toggleReminder({ dispatch, commit }, id) {
			const taskToToggle = await dispatch("fetchTask", id);
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

			var toggleLoad = {
				id: id,
				data: data
			}

			commit('toggleReminder', toggleLoad)
		},
		async addTask({ commit }, task) {
			if (task.id != null) {
				const res = await fetch(`api/tasks/${task.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(task),
				});
				const data = await res.json();

				var existsData = {
					task: task,
					data: data,
					exists: true
				}

				commit('addTask', existsData)
			} else {
				const res = await fetch("api/tasks", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(task),
				});
				const data = await res.json();

				var newData = {
					task: task,
					data: data,
					exists: false
				}
				commit('addTask', newData);
			}
		},
		async editTask({ commit, dispatch }, id) {
			if (confirm("Are you sure you want to edit this task?")) {
				const taskToToggle = await dispatch('fetchTask', id); // get task and return json object
				commit('editTask', taskToToggle);
			}
		},	
	},
	getters: {

	},
	modules: {

	}
})