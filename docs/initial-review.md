# DataLife — dastlabki texnik kuzatuv

Bu birinchi HTTP tekshiruvi vaqtida yozilgan tarixiy qayd. Keyingi brauzer natijalari [oraliq hisobotda](test-summary.md) berilgan.

**Sana:** 2026-09-21

**Manzil:** https://datalife.uz/

**Usul:** PowerShell `Invoke-WebRequest -Uri 'https://datalife.uz' -UseBasicParsing` orqali ochiq bosh sahifaning HTTP javobi va HTML matnini o‘qish. Brauzerda JavaScript bajarilmadi.

## Kuzatilgan holatlar

| Kuzatuv | Olingan natija | Cheklov |
| --- | --- | --- |
| Bosh sahifaga HTTPS so‘rovi | HTTP 200 | Faqat shu so‘rov muvaffaqiyatli; ilova funksiyalarini tasdiqlamaydi |
| Dastlabki HTML sarlavhasi | DATA LIFE — IT Education Center & Technology Company | JavaScript ishlagach sarlavha o‘zgarishi mumkin |
| Sahifa tarkibi | `root` konteyneri va JavaScript moduliga havola mavjud | Ko‘rinadigan interfeys va interaksiyalar tekshirilmagan |
| Dastlabki HTML tili | `lang="kaa"` | Til almashtirish funksiyasi amalda tekshirilmagan |

Dastlab sandbox ichidagi so‘rov ulanmagan; tashqi tarmoq ruxsati bilan takrorlangan so‘rov HTTP 200 qaytardi. Sandboxdagi ulanish xatosi sayt xatosi sifatida qayd etilmaydi.

## Hali tekshirilmagan

- Sahifaning brauzerda to‘liq ochilishi va tashqi resurslarning yuklanishi.
- Navigatsiya, tugmalar, formalar va mobil ko‘rinish.
- Login, logout, rollar va ichki panel.
- Til almashtirish va matnlarning to‘g‘ri ko‘rsatilishi.

## Keyingi amaliy qadam

Tekshirish doirasi tanlandi: ochiq sayt va panel. Ochiq saytni brauzerda ko‘rib, ko‘rinadigan funksiyalar ro‘yxatini tuzamiz; panel uchun URL va test akkaunti mavjudligini aniqlaymiz. Mavjud login testlari hozircha `Draft / Not Run` holatida qoladi.

**Tasdiqlangan xatolar:** hozircha yo‘q. Bu sayt xatosiz degani emas; funksional tekshiruv hali bajarilmadi.
