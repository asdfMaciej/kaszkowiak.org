---
title: "Poznaj Hugo - generator stron statycznych"
date: 2021-06-18T14:33:06+02:00
summary: "Wygodny workflow dla każdego web developera."
thumbnail: "hugo.png"
tags: ["webdev", "hugo"]
---
Strona [kaszkowiak.org](https://kaszkowiak.org) powstała w oparciu o generator stron statycznych Hugo.

Projekt podzielony jest na kilka podkatalogów, najważniejsze z nich to:
- **content**: treść stron w formacie Markdown, jeden plik - jedna podstrona. Wewnętrzna struktura folderów odpowiada strukturze strony.
- **assets**: pliki przetwarzane przed wygenerowaniem strony w dowolny sposób, np.: SASS, SCSS, minifikacja, bundling
- **layouts**: treść templatek, które służą do wygenerowania poszczególnych podstron. 
- **static**: pliki statyczne kopiowane bez modyfikacji: zdjęcia, CSS, JS, itp.

Workflow jest niezwykle wygodny. Hugo posiada wbudowany serwer, który po wykryciu zmiany automatycznie generuje stronę i odświeża ją w przeglądarce.
Szybkość działania również powala na łopatki - na moim PC aktualizacja treści zajmuje ~15ms, natomiast wygenerowanie całej strony (w tym zamiana SASS na CSS) trwa zaledwie sekundę!

Deployment również jest prosty, szczególnie na platformach typu Github, Gitlab, czy też Netlify. Strony pisane z Hugo bardzo dobrze integrują się z gitem.

## Dlaczego akurat Hugo?

Przede wszystkim: **łatwość wprowadzania zmian**. Dodawanie nowych podstron, modyfikowanie struktury strony i wprowadzanie zmian nie stanowi żadnego problemu. Do edycji potrzebuję jedynie edytora tekstu. Nie muszę korzystać z CMSa, co osobiście bardzo cenię.

Kolejne atuty to **szybkość** i **niewielkie wykorzystanie zasobów**. Na chwilę pisania tego tekstu Hugo wykorzystuje u mnie zaledwie 60 MB pamięci, pełniąc dodatkowo rolę serwera. Prędkość generowania stron sprawia, że tuż po naciśnięciu CTRL+S widzę zmiany w przeglądarce. Patrząc z perspektywy hostingowej, strona wygenerowana przez Hugo może stać niemal wszędzie. Nie potrzebujemy dostępu do bazy danych ani interpretera PHP do zwrócenia strony, przez co otwiera się szeroka gama darmowych rozwiązań hostingowych - Github Pages, Netlify, itd. 

Treść stworzoną w oparciu o pliki Markdown jest również bardzo łatwo przenieść na inną platformę.

Hugo w moich oczach to narzędzie wyłącznie dla programisty - bez wiedzy technicznej szary człowiek nie postawi strony tak łatwo, jak na np. Wordpressie. 

## Nieoszlifowany diament

Świetne narzędzie, choć na starcie jest momentami pod górkę. **Hugo posiada istotne braki w dokumentacji**, przez co ciężko jest znaleźć informacje na temat niektórych przeszkód. 

Kompilacja SCSS wymaga pobrania wersji Hugo Extended. Zaczynając przygodę z Hugo skopiowałem z internetu snippet zamieniający SCSS na CSS, który dodatkowo wykorzystywał NPMowy moduł postcss. Otrzymałem dość niejasny komunikat błędu, który w żaden sposób nie świadczył o braku zainstalowanego modułu. Według [Github Issues](https://github.com/gohugoio/hugo/issues/5111) ta niejasność została poprawiona, lecz trafiłem na to w najnowszej wersji. 

Hugo nie posiada wbudowanego domyślnego motywu. Po uruchomieniu komendy "hugo new site" otrzymujemy jedynie pustą strukturę katalogów. W poradniku startowym autorzy zalecają pobranie motywu Ananke za pomocą gita. Uważam to za znaczącą przeszkodę dla osób początkujących - polecany motyw jest dość rozbudowany i ciężko jest zacząć go modyfikować bez dostatecznej wiedzy. Znacznie lepszym rozwiązaniem na start byłby zwykły Hello World: z dwoma podstronami, komentarzami w kodzie do czego służy plik i podstawowym podziałem na header / treść / footer.

Im częściej korzystamy z templatowania w Hugo, tym więcej pustych linii znajdziemy w wygenerowanym kodzie HTML. Rozwiązanie jest proste - otaczając \{\{ zmienne \}\} w klamrach z \{\{- dodatkowym myślnikiem -\}\}, Hugo usunie niepotrzebny whitespace wokół klamr. To również było ciężko znaleźć w Google - szukając pod hasłem "hugo remove extra new lines" nie znajdziemy nic w oficjalnej dokumentacji. Drobnostka, ale warto wspomnieć.
<!--
Przeszkody:
- umieszczanie obrazkow zacielo
- headless bundles, szukanie w podstronie
- leaf bundle fallbackuje do \_default https://github.com/gohugoio/hugo/issues/5714
- wysylanie maili przez formularz
- wyszukiwanie na stronie
- duzo pustych linii w kodzie html [ale uwaga: dash w parenthesis usuwa ]


Wordpress to wielka kobyła zjadająca zasoby. Wygenerowanie strony głównej wymaga kilkudziesięciu zapytań do bazy danych a do szybkiego działania potrzebujemy mocnego hostingu lub sprawnego cache. Przy Wordpressie należy również dbać o bezpieczeństwo - regularne aktualizacje systemu i pluginów - gdzie strona statyczna zapewnia to z założenia.-->