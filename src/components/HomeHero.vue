<template>
    <v-container fluid class="home-hero" style="max-height: 100vh;">
        <v-carousel>
            <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            ></v-carousel-item>
        </v-carousel>
        <!-- <v-layout justify-center align-center column pa-5>
            <div class="display-1 font-weight-bold white--text text-xs-center">Finally be a foodie at home with fresh, chef-prepared meals delivered daily to your door.</div>
        </v-layout> -->
    </v-container>
</template>

<script>
export default {
    name: 'HomeHero',
    data() {
        return {
            items: [
                { src: 'http://source.unsplash.com/0BhSKStVtdM' },
                { src: 'http://source.unsplash.com/0BhSKStVtdM' },
                { src: 'http://source.unsplash.com/0BhSKStVtdM' }
            ]
        };
    }
};
</script>

<style scoped>
.home-hero {
    /* background: url('http://source.unsplash.com/0BhSKStVtdM'); */
    /* background-size: cover; */
    width: 100%;
    height: 80%;
}
</style>