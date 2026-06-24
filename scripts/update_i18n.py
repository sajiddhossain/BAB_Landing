import json

it_json = {
  "nav": {
    "home": "Home",
    "app": "App Simulator",
    "coach": "Coach Dashboard",
    "features": "Features",
    "about": "About Us",
    "waitlist": "Join Waitlist"
  },
  "home": {
    "beta": "Beta",
    "badge": "✦ Techstars Startup Weekend AI · Lecco ✦",
    "heroTitle": "Una ragazza su due abbandona lo sport durante la pubertà.",
    "heroHighlight": "Non lasciare che accada.",
    "coachBtn": "Sono un Allenatore",
    "parentBtn": "Sono un Genitore",
    "coachDesc": "Monitora il benessere e previeni gli infortuni della tua squadra femminile grazie a dati sicuri e aggregati.",
    "parentDesc": "Supporta tua figlia nei cambiamenti della pubertà garantendo totale privacy e un ambiente sportivo sano.",
    "waitlistBtn": "Join Waitlist ✦",
    "appTag": "App per l'Atleta +\nDashboard Coach",
    "widgetTitle": "Rischio Infortuni",
    "widgetDesc": "-60% Mese su Mese",
    
    "costBadge": "Il Costo del Silenzio",
    "oldMethod": "Vecchio Metodo",
    "old1": "50% di abbandono precoce durante la pubertà.",
    "old2": "Rischio di rottura LCA triplicato in fase ovulatoria se ignorato.",
    "old3": "L'84% delle atlete abusa di antidolorifici per nascondere i sintomi.",
    "babMethod": "Metodo BAB",
    "bab1": "Riduzione del 60% degli infortuni prevedibili.",
    "bab2": "Privacy Totale: l'allenatore vede solo dati aggregati.",
    "bab3": "Buddy Digitale per monitorare lo stato senza stress.",
    "testAppBtn": "Testa l'App ✦",
    "testCoachBtn": "Vista Coach ✦",
    
    "dataBadge": "Data that Break Barriers",
    "dataTitle": "Le donne sono trattate come Piccoli Uomini,<br/>e le ragazze come Piccole Donne.",
    "dataSubtitle": "I numeri parlano chiaro. Esiste un modo migliore per fare sport.",
    "data1Val": "50%",
    "data1Desc": "Delle adolescenti abbandona lo sport in pubertà",
    "data2Val": "6%",
    "data2Desc": "Della ricerca medico-sportiva è dedicata alla salute femminile",
    "data3Val": "0%",
    "data3Desc": "Degli studi riguarda atlete Under 18 con ciclo mestruale",
    
    "testimonialsTitle": "Cosa dice la Community del futuro di BAB",
    
    "footerTitle": "Reach Your Personal Best,<br/> By Feeling Your Best.",
    "privacyTitle": "Privacy & Ricerca",
    "privacy1": "Solo se dai il tuo consenso, i dati che monitori contribuiranno a ricerche scientifiche anonime per migliorare la salute, il benessere e le performance tue e di altre giovani atlete. Insieme stiamo colmando il vuoto nella ricerca sportiva giovanile.",
    "privacy2": "I tuoi dati restano sempre anonimi, protetti e usati esclusivamente per favorire la salute e lo sviluppo delle adolescenti.",
    "footerTags": "Prevent • Support • Track • Understand • Optimise",
    "motto": "La prima app di salute e benessere per le giovani atlete."
  },
  "testimonials": {
    "lisa": {
      "role": "Canottiera Elite Nazionale Tedesca",
      "quote": "BAB mi ha fatta sentire compresa e mi ha fatto capire quanto avrei beneficiato di uno strumento simile durante la mia crescita sportiva. Mi ci sono voluti molti anni per capire che la forza non è l'opposto della femminilità, e la prossima generazione di atlete non dovrebbe mai dover scegliere tra diventare forti e sentirsi adeguate."
    },
    "alisha": {
      "role": "Dottoranda alla UC Berkeley",
      "quote": "Le giovani ragazze affrontano disinformazione e pregiudizi scientifici, sfide spesso amplificate negli ambienti sportivi, in particolare durante i profondi cambiamenti fisici e psicologici della pubertà. BAB fornisce una soluzione preventiva e sicura, contribuendo al contempo al progresso della ricerca in un campo che è stato trascurato per troppo tempo."
    },
    "vasundhara": {
      "role": "Mamma di un'atleta di 11 anni",
      "quote": "Mia figlia ha 11 anni e gareggia a livello regionale e nazionale nella scherma. Uno strumento come BAB mi aiuta a capire come supportare al meglio i suoi obiettivi sportivi in modo sicuro e informato, in particolare mentre affronta i cambiamenti dell'adolescenza continuando a competere ad alto livello."
    },
    "erica": {
      "role": "Giocatrice e Allenatrice di Pallavolo",
      "quote": "Come giocatrice professionista e allenatrice di pallavolo, non ho mai avuto una risorsa così straordinaria come BAB per supportare le esigenze specifiche che abbiamo io e le mie atlete adolescenti."
    }
  },
  "features": {
    "badge": "✦ L'Ecosistema BAB ✦",
    "title": "Performance<br/>x Salute",
    "testBuddy": "Testa lo stato del Buddy",
    "modules": {
      "m1": {
        "title": "TRACK",
        "desc": "Monitora i livelli di energia, il sonno e l'umore, supportati dalle metriche di salute mestruale e di crescita, per costruire un quadro completo del benessere dell'atleta nel tempo."
      },
      "m2": {
        "title": "UNDERSTAND",
        "desc": "Traduci i dati in un linguaggio chiaro, semplice e coinvolgente, fornendo insight personalizzati e risorse di educazione corporea, sessione dopo sessione."
      },
      "m3": {
        "title": "OPTIMISE",
        "desc": "Bilancia le performance con il benessere fisico ed emotivo a lungo termine, attraverso raccomandazioni quotidiane personalizzate, create da esperti clinici con il supporto dell'AI."
      },
      "m4": {
        "title": "PREVENT",
        "desc": "Identifica e segnala precocemente i campanelli d'allarme prima che possano influenzare la salute, il benessere o le performance."
      },
      "m5": {
        "title": "SUPPORT",
        "desc": "Crea un sistema di supporto più forte attorno all'atleta, sia in campo che fuori, con strumenti dedicati per genitori e allenatori."
      }
    },
    "faqsTitle": "F.A.Q.",
    "faqs": {
      "q1": "Come funziona la privacy dei dati biologici?",
      "a1": "Tutti i dati sensibili, inclusi quelli sul ciclo mestruale, sono criptati e salvati in locale sul telefono dell'atleta. L'allenatore vede solo aggregati anonimi o alert generici (es. 'Consigliato scarico').",
      "q2": "È adatta a tutti gli sport?",
      "a2": "Sì, l'algoritmo di BAB si adatta ai carichi di lavoro specifici di sport di squadra (Calcio, Volley, Basket) e sport individuali.",
      "q3": "L'app è gratuita per le atlete?",
      "a3": "Sì, l'app mobile per le atlete è completamente gratuita. I club sportivi sottoscrivono l'abbonamento per l'accesso alla Coach Dashboard."
    }
  }
}

