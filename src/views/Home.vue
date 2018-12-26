<template>
    <span>
        <home-hero></home-hero>
        <home-details></home-details>
        <home-fiturs></home-fiturs>
    </span>
</template>

<script>
import HomeHero from '@/components/HomeHero';
import HomeDetails from '@/components/HomeDetails';
import HomeFiturs from '@/components/HomeFiturs';

export default {
    name: 'home',
    components: {
        HomeHero,
        HomeDetails,
        HomeFiturs
    }
};
</script>