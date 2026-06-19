# BAB — Pretyping Validation Protocol
### Measuring "Skin in the Game" (SITG) & Landing Page Funnel Optimization

This document outlines the testing, segmentation, and optimization protocol for the BAB landing page and onboarding quiz. The objective is to measure genuine market validation (Skin in the Game) before coding the backend, ensuring we make data-driven decisions when scaling acquisition.

---

## 📊 1. Funnel Architecture & Conversion Metrics

The validation funnel is designed to qualify leads and capture intent. Traffic is routed to a landing page where they can switch views between the B2B Coach target and B2C Parent target, take a 3-step risk quiz, and join the waitlist.

```
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  TRAFFIC SOURCE  │ ───> │   LANDING PAGE   │ ───> │  3-STEP LP QUIZ  │
│  Organic / Paid  │      │ Hero Switch View │      │ Risk Assessment  │
└──────────────────┘      └──────────────────┘      └──────────────────┘
                                                              │
                                                              ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  SKIN IN GAME    │ <─── │   WAITLIST OPT-IN│ <─── │ QUALIFIED LEAD   │
│ Share / Referral │      │ Email & Details  │      │ Score Calculated │
└──────────────────┘      └──────────────────┘      └──────────────────┘
```

---

## 📈 2. "Skin in the Game" (SITG) Lead Scoring Matrix

To prevent "false positives" (users submitting fake emails just to see the product), we score leads based on their action intensity. A high volume of low-intent signups is less valuable than a small cohort of high-commitment users.

### SITG Scoring System

┌──────────────────────────────┬──────────────┬─────────────────────────────┐
│ User Action                  │ Score Weight │ Intent Indication           │
├──────────────────────────────┼──────────────┼─────────────────────────────┤
│ 1. Complete Quiz Steps 1 & 2 │ +20 Points   │ Basic curiosity & engagement│
│ 2. Submit Valid Business Email│ +30 Points  │ Professional/Club validation│
│ 3. Add Optional Club Name    │ +20 Points   │ Organizational authority    │
│ 4. Add Optional Phone Number │ +30 Points   │ High-intent contact request │
│ 5. Shares Referral Link      │ +30 Points   │ Virality & community trust  │
└──────────────────────────────┴──────────────┴─────────────────────────────┘

*   **Low Intent (0 - 49 Points):** General consumer, high probability of spam email.
*   **Medium Intent (50 - 79 Points):** Interested coach or parent, willing to read materials.
*   **High Intent / Qualified Lead (80+ Points):** Target buyer ready for a direct sales call or beta-testing cohort.

---

## 🚗 3. Traffic Segmentation & Channel Strategy

Acquisition channels are tracked separately using UTM parameters to evaluate Cost Per Lead (CPL) and conversion quality:

1.  **B2B Direct Outreach (Linkedin / Email):**
    *   *Target:* Club directors and athletic coaches.
    *   *Metric Goal:* Waitlist Conversion Rate > **20%** | Target SITG Score: **>80**.
2.  **Paid Social (Meta Ads & TikTok):**
    *   *Target:* Sports parents (Meta) and active Gen Z female athletes (TikTok).
    *   *Metric Goal:* Waitlist Conversion Rate > **10%** | Cost Per Lead (CPL): **< €2.50**.
3.  **Organic / Growth Loop (Referrals):**
    *   *Target:* Athletes sharing their Tamagotchi screenshots with teammates.
    *   *Metric Goal:* Virality Coefficient (K-factor) > **0.2** (1 in 5 users invites a teammate).

---

## ⚙️ 4. Validation & Tracking Implementation

*   **View Switching:** Track clicks on the `[ Sono un Allenatore ]` and `[ Sono un Genitore ]` buttons to measure target distribution.
*   **Quiz Progress:** Fire custom pixel events at each step:
    *   `Quiz_Step1_Submit` (Sport Selection)
    *   `Quiz_Step2_Submit` (Pain Point Validation)
    *   `Quiz_Step3_Submit` (Email and Waitlist conversion)
*   **Waitlist Confirmation Page:** Trigger `Lead_Qualified` pixel event only when SITG score is `>50`.

---

## 🛠️ 5. Linear Optimization Thresholds

If the landing page conversion rates fall below expectations, we implement a structured, linear optimization protocol. Do not change everything at once. Isolate variables in the following sequence:

### Optimization Sequence Matrix

┌───────────────────────┬───────────────────────────┬───────────────────────┐
│ Metric Alert          │ Root Cause                │ Optimization Step     │
├───────────────────────┼───────────────────────────┼───────────────────────┤
│ Waitlist CR < 12%     │ Weak value proposition    │ A/B Test Hero         │
│                       │ in Hero section           │ Headline & CTA        │
├───────────────────────┼───────────────────────────┼───────────────────────┤
│ Quiz Drop-off > 35%   │ Step 2 has too much       │ Simplify Quiz fields, │
│                       │ cognitive friction        │ use single-tap buttons│
├───────────────────────┼───────────────────────────┼───────────────────────┤
│ High Signups / Low SITG│ Lack of qualification,   │ Add optional phone    │
│                       │ low buyer intent          │ input to filter leads │
└───────────────────────┴───────────────────────────┴───────────────────────┘

---

### Step 1: Optimize the Hero Section (If Overall CR is < 12%)
*   **Test Variable:** The Headline and Main CTA text.
*   **Adjustment:** If coaches are landing but not starting the quiz, change the headline focus from general drop-out statistics to direct financial and performance preservation.
    *   *Control:* *"Il 50% delle ragazze abbandona lo sport durante la pubertà. BAB ti aiuta a fermare questo drop-out."*
    *   *Challenger:* *"Riduci gli infortuni alle ginocchia (LCA) della tua squadra del 60% con il primo assistente biologico per atlete."*

---

### Step 2: Optimize the Quiz Friction (If Quiz Completion Rate is < 65%)
*   **Test Variable:** Question complexity and field types.
*   **Adjustment:**
    *   Reduce text input fields. Switch all answers to large, easily tappable cards with pre-filled options.
    *   Introduce a visual progress indicator at the top of the quiz box (e.g., `[ ✦ ✦ ✧ ]` using Accent Lime stars) to visually reward progression.
    *   Move the email input field to a dedicated final step, clearly stating: *"Ti invieremo solo il report di rischio del tuo club. No spam, cancellazione in un clic."*

---

### Step 3: Optimize the Bento Layout (If Scroll Depth is < 50%)
*   **Test Variable:** Information hierarchy and component layout.
*   **Adjustment:**
    *   Ensure the "Controllo Ginocchia AI" and "Privacy Zero-Spia" blocks are positioned above the fold or immediately after the Hero section on mobile viewports.
    *   Increase contrast on card strokes using active teal gradients to draw the eyes to the value blocks during rapid scrolling.

---

> [!CAUTION]
> **Ad Spend Rules for Pretyping Validation:**
> If the Cost Per Lead (CPL) exceeds €8.00 on paid social within the first 72 hours, halt ad sets immediately. This indicates a mismatch between the ad creative and the landing page messaging. Re-align the ad copy with the landing page switch-target options before restarting.
