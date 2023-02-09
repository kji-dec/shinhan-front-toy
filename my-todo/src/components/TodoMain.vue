<template>
    <div class="page">
        <header>
            <h1>
                Todo List
                <span class="pie">
                    <svg viewBox="0 0 64 64">
                        <circle class="pie" r="32" cx="32" cy="32" style="stroke-width: 64;"></circle>
                        <circle class="slice" r="32" cx="32" cy="32"
                            :style="{
                                strokeWidth: 64, 
                                strokeDasharray: totalTodo + ', 201',
                                transition: 'all 0.3s linear',
                            }"></circle>
                    </svg>
                </span>
            </h1>
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
                    <li v-for="(todo, index) in todos" :key="todo.id">
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
import { db } from '../firebase/db'

export default {
    data() {
        return {
            addItemText: '',
            editItemText: '',
            crrEditItem: '',
            writeState: 'add',
            todos: [],
            state: {
                yet: 'done',
                done: 'yet',
            },
        };
    },
    computed: {
        totalTodo() {
            let totalNum = 0;
            this.todos.forEach((item) => item.state === 'done' ? totalNum ++ : totalNum);
            return (totalNum / this.todos.length) * 201;
        },
    },
    methods: {
        addItem() {
            if (this.addItemText.trim() === '') return;
            db.collection('todos').add({
                text: this.addItemText,
                state: 'yet',
                createdAt: new Date(),
            }).then((sn) => {
                db.collection('todos').doc(sn.id).update({
                    id: sn.id,
                });
            });
            // this.todos.push({
            //     text: this.addItemText,
            //     state: 'yet',
            // });
            this.addItemText = '';
        },
        checkItem(index) {
            const crrState = this.todos[index].state;
            // this.todos[index].state = this.state[crrState];
            db.collection('todos')
                .doc(this.todos[index].id)
                .update({
                    state: this.state[crrState]
                })
        },
        editSave() {
            // this.todos[this.crrEditItem].text = this.editItemText;
            db.collection('todos')
                .doc(this.todos[this.crrEditItem].id)
                .update({
                    text: this.editItemText
                });
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
            // this.todos.splice(index, 1);
            db.collection('todos').doc(this.todos[index].id).delete();
        },
    },
    mounted() {
        this.$refs.writeArea.focus();
    },
    firestore() {
        return {
            todos: db.collection('todos').orderBy('createdAt', 'desc'),
        }
    },
}
</script>

<style>

</style>