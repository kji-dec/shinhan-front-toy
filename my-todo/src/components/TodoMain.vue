<template>
    <div class="page">
        <header>
            <h1>Todo List</h1>
        </header>
        <main>
            <div class="todos">
                <div class="write">
                    <input type="text" v-model="addItemText" @keyup.enter="addItem"/>
                    <button class="btn add" @click="addItem">Add</button>
                </div>
                <ul class="list">
                    <li v-for="(todo, index) in todos" :key="todo.text">
                        <i 
                        :class="[todo.state === 'yet' ? 'far' : 'fas', 'fa-check-square']"
                        ></i>
                        <span>
                            {{ todo.text }}
                            <b>
                                <a href="">Edit</a>
                                <a href="">Del</a>
                            </b>
                        </span>
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            addItemText: '',
            todos: [
                { text: '공부하기', state: 'yet' },
                { text: '운동하기', state: 'done' },
                { text: '글쓰기', state: 'done' },
            ],
        };
    },
    methods: {
        addItem() {
            if (this.addItemText.trim() === '') return;
            this.todos.push({
                text: this.addItemText,
                state: 'yet',
            });
            this.addItemText = '';
        }
    }
}
</script>

<style>

</style>