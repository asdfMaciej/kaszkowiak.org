---
title: "EnsembleAI: zabezpieczenia ML kontra 5 studentów"
date: 2024-03-18T20:00:00+02:00
lastmod: 2024-03-18T20:00:00+02:00
summary: "Relacja z hackathonu EnsembleAI z 16-17 marca 2024, opartego o tematykę security w ML. Czy ekipa początkujących podoła zadaniom?"
thumbnail: "druzyna.jpg"
tags: ["hackathon", "ai", "ml", "security"]
slug: "ensemble-ai"
---

W miniony weekend skompletowałem drużynę znajomych z GHOSTa i ruszyliśmy na bój do Warszawy, aby walczyć z zabezpieczeniami modelów sztucznej inteligencji. Relacja pisana okiem początkującego ;d 

## Co trzeba było zrobić?

Zadania opierały się o tematykę zabezpieczeń modelów ML.

**W pierwszym zadaniu musieliśmy wykraść wagi modelu dostępnego za API.** Wysyłając zapytanie, w odpowiedzi na obraz PNG 32x32 otrzymywaliśmy reprezentację w postaci wektora z 512 pozycjami. Mieliśmy również dostęp do niewielkiej części obrazów zawartych w training secie enkodera. Oczekiwaną odpowiedzią na zadanie był model zwracający identyczne wagi do tego zamieszczonego w API. 

Aby nie było za prosto, organizatorzy wdrożyli kilka zabezpieczeń:
- wyniki w API były z każdym zapytaniem coraz bardziej zaszumiane;
- nie mieliśmy pojęcia jakiej architektury jest wykradany model;
- serwery organizatorów płonęły przez \~połowę hackathonu ;) 

Jak można obejść szum rosnący z liczbą zapytań do API? W prawdziwym świecie: stworzyć więcej kont! Nowe konto usunie nam szum w późniejszych zapytaniach.

Organizatorzy poszli tym tropem i **drugie zadanie polegało na złamaniu nowego zabezpieczenie przeciwko atakowi z wielu kont**, czyli tak zwany Sybil attack. 

Jak działa takie zabezpieczenie? Otrzymywane wektory od teraz były tak zmodyfikowane, aby:
- atakujący nie mógł jednocześnie zastosować wektorów z dwóch kont do jednego ataku; 
- a wektory po transformacjach będą równie użyteczne dla zastosowań użytkownika, co oryginalne.

Każdy uczestnik mógł wykonać maksymalnie 2 000 zapytań dla jednego zestawu przekształceń. Oczekiwaną odpowiedzią na zadanie było komplet oryginalnych wektorów dla 20 000 zdjęć :) Zadanie było rozbite na dwa punkty, każdy z odrębną metodą zabezpieczeń.

Co za tym idzie, **w trzecim zadaniu musieliśmy stworzyć własny mechanizm zabezpieczeń**. Otrzymaliśmy zestaw wektorów, który powinniśmy zabezpieczyć i przesłać zmodyfikowane wektory. Maszynka sprawdzająca upewniała się, że wektory nadają się do użytku i nie tracą na skuteczności. Jeśli były OK, drużyny były punktowane po odległości względem oryginalnych wektorów - im ustalono mniejsze podobieństwo, tym lepszy wynik. 

Zadania były skonstruowane w taki sposób, że były niezależne od siebie. Nie musieliśmy skończyć zadania pierwszego, aby zacząć drugie, etc. :)

## Jak duży był próg wstępu?

Z perspektywy osoby początkującej, początkowo ogłoszony temat "stealing SSL encoders" zmroził krew w moich żyłach. Skoro nie pojmuję czym są nazwy SSL, encoder, to jak mam takowy wykraść? 

Na szczęście, organizatorzy przed wydarzeniem opublikowali krótki wstęp teoretyczny dla zadań, który rozjaśnił tematykę:

{{< youtube yUiCHiPHUpc >}}

Oraz:

{{< youtube 7-pfbGBZhIg >}}

Bardzo pomogły mi także poniższe prace naukowe, które namierzyłem z odrobiną Google-fu:

