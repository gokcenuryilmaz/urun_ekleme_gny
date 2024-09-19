<template>
  <div class="container">
    <h1 class="text-center">Ürün Ekleme Uygulaması</h1>
    <hr>
    <app-new-product></app-new-product>
    <br><br>
    <div class="progress">
      <app-progress></app-progress>
    </div>
    <br><br>
    <app-products></app-products>
  </div>
</template>

<script>
import AppNewProduct from './components/NewProduct.vue';
import AppProgress from './components/GnyProgress.vue';
import AppProducts from './components/GnyProducts.vue';

export default {
  components: {
    AppNewProduct,
    AppProgress,
    AppProducts
  },
}
</script>


<style>
  body {
    background-color: aliceblue;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .card {
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .card:last-child {
    margin-right: 0px;
  }

  .col-md-2 {
    max-width: 15.666667%!important;
  }

  .product-container {
    margin-left: 15px;
  }
</style>