---
title: "RAG, czyli jak rozmawiać z naszymi dokumentami?"
date: 2023-12-20T15:00:00+02:00
lastmod: 2023-12-20T15:00:00+02:00
summary: "Odkryj, jak Retrieval Augmented Generation umożliwia udzielanie trafnych odpowiedzi z wiedzy specjalistycznej przez duże modele językowe (LLM)."
thumbnail: "rag.png"
tags: ["ai", "ml", "rag", "chatbot", "llm"]
---

## Co oznacza Retrieval Augmented Generation?

**Retrieval Augmented Generation (RAG)** to technika wzmacniania wyników dużych modeli językowych z wykorzystaniem zewnętrznych źródeł danych.

Przykładem dużego modelu językowego (LLM) może być ChatGPT, LLaMA czy GPT-4.

## Wykorzystywanie RAG w praktyce

Przyjmijmy, że chcemy zbudować chatbota, który udziela odpowiedzi na temat wiedzy specjalistycznej o niszowej dziedzinie.

Wiedza, którą chcemy udzielić, jest na tyle niedostępna, że ChatGPT nie potrafi odpowiadać na pytania użytkownika. Odpowiada, że nie wie lub zmyśla fakty.

Aby nasz chat-bot zadziałał, potrzebujemy sposobu, aby stał się mądrzejszy. Tutaj wchodzi w grę RAG:

1. Budujemy naszą bazę wiedzy:
   - Zbieramy np. 50 PDFów ze specjalistyczną wiedzą;
   - Każdy PDF przetwarzamy, wyciągając z niego tekst;
2. Przetwarzamy wiedzę:
   - Dokumenty dzielimy na części o wielkości paragrafów;
   - Każdą część przetwarzamy do formatu odczytywalnego maszynowo;
   - Przetworzone dane zapisujemy w bazie wektorowej;

Nasze dokumenty musimy podzielić na mniejsze części, ponieważ nie jesteśmy obecnie w stanie zasilić Chatu GPT tekstem wszystkich 50 PDFów. Dla jednego dokumentu problem znika :)

Po jednorazowym stworzeniu bazy wiedzy, jesteśmy w stanie wykorzystać ją do odpowiedzi użytkownika. Przyjmijmy, że skierował pytanie do naszego chatbota "Jak zrobić skomplikowaną rzecz X?":

3. Przetwarzamy pytanie do formatu odczytywalnego maszynowo.
4. Szukamy najbardziej pasującego dokumentu.

Po znalezieniu najbardziej pasującego dokumentu, jesteśmy w stanie zapytać naszego modelu językowego:

> Na podstawie podanego kontekstu, odpowiedz na pytanie użytkownika. Jeśli odpowiedź nie znajduje się w kontekście, odpowiedz "nie wiem".
>
> Kontekst: (nasz najbardziej pasujący dokument)
>
> Pytanie: Jak zrobić skomplikowaną rzecz X?

LLM z kolei może odpowiedzieć:

> Skomplikowaną rzecz X robi się poprzez (odpowiedź na podstawie informacji z dokumentów).

Lub przyznać się, że nie wie:

> Nie mam dostępu do takich informacji.

Ot cała filozofia - to właśnie nazywa się Retrieval Augmented Generation :)

## Diabeł tkwi w szczegółach

Powyższy przykład jest oczywiście uproszczony, w celu przedstawienia konceptu.

{{< gallerystart >}}
{{< img src="schema.png" alt="Źródło: blog.langchain.dev" >}}
{{< galleryend >}}

Szczegóły techniczne:
- Pytania do LLM, zwane jako "prompty", piszemy w języku angielskim;
- Przetwarzanie tekstu nazywa się generowaniem embeddingów. Proces ten odbywa się z wykorzystaniem ML, chociażby modeli SBERT;
- Embeddingi zapisujemy przeważnie w bazie wektorowej;
- Embeddingi umożliwiają nam wyszukiwanie semantyczne, w odróżnieniu od tradycyjnego wyszukiwania leksykalnego;
- Proces porównywania wektorów można przyspieszyć kosztem jakości wyszukiwania;
- Fragmenty tekstu mogą się częściowo pokrywać, aby lepiej trafić w kontekst.

Każdy z powyższych punktów można bardzo szczegółowo opisać - tematyka jest bardzo szeroka oraz na dzień dzisiejszy szybko rozwijająca!

Jeśli zaciekawił Was ten temat, zachęcam do poszerzenia swojej wiedzy w oparciu o artykuły z Google :)