en_json = {
  "nav": {
    "home": "Home",
    "app": "App Simulator",
    "coach": "Coach Dashboard",
    "features": "Features",
    "about": "About Us",
    "waitlist": "Join Waitlist"
  },
  "home": {
    "beta": "Beta",
    "badge": "✦ Techstars Startup Weekend AI · Lecco ✦",
    "heroTitle": "One in two girls drops out of sport during puberty.",
    "heroHighlight": "Don't let it happen.",
    "coachBtn": "I'm a Coach",
    "parentBtn": "I'm a Parent",
    "coachDesc": "Monitor wellbeing and prevent injuries in your female team with secure, aggregated data.",
    "parentDesc": "Support your daughter through puberty changes, ensuring total privacy and healthy sports.",
    "waitlistBtn": "Join Waitlist ✦",
    "appTag": "Athlete App +\nCoach Dashboard",
    "widgetTitle": "Injury Risk",
    "widgetDesc": "-60% Month over Month",
    
    "costBadge": "The Cost of Silence",
    "oldMethod": "Old Way",
    "old1": "50% early dropout rate during puberty.",
    "old2": "ACL tear risk triples during ovulation if ignored.",
    "old3": "84% of athletes abuse painkillers to hide symptoms.",
    "babMethod": "BAB Method",
    "bab1": "60% reduction in preventable injuries.",
    "bab2": "Total Privacy: Coaches only see aggregated data.",
    "bab3": "Digital Buddy to monitor status without stress.",
    "testAppBtn": "Test the App ✦",
    "testCoachBtn": "Coach View ✦",
    
    "dataBadge": "Data that Break Barriers",
    "dataTitle": "Women are treated as Small Men,<br/>and Girls as Small Women.",
    "dataSubtitle": "The numbers show it. There's a better way.",
    "data1Val": "50%",
    "data1Desc": "Of teens drop out of sport during puberty",
    "data2Val": "6%",
    "data2Desc": "Of sport medical research focuses on women's health",
    "data3Val": "0%",
    "data3Desc": "Barely any research on U18 athletes who menstruate",
    
    "testimonialsTitle": "What Our Community Says About What BAB Is Building",
    
    "footerTitle": "Reach Your Personal Best,<br/> By Feeling Your Best.",
    "privacyTitle": "Privacy & Research",
    "privacy1": "Only if you give consent, the data you track contributes to anonymous scientific research aimed at improving the health, wellbeing, and performance of both you and other young athletes. Together, we're helping close the gaps in youth and sports research.",
    "privacy2": "Your data is always anonymous, protected, and used solely to advance teenagers' health, wellbeing, development, and performance.",
    "footerTags": "Prevent • Support • Track • Understand • Optimise",
    "motto": "The first health and wellbeing app for teenage girls in sport."
  },
  "testimonials": {
    "lisa": {
      "role": "German National Elite Rower",
      "quote": "BAB made me feel seen and realise how much I could have benefitted if something like existed during my upbringing in sport. It took me many years to understand that strength is not the opposite of femininity, and the next generation of female athletes should never have to choose between becoming powerful and fitting in."
    },
    "alisha": {
      "role": "PHD at UC Berkeley",
      "quote": "Young girls face misinformation and scientific bias, challenges that are often amplified in sports settings, particularly during the profound physical and psychological changes of puberty. BAB provides a safe, preventive solution while contributing to the advancement of research in a field that has been overlooked for far too long."
    },
    "vasundhara": {
      "role": "Mum of 11 Year Old Athlete",
      "quote": "My daughter is 11 and competes at regional and national levels in fencing. A tool like BAB helps me understand how to best support her athletic goals in a safe and informed way, particularly as she navigates the changes of adolescence while continuing to pursue high-level competition."
    },
    "erica": {
      "role": "Volleyball Athlete & Coach",
      "quote": "As a professional volleyball player and coach, I never had such a great resource as BAB to support the specific needs my teenage athletes and I have."
    }
  },
  "features": {
    "badge": "✦ The BAB Ecosystem ✦",
    "title": "Performance<br/>x Health",
    "testBuddy": "Test Buddy Status",
    "modules": {
      "m1": {
        "title": "TRACK",
        "desc": "Monitor energy levels, sleep and mood, underpinned by menstrual health and growth metrics to build a complete picture of the athlete's wellbeing through longitudinal inputs."
      },
      "m2": {
        "title": "UNDERSTAND",
        "desc": "Translate inputs into clear, simple and engaging language and deliver personalised, actionable insights and body literacy resources, delivered gradually, session by session."
      },
      "m3": {
        "title": "OPTIMISE",
        "desc": "Balance performance with long-term physical and emotional wellbeing, through personalised, daily recommendations, delivered by clinical experts with the support of Al."
      },
      "m4": {
        "title": "PREVENT",
        "desc": "Identify and flag warning signs early before they affect health, wellbeing, or performance."
      },
      "m5": {
        "title": "SUPPORT",
        "desc": "Create a stronger support system around the athlete both on and off the field with dedicated tools for parents and coaches."
      }
    },
    "faqsTitle": "F.A.Q.",
    "faqs": {
      "q1": "How does biological data privacy work?",
      "a1": "All sensitive data, including menstrual cycle data, is encrypted and stored locally on the athlete's phone. The coach only sees anonymous aggregates or generic alerts (e.g., 'Rest recommended').",
      "q2": "Is it suitable for all sports?",
      "a2": "Yes, BAB's algorithm adapts to the specific workloads of team sports (Football, Volleyball, Basketball) and individual sports.",
      "q3": "Is the app free for athletes?",
      "a3": "Yes, the mobile app for athletes is completely free. Sports clubs subscribe for access to the Coach Dashboard."
    }
  }
}

