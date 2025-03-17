---
title: "EnsembleAI 2025, czyli 3 miejsce zdobyte atakiem rakietowym"
date: 2025-03-17T18:00:00+02:00
lastmod: 2025-03-17T18:00:00+02:00
summary: "Poznaj naszą relację z tegorocznego hackathonu EnsembleAI! Inaczej rakiety dolecą do Ciebie ;)"
thumbnail: "druzyna.jpg"
tags: ["hackathon", "ai", "ml", "python"]
slug: "ensemble-ai-2025"
---


{{<link href="https://ensembleaihackathon.pl/" text="EnsembleAI" target="_blank">}} to hackathon skupiający się na sztucznej inteligencji oraz uczeniu maszynowym. Tegoroczna edycja miała miejsce w dniach 14 - 16 marca 2025 i odbywała się na Wydziale Informatyki AGH w Krakowie. 

Wystartowałem z zeszłoroczną ekipą Iteracyjne zapytanie DNS, jako jedna z trzech drużyn z {{<link href="https://www.facebook.com/pp.ghost/?locale=pl_PL" text="koła naukowego GHOST" target="_blank">}}. 

Tym razem ([tu relacja z zeszłego roku](/blog/ensemble-ai)) udało nam się zająć **3 miejsce spośród 18 drużyn** rywalizujących w zadaniu - być może przez zmianę nazwy drużyny na Rekurencyjne zapytanie DNS :)

## Jak wyglądały zadania na hackathonie?

Każda drużyna musiała wybrać do rozwiązania jedną z dwóch głównych ścieżek.

### Zadania 1-4: czysty ML

Pierwsza ścieżka, niewybrana przez nas, obejmowała 4 zadania z tematyki ML:

1. Ustalenie, czy wskazane dane należą do nieznanego zbioru treningowego atakowanego modelu - *membership inference attack*;
2. Wykradanie modelu (enkodera SSL) zabezpieczonego mechanizmem B4B - *model stealing*;
3. Wytrenowanie modelu odpornego na ataki adwersażowe - *robustness, adversarial attack*;
4. Usunięcie wstrzykniętej podatności w model z zachowaniem accuracy - *backdoor*;

Zadania wydawały się bardzo ciekawe! Nie byliśmy jednak najlepiej przygotowani. 

Tematyka zadań została opublikowana dopiero w środę wieczorem, dwa dni przed wyjazdem na hackathon. Do przeczytania mieliśmy 8 paperów z arxiva, co w piątek po pracy poszło nam... średnio ;)  

### Zadanie 5: AI + ??? + teoria gier 

Druga ścieżka (tzw. *zadanie 5 / OctoSpace*) polegała na przygotowaniu autonomicznego bota do gry stworzonej na potrzeby zawodów. Boty rywalizowały ze sobą co godzinę poprzez pojedynki w parach, przez co drużyny mogły sprawdzać pozycję swoich rozwiązań na tabeli wyników. 

Zadaniem gracza było sterowanie statkami. Na mapie występowało kilka neutralnych planet, których przejęcie (wlecenie w nie statkiem) przyspieszało tempo pasywnego pozyskiwania surowców. Surowce z kolei można było zamienić na kolejne statki. Manewrowanie po losowo wygenerowanej planszy utrudniały asteroidy, które spowalniały statek i zmniejszały jego HP.    

Celem gry było zniszczenie planety bazy przeciwnika poprzez przejęcie jej statkiem. 

Dla wizualizacji zamieszczam filmik:

{{< youtube iVNxhu4uB1s >}}

## Przyjęta przez nas strategia 

### 12:00 - falstart pełną parą!

Prezentacja otwierająca event zakończyła się o 12:15. Usiedliśmy do komputerów, aby zapoznać się z zadaniami.

Usłyszeliśmy, że punkty na tablicy będą się aktualizowały co godzinę. Nie wiedzieliśmy jednak, czy punkty nabite od początku zawodów przełożą się na finalny wynik. Zrobiliśmy więc totalny speedrun, aby wysłać cokolwiek.

Z kilkoma minutami do 13:00, wysłaliśmy nasze pierwsze rozwiązanie. Nie do końca sprawne, wygenerowane przez DeepSeeka - ale nie wyrzucało błędów, więc miało szanse zdobyć punkty xD

Niepotrzebny trud. Organizatorzy poinformowali nas, że wyłącznie ostatnie starcia będą stanowić wyniki... a ponadto API jeszcze nie działało. Zwolniliśmy więc tempo i daliśmy na luz. 

### 15:00 - to trzeba na spokojnie...

Pogadaliśmy trochę z ekipą JetBrainsów, obgadaliśmy strategię w kolejce za pizzą i na spokojnie zjedliśmy. Można było działać!   

