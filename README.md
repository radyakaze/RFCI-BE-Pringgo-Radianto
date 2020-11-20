# Refactory Coding Interview

## 1. Sorting
Menampilkan dan menghitung jumlah swap yang diperlukan agar sebuah deret angka menjadi berurutan menggunakan metode bubble sort.

### Source Code
Ditulis menggunakan nodejs dan source code berada di `./sorting.js`

### Cara Menjalankan
```bash
node sorting.js
```

## 2. Simple Client - Server App
- Membuat client - server sederhana, client mengirimkan POST setiap satu menit ke server
- Server menerima request dari client dan menyimpan body serta header yang dikirimkan oleh client ke dalam file `server.log`

### Source Code
Ditulis menggunakan nodejs dan framework fastifyjs, dengan bantuan library dayjs untuk format tanggal dan axios pada client untuk request ke server.
- Source code client berada di `./client/index.js`
- Source code server berada di `./server/index.js`

### Instalasi
```bash
npm i # atau yarn
```

### Cara Menjalankan
- Server
```bash
npm run start:server # atau node server/index.js
```
- Client
```bash
npm run start:client # atau node client/index.js
```

Server log berada di `./server.log`