- zrozumienie konceptu - w głównej mierze [Stealing Machine Learning Models via Prediction APIs](https://arxiv.org/abs/1609.02943)
- zrozumienie konceptu - drugorzędnie [On the Difficulty of Defending Self-Supervised Learning against Model](https://arxiv.org/abs/2205.07890)
- zrozumienie zastosowanego zabezpieczenia w zadaniu 1 - [Bucks for Buckets (B4B): Active Defenses Against Stealing Encoders](https://arxiv.org/abs/2310.08571)

Ale to wszystko teoria. Po przeczytaniu paperów nie miałem pojęcia, czy moja wiedza wystarczy, czy implementacja totalnie nas pokona. Reszta teamu podobnie. Jak oceniamy ten aspekt po wydarzeniu? 

**Próg wstępu okazał się niewielki** :) Do zrobienia wszystkich zadań wystarczyły opanowane podstawy podstaw (np. pierwsze 2-3 lekcje z [course.fast.ai](https://course.fast.ai)) oraz zaciekłość do nauki i eksperymentowania. No, i nie zapominajmy o walce z PyTorchem ;)

## Jak rozwiązaliśmy zadania? 

Opowiem w pokrętnej kolejności: 

### Trzecie - łatwo

**Zadanie trzecie okazało się najprostsze**. Aby zabezpieczyć wektor, zachowując pierwotną skuteczność, wykorzystaliśmy poniższy giga-skomplikowany hipertajny™ kod. Opatrzyłem go komentarzami, aby rozszyfrowanie było możliwe: 

```python
# Load the input data.
data = np.load("DefenseTransformationSubmit.npz")['representations']

# Generate a permutation of indices
perm = np.random.default_rng().permutation(len(data[0]))

# Shuffle each array using the permutation
shuffled_arrays = np.array([arr[perm] for arr in data])

# Save the submission
data = np.savez("submission.npz",representations=shuffled_arrays)
```

Potasowaliśmy tablice i... to tyle xD Uzyskaliśmy ładny wynik w środku stawki. Puściłem kod znowu, aby uzyskać inne losowe potasowanie, i... uzyskaliśmy jeszcze lepszy wynik 8) 

Wynik: #9/27 

Mieliśmy w planach pomysły na kolejne zabezpieczenia, ale nie byliśmy w stanie ich przetestować. Wysyłka rozwiązań była niemożliwa od \~ pierwszej w nocy do końca wydarzenia (API on fire), a my zaczęliśmy działać chwilę przed północą. (\*) Organizatorzy przygotowali możliwość wysłania jednego rozwiązania, które było ręcznie ocenione po zakończeniu wydarzenia, ale to niestety nie wystarczyło. Z pomysłów mieliśmy jeszcze pomnożenie wektora o stałą wartość oraz dodanie stałego czynnika.

### Pierwsze - ciężko

#### Wyślijmy cokolwiek

Aby zrobić pierwsze zadanie, trzeba zrozumieć jak wykradany model był trenowany. Enkoder, który zwracał w API wektory dla obrazków, to ostatnia warstwa stojąca przed modelem klasyfikacji. 

Chcieliśmy wysłać na start cokolwiek. Stworzyliśmy lokalnie model klasyfikatora z poniższymi cechami:
- przedostatnia warstwa miała 512 neuronów (wymagana szerokość enkodera);
- ostatnia warstwa miała 20 neuronów (liczba klas)

 Po wytrenowaniu modelu klasyfikatora na parach (obrazek, label), musieliśmy jakoś wydobyć przedostatnią warstwę, aby ona była końcowa przy wysyłce. Pomógł nam jeden z organizatorów, wielkie dzięki! Zamieniliśmy ostatnią warstwę na nn.Linear, która zwracała niezmieniony wektor z przedostatniej warstwy. Tym sposobem otrzymaliśmy model, który spełniał wymagania zadania. Wysłaliśmy go szybko po tym, jak API wstało, i... byliśmy pierwsi! XD

{{< img src="pierwsi.png" alt="Es?" >}} 

Oczywiście przy śmiesznym wyniku. Nasze wagi nie były w żaden sposób powiązane z wagami docelowego klasyfikatora, chociażby przez kolejność.

#### Wyślijmy cokolwiek działającego 

API wstało, więc postanowiliśmy faktycznie wykraść model.

Zacznę od wytłumaczenia - jak wykraść model? Bierzecie dużo inputów (w tym przypadku obrazów), otrzymujecie dużo outputów (w tym przypadku wektorów) i trenujecie własną sieć neuronową. Otrzymacie model, który zachowuje się w zbliżony sposób do oryginału. 

Aby polepszyć wynik, postanowiliśmy zebrać jak najwięcej inputów w postaci (input - zdjęcie, output API - wektor), a następnie wytrenować lokalną sieć na tych parach, kompletnie pomijając klasyfikację obrazków.

Z drobną pomocą Copilota, udało się! Wynik spadł o cały rząd wielkości, a w tym zadaniu im mniejszy tym lepszy :) 

Postanowiliśmy więc pobrać więcej danych. Tutaj duże zaskoczenie. Wynik dla 97 wykradzionych par okazał się lepszy, niż dla 1900 par. Z kolejnymi pobieranymi obrazkami, API nakładało coraz większy szum.  

#### Ulepszmy to 

Logicznym pierwszym krokiem było dla nas obejście szumu. Nie mieliśmy jednak pojęcia, jak to działa pod spodem w API (w końcu black box) - wzięliśmy więc kartkę papieru i rozpatrzyliśmy możliwe warianty:

Początkowo przyjąłem, że nowe, mocniejsze ustawienia szumu są generowane wraz z poszerzeniem przestrzeni zapytań z API i nie są modyfikowane przy zapytaniach z dotychczasowej przestrzeni. Zapytania `x1 x2 x3` o obrazek `A A A` spowodowałyby uzyskanie identycznych danych `x1 = x2 = x3`. Natomiast zapytania `y1 y2 y3` o obrazki `A B A` spowodowałyby uzyskanie odmiennych danych dla `y1 != y3`, przy czym `y3` byłoby wygenerowane z większą wartością szumu. 

To chyba byłoby całkiem dobre zabezpieczenie. Aby uzyskać 100 zaszumionych próbek dla wektora A, musielibyśmy wykonać 100+99+98+...1 zapytań w następującym schemacie:
```
A | B A | C B A | D C B A | ...
```

Ustaliliśmy jednak, że tak nie jest. Zapytanie `A A A` spowodowało uzyskanie trzech różnych wektorów. Co za tym idzie? **Szum można usunąć w prosty sposób**, czyli odpytując N razy z kolei o jedną próbkę, a następnie wyciągając średnią arytmetyczną. 

Sprawdźmy to. Eliminację szumu zmierzyłem odpytując N razy `A`, następnie `B`, a finalnie `A`. Po uśrednieniu pierwszego i trzeciego zbioru zapytań, zmierzyłem MSE pomiędzy średnią wektora ze zbioru nr 1, a średnią wektora ze zbioru nr 3. Przetestowałem dla różnych N i... metoda zadziałała :)

**Szum był 2 rzędy wielkości mniejszy** porównując N=2 a N=100, a porównując N=2 a N=10 był 1 rząd wielkości mniejszy.

Wpadłem więc na pomysł, aby kompletnie olać obrazki z bazy i stworzyć obrazki dla równomiernie rozdystrybuowanych punktów z przestrzeni zapytań. W teorii powinno przynieść to gigantyczny szum (przez specyfikę zabezpieczeń), ale w praktyce byłem w stanie go wyeliminować w znaczącym stopniu. Jak wybrać losowe obrazki w rozkładzie równomiernym? `torch.randint` i konwersja na PNG :)

