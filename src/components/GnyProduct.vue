<template>
  <div class="col-md-2 card">
    <img class="card-img-top" :src="product.selectedImage || require('@/assets/default.png')" alt="Product image">
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <small><strong>Adet: </strong>{{ product.count }}</small><br>
      <small><strong>Fiyat: </strong>{{ product.price }}</small><br>
      <small><strong>Tutar: </strong>{{ product.totalPrice }}</small>
      <br><br>
      <button class="btn btn-danger btn-block" @click="removeProduct">Sil</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppProduct',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeProduct() {
      this.$emit('remove', this.product);
    }
  }
}
</script>

<style scoped>
/* Stil tanımları buraya gelebilir */
</style>
