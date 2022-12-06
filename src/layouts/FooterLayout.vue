<template>
    <section id="footer"
        :class="$q.screen.lt.md ? `q-pa-md bg-primary text-white height-500` : `q-pa-md bg-primary text-white`">
        <div class="container">
            <div class="row text-center">
                <div class="col-12">
                    Dibuat oleh Tim Sar dari Universitas Internasional Semen Indonesia
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.height-500 {
    height: 130px;
}
</style>