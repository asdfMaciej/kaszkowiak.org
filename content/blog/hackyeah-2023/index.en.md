---
title: "Victory at HackYeah 2023!"
date: 2023-10-17T13:30:00+02:00
lastmod: 2023-10-17T13:30:00+02:00
summary: "On September 29-30, we took 1st place out of 37 teams in the Health & Well-being track at HackYeah 2023, the largest on-site hackathon in Europe! 🏆"
thumbnail: "wygrana.jpg"
tags: ["hackathon", "go", "golang"]
slug: "hackyeah-2023"
---

If you are not familiar with the concept of a hackathon, I encourage you to read my [post explaining what a hackathon is](/en/blog/about-hackathons/) as an introduction. :)

## Drug dosage helper

We competed under the name of Duża Dawka Development (*Large Dose Development*) in the open Health & Well-being task. We had 24 hours to create an app prototype and prepare a presentation.

Our mDawka (*mDose*) project aimed to make it easier for patients to dose their medications by automatically creating reminders based on e-prescription data. The patient enters their PESEL and secret code or scans a barcode from the prescription. Based on the prescription, the system generates a drug dosage schedule that can be easily added to any calendar.  💊 

{{< gallerystart >}}
{{< img src="hackyeah 2023.jpg" alt="HackYeah 2023" >}}
{{< img src="my.jpeg" alt="The final bell" >}}
{{< galleryend >}}

### Demo and pitch deck

Our demo:

{{< youtube NWWA5lCHS-A>}}

Pitch deck with 10 slides limit - in Polish, sorry! :)

{{< unsafe >}}
<iframe src="mDawka.pdf" style="width: 100%;height: 500px;border: none;"></iframe>
{{< /unsafe >}}

I do not have a recording of the pitching / Q&A session. We had 5 minutes for the presentation and another 5 minutes for receiving and answering questions. Adam was responsible for pitching, and he handled the pressure very well and managed to prepare in less than half an hour!

{{< gallerystart >}}
{{< img src="json.jpg" alt="Picture with JSON from HRejterzy" >}}
{{< img src="wygrana.jpg" alt="JSON brings good fortune ;)" >}}
{{< galleryend >}}


## What decided the win?

To quote the coverage of one of the mentors, Marcin Orocz:

{{< quote source="Marcin Orocz (translated)" src="https://orocz.com/hackyeah-2023-hackaton/">}}
- **Security:** No identifying sensitive data is stored on the server.
- **Ease:** The system requires no installation, login or registration, and redundant data is periodically cleaned.
- **Integration:** mDawka integrates seamlessly with existing user calendars and with the capabilities of existing IT systems.
- **Modularity and scalability:** Simple architecture, modular code and technology flexibility allow the application to be extended with new APIs and features.
- **Speed of deployment and low maintenance and development costs:** mDawka uses technologies such as Next.js, Go, Echo and MongoDB, which enables easy deployment, maintenance and scaling. These technologies also contribute to low maintenance costs, enabling the Big Dose Development team with the funds raised from the win to quickly bring the product to market and begin developing it with the modules needed to monetize ideas.

HackYeah 2023 judges praised mDawka for its simplicity, potential for widespread adoption and emphasis on the security of sensitive data.
{{< /quote >}}

## Having fun was the main goal

The victory was a total surprise. Before the initial results were announced, we did not expect to enter the finals, let alone take first place! We approached the event in a relaxed manner. We wanted to learn new technologies and do something cool at the same time. Personally, I was most interested in learning Go, which seemed like a good addition to my technology stack. 

The day before the hackathon, on the train from Poznań to Kraków, I studied the course [A Tour of Go](https://go.dev/tour/), bombarding Tymek, who was sitting next to me, with numerous questions about syntax details and conventions. I was also supported at the hackathon by Adam, who knew the best practices in Golang. As a result, I learned a great deal of useful information in just two days!

We didn't prepare overly much. Before the event itself, we spent only an hour brainstorming, which ended with the conclusion "we'll see at the event, once they announce the topic details". The first 3 hours of the hackathon were thus devoted to coming up with a good idea, leaving us only 21h to code. In the end, we chose the Health & Well-being track by elimination :)

{{< gallerystart >}}
{{< img src="ziewanie.jpg" alt="Hackathon nights are tough" >}}
{{< img src="ja.jpg" alt="I've also placed 5th out of a 714 person Kahoot :)" >}}
{{< galleryend >}}

## Talk to the mentors!

At this point I would like to thank the mentors who gave us feedback during the event: [Jakub Mrugalski](https://mrugalski.pl/) and [Marcin Orocz](https://orocz.com/) significantly helped us. 

Jakub dissuaded us from choosing a Machine Learning topic, by telling us passionately about vector databases and embeddings. After the talk, we realized that we didn't understand it enough, and decided to start in the Health & Well-being track :D 

Marcin, with his feedback, helped us significantly polish our presentation and pitch. It prepared us very well for the Q&A session :) After the event, he also gave us information about the strengths of our project.

## Thanks to the team
 
Thanks to Duża Dawka Development for the past weekend:

- [Adam Piaseczny](https://www.linkedin.com/in/adam-piaseczny-445a23244/)
- [Mateusz Karłowski](https://www.linkedin.com/in/mateusz-kar%C5%82owski-8500a1184/)
- [Tymoteusz Jagła](https://www.linkedin.com/in/tymoteusz-jagla/)
- [Szymon Pasieczny](https://www.linkedin.com/in/szymon-pasieczny-4a664b215/)

I also send greetings to Zuzanna Górska, who, despite her sincere intentions, was unable to make it to HackYeah and participate with us :) 

## References

- Link to repository with code: [https://github.com/TypicalAM/mDawka](https://github.com/TypicalAM/mDawka)
- Link to the demo posted above: [https://www.youtube.com/watch?v=NWWA5lCHS-A](https://www.youtube.com/watch?v=NWWA5lCHS-A)



 