Metoda zadziałała! O dziwo, model wytrenowany w oparciu o odszumione losowe punkty, poradził sobie lepiej.   

Niestety, ale przez ser\*er nie byłem w stanie przetestować kolejnych pomysłów. Moimi kolejnymi krokami było zastosowanie metody eliminacji szumu na obrazkach ze zbioru treningowego, co pozwoliłoby mi otrzymać jeszcze lepszy wynik, ponieważ specyfika zastosowanego zabezpieczenia sprawiała, że owe obrazki rezultowały mniejszym szumem. Myślałem również nad wykorzystaniem jakoś labelek ze zbioru testowego, ale nie wpadłem na żaden dobry pomysł.   

Wynik: #15/27 (przedostatnie miejsce z drużyn, które wysłały rozwiązanie 😎)

### Drugie - magia

Zadanie drugie osiągnęło nasze najlepsze wyniki! Było podzielone na dwie części, nad którymi bezpośrednio nie pracowałem przez podział prac, więc oddaję głos Biniowi:

> Zacznijmy od tego, że zadanie opierało się o tzw. Sybil attack, który polega na tym, że gdy nie jesteśmy w stanie wykraść wszystkich danych z jednego konta, to zakładamy wiele kont, z każdego wykradamy odpowiednią część danych i sklejamy je w całość. Tymczasem my po prostu wzięliśmy dane z jednego zapytania, na nich wytrenowaliśmy modele i wyszło, że jest z tego fajny efekt.
>
> Zadanie z sybil attackiem rozwiązaliśmy praktycznelie bez zastosowania sybil attacku. Mieliśmy do dyspozycji 20000 obrazków oraz dwa endpointy: A i B. 
>
> Po uderzeniu do endpointa, otrzymywaliśmy z powrotem reprezentację obrazka w postaci wektora o długości 384. Problem polegał na tym, że mogliśmy zrobić to tylko dla 2000 obrazków per endpoint (w przeciwnym wypadku trzeba zresetować zadanie) zatem mieliśmy do dyspozycji tylko 10% datasetu (a nawet mniej bo przez serwery było to 1250). 
>
> Naszym celem było wykraść przekształcenie, jakie zachodzi między wektorami zwracanymi przez B i A. Super data engineerowie Szymon i Maciej *[przyp. red. Mazur]* przygotowali dane, a ja z Benkiem napisaliśmy i wytrenowaliśmy dwa modele: pierwszy, żeby wiedzieć w jaki sposób generowane są 384-elementowe wektory dla obrazka, a drugi żeby znaleźć zależność między wektorami z endpointów B oraz A. 
>
> No i wyszło nam naprawdę nieźle, bo wytrenowaliśmy te modele i zajęliśmy 6 miejsce w tym zadaniu z wariantem binarnym. Gorzej z wariantem affine, bo przez palący się serwer nie mieliśmy żadnych sensownych danych. Co ciekawe, model z pierwszego podzadania, jakimś cudem w drugim podzadaniu zajął 11 miejsce. 

