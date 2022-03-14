<template>
	<AddTask
		v-show="showAddTask"
		:loadEditTask="$store.state.loadEditTask"
	/>
	<Tasks
		:tasks="$store.state.tasks"
	/>
</template>

<script>
import Tasks from "../components/Tasks";
import AddTask from "../components/AddTask";

export default {
	name: "Tracker",
	props: {
		showAddTask: Boolean,
	},
	components: {
		Tasks,
		AddTask,
	},
	data() {

	},
	methods: {
		// refreshTasks() {
		// 	this.tasks = $store.state.tasks;
		// }
	},
	async created() {
		this.$store.state.tasks = this.$store.dispatch('fetchTasks');
	},
};
</script>