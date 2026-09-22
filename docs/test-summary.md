# DataLife — oraliq tekshiruv hisoboti

**Holat:** oraliq hisobot; QA tugallanmagan.

**Doira:** ochiq sayt va ichki panel. Bosh sahifa, kirish formasi va bo‘sh maydon validatsiyasi, footer havolalari, KAA → UZ til almashtirish, mobil menyu va Python kursiga o‘tish tekshirildi.

**Muhit:** https://datalife.uz/; Windows; Playwright Chromium 149.0.7827.55 headless; KAA va UZ; 1440×1000 va 390×844 CSS px. Build noma’lum. Mobil tekshiruv brauzer oynasi o‘lchamida bajarildi, haqiqiy telefonda emas.

**Vaqt:** 2026-09-21. Birinchi bosqich: 09:36–09:38 UTC. Davomiy tekshiruv va skriptni moslashtirish urinishlari: 09:59–10:32 UTC; aniq vaqtlar dalillardagi JSON fayllarida.

| Natija | Soni |
| --- | --- |
| Jadvaldagi jami test | 12 |
| Bajarilgan | 8 |
| Pass | 7 |
| Fail | 1 |
| Not Run | 4 |
| Blocked | 0 |

## Natijalar

- TC-003: bo‘sh login formasida email maydoniga fokus o‘tdi va `Please fill out this field.` xabari chiqdi. Email va parol `valueMissing=true`; kirish so‘rovi yuborilmadi.
- TC-006: bosh sahifa HTTP 200 bilan ochildi va asosiy sarlavha ko‘rindi.
- TC-007: 390 px oynada, scroll’dan keyin ham, hujjat kengligi 390 px bo‘ldi. Bu butun mobil interfeys tekshirildi degani emas.
- TC-008: `/login` sahifasida email, parol va kirish tugmasi ko‘rindi. Akkaunt bilan kirish bajarilmadi.
- TC-009: uchta footer huquqiy havolasi hujjat ochmadi. [BUG-001](../bug-reports/BUG-001.md) yaratildi.
- TC-010: til menyusidan o‘zbekcha tanlangach `/uz/`, `lang=uz`, o‘zbekcha menyu va bosh sahifa matni ko‘rindi. Shu sahifa yangilanganda ham o‘zbekcha qoldi. Boshqa tillar va yangi sessiyada til tanlovining saqlanishi bu natijaga kirmaydi.
- TC-011: 390×844 oynada mobil menyu ochildi; `Kurslar` bosilgach `/courses` sahifasi va uning sarlavhasi ko‘rindi. Katalog ma’lumotlarining to‘liq yuklanishi bu testga kirmaydi.
- TC-012: katalogdan Python havolasi orqali `/courses/python` ochildi; kurs sarlavhasi, tavsifi, muddati, narxi va mentorlar ko‘rindi. Kursga yozilish yoki to‘lov bajarilmadi.

## Qo‘shimcha kuzatuvlar va cheklovlar

- Dastlabki desktop qaydida `/api/engagement/blog` so‘rovi `net::ERR_ABORTED` bilan tugagan; mobil qaydda bunday holat yo‘q. Ta’siri va takrorlanishi tasdiqlanmagani uchun alohida bug hisoblanmadi.
- Dastlabki to‘liq sahifa skrinshotlarida scroll bilan paydo bo‘ladigan bo‘limlar yashirin qolgan. `public-navigation` ichidagi `after-scroll` skrinshotlari scroll’dan keyin olindi. Dastlabki bo‘sh joylar sayt xatosi deb belgilanmadi.
- Panelga haqiqiy akkaunt bilan kirish, noto‘g‘ri parol, chiqish, himoyalangan sahifalar va rollar hali tekshirilmagan. TC-001, TC-002, TC-004 va TC-005 `Not Run` holatida.
- Login formasida faqat bo‘sh maydonlar bilan yuborishga urinish qilindi; brauzer validatsiyasi uni to‘xtatdi. Shu test davomida ehtiyot chorasi sifatida yozuvchi tarmoq so‘rovlarini bloklash yoqilgan edi, lekin bunday so‘rov aniqlanmadi. Aloqa, obuna va kursga yozilish formalari yuborilmadi, akkaunt yaratilmadi.
- Dastlabki davomiy urinishlarda `networkidle`, element turi va URL oxiridagi `/` haqidagi noto‘g‘ri skript taxminlari sabab tekshiruvlar to‘xtagan. Bular mahsulot xatosi deb hisoblanmadi. Moslashtirilgan tekshiruvlarning dalillari quyida ko‘rsatilgan; eski urinishlar audit uchun saqlangan.
- Ayrim skrinshotlarda animatsiya, rasm yoki qo‘shimcha ma’lumotlar yuklanishi davom etmoqda. Ular to‘liq vizual sifat yoki yuklanish tezligi bo‘yicha `Pass` dalili emas. Til va kurs testlarida faqat yuqorida sanalgan xatti-harakat tasdiqlangan.
- Ishlab chiqarishga chiqarish yoki sayt sifati haqida umumiy xulosa berish uchun bu tekshiruv yetarli emas.

## Keyingi bosqich

1. Foydalanuvchi bilan panel URL manzili, rol va test akkaunti mavjudligini aniqlash.
2. Panelni foydalanuvchi bilan ko‘rib, modullariga mos test holatlarini yozish va bajarish.
3. Aloqa forma validatsiyasi, kurs qidiruvi va filtrlari hamda qolgan ochiq sahifalarni tekshirish.

## Dalillar

- [Dastlabki brauzer qaydi](../evidence/public-discovery/observations.json).
- [Navigatsiya va login qaydi](../evidence/public-navigation/observations.json).
- [Desktop sahifa](../evidence/public-navigation/home-desktop-after-scroll.png).
- [Mobil sahifa](../evidence/public-navigation/home-mobile-after-scroll.png).
- [Login formasi](../evidence/public-navigation/login-desktop.png).
- [Bo‘sh login validatsiyasi](../evidence/public-flows/TC-003.png) va [qaydi](../evidence/public-flows/observations.json), faqat `TC-003` yozuvi.
- [Mobil menyu](../evidence/public-flows-run3/mobile-menu-open.png), [Python tafsiloti](../evidence/public-flows-run3/TC-012.png) va [qaydlar](../evidence/public-flows-run3/observations.json), faqat `TC-011` va `TC-012` yozuvlari.
- [Til testi yakuniy qaydi](../evidence/public-flows-final/observations.json) va [yangilashdan keyingi ko‘rinish](../evidence/public-flows-final/TC-010.png).

Tekshiruv yordamchi Playwright skriptlari bilan bajarildi; uni to‘liq qo‘lda bajarilgan test sifatida ko‘rsatmaslik kerak. Skriptlar uchun mahalliy keshdagi Playwright ishlatildi. Node.js, Playwright va unga mos Chromium kerak.

Takrorlash buyruqlari:

```text
node scripts/inspect-public.cjs <playwright-module-path>
node scripts/check-public-navigation.cjs <playwright-module-path>
node scripts/check-public-flows.cjs <playwright-module-path> <yangi-dalil-papkasi> TC-010,TC-011,TC-012,TC-003
```

Oxirgi buyruq dalillarni `evidence/<yangi-dalil-papkasi>/` ichiga yozadi. Har bir urinish uchun yangi papka nomini tanlang. Skriptlar kuzatuvlarni yig‘adi; jarayonning `exit 0` bilan tugashi barcha testlar o‘tganini anglatmaydi. `automationError`, haqiqiy natija va skrinshotlar tekshirilgach jadvalga holat qo‘yiladi.
