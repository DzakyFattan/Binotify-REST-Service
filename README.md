# Binotify REST Service

## Deskripsi Service

REST API untuk melakukan manajemen lagu premium oleh user (penyanyi). API dibangun menggunakan NodeJS untuk implementasi REST, dan PostgreSQL untuk *database*, serta dibungkus dalam suatu *container* [Docker](https://www.docker.com/ "Docker Homepage").

## Features
- **Skema Database** menggunakan PostgreSQL
- Endpoints (dari http://localhost:3001/api, semua Response berformat JSON)

Endpoints       | Description
---             | ---
(GET) `/`       | Mengembalikan List Penyanyi (User)
(GET) `/:userid`| Mengembalikan Penyanyi (User) dengan id:userid
(POST) `/`      | Menambah User

## Pembagian Tugas
1. Setup, Routing, Database, Dockerize: 13520003
2. Fungsi `getUsers`: 13520003
3. Fungsi `getUserById`: 13520003
4. Fungsi `addUser`: 13520003