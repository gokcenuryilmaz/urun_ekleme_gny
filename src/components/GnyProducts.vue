<template>
  <div class="col product-container">
    <span class="row">
      <strong><h3 v-if="productList.length > 0" class="text-center">Eklenen Ürünlerin Listesi</h3></strong>
    </span><!-- dizisi boş değilse bu başlık görünür. Yani ürünler varsa başlık gösterilir.-->
    <span class="row"><app-product 
      v-for="product in productList" 
      :key="product.title" 
      :product="product" 
      @remove="removeProduct">
    </app-product></span>
    
    <!--<app-product>: productList dizisindeki her bir ürün için AppProduct bileşenini render eder. 
    v-for ile döngü oluşturulur ve her ürünün detayları product prop'u olarak iletilir. @remove="removeProduct" ifadesi, AppProduct bileşeninden bir ürün silme olayı alındığında removeProduct metodunun çağrılmasını sağlar.-->
  </div>
</template>

<script>
import AppProduct from "./GnyProduct.vue";
import { eventBus } from "@/main";

export default {
  name: 'AppProducts',
  components: {
    AppProduct
  },
  data() {
    return {
      productList: []
    };
  },
  //data(): Bileşenin veri modelini tanımlar. 
  //Burada productList adlı bir dizi bulunur, bu dizi ürünleri saklar.
  created() {//Bileşen oluşturulduğunda çalışır:
    this.loadProductsFromLocalStorage();// localStorage'dan daha önce saklanmış ürünleri yükler.
    eventBus.$on("productAdded", (product) => {
      if (this.productList.length < 10) {
        this.productList.push(product);
        this.saveProductsToLocalStorage();
        eventBus.$emit("progressBarUpdated", this.productList.length);
      } else {
        alert("Daha fazla ürün ekleyemezsiniz!!!")
      }
    });
    //'productAdded' adlı bir olayı dinler. Bu olay tetiklendiğinde:
    //Eğer productList dizisinde 10'dan az ürün varsa, yeni ürünü diziye ekler.
    //Ürünleri localStorage'a kaydeder.
    //progressBarUpdated olayını tetikler ve ilerleme çubuğundaki değeri günceller.
    //Eğer ürün sayısı 10'a ulaştıysa, kullanıcıya uyarı verir.
  },
  methods: {
    loadProductsFromLocalStorage() {
      const savedProducts = localStorage.getItem('productList');
      if (savedProducts) {
        this.productList = JSON.parse(savedProducts);
      }
    },//localStorage'dan ürünleri yükler ve bileşenin productList özelliğine atar.
    saveProductsToLocalStorage() {
      localStorage.setItem('productList', JSON.stringify(this.productList));
    },//productList'i localStorage'a JSON formatında kaydeder.
    removeProduct(product) {
      const index = this.productList.indexOf(product);
      if (index > -1) {
        this.productList.splice(index, 1);
        this.saveProductsToLocalStorage();
        eventBus.$emit("progressBarUpdated", this.productList.length);
      }
    }//Verilen ürünü productList dizisinden kaldırır. 
    //Ürünü bulmak için dizinin indexOf metodunu kullanır ve ardından splice ile diziden çıkarır.
    //Güncellenmiş productList'i localStorage'a kaydeder ve progressBarUpdated olayını tetikler.
  }
}
</script>

<style scoped>
/* Stil tanımları buraya gelebilir */
</style>