fr_json = {
  "nav": {
    "home": "Accueil",
    "app": "Simulateur App",
    "coach": "Tableau de Bord Coach",
    "features": "Fonctionnalités",
    "about": "À Propos",
    "waitlist": "Rejoindre la liste"
  },
  "home": {
    "beta": "Bêta",
    "badge": "✦ Techstars Startup Weekend AI · Lecco ✦",
    "heroTitle": "Une fille sur deux abandonne le sport à la puberté.",
    "heroHighlight": "Ne laissez pas cela arriver.",
    "coachBtn": "Je suis un Coach",
    "parentBtn": "Je suis un Parent",
    "coachDesc": "Surveillez le bien-être et prévenez les blessures de votre équipe féminine avec des données anonymes et sécurisées.",
    "parentDesc": "Soutenez votre fille pendant sa puberté en garantissant une confidentialité totale et un sport sain.",
    "waitlistBtn": "Join Waitlist ✦",
    "appTag": "Application Athlète +\nTableau de bord Coach",
    "widgetTitle": "Risque Blessures",
    "widgetDesc": "-60% par mois",
    
    "costBadge": "Le Prix du Silence",
    "oldMethod": "Ancienne Méthode",
    "old1": "Taux d'abandon de 50% à la puberté.",
    "old2": "Risque de rupture du LCA triplé si ignoré.",
    "old3": "84% des athlètes abusent des antidouleurs pour masquer les symptômes.",
    "babMethod": "Méthode BAB",
    "bab1": "Réduction de 60% des blessures évitables.",
    "bab2": "Confidentialité Totale : Les coachs voient des données groupées.",
    "bab3": "Compagnon Numérique pour un suivi sans stress.",
    "testAppBtn": "Testez l'App ✦",
    "testCoachBtn": "Vue Coach ✦",
    
    "dataBadge": "Des Données Qui Brisent les Barrières",
    "dataTitle": "Les femmes sont traitées comme de Petits Hommes,<br/>et les filles comme de Petites Femmes.",
    "dataSubtitle": "Les chiffres le prouvent. Il y a une meilleure voie.",
    "data1Val": "50%",
    "data1Desc": "Des ados abandonnent le sport à la puberté",
    "data2Val": "6%",
    "data2Desc": "De la recherche médico-sportive se concentre sur les femmes",
    "data3Val": "0%",
    "data3Desc": "Presque aucune recherche sur les athlètes U18",
    
    "testimonialsTitle": "Ce que notre communauté dit de BAB",
    
    "footerTitle": "Atteignez votre Meilleur Niveau,<br/> En vous sentant au Mieux.",
    "privacyTitle": "Confidentialité & Recherche",
    "privacy1": "Avec votre accord, vos données contribuent à la recherche scientifique anonyme pour améliorer la santé et les performances des jeunes athlètes. Ensemble, comblons les lacunes de la recherche sportive.",
    "privacy2": "Vos données restent toujours anonymes, protégées et utilisées uniquement pour le bien-être des adolescentes.",
    "footerTags": "Prévenir • Soutenir • Suivre • Comprendre • Optimiser",
    "motto": "La première application de santé et de bien-être pour les adolescentes sportives."
  },
  "testimonials": {
    "lisa": {
      "role": "Rameuse Élite Nationale Allemande",
      "quote": "BAB m'a fait me sentir comprise et m'a fait réaliser à quel point j'aurais bénéficié d'un tel outil pendant ma croissance sportive. Il m'a fallu de nombreuses années pour comprendre que la force n'est pas l'opposé de la féminité, et la prochaine génération de femmes athlètes ne devrait jamais avoir à choisir entre devenir puissante et s'intégrer."
    },
    "alisha": {
      "role": "Doctorante à UC Berkeley",
      "quote": "Les jeunes filles font face à la désinformation et aux préjugés scientifiques, des défis souvent amplifiés dans les environnements sportifs. BAB fournit une solution préventive et sûre tout en contribuant à l'avancement de la recherche dans un domaine négligé depuis trop longtemps."
    },
    "vasundhara": {
      "role": "Maman d'une athlète de 11 ans",
      "quote": "Ma fille a 11 ans et concourt aux niveaux régional et national en escrime. Un outil comme BAB m'aide à comprendre comment soutenir au mieux ses objectifs sportifs de manière sûre et éclairée, en particulier alors qu'elle traverse les changements de l'adolescence."
    },
    "erica": {
      "role": "Joueuse et Entraîneuse de Volley-ball",
      "quote": "En tant que joueuse professionnelle et entraîneuse de volley-ball, je n'ai jamais eu une ressource aussi formidable que BAB pour soutenir les besoins spécifiques que nous avons, mes jeunes athlètes et moi."
    }
  },
  "features": {
    "badge": "✦ L'Écosystème BAB ✦",
    "title": "Performance<br/>x Santé",
    "testBuddy": "Tester l'état du Buddy",
    "modules": {
      "m1": {
        "title": "TRACK",
        "desc": "Surveillez les niveaux d'énergie, le sommeil et l'humeur, étayés par des mesures de santé menstruelle et de croissance pour dresser un tableau complet du bien-être de l'athlète dans le temps."
      },
      "m2": {
        "title": "UNDERSTAND",
        "desc": "Traduisez les données en un langage clair, simple et engageant, et fournissez des informations personnalisées et des ressources sur l'éducation corporelle."
      },
      "m3": {
        "title": "OPTIMISE",
        "desc": "Équilibrez les performances avec le bien-être physique et émotionnel à long terme, grâce à des recommandations quotidiennes personnalisées, élaborées par des experts cliniques avec le soutien de l'IA."
      },
      "m4": {
        "title": "PREVENT",
        "desc": "Identifiez et signalez les signaux d'alarme de manière précoce avant qu'ils n'affectent la santé, le bien-être ou les performances."
      },
      "m5": {
        "title": "SUPPORT",
        "desc": "Créez un système de soutien plus solide autour de l'athlète, sur et en dehors du terrain, avec des outils dédiés aux parents et aux entraîneurs."
      }
    },
    "faqsTitle": "F.A.Q.",
    "faqs": {
      "q1": "Comment fonctionne la confidentialité des données biologiques ?",
      "a1": "Toutes les données sensibles, y compris les données du cycle menstruel, sont cryptées et stockées localement sur le téléphone de l'athlète. Le coach ne voit que des agrégats anonymes ou des alertes génériques.",
      "q2": "Est-ce adapté à tous les sports ?",
      "a2": "Oui, l'algorithme de BAB s'adapte aux charges de travail spécifiques des sports d'équipe et individuels.",
      "q3": "L'application est-elle gratuite pour les athlètes ?",
      "a3": "Oui, l'application mobile pour les athlètes est entièrement gratuite. Les clubs sportifs s'abonnent pour accéder au tableau de bord des coachs."
    }
  }
}

import os
with open('/Users/sajid/Documents/BAB_Landing/src/locales/it.json', 'w') as f:
    json.dump(it_json, f, indent=2, ensure_ascii=False)
with open('/Users/sajid/Documents/BAB_Landing/src/locales/en.json', 'w') as f:
    json.dump(en_json, f, indent=2, ensure_ascii=False)
with open('/Users/sajid/Documents/BAB_Landing/src/locales/fr.json', 'w') as f:
    json.dump(fr_json, f, indent=2, ensure_ascii=False)
