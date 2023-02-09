<template>
    <div class="page">
        <header>
            <h1>Todo List</h1>
        </header>
        <main>
            <div class="todos">
                <transition name="fade">
                    <!-- add -->
                    <div class="write add" v-if="writeState === 'add'" key="add">
                        <input ref="writeArea" type="text" v-model="addItemText" @keyup.enter="addItem" />
                        <button class="btn add" @click="addItem">Add</button>
                    </div>
                    <!-- edit -->
                    <div class="write edit" v-else key="edit">
                        <input ref="writeArea" type="text" v-model="editItemText" @keyup.enter="editSave" />
                        <button class="btn add" @click="editSave">Save</button>
                    </div>
                </transition>
                <ul class="list" ref="list">
                    <li v-for="(todo, index) in todos" :key="todo.text">
                        <i :class="[todo.state === 'yet' ? 'far' : 'fas', 'fa-check-square']"
                            @click="checkItem(index)"></i>
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
            this.$refs.list.children[this.crrEditItem].classList.remove('editing');
        },
        editShow(index) {
            this.crrEditItem = index;
            this.writeState = 'edit';
            this.editItemText = this.todos[index].text;
            console.log(this.$refs.list.children[index]);
            this.$refs.list.children[index].classList.add('editing');
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