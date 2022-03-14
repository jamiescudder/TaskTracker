<template>
    <header>
        <h1>{{ $store.state.title }}</h1>
        <Button v-show="tasksPage" @btn-click="$store.commit('toggleAddTask')" :text="showAddTask ? 'Close' : 'Add Task'" :color="showAddTask ? 'red' : 'green'"/>
    </header>
</template>

<script>
import Button from './Button'

export default {
    name: "Header",
    props: {
        'showAddTask': Boolean,
    },
    components: {
        Button
    },
    computed: {
        tasksPage() {
            if(this.$route.path == '/tasks') {
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>
