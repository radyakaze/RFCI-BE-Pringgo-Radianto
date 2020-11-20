# CodeDebugging

Code debugging built with NodeJs


## Langkah Perbaikan

### Langkah sebelum perbaikan
1. Mendaftarkan aplikasi oauth baru pada github, [Link](https://github.com/settings/applications/new)
2. Copy `env` ke dalam `.env`
```bash
cp env .env
```
3. Sesuaikan `.env` dengan aplikasi oauth github yang baru saja dibuat
Contoh:
```
NODE_ENV=development
PORT=3000
CLIENT_ID=a5a0d3f3d8d9495e18d2
CLIENT_SECRET=5c7dbc8e5f05626581e933d1ada8587a50b73957
OAUTH_URL=https://github.com/login/oauth/
API_URL=https://api.github.com
```
`OAUTH_URL` dan `API_URL` berdasarkan dokumentasi github. [Link](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)



### 1. Perbaikan pada config
Lokasi file: `./src/config/index.js`

#### 1.1. Pindahkan variable setelah setelah init dotenv, agar bisa membaca file .env
```javascript
const config = {
    port: process.env.PORT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    oauthUrl: process.env.OAUTH_URL,
    apiUrl: process.env.API_URL,
}
```
Pindahkan setelah kode berikut
```javascript
const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
```



### 2. Perbaikan pada Auth Service
Lokasi File: `./src/services/authService.js`

#### 2.1. Ubah baris kode `module.export` menjadi `module.exports`



### 3. Perbaikan pada User Info Service
Lokasi File: `./src/services/userInfoService.js`

#### 3.1. Tambahkan return pada function `getUserInfo`
```javascript
function getUserInfo(token) {
    return axios({ ... })
}
```

#### 3.2. Ubah pada endpoint api dari `users` menjadi `user`, untuk mendapatkan user info
```javascript
axios {
    ...
    url: `${config.apiUrl}/users`,
    ...
}
```
Menjadi 
```javascript
axios {
    ...
    url: `${config.apiUrl}/user`,
    ...
}
```

Sumber: [Dokumentasi Github](https://developer.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/#3-your-github-app-accesses-the-api-with-the-users-access-token)

#### 3.3. Ubah baris kode `module.export` menjadi export object
```javascript
module.exports = getUserInfo
```
Menjadi
```javascript
module.exports.getUserInfo = getUserInfo
```

### 4. Perbaikan pada Auth Callback Service
Lokasi file: `./src/services/authCallbackService.js`

#### 4.1. Fix undefined `resp`
```javascript
.then((res) => resp.data["accessToken"])
```
Menjadi
```javascript
.then((resp) => resp.data["accessToken"])
```


#### 4.2. Ubah `accessToken` menjadi `access_token` pada response
```javascript
.then((resp) => resp.data["accessToken"])
```
Menjadi
```javascript
.then((resp) => resp.data["access_token"])
```

Sumber: (Dokumentasi Github)[https://developer.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/#response]

#### 4.3. Menggunakan promise pada User Info Service
Dikarenakan pada User Info Service, kembalian function `getUserInfo` berbentuk promise, maka gunakan `then` untuk mengambil data

```javascript
const user = UserServices.getUserInfo(accessToken);
res.json({
    data: {
        login: user.login,
        githubId: user.id,
        avatar: user.avatar_url,
        email: user.email,
        name: user.name,
        location: user.location,
    }
)
```

Menjadi
```javascript
UserServices.getUserInfo(accessToken).then(user => {
    return res.json({
        data: {
        login: user.login,
        githubId: user.id,
        avatar: user.avatar_url,
        email: user.email,
        name: user.name,
        location: user.location,
        },
    });
});
```