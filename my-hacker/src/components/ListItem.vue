<template>
    <ul class="list">
        <li v-for="item in listData" :key="item.id">
            <b>{{ item.time_ago }}</b>
            <span>by {{ item.user }}</span><br>
            <a :href="item.url">{{ item.title }}<i>({{ item.comments_count }})</i></a>
        </li>
    </ul>
</template>

<script>
export default {
    props: [
        'listData',
    ],
}
</script>

<style>

</style>