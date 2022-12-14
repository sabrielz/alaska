# **Documentation**

# Overview
This development using **axios** and **Postman** for testing.
Both **multipart** form content-type and **application/json**
content-type input catched by **formidable**.

# Startup Schema
First of all, run `/api/drop`, `/api/migrate`, then `/api/seed`.
But if the tables already migrated and you want to drop it all
using `/api/drop`, bug will happen. To solve this bug, repeat
`/api/drop` multiple times until the schema's clear. This bug
caused by **less precise table order** when dropping all table
sequantially.

# Schema Utility
Utility to control schema. Like migrate, drop, truncate, etc.
Entry points without url params execute `all tables`, but
the table list `not dynamic`. Change it on `config/config.js` file.
Execute all tables will `ignore all` error or warning.

### Entry Points
| Method | URL | URL Params | Body Params |
| ------ | --- | ---------- | ----------- |
| **GET** | `/api/migrate` |
| **GET** | `/api/migrate/:table` | `table` |
| **GET** | `/api/drop` |
| **GET** | `/api/drop/:table` | `table` |
| **GET** | `/api/truncate` |
| **GET** | `/api/truncate/:table` | `table` |
| **GET** | `/api/seed` |
| **GET** | `/api/seed/:table` | `table` |
| **POST** | `/api/import/:table` | `table` | `file: <file>, headers: 'nama,email'}`

# Auth
Not require **json web token**. Create new user,
or authenticate user to access api with **json web token**.

### Entry Points
| Method | URL | Body Params |
| ------ | --- | ------ |
| **POST** | `/login` | `nis, password` |
| **POST** | `/register` | `all user columns` |
| **POST** | `/verify` | `check jwt token` |

# User
Require **json web token** to access.
Control user profile, except create new user.

### Entry Points
| Method | URL | URL Params | Body Params |
| ------ | --- | ---------- | ----------- |
| **GET** | `/user` | `?page&select` | |
| **GET** | `/user/:id` | `id` | |
| **GET** | `/user/nis/:id` | `id` | |
| **GET** | `/user/count` | | |
| **PUT** | `/user/:id` | `id` | `all modul columns` |
| **DELETE** | `/user/:id` | `id` | |

### Table Schema
| Name | Options |
| ---- | ------- |
| `id` | int(10) unsigned NOT NULL AUTO_INCREMENT |
| `nama` | varchar(255) DEFAULT NULL |
| `nis` | int(11) DEFAULT NULL |
| `email` | varchar(255) DEFAULT NULL |
| `password` | varchar(255) DEFAULT `'123456'` |
| `ttl` | varchar(255) DEFAULT NULL |
| `sekolah` | varchar(255) DEFAULT NULL |
| `alasan` | text DEFAULT NULL |
| `avatar` | varchar(255) DEFAULT NULL |
| `hp` | varchar(255) DEFAULT NULL |
| `role_id` | int(10) unsigned DEFAULT `1` |

# Role
***!!! RESTRIECTED MODEL !!!***

### Entry Points
***!!! THIS MODEL DO NOT HAVE ENTRY POINTS !!!***

### Table Schema
| Name | Options |
| ---- | ------- |
| `id` | int(10) unsigned NOT NULL AUTO_INCREMENT |
| `name` | varchar(255) DEFAULT NULL |

### Table Contents
| Id | Name |
| -- | ---- |
| `1` | `siswa` |
| `2` | `guru` |
| `3` | `admin` |

# Modul
Require **json web token** to access.
Modul have **type** that contain type of modul.
Change **:type** url with ***ebook*** or ***video*** only.

### Entry Points
| Method | URL | URL Params | Body Params |
| ------ | --- | ---------- | ----------- |
| **GET** | `/modul` | `?search&page&select` | |
| **GET** | `/modul/count` | | |
| **GET** | `/:type` | `?page&select` | |
| **GET** | `/:type/:id` | `id` | |
| **GET** | `/:type/count` | | |
| **POST** | `/:type` | | `all modul columns` |
| **PUT** | `/:type/:id` | `id` | `all modul columns` |
| **DELETE** | `/:type/:id` | `id` | |

### Table Schema
| Name | Options |
| --- | --- |
| `id` | int(10) unsigned NOT NULL AUTO_INCREMENT |
| `title` | varchar(255) DEFAULT NULL |
| `slug` | varchar(255) DEFAULT NULL |
| `desc` | varchar(255) DEFAULT NULL |
| `thumbnail` | varchar(255) DEFAULT NULL |
| `file` | varchar(255) DEFAULT NULL |
| `type` | varchar(255) DEFAULT NULL |
| `user_id` | int(10) unsigned DEFAULT NULL |
| `created_at` | timestamp NOT NULL DEFAULT current_timestamp() |
| `updated_at` | timestamp NOT NULL DEFAULT current_timestamp() |

# Absen
Not require **json web token** to access. Embeded automatically
when user login or accessing `/login` successfully.

### Entry Points
| Method | URL | URL Params | Body Params |
| ------ | --- | ---------- | ----------- |
| **GET** | `/absen` | `?page&select` | |
| **GET** | `/absen/:id` | `id` | |
| **GET** | `/absen/user/:id` | `id` | |
| **GET** | `/absen/count` | | |
| **POST** | `/absen` | | `all absen columns` |
| **PUT** | `/absen/:id` | `id` | `all absen columns` |
| **DELETE** | `/absen/:id` | `id` | |

### Table Schema
| Name | Options |
| --- | --- |
| `id` | int(10) unsigned NOT NULL AUTO_INCREMENT |
| `tanggal` | timestamp NOT NULL DEFAULT current_timestamp() |
| `user_id` | int(10) unsigned DEFAULT NULL |

# Literasi
Require **json web token** to access. The entry points
same as absen.

### Entry Points
| Method | URL | URL Params | Body Params |
| ------ | --- | ---------- | ----------- |
| **GET** | `/literasi` | `?page&select` | |
| **GET** | `/literasi/:id` | `id` | |
| **GET** | `/literasi/user/:id` | `id` | |
| **GET** | `/literasi/count` | | |
| **POST** | `/literasi` | | `all literasi columns` |
| **PUT** | `/literasi/:id` | `id` | `all literasi columns` |
| **DELETE** | `/literasi/:id` | `id` | |

### Table Schema
| Name | Options |
| --- | --- |
| `id` | int(10) unsigned NOT NULL AUTO_INCREMENT |
| `file` | varchar(255) DEFAULT NULL |
| `tanggal` | timestamp NOT NULL DEFAULT current_timestamp() |
| `user_id` | int(10) unsigned DEFAULT NULL |
| `modul_id` | int(10) unsigned DEFAULT NULL |