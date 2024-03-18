---
title: "Wygrana na HackYeah 2023!"
date: 2023-10-17T13:30:00+02:00
lastmod: 2023-10-17T13:30:00+02:00
summary: "W dniach 30.09 - 01.10 zajęliśmy 1 miejsce spośród 37 drużyn w kategorii Health & Well-being na HackYeah 2023, największym stacjonarnym hackathonie w Europie! 🏆"
thumbnail: "wygrana.jpg"
tags: ["hackathon", "go", "golang"]
slug: "hackyeah-2023"
---

Jeśli nie jesteś zaznajomiony/a z pojęciem hackathonu, zachęcam na wstępie do przeczytania mojego [wpisu tłumaczącego czym jest hackathon](https://kaszkowiak.org/blog/o-hackathonach/) :)

## Aplikacja do dawkowania leków

Wystartowaliśmy pod banderą Duża Dawka Development w otwartym zadaniu Health & Well-being. Na stworzenie prototypu aplikacji oraz przygotowanie prezentacji mieliśmy 24 godziny.

Nasz projekt mDawka miał na celu ułatwienie pacjentom dawkowania leków poprzez automatyczne tworzenie przypomnień, bazując na danych z e-recepty. Pacjent podaje PESEL i kod lub skanuje kod kreskowy z recepty, a system generuje plan dawkowania leków, który można łatwo dodać do dowolnego kalendarza.  💊 

{{< gallerystart >}}
{{< img src="hackyeah 2023.jpg" alt="HackYeah 2023" >}}
{{< img src="my.jpeg" alt="Tuż po ostatnim dzwonku" >}}
{{< galleryend >}}

### Demo oraz pitch deck

Demo naszej aplikacji:

{{< youtube NWWA5lCHS-A>}}

Prezentacja, stworzona pod limit 10 slajdów:

{{< unsafe >}}
<iframe src="mDawka.pdf" style="width: 100%;height: 500px;border: none;"></iframe>
{{< /unsafe >}}

Nie posiadam nagrania z sesji pitchingowej / Q&A. Mieliśmy 5 minut na prezentację oraz kolejne 5 minut na sesję Q&A. Przedstawieniem aplikacji zajął się Adam, który świetnie poradził sobie z presją i przygotował się w niecałe pół godziny!


{{< gallerystart >}}
{{< img src="json.jpg" alt="Zdjęcie z JSONem przyniosło szczęście" >}}
{{< img src="wygrana.jpg" alt="Co by było bez JSONa?" >}}
{{< galleryend >}}


## Co zadecydowało o wygranej?

Cytując relację jednego z mentorów, Marcina Orocza:

{{< quote source="Marcin Orocz" src="https://orocz.com/hackyeah-2023-hackaton/">}}
- **Bezpieczeństwo:** Żadne identyfikujące dane wrażliwe nie są przechowywane na serwerze.
- **Prostota:** System nie wymaga instalacji, logowania czy rejestracji, a nadmiarowe dane są periodycznie czyszczone.
- **Integracja:** mDawka integruje się płynnie z istniejącymi kalendarzami użytkownika oraz z możliwościami istniejących systemów informatycznych.
- **Modularność i skalowalność:** Prosta architektura, modularny kod i elastyczność technologiczna umożliwiają rozszerzenie aplikacji o nowe API i funkcje.
- **Szybkość wdrożenia i niskie koszty utrzymania i rozwoju:** mDawka wykorzystuje technologie takie jak Next.js, Go, Echo i MongoDB, co umożliwia łatwe wdrożenie, utrzymanie i skalowanie. Te technologie również przyczyniają się do niskich kosztów utrzymania, umożliwiając zespołowi Duża Dawka Development za pozyskane z wygranej fundusze szybko wprowadzić produkt na rynek i rozpocząć rozwijanie go o moduły potrzebne do monetyzacji pomysłów.

Jurorzy HackYeah 2023 docenili mDawkę za jej prostotę, możliwość powszechnego zastosowania i nacisk na bezpieczeństwo danych poufnych.
{{< /quote >}}

## Dobra zabawa była głównym celem

Wygrana była totalną niespodzianką. Przed ogłoszeniem wyników nie spodziewaliśmy się wejścia do finału, a co dopiero zajęcia pierwszego miejsca! Do wydarzenia podeszliśmy na luzie. Chcieliśmy nauczyć się nowych technologii, a przy okazji zrobić czegoś fajnego. Osobiście najbardziej zależało mi na nauce języka Go, który wydawał się dobrym dodatkiem do mojego stosu technologicznego. 

Dzień przed hackathonem, w pociągu z Poznania do Krakowa, przerobiłem kurs [A Tour of Go](https://go.dev/tour/), bombardując siedzącego obok Tymka pytaniami o szczegóły składni i konwencje przyjęte przez programistów Go. Na hackathonie wsparł mnie także Adam, który znał best practices w Golangu. Dzięki temu w trakcie zaledwie dwóch dób nauczyłem się bardzo dużo przydatnych informacji!

Nie przygotowaliśmy się na wyrost. Przed samym wydarzeniem poświęciliśmy tylko godzinę na brainstorming, który skończył się wnioskiem pt. “zobaczymy na wydarzeniu, jak ogłoszą szczegóły wszystkich tematów”. Pierwsze 3 godziny hackathonu poświęciliśmy przez to na wymyślenie aplikacji, zostawiając nam zaledwie 21h. Finalnie temat Health & Well-being wybraliśmy drogą eliminacji :)

{{< gallerystart >}}
{{< img src="ziewanie.jpg" alt="Noc na hackathonie jest ciężka" >}}
{{< img src="ja.jpg" alt="Zająłem też 5 miejsce w Kahoocie na 714 osób :)" >}}
{{< galleryend >}}

## Warto rozmawiać z mentorami

W tym miejscu chciałbym podziękować mentorom, którzy udzielili nam feedbacku w trakcie wydarzenia: [Jakub Mrugalski](https://mrugalski.pl/) oraz [Marcin Orocz](https://orocz.com/) znacznie pomogli nam w zajęciu wysokiej lokaty. 

Jakub odwiódł nas od wybranie tematu z Machine Learning, czyli wejścia w za głęboką wodę, poprzez opowiedzenie nam z pasją o bazach wektorowych oraz embeddingach. Po rozmowie uświadomiliśmy sobie, że nie rozumiemy dostatecznie tego tematu, i postawiliśmy na kategorię Health & Well-being :D 

Marcin swoim feedbackiem pomógł nam znacznie doszlifować prezentację oraz pitch, dzięki czemu wyszliśmy z obronną ręką z sesji Q&A :) Po wydarzeniu udzielił nam również informacji o silnych stronach naszego projektu. Serdecznie zachęcam do przeczytania [jego relacji z wydarzenia](https://orocz.com/hackyeah-2023-hackaton/)!
 
## Podziękowanie dla drużyny
 
Podziękowania dla Duża Dawka Development za miniony weekend:

- [Adam Piaseczny](https://www.linkedin.com/in/adam-piaseczny-445a23244/)
- [Mateusz Karłowski](https://www.linkedin.com/in/mateusz-kar%C5%82owski-8500a1184/)
- [Tymoteusz Jagła](https://www.linkedin.com/in/tymoteusz-jagla/)
- [Szymon Pasieczny](https://www.linkedin.com/in/szymon-pasieczny-4a664b215/)

Przesyłam pozdrowienia również dla Zuzanny Górskiej, która pomimo szczerych chęci nie dała rady dotrzeć na HackYeah i tworzyć razem z nami :) 

## Odnośniki

- Link do repozytorium z kodem: [https://github.com/TypicalAM/mDawka](https://github.com/TypicalAM/mDawka)
- Link do wyżej umieszczonego demo: [https://www.youtube.com/watch?v=NWWA5lCHS-A](https://www.youtube.com/watch?v=NWWA5lCHS-A)


 


