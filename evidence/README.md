# Test dalillari

Test davomida olingan skrinshot va qisqa videolar shu papkada saqlanadi.

- Test uchun nom: `TC-001_YYYY-MM-DD_login.png`.
- Xato uchun nom: `BUG-001_YYYY-MM-DD_error.png`.
- Fayl nomida tegishli test yoki xato ID raqamini ishlating.
- Skrinshot holatni tushunish uchun yetarli kontekstni ko‘rsatsin.
- Saqlash va ommaga chiqarishdan oldin parol, token, cookie, shaxsiy ma’lumot va ichki maxfiy ma’lumotlarni olib tashlang yoki yoping.
- Test jadvali yoki xato hisobotidan tegishli dalilga havola bering.

## Mavjud dalillar

- `public-discovery/` — bosh sahifaning dastlabki DOM qaydlari va skrinshotlari. Scroll qilinmagan sababli skrinshotda ayrim bo‘limlar yashirin.
- `public-navigation/` — scroll qilingandan keyingi skrinshotlar, login formasi va footer havolalarini bosish natijalari.
- `public-flows/` — TC-003 bo‘sh login validatsiyasi; boshqa yozuvlar dastlabki tugallanmagan urinishlar.
- `public-flows-run2/` — skriptni moslashtirish paytidagi oraliq qaydlar; yakuniy Pass dalili sifatida ishlatilmaydi.
- `public-flows-run3/` — TC-011 mobil menyu va TC-012 Python kursiga o‘tish dalillari; TC-010 bu urinishda tugallanmagan.
- `public-flows-run4/` — TC-010 uchun oraliq qayd; skrinshot yuklanish ekrani paytida olingan.
- `public-flows-final/` — TC-010 til tanlash va yangilashdan keyingi yakuniy dalil.

Har bir papkadagi `observations.json` bajarish vaqti, brauzer va kuzatilgan natijalarni saqlaydi.
