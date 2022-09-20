---
title: "Social network for strength training"
subtitle: "open-source"
thumbnail: "0.png"
url: "/en/projects/social-network"
link: "https://hermes.kaszkowiak.org"
shownoffer: 1
weight: 2
---

I created a convenient workout journal in the form of a social platform. Hobbyist open-source project.
<!--more-->
The source code is available on [my Github](https://github.com/asdfMaciej/hermes).

## About the site
Hermes is a social network for tracking your workouts. It shares your results with your friends. I have been adding features that I found useful for myself, for example: exercise PRs, visualizing progress with data visualisations.

I have created the website as a hobby project. After some refining I used it as my main workout diary. Testers enjoyed using it as well. I took care of the project from A to Z - design, UX testing, programming, adding data, ensuring stability.

{{< gallerystart >}}
{{< img src="1.png" alt="Activity feed" >}}
{{< img src="2.png" alt="Activity preview" >}}
{{< img src="3.png" alt="Profile" >}}
{{< img src="4.png" alt="Creating a workout" >}}
{{< img src="5.png" alt="Live stats" >}}
{{< galleryend >}}

## Technology stack
PHP 7, MySQL - backend
JS (ES6), Vue - frontend

There are a few reasons for the technology stack used:

- Low maintenance costs of the project. The current VPS I use (shout out to [mikr.us](https://mikr.us)) has only 256 MB of ram, 1 core and slow I/O - despite this Hermes runs fast. I was considering node.js, but I wasn't sure if the server would handle it (in the past I had to use tricks to barely enable npm). The project didn't have enough users for me to consider an additional server as a worthwhile expense.
- Practical learning of design patterns. I consciously did not choose an existing framework and create my own on the fly. Had I worked on an existing one, I would have had fewer places to make mistakes. I would write mostly business logic and not worry about things that the framework takes care of. That's not fun in a hobby project! Here, if I misdesign an element (architecture, project structure, deployment, etc.), I am forced to notice the error and fix it.
- Creating a refined design. Using familiar languages and technologies allows me to develop the site faster. Also, it deepens my knowledge and familiarity with the technologies used.
- Using Hermes on both phones (Android, iOS) and desktops. I decided to develop the site without a native app, as the effort required is disproportionate to the results. In the current model, the new functionality is available immediately on all platforms. I recovered some of the native functionality by turning the site into an app through GoNative. It added smooth transitions between subpages, non-logging, native prompts, among other things.