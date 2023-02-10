<template>
    <ul class="list">
        <li v-for="item in listData" :key="item.id">
            <b>{{ item.time_ago }}</b>
            <template v-if="$route.name === 'news'">
                <span>by <router-link :to="`/user/${item.user}`">{{ item.user }}</router-link></span><br>
                <a :href="item.url">{{ item.title }}<i>({{ item.comments_count }})</i></a>
            </template>
            <template v-else>
                <span>by {{ item.user }}</span><br>
                <a :href="item.url">{{ item.title }}<i>({{ item.comments_count }})</i></a>
            </template>
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