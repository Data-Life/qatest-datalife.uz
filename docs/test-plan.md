# DataLife — dastlabki test rejasi

## Muhit

| Maydon | Qiymat |
| --- | --- |
| Ochiq sayt URL | https://datalife.uz/ |
| Ichki panel URL | Aniqlanadi; ochiq sayt manzilidan farq qilishi mumkin |
| Kirish sahifasi | https://datalife.uz/login — email va parol formasi tasdiqlangan |
| Ilova vazifasi | HTML sarlavhasida IT ta’lim markazi va texnologiya kompaniyasi sifatida ko‘rsatilgan; ichki panel vazifasi aniqlanadi |
| Muhit: test / staging / production | Aniqlanadi |
| Versiya yoki build | Aniqlanadi |
| Test sanasi | Test bajarilganda yoziladi |
| Tester | Aniqlanadi |
| Brauzer va versiya | Dastlabki tekshiruvlarda Playwright Chromium 149.0.7827.55 headless |
| Operatsion tizim | Windows |
| Test uchun foydalanuvchi rollari | Aniqlanadi; parollar yozilmaydi |
| Talablar yoki qabul mezonlari manbasi | Aniqlanadi |

## Dastlabki doira

Foydalanuvchi ikkala qismni ham tanladi: **ochiq sayt va login orqali kiriladigan panel**. Panel manzili, test roli va test akkaunti mavjudligi aniqlashtirilmoqda. [Dastlabki texnik kuzatuv](initial-review.md) funksional test natijasi emas.

### Ochiq sayt

- Bosh sahifaning ochilishi va asosiy kontentning ko‘rinishi.
- Menyu, ichki havolalar va mavjud bo‘limlarga o‘tish.
- Mavjud tillarni almashtirish.
- Desktop va mobil ko‘rinish, mobil menyu.
- Mavjud formalarning maydonlari va validatsiyasi; yuborish uchun test muhiti aniqlanadi.

### Panel

- Kirish, noto‘g‘ri ma’lumotlar, chiqish va sessiya holati.
- Rolga mos menyu va sahifalar.
- Asosiy ish jarayoni va mavjud jadval, qidiruv, filtrlar.
- Ma’lumot yaratish, tahrirlash va o‘chirish: test muhiti hamda test yozuvlari aniqlangach.

Panel modullari nomlari interfeys ko‘rilmaguncha taxmin qilinmaydi.

Ilovani ko‘rgach quyidagi nomzod yo‘nalishlardan tegishlilarini tanlaymiz:

- Kirish, chiqish va autentifikatsiyasiz sahifaga kirish holatlari.
- Asosiy panel va navigatsiya.
- Asosiy ish jarayoni: ilovaning vazifasi aniqlangach yoziladi.
- Formalar, majburiy maydonlar va xato xabarlari.
- Qidiruv, filtr va sahifalash — mavjud bo‘lsa.
- Turli ekran o‘lchamlarida ko‘rinish va klaviatura bilan asosiy boshqaruv.

Yuklama sinovlari, xavfsizlik hujumlari va haqiqiy ma’lumotlarni o‘zgartirish dastlabki doiraga kirmaydi. Ma’lumot yaratish, o‘zgartirish yoki o‘chirish sinovlari muhit va test ma’lumotlari aniqlangach rejalashtiriladi.

## Bajarish tartibi

1. Panel bilan tanishish: sahifalar, rollar va asosiy ish jarayonini yozib chiqish.
2. Smoke tekshiruv: tizim ochiladimi, kirish va asosiy sahifalar ishlaydimi?
3. Tanlangan funksiyalar uchun ijobiy va salbiy testlarni bajarish.
4. Muammolarni qayta takrorlash, dalil saqlash va bug report yozish.
5. Tuzatish mavjud bo‘lsa retest va tegishli funksiyalar uchun regression tekshiruvini bajarish.

## Boshlash shartlari

- Panel ochiladi va test qilish doirasi aniq.
- Kerakli test akkaunti mavjud; uning paroli hujjatlarga kiritilmagan.
- Tanlangan testlarning kutilgan natijalari talab yoki kelishilgan xatti-harakat bilan asoslangan.

## Yakunlash shartlari

- Tanlangan testlar bajarilgan yoki bajarilmaganining sababi qayd etilgan.
- Har bir `Fail` natija uchun xato hisoboti yoki mavjud xatoga havola bor.
- Muhim ochiq muammolar, tekshirilmagan qismlar va cheklovlar yakuniy hisobotda ko‘rsatilgan.

## Yakuniy hisobot tarkibi

Testlardan keyin `docs/test-summary.md` yaratiladi: tekshirilgan versiya va muhit, doira, test natijalari soni, tasdiqlangan xatolar, ochiq xavflar va dalillar havolalari. Bajarilmagan ishlar natija sifatida ko‘rsatilmaydi.
