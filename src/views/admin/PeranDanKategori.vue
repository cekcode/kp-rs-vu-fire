<template>
<div>
    <peran-details></peran-details>
    <kategori-details></kategori-details>
</div>
</template>

<script>
import PeranDetails from '@/components/admin/PeranDetails';
import KategoriDetails from '@/components/admin/KategoriDetails';

export default {
    name: 'peran-dan-kategori',
    components: {
        PeranDetails,
        KategoriDetails
    }
}
</script>