Pierwszą działającą wersję stworzył Szymon. Bota nazwaliśmy torpedą, bo rozwiązanie wysyłało statki kamikaze prosto na bazę przeciwnika. Zignorowaliśmy wszystkie funkcjonalności jak strzelanie, omijanie asteroid czy zarządzanie ekonomią. 

Kolokwialnie mówiąc, atakowaliśmy przeciwnika na pałę. 

{{< gallerystart >}}
{{< img src="bomba.jpg" alt="Może i robimy słabo, ale kto robi dobrze?" >}}
{{< galleryend >}}

Działało? Działało! Wysłaliśmy torpedę jako rozwiązanie.

Bardzo się zaskoczyliśmy, gdy ujrzeliśmy "Rekurencyjne zapytanie DNS" na pierwszej pozycji spośród 9 drużyn xD

{{< gallerystart >}}
{{< img src="leaderboard1.png" alt="Torpeda na prowadzeniu" >}}
{{< galleryend >}}

### 18:00 - ∞ - monkeys with a typewriter 

Mieliśmy działający baseline, więc mogliśmy ulepszać nasze rozwiązanie. Potencjalnie najlepszym rozwiązaniem okazałby się RL (reinforcement learning), jednak tutaj napotkaliśmy na kilka problemów:
- my nie implementowaliśmy dotychczas RL;
- serwer nie miał zainstalowanych dedykowanych bibliotek do RL, moglibyśmy dysponować samym pytorchem;

Musielibyśmy bardzo zaryzykować i prawdopodobnie nie stworzylibyśmy cokolwiek sensownego przez następne 24h. 

Szliśmy więc dalej drogą ulepszania baseline. Przez resztę hackathonu szukaliśmy optymalnej mety w grze, testowaliśmy kolejne heurystyki i ulepszaliśmy naszą predefiniowaną logikę. 


## Jak grał nasz bot?

Fani RTSów z pewnością znają taktykę pt. zerg rush. Przeciwnik, który zbytnio skupia się na pozyskiwaniu zasobów w early-game, zostanie pokonany przez nagły napad jednostek - nawet jeśli te jednostki są słabe! Tak samo działał nasz bot, który atakował z zaskoczenia.

Nasz bot zaczynał rozgrywkę od wypuszczenia dwóch statków torped - oryginalnej `icbm` oraz nowej `icbmv2`. Pędziły prosto na bazę przeciwnika i ignorowały statki przeciwników.

{{< gallerystart >}}
{{< img src="icbm gambit.jpg" alt="ICBM jak w gambicie szachowym" >}}
{{< galleryend >}}

Dlaczego akurat dwie wersje torped? 

Wersja v2 miała zaimplementowany pathfinding, który potrafił omijać asteroidy, jednak nie zawsze podążał najszybszą ścieżką. Oryginalna wersja była szybsza, ale za to potrafiła czasami po drodze rozbić się o przypadkową planetę. Z tego powodu puściliśmy dwie wersje, aby mieć pewność, że zaatakujemy przeciwnika na starcie.

Jako trzeci statek tworzyliśmy statek wieżyczkę - `defender`. 

Obrońca miał prostą logikę - stał w miejscu i strzelał do przeciwników. Jeśli atakujący przedostał się przez wieżyczkę, to wieżyczka od razu odbijała naszą bazę. Broniła zaskakująco dobrze! 

Jeśli z jakiegoś powodu wieżyczka padła, to tworzyliśmy ją w pierwszej kolejności. Następnie do końca gry tworzyliśmy `icbmv2` oraz trzymaliśmy na mapie jeden statek typu `explorer`. 

Rolą statku `explorer` było zwiedzenie mapy oraz wlatywanie w nieprzejęte planety. Nie mogliśmy kompletnie zignorować ekonomii, aby przeciwnik nas nie pokonał tempem tworzenia statków. 

Mieliśmy też kilka mechanizmów zabezpieczających. Przykładowo: jeśli `explorer` utknął w miejscu na chwilę, to zamieniał się w rakietę i pędził prosto na bazę przeciwnika.

Ponownie wkleję filmik dla zobrazowania strategii - nasz bot gra na nim ze samym sobą:

{{< youtube iVNxhu4uB1s >}}

### Efekt?

Miejsce 3 na 18 uczestniczących drużyn - więc pozytywne zaskoczenie! Jestem ciekaw, ile skomplikowanych modeli ML pokonały nasze proste, ale przetestowane heurystyki :D  

Koneserzy spaghetti ucieszą się na wieść, że kod źródłowy jest dostępny [na moim Githubie](https://github.com/asdfMaciej/ensemble-2025) ;)


## Ujarzmić hackathonowy chaos

Podzielę się jeszcze zastosowanym przez nas podejściem, aby dowieźć zadanie na czas. Dzięki temu spaliśmy aż 4h w nocy ;)    

