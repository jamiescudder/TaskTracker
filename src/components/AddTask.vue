<template>
	<form
		@submit="onSubmit"
		class="add-form"
	>
		<div class="form-control">
			<label>Task</label>
			<input
				type="text"
				v-model="text"
				name="text"
				placeholder="Add Task"
			/>
		</div>
		<div class="form-control">
			<label>Day & Time</label>
			<input
				type="text"
				v-model="day"
				name="day"
				placeholder="Add Day & Time"
			/>
		</div>
		<div class="form-control form-control-check">
			<label>Set Reminder</label>
			<input
				type="checkbox"
				v-model="reminder"
				name="reminder"
			/>
		</div>

		<input
			type="submit"
			value="Save Task"
			class="btn btn-block"
		/>
	</form>
</template>

<script>
export default {
	name: "AddTask",
	props: {
		loadEditTask: Object,
	},
	data() {
		return {
			id: null,
			text: "",
			day: "",
			reminder: false,
		};
	},
	watch: {
		//looking for a change to this data and then call loadtask functin
		loadEditTask() {
			if (this.loadEditTask != {}) {
				this.loadTask(this.loadEditTask);
			}
		},
		text() {
			// if user deletes task then reset for
			console.log(this.id);
			if (this.id != null && this.text == "") {
				var resetTask = confirm("Do you want to reset the task form?");
				if (resetTask) {
					this.id = null;
					this.day = "";
					this.reminder = false;
					console.log(this.id);
				}
			}
		},
	},
	methods: {
		onSubmit(e) {
			e.preventDefault();

			if (!this.text) {
				alert("Please add a task name");
				return;
			}

			if (this.id == null) {
				console.log("new task");
				const newTask = {
					text: this.text,
					day: this.day,
					reminder: this.reminder,
				};

				this.$emit("add-task", newTask);
			} else {
				console.log("existing task");
				const newTask = {
					id: this.loadEditTask.id,
					text: this.text,
					day: this.day,
					reminder: this.reminder,
				};
				this.$emit("add-task", newTask);
			}
			this.id = null;
			this.text = "";
			this.day = "";
			this.reminder = false;
		},
		loadTask(task) {
			// load task
			this.id = task.id;
			this.text = task.text;
			this.day = task.day;
			this.reminder = task.reminder;
		},
	},
};
</script>

<style scoped>
.add-form {
	margin-bottom: 40px;
}
.form-control {
	margin: 20px 0;
}
.form-control label {
	display: block;
}
.form-control input {
	width: 100%;
	height: 40px;
	margin: 5px;
	padding: 3px 7px;
	font-size: 17px;
}
.form-control-check {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.form-control-check label {
	flex: 1;
}
.form-control-check input {
	flex: 2;
	height: 20px;
}
</style>