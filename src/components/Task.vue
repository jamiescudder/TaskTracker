<template>
	<div
		@dblclick="$emit('toggle-reminder', task.id)"
		:class="[task.reminder ? 'reminder' : '', 'task']"
	>
		<h3>{{ task.text }}
			<div class="actions">
				<i
					@click="$emit('edit-task', task.id)"
					class="fas fa-edit"
				></i>
				<i
					@click="$emit('delete-task', task.id)"
					class="fas fa-times"
				></i>
			</div>
		</h3>
		<p>{{ task.day }}</p>
	</div>
</template>

<script>
export default {
	name: "Task",
	props: {
		task: Object,
	},
	methods: {},
};
</script>

<style scoped>
.fa-times {
	color: red;
}
.fa-times:hover {
	color: black;
}
.fa-edit {
	color: green;
}
.fa-edit:hover {
	color: black;
}
.fas {
	margin: 5px;
}
.task {
	background: #f4f4f4;
	margin: 5px;
	padding: 10px 20px;
	cursor: pointer;
}
.task.reminder {
	border-left: 5px solid green;
}
.task h3 {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>