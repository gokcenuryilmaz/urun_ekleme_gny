<template>
  <div class="row">
    <!-- Resim Seçim Kartı -->
    <div class="card offset-2 col-md-3">
      <div class="card-body tex-center d-flex align-items-center flex-column">
        <!-- Ürün Resmi -->
        <!--img etiketi, seçilmiş bir resmi veya varsayılan resmi gösterir. :src özelliği, product.selectedImage varsa onu, yoksa varsayılan bir resmi gösterir.-->
        <img height="128" class="img-responsive text-center mb-3"
        :src="product.selectedImage ? product.selectedImage : require('@/assets/default.png')">
        <!-- Dosya Girişi -->
        <!--input etiketi, kullanıcıya bir dosya seçme fırsatı verir, fakat gizlidir. onChange metodu çağrılır.-->
        <input ref="file" type="file" style="display: none;" @change="onChange($event)" class="form-control">
        <!-- Resim Seçim Butonu -->
        <!--Buton tıklaması, gizli dosya seçiciye tıklanmasını tetikler.-->
        <button class="btn btn-outline-secondary" type="button" @click="$refs.file.click()">Resim Seç</button>
      </div>
    </div>

    <!-- Ürün Bilgileri -->
    <div class="col-md-5">
      <div class="col-md-11 card">
        <div class="card-body">
          <!-- Ürün Adı -->
          <div class="form-group">
            <!--Ürün adı, adeti ve fiyatı için input alanları içerir. 
            v-model kullanılarak bu alanlar Vue.js veri modeline bağlanır.-->
            <!--Her bir input alanının altında, 
            eğer geçerli bir hata varsa hata mesajını gösterir.-->
            <label>Ürün Adı</label>
            <input type="text" v-model="product.title" class="form-control" placeholder="Adını giriniz">
            <small v-if="errors.title" class="text-danger">{{ errors.title }}</small>
          </div>
          <div class="row">
            <!-- Ürün Adeti -->
            <div class="form-group col-md-6">
              <label>Ürün Adeti</label>
              <input type="text" v-model="product.count" class="form-control" placeholder="Adetini giriniz">
              <small v-if="errors.count" class="text-danger">{{ errors.count }}</small>
            </div>
            <!-- Ürün Fiyatı -->
            <div class="form-group col-md-6">
              <label>Ürün Fiyatı</label>
              <input type="text" v-model="product.price" class="form-control" placeholder="Fiyatını giriniz">
              <small v-if="errors.price" class="text-danger">{{ errors.price }}</small>
            </div>
          </div>
          <!-- Ürün Ekle Butonu -->
          <!--Ekle butonuna tıklayınca addProduct fonksiyonu tetiklenir.-->
          <button @click="addProduct" class="btn btn-outline-info btn-block">Ekle!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/main';

export default {
  name: 'AppNewProduct',
  // Bileşenin veri modelini tanımlar. Ürün detayları ve hata mesajları için boş nesneler içerir.
  data() {
    return {
      product: {
        title: null,
        count: null,
        price: null,
        totalPrice: null,
        selectedImage: null
      },
      errors: {} // Hata mesajlarını saklayacak nesne
    };
  },
  methods: {
    // Dosya seçildiğinde çağrılır ve seçilen dosyanın URL'sini product.selectedImage olarak ayarlar.
    onChange(e) {
      const file = e.target.files[0]; // Kullanıcı tarafından seçilen dosya
      if (file) { // Eğer dosya varsa, URL'ini al ve product.selectedImage olarak ata
        this.product.selectedImage = URL.createObjectURL(file);
        this.$refs.file.value = null; // Aynı dosyayı tekrar seçebilmek için input'u sıfırla
      }
    },
    // Kullanıcıdan alınan bilgileri doğrular. Her bir alanın geçerli olup olmadığını kontrol eder ve hata mesajlarını errors nesnesine ekler.
    validateInput() {
      let isValid = true;
      this.errors = {}; // Hataları temizle

      // Ürün adı kontrolü (string olmalı ve boş olmamalı)
      if (!this.product.title || typeof this.product.title !== 'string') {
        this.errors.title = 'Ürün adı geçerli bir metin olmalıdır.';
        isValid = false;
      }

      // Ürün adedi kontrolü (sayı olmalı ve pozitif olmalı)
      if (!this.product.count || isNaN(this.product.count) || Number(this.product.count) <= 0) {
        this.errors.count = 'Ürün adedi geçerli bir sayı olmalıdır.';
        isValid = false;
      }

      // Ürün fiyatı kontrolü (sayı olmalı ve pozitif olmalı)
      if (!this.product.price || isNaN(this.product.price) || Number(this.product.price) <= 0) {
        this.errors.price = 'Ürün fiyatı geçerli bir sayı olmalıdır.';
        isValid = false;
      }

      return isValid; // Eğer tüm kontroller geçtiyse true döndür
    },
    // Ürün ekleme işlemini gerçekleştirir. Eğer doğrulama başarılı ise, ürünün totalPrice'ını hesaplar ve bir productAdded olayı yayar.
    addProduct() {
      if (this.validateInput()) { // Eğer doğrulama başarılı ise
        this.product.totalPrice = (Number(this.product.count) || 0) * (Number(this.product.price) || 0); // Toplam fiyatı hesapla
        eventBus.$emit('productAdded', this.product); // Ürün eklendi olayını eventBus ile yayınla

        // Ürün eklendikten sonra formu sıfırla
        this.product = {
          title: null,
          count: null,
          price: null,
          totalPrice: null,
          selectedImage: null
        };
      }
    }
  }
};
</script>


<style scoped>
.text-danger {
  color: red;
}
</style>
//eventBus.$emit("productAdded", this.product);: 'productAdded' adında bir olay yayınlar ve bu olay ile birlikte this.product verisini gönderir.
EventBus: Bileşenler arasında veri paylaşımını ve iletişimi kolaylaştırmak için kullanılır.
EventBus Kullanımı: Olayları yayınlamak ($emit) ve dinlemek ($on) için kullanılır.