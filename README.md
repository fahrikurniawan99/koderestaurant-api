# Rekash - POS
Rekash adalah sebuah sistem point of sales (POS) yang membuat transaksi digital menjadi mudah. Lalu apa itu POS sistem, Point of Sales (POS) adalah sebuah sistem yang dapat mendukung transaksi penjualan, pembelian, pengelolaan produk maupun laporan transaksi secara digital.

## User Stories & Entity
|Sebagai...|Saya ingin...|Sehingga...|
|-|-|-|
|Guest|Melihat makanan|Bisa memilih makanan|
|Guest|Mendaftar dan Masuk|Bisa memesan makanan|
|Customer|Melihat makanan|Misa memilih makanan|
|Customer|Melihat nama dan harga makanan||
|Customer|Memfilter makanan berdasarkan category||
|Customer|Memfilter makanan berdasarkan tags||
|Customer|Memfilter produk berdasarkan nama produk||
|Customer|Memasukan item ke dalam keranjang belanja||
|Customer|Mengubah jumlah pesanan per makanan||
|Customer|Melihat total harga di keranjang belanja sebelum checkout|Mendapatkan perkiraan biaya yang akan di bayar|
|Customer|Melakukan checkout|Pesanan saya di proses|
|Customer|Menambah atau memilih alamat pengiriman saat checkout|Di kirim ke tujuan yang benar|
|Customer|Melihat invoice|Bisa melakukan pembayaran
|Customer|Melihat riwayat pesanan|Bisa melihat detail pesanan dan statusnya
|Customer|Mengelola alamat pengiriman|Bisa menambahkan lebih dari 1 alamat pengiriman

|Entity|
|-|
|Product|
|Category|
|Tag|
|Cart|
|Order|
|Invoice|
|Delivery address|

## Api Endpoint
### Product
|HTTP Method|Route|Description|
|-|-|-|
|GET|/products|dapatkan daftar produk|
|POST|/products|buat produk baru|
|PUT|/products/:id|update produk by id|
|DELETE|/products/:id|hapus produk by id|

### Category
|HTTP Method|Route|Description|
|-|-|-|
|GET|/categories|dapatkan daftar category|
|POST|/categories|buat category baru|
|PUT|/categories/:id|update category by id|
|DELETE|/categories/:id|hapus category by id|

### Tag
|HTTP Method|Route|Description|
|-|-|-|
|GET|/tags|dapatkan daftar tag|
|POST|/tags|buat tag baru|
|PUT|/tags/:id|update tag by id|
|DELETE|/tags/:id|hapus tag by id|

### Delivery address
|HTTP Method|Route|Description|
|-|-|-|
|GET|/delivery-addresses|dapatkan daftar alamat pengiriman|
|POST|/delivery-addresses|buat  alamat pengiriman baru|
|PUT|/delivery-addresses/:id|update  alamat pengiriman by id|
|DELETE|/delivery-addresses/:id|hapus  alamat pengiriman by id|

### Order
|HTTP Method|Route|Description|
|-|-|-|
|GET|/orders|mengambil daftar order milik user|
|POST|/orders|buat order baru|

### Cart
|HTTP Method|Route|Description|
|-|-|-|
|GET|/carts|mengambil daftar keranjang belanja milik user|
|PUT|/carts|update item keranjang by user|

## Tech Stack
- Mongodb
- Expressjs
- Reactjs
- Nodejs