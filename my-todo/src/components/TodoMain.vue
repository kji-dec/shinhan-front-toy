<template>
    <div class="page">
        <header>
            <h1>Todo List</h1>
        </header>
        <main>
            <div class="todos">
                <!-- add -->
                <div class="write" v-if="writeState === 'add'">
                    <input ref="writeArea" type="text" v-model="addItemText" @keyup.enter="addItem"/>
                    <button class="btn add" @click="addItem">Add</button>
                </div>
                <!-- edit -->
                <div class="write" v-else>
                    <input ref="writeArea" type="text" v-model="editItemText" @keyup.enter="editSave"/>
                    <button class="btn add" @click="editSave">Save</button>
                </div>
                <ul class="list">
                    <li v-for="(todo, index) in todos" :key="todo.text">
                        <i 
                        :class="[todo.state === 'yet' ? 'far' : 'fas', 'fa-check-square']"
                        @click="checkItem(index)"
                        ></i>
                        <span>
                            {{ todo.text }}
                            <b>
                                <a href="" @click.prevent="editShow(index)">Edit</a>
                                <a href="" @click.prevent="deleteTodo(index)">Del</a>
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
            editItemText: '',
            crrEditItem: '',
            writeState: 'add',
            todos: [
                { text: '공부하기', state: 'yet' },
                { text: '운동하기', state: 'done' },
                { text: '글쓰기', state: 'done' },
            ],
            state: {
                yet: 'done',
                done: 'yet',
            },
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
        },
        checkItem(index) {
            const crrState = this.todos[index].state;
            this.todos[index].state = this.state[crrState];
        },
        editSave() {
            this.todos[this.crrEditItem].text = this.editItemText;
            this.writeState = 'add';
        },
        editShow(index) {
            this.crrEditItem = index;
            this.writeState = 'edit';
            this.editItemText = this.todos[index].text;
        },
        deleteTodo(index) {
            this.todos.splice(index, 1);
        }
    },
    mounted() {
        this.$refs.writeArea.focus();
    },
}
</script>

<style>

</style>