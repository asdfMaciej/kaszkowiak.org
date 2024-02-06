---
title: "OCR - ekstrakcja tekstu z PDF"
date: 2024-02-06T14:00:00+02:00
lastmod: 2024-02-06T14:00:00+02:00
summary: "Przegląd narzędzi do efektywnego OCR na plikach PDF. Artykuł pozwoli Ci polepszyć jakość wydobywanego tekstu ze swoich dokumentów! 📄"
thumbnail: "pdf extraction.png"
tags: ["python", "rag", "ocr", "retrieval"]
---

## Czym jest i do czego służy OCR?

OCR (Optical Character Recognition) to proces rozpoznawania tekstu w obrazie. OCR przydaje się, jeśli chcemy przetworzyć tekst z dowolnego obrazu:
- skopiować treść zeskanowanej kartki;
- przetłumaczyć napis w obcym języku;
- zeskanować paragon...

OCR okaże się także przydatne, gdy budujemy bazę dokumentów, które później chcielibyśmy móc przeszukać - na przykład przy [Retrieval Augmented Generation](/blog/retrieval-augmented-generation/) :)

## Przegląd narzędzi

### Tesseract

[Tesseract](https://github.com/tesseract-ocr/tesseract) jest jednym z najbardziej znanych narzędzi do OCR. W projekcie dostępne jest zarówno narzędzie CLI (tesseract) jak i sam silnik OCR (libtesseract).

Projekt wspiera ponad 100 języków oraz ma wsparcie dla UTF-8, przez co bez problemu poradzi sobie z językiem polskim.

Narzędzia nie można wykorzystać bezpośrednio na plikach PDF. Jako input przyjmuje zdjęcia, przez co w pierwszej kolejności musimy zamienić plik PDF na serię zdjęć. 

Tesseract nie radzi sobie między innymi z odręcznym pismem:

{{< quote source="hcham1, Using Tesseract for handwriting recognition" src="https://stackoverflow.com/questions/39556443/using-tesseract-for-handwriting-recognition">}}
It's possible to train tesseract to recognize handwriting. [...] But don't expect very good results. Academics have typically gotten accuracy results topping out about 90%. Here are a couple references for words and numbers. So if your use case can deal with at least 1/10 errors, this might work for you.
{{</quote>}}

Input powinien być także możliwie pozbawiony zanieczyszczeń (które mogą wystąpić przy przykładowo skanowanych dokumentach), aby Tesseract uzyskał optymalne wyniki. Jako output nie otrzymamy ustrukturyzowanego tekstu - Tesseract nie wydobędzie nam struktury dokumentu, czyli chociażby nagłówków. 

Tesseract jest objęty licencją Apache 2.0, co umożliwia zarówno zastosowania komercyjne jak i hobbystyczne.

### OCRmyPDF

[OCRmyPDF](https://github.com/ocrmypdf/OCRmyPDF) jest pełnoprawnym narzędziem do konwertowania PDFów. 

Silnikiem OCR jest wcześniej wymieniony Tesseract. OCRmyPDF dodaje nakładkę umożliwiającą przetwarzanie PDFów przed wykonaniem OCR - można ze jego pomocą np. usunąć szum, poprawić obrót stron, usunąć wygląd skanowanego tekstu. Ponadto, narzędzie możemy uruchomić bezpośrednio na plikach PDF. 

Zdecydowanie możemy zastosować te narzędzie, jeśli nie zależy nam na ustrukturyzowanym tekście. Program nadaje się świetnie do wydobycia plain textu, a także do nałożenia zeskanowanego tekstu na plik :)

Programem sterujemy z linii komend:

```bash
ocrmypdf                      # it's a scriptable command line program
   -l eng+fra                 # it supports multiple languages
   --rotate-pages             # it can fix pages that are misrotated
   --deskew                   # it can deskew crooked PDFs!
   --title "My PDF"           # it can change output metadata
   --jobs 4                   # it uses multiple cores by default
   --output-type pdfa         # it produces PDF/A by default
   input_scanned.pdf          # takes PDF input (or images)
   output_searchable.pdf      # produces validated PDF output
```

OCRmyPDF jest objęty licencją [MPL 2.0](https://www.tldrlegal.com/license/mozilla-public-license-2-0-mpl-2), co możliwia wykorzystywanie komercyjne:

{{< quote source="README OCRmyPDF" src="https://github.com/ocrmypdf/OCRmyPDF">}}
The OCRmyPDF software is licensed under the Mozilla Public License 2.0 (MPL-2.0). This license permits integration of OCRmyPDF with other code, included commercial and closed source, but asks you to publish source-level modifications you make to OCRmyPDF.
{{</quote>}}

### Nougat

[Nougat](https://github.com/facebookresearch/nougat) jest wyspecjalizowanym narzędziem od Meta do przetwarzania **akademickich PDFów**, które wspiera tabelki i równania. Output jest w formacie Markdown z równaniami w formacie LaTeX.

{{< img src="nougat.png" alt="Przykład OCR Nougat z oficjalnej strony">}}

Model najlepiej się sprawdza na dokumentach naukowych, podobnych w strukturze do tych z [arXiv](https://arxiv.org/). Stosowanie Nougat na dokumentach z innej domeny znacząco pogarsza trafność.

Nougat wykorzystuje architekturę Transformerów. Model jest przez to podatny na halucynacje:

{{< quote source="README biblioteki Marker" src="https://github.com/VikParuchuri/marker">}}
Relying on autoregressive forward passes to generate text is slow and prone to hallucination/repetition. From the nougat paper: We observed [repetition] in 1.5% of pages in the test set, but the frequency increases for out-of-domain documents. In my anecdotal testing, repetitions happen on 5%+ of out-of-domain (non-arXiv) pages.
{{</quote>}}

Współczynniki modelu są licencjonowane pod licencją CC-BY-NC, co oznacza, że **nie możemy wykorzystać Nougat do rozwiązań komercyjnych**.

### Marker

[Marker](https://github.com/VikParuchuri/marker) jest najbardziej zaawansowanym narzędziem z tego zestawienia do konwertowania plików PDF w format Markdown. 

Marker ekstraktuje ustrukturyzowany tekst w formacie Markdown, równań oraz tabel z plików o dowolnej tematyce. Narzędzie jest 10x szybsze od Nougat, zapewnia wyższą trafność oraz ogranicza ryzyko halucynacji wyłącznie do przetworzonych równań w LaTeX.   

{{< img src="marker.png" alt="Marker vs Nougat, A6000">}}

Marker pod spodem wykorzystuje kilka narzędzi:

{{< quote source="README biblioteki Marker" src="https://github.com/VikParuchuri/marker">}}
Marker is a pipeline of deep learning models:

- Extract text, OCR if necessary (heuristics, tesseract)
- Detect page layout (layout segmenter, column detector)
- Clean and format each block (heuristics, texify)
- Combine blocks and postprocess complete text (heuristics, pdf_postprocessor) 
{{</quote>}}

Współczynniki wykorzystywanych modelów są licencjonowane pod licencją CC-BY-NC, co oznacza, że **nie możemy wykorzystać Marker do rozwiązań komercyjnych**. Sam projekt jest licencjonowany pod licencją copyleft GPL-3.0.


## Instalacja Markera na WSL2

Przedstawię jak zainstalować Marker pod systemem WSL2 (Ubuntu 20.04). Instrukcję opieram o [dokumentację w repozytorium Marker](https://github.com/VikParuchuri/marker):

Zacznijmy od zainstalowania Poetry:

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

Upewnijmy się, czy Poetry jest zainstalowane:

```bash
$ poetry --version
Poetry (version 1.7.1)
```

Jeśli tak, pobierzmy repozytorium:

```bash
git clone https://github.com/VikParuchuri/marker.git
cd marker
```

Następnie musimy zainstalować zależności systemowe:

```bash
chmod +x scripts/install/tesseract_5_install.sh
scripts/install/tesseract_5_install.sh

chmod +x scripts/install/ghostscript_install.sh
scripts/install/ghostscript_install.sh

cat scripts/install/apt-requirements.txt | xargs sudo apt-get install -y
```

Kolejnie - skonfigurujmy ścieżkę do Tesseracta:

```bash
$ find /usr -name tessdata
/usr/share/tesseract-ocr/5/tessdata
$ nano local.env
TESSDATA_PREFIX=/usr/share/tesseract-ocr/5/tessdata
```

Następnie aktywujmy środowisko Poetry i zainstalujmy zależności. W moim przypadku instaluję metodą opierającą się wyłącznie o CPU. Jeśli chcecie wykorzystać GPU, zapoznajcie się z [dokumentacją](https://github.com/VikParuchuri/marker).

```bash
poetry shell
poetry install
pip3 install torch torchvision torchaudio
```

{{< notice-feather-icons info >}}

W przypadku problemów z paczkami lub poetry, warto usunąć cache oraz ponownie wygenerować lock file.

Uwaga - usunie to istniejące środowiska Poetry! 

```python
rm -rf ~/.cache/pypoetry/
poetry lock --no-update
```

{{< /notice-feather-icons >}}

## Wydobycie treści Markdown z pliku PDF

Po zainstalowaniu Marker, możemy konwertować PDF na MD - na przykładzie konwersji `pdf1.pdf > pdf1.md`:

```python
poetry shell
python convert_single.py pdf1.pdf pdf1.md --parallel_factor 2
```

Warto skonfigurować plik `local.env`, aby uzyskać optymalną jakość wyników:

```bash
# DEFAULT_LANG należy ustawić zgodnie z przetwarzanym dokumentem
DEFAULT_LANG=Polish
# Aktywujmy dodatkowy post-processing:
ENABLE_EDITOR_MODEL=true 
```

Dzięki za przeczytanie artykułu! :)