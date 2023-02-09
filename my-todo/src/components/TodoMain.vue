<template>
    <div class="page">
        <header>
            <h1>Todo List</h1>
        </header>
        <main>
            <div class="todos">
                <div class="write">
                    <input type="text" />
                    <button class="btn add">Add</button>
                </div>
                <ul class="list">
                    <li v-for="todo in todos" :key="todo.text">
                        <i 
                        class="fa-check-square" 
                        :class="{'far': (todo.state === 'yet'), 'fas': (todo.state === 'done')}"
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
            todos: [
                { text: '공부하기', state: 'yet' },
                { text: '운동하기', state: 'done' },
                { text: '글쓰기', state: 'done' },
            ],
        };
    },
}
</script>

<style>

</style>