Z mojej strony: team zrobił naprawdę dobrą robotę! Nie zapomnę ekscytacji, gdy okazało się o 4 w nocy przy pierwszej wysyłce, że nie dość że model działa, to jeszcze wbił się do TOP 3 XD Sami nie wiemy, jak to się stało przy wykorzystaniu niewielkiej części datasetu xD

Wynik: #6/27 oraz #11/27. 

## Słowa końcowe

W skrócie: **super wydarzenie**! Organizatorzy zrobili dobrą robotę i zapewnili zadania o ciekawej tematyce. Wydarzenie było bardzo emocjonujące, odbiegając od typowej hackathonowej konwencji tworzenia demka aplikacji. Wierzymy, że serwery na następnej edycji byłyby dokładniej przetestowane ;)

Finalnie zajęliśmy 12 miejsce na 27 drużyn. Nie jest to spektakularny wynik, ale bardzo przewyższył nasze oczekiwania - spodziewaliśmy się ostatniego miejsca czy też DNF w niektórych taskach :) 

{{< img src="plakat.jpg" alt="Proroczy rysunek z pierwszych godzin" >}} 

## Podziękowania
 
Podziękowania dla drużyny Iteracyjne zapytanie DNS za miniony weekend:

- [Maciej Mazur](https://www.linkedin.com/in/maciej-mazur-90064b2b4/)
- [Benedykt Huszcza](https://www.linkedin.com/in/benedykt-huszcza-478b69289/)
- [Szymon Pasieczny](https://www.linkedin.com/in/szymon-pasieczny-4a664b215/)
- [Jakub Binkowski](https://www.linkedin.com/in/jakub-binkowski-80136825b/)

Także chciałbym podziękować:
- Biniowi za przygotowanie akapitu o Sybil attack;
- Asi Cichej jako przewodniczącej GHOSTa za inicjatywę i pomoc z kwestiami organizacyjnymi wyjazdu; 
- całej ekipie organizatorów za zorganizowanie hackathonu; 
- Tobie, że przeczytałæś ten artykuł!