Elementy rozwiązania były od siebie bardzo zależne. 
Przykładowo - jeśli chcemy sterować statkiem, to:
- musimy znać optymalną ścieżkę z punktu A do B;
- więc musimy wiedzieć gdzie są asteroidy, planety, etc.
- więc musimy zapisywać stan mapy;
- więc musimy wiedzieć jak gra przechowuje stan;
- itd...

Staraliśmy się zawsze maksymalnie skracać ścieżkę krytyczną.   
Na samym starcie przez to przeprowadziliśmy bardzo dużą refactorkę.

Dla powyższego przykładu ustaliliśmy, że potrzebna jest nam abstrakcja w postaci klasy `Ship`, ponieważ w kodzie nie było kontroli nad indywidualnym statkiem. Dzięki temu każda osoba mogła implementować oddzielny rodzaj statków. Rola pierwotnej klasy `Actor` sprowadziła się do kontrolowania logiką odnośnie rodzajów statków, co bez problemu mogła realizować jedna osoba.

Priorytetowo utworzyliśmy katalog na różne wersje botów. Następnie napisaliśmy skrypt, który testował dowolne 2 wersje kodu. Dzięki temu od razu mogliśmy działać na różnych plikach i nie walczyć z merge conflictami;

A ponadto: mogliśmy testować zachowanie bota w realny sposób! Testy na samego siebie nie były najlepszą drogą, stąd porównywanie różnych wersji było bardzo cenne. 

Statki miały części wspólne, które chcieliśmy zastosować w wielu rozwiązaniach - np. ww. pathfinding. Utworzyliśmy więc odrębny moduł `utils` na funkcje. Przesyłanie rozwiązań nie dopuszczało (chyba) przesłania kilku plików Pythona - więc stworzyliśmy skrypt w bashu, który łączył pliki w jeden przed testami/wysyłką rozwiązania. 

Efekt końcowy był taki sam, ale mieliśmy znacznie lepszy developer experience, co zaoszczędzało nam czas i nerwy. Napisaliśmy również testy jednostkowe, aby zapobiec błędom we współdzielonych utilsach.

Zależało nam też, aby nie polegać na API (które jednak nadal było niedoszlifowane ;) i przeprowadzać testy lokalnie. Odtworzyliśmy więc wersję Pythona z serwera testującego w CI/CD, gdzie przy okazji uruchamialiśmy testy różnych wersji statków. Wyłapało to co najmniej raz błąd, który ubiłby nam przesłane rozwiązanie.

Staraliśmy się również na bieżąco ustrukturyzować wiedzę - każda hipoteza odnośnie mechanizmu działania gry była przez nas weryfikowana w kodzie, a następnie spisywana na naszym Discordzie w formie bazy zweryfikowanych faktów. Ponadto odblokowaliśmy w grze mechanizm, który wizualizował pole widzenia statków, aby móc zrozumieć ich bieżące działania.

## That's all folks

Ponownie o {{<link href="https://ensembleaihackathon.pl/" text="EnsembleAI" target="_blank">}} mogę powiedzieć, że to super wydarzenie! Zdecydowanie polecam każdej zainteresowanej osobie.

W tym roku dostępna infrastruktura stała na dobrym poziomie. Dzięki uprzejmości Cyfronet AGH, każda drużyna miała dostęp do jednostki w superkomputerze Athena, który jeszcze w 2024 nosił miano najszybszego superkomputera w Polsce! 

Do trenowania modelów mogliśmy więc wykorzystać kartę Nvidia A100 z dostatkiem RAMu i miejsca na dysku.

Przynajmniej w teorii, bo torpeda nie wymagała takich skomplikowanych mechanizmów :)

Podziękowania dla drużyny Rekurencyjne zapytanie DNS za miniony weekend:
- [Maciej Mazur](https://www.linkedin.com/in/maciej-mazur-90064b2b4/)
- [Benedykt Huszcza](https://www.linkedin.com/in/benedykt-huszcza-478b69289/)
- [Szymon Pasieczny](https://www.linkedin.com/in/szymon-pasieczny-4a664b215/)
- [Jakub Binkowski](https://www.linkedin.com/in/jakub-binkowski-80136825b/)

Także podziękowania dla:
- Adama Mazura jako przewodniczącego GHOSTa za pomoc z kwestiami organizacyjnymi wyjazdu; 
- całej ekipy organizatorów za zorganizowanie hackathonu; 
- Ciebie, że przeczytał\_ś ten artykuł!

{{< gallerystart >}}
{{< img src="team.png" alt="Zdjęcie z ceremonii zakończenia" >}}
{{< img src="maskotka.png" alt="Tegoroczna maskotka" >}}
{{< galleryend >}}