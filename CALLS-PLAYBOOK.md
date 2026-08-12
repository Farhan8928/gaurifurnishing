# Calls Playbook — getting real enquiries from the website

[SEO-PLAN.md](SEO-PLAN.md) covers what to set up. This is the **operating manual**:
what to actually do each week, and the exact words to send.

---

## The funnel, and where it usually breaks

For a local furnishing shop the chain is short:

```
Google search / AI answer
        ↓  (Google Business Profile + website)
Profile or website seen
        ↓  (photos + reviews do the convincing)
Call or WhatsApp
        ↓  (this is where most shops lose it)
Free measurement booked
        ↓
Quote given
        ↓
Job won
```

**The two weakest links are almost always the same:**

1. **Nobody sees the profile**, because it has three photos and no reviews.
2. **The WhatsApp message goes unanswered for six hours**, and the customer has
   already called someone else. In this trade the first shop to reply usually wins,
   because the customer is comparing three numbers, not three brands.

Fixing those two is worth more than any further work on the website.

---

## Rough arithmetic

Do not treat these as promises — they are planning numbers to sanity-check effort
against outcome. Adjust once Search Console and the GBP have real data.

| Stage | Typical rate | To get **2 enquiries a day** you need… |
|---|---|---|
| Profile/site views → contact | 3–6% | ~40–65 views a day |
| Contact → measurement booked | 50–70% | ~2 contacts a day |
| Measurement → job won | 40–60% | ~1 job a day |

A Google Business Profile with **20+ reviews and 30+ photos** typically pulls
several times the views of one with none. That is the lever. Everything else is
secondary.

---

## Week 1 — setup (once)

- [ ] Google Business Profile created, verified, category *Curtain shop*.
- [ ] NAP identical to the signboard and the website (§ A of SEO-PLAN).
- [ ] 15 photos uploaded — shop front first, then the best work.
- [ ] Website link added; WhatsApp messaging switched on.
- [ ] Review short-link generated → **printed as a QR sticker for the counter**.
- [ ] Search Console verified, sitemap submitted.
- [ ] The five confirmations at the top of SEO-PLAN.md resolved (hours, map pin,
      domain, years in business, rating).

## Every week — about 20 minutes

- [ ] Ask **4–8** finished customers for a review (template below).
- [ ] Reply to every review that came in.
- [ ] One Google Post — a photo of a job finished that week.
- [ ] Add 2–3 photos to the GBP.

## Every month

- [ ] Add the month's best photos to the website too: drop them in
      `client-images/`, add entries to `scripts/image-manifest.mjs`, run
      `npm run images`, redeploy.
- [ ] Check Search Console → Queries. Anything appearing there that the site does
      not answer well is the next section worth writing.

---

## Copy-paste templates

### 1. Asking for a review — send the day after fitting

> Namaste 🙏 Thank you for choosing Gouri Furnishing. It was a pleasure making your
> [curtains / sofa] for you.
>
> If you're happy with the work, would you mind leaving us a Google review? It takes
> 30 seconds and it genuinely helps a small shop like ours.
>
> 👉 [REVIEW LINK]
>
> If anything at all isn't right, please tell me first — I'll come and fix it.
> — Firoz, Gouri Mattresses & Furnishing

*Why the last line matters:* it gives an unhappy customer somewhere to go other
than a one-star review, and it is the single most effective thing you can add to
a review request.

### 2. Replying to a good review

> Thank you so much, [Name] 🙏 It was a pleasure working on your [curtains] in
> [area]. Do call us any time you need anything else — and thank you for
> recommending us.

*Mention the service and the area in your reply.* Those words are on the page
Google reads.

### 3. Replying to a bad review

> I'm sorry this wasn't right, [Name], and thank you for telling us. This isn't the
> standard we work to. Please call me directly on 93265 44812 and I'll come and put
> it right myself. — Firoz

Reply within a day. Never argue. Everyone reading it is judging the reply, not the
complaint.

### 4. First reply to a WhatsApp enquiry — **within 15 minutes**

> Namaste 🙏 Thank you for contacting Gouri Mattresses & Furnishing.
>
> To give you an accurate price I'd like to measure at your home — it's **free** and
> there's no obligation. I'll bring the fabric books so you can choose in your own light.
>
> May I know:
> 1. Which area of Thane are you in?
> 2. What do you need — curtains, blinds, sofa, mattress?
> 3. When would suit you for a 20-minute visit?
>
> — Firoz

### 5. Following up after a quote (2 days later)

> Namaste [Name] 🙏 Just checking whether you had any questions about the quote for
> your [curtains]. Happy to adjust the fabric if you'd like something within a
> different budget — we have options at several price points.
>
> No pressure either way. — Firoz, Gouri Furnishing

Most jobs in this trade are lost to silence, not to price. One polite follow-up
recovers a surprising number of them.

### 6. Google Post — weekly, rotate the type

> **Finished this week** — floor-to-ceiling blackout curtains for a flat in
> Majiwada, stitched and fitted in four days. Free measurement anywhere in Thane.
> 📞 93265 44812

> **Did you know?** A sagging sofa usually needs new webbing and foam, not a new
> sofa — and it costs a fraction of the price. Send us a photo on WhatsApp and
> we'll tell you honestly which one you need.

---

## Things that quietly lose jobs

- **Slow replies.** Answer WhatsApp within 15 minutes during shop hours, even if it
  is just "I'll call you in an hour."
- **"It depends" with nothing after it.** Never leave a price question unanswered —
  explain what it depends on and offer the free measurement. That is what the
  website's FAQ does, and it works on the phone too.
- **No photos of the finished job.** Take one before you leave every single job,
  with the customer's permission. Those photos are the whole marketing budget.
- **Hours wrong on Google.** Someone travels to a closed shop once and never
  returns. Update the profile for every holiday.
- **A different phone number on Justdial than on Google.** Fix every listing to the
  same number. Inconsistent NAP costs ranking as well as calls.

---

## A weekly scorecard worth keeping

Write these five numbers in a notebook every Sunday. Trends matter more than
any single week.

| | Wk 1 | Wk 2 | Wk 3 | Wk 4 |
|---|---|---|---|---|
| Google profile views | | | | |
| Calls + WhatsApp enquiries | | | | |
| Measurements booked | | | | |
| Jobs won | | | | |
| New reviews | | | | |
