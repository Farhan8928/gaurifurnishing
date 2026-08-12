/**
 * FAQ content, mirrored into the FAQPage JSON-LD in index.html.
 *
 * House style, and the reason these read the way they do: every answer leads
 * with the answer in its first sentence. Google's AI Overviews, Perplexity and
 * voice assistants lift the opening clause and little else, so a warm-up
 * sentence before the answer means being quoted saying nothing.
 *
 * Nothing here invents a price, a rating or a review count. Where the honest
 * answer is "it depends", the answer says so and then explains what it depends
 * on — which is both true and more useful than a made-up number.
 */
export const FAQS = [
  {
    q: 'Do you come home to measure the windows?',
    a: 'Yes — measurement at your home is free anywhere in Thane, and there is no obligation to order afterwards. We bring the fabric sample books with us so you can hold the material against your own wall, in your own light, before deciding. Ordering curtains or blinds from a photo almost always disappoints; seeing the fabric in the room does not.',
  },
  {
    q: 'How much do curtains or a sofa repair cost?',
    a: 'It depends on the fabric you choose and the size of the job, so we quote before we start rather than publish a rate that will not match your room. Curtain cost is driven by window width, height and the fabric per metre; sofa re-upholstery by the number of seats, whether the foam and webbing need replacing, and the fabric. You get a fixed written price after the free measurement, and we do not begin work until you have agreed to it.',
  },
  {
    q: 'Can you repair my old sofa instead of replacing it?',
    a: 'Yes, and it is usually far cheaper than buying new. We re-web the base, replace collapsed foam, repair or rebuild the frame where it has given way, and re-cover the whole sofa in a fabric you pick. A well-made old frame is often better timber than a new budget sofa, which is why re-upholstering it is the better buy so often.',
  },
  {
    q: 'How long does the work take?',
    a: 'Curtains and blinds are typically ready within a week of you approving the fabric, and a sofa re-upholstery usually takes a few days once it reaches our workshop. Made-to-order sofas and sofa cum beds take longer because they are built from scratch. We give you a date at the time of quoting and tell you straight away if anything is going to move.',
  },
  {
    q: 'Do you make sofa cum beds with storage?',
    a: 'Yes — sofa cum beds with a pull-out mechanism and storage underneath are one of the things we make most, and we build them to your room size rather than to a fixed catalogue size. That matters in a Thane flat, where a showroom sofa is often five inches too wide for the wall it has to sit against.',
  },
  {
    q: 'Can I get a blind printed with my own picture?',
    a: 'Yes. We print any image you send onto the blind fabric — photographs, artwork, or a design for a child’s room. Send it on WhatsApp and we will tell you whether the resolution is high enough to print at the size of your window before you commit to it.',
  },
  {
    q: 'Do you make mattresses in non-standard sizes?',
    a: 'Yes — coir, cotton and foam mattresses are cut to any size you need, including the odd sizes that diwans, storage beds, window seats and fold-out sofas require and that no showroom keeps in stock. We also re-fill and re-cover old mattresses that have gone lumpy but are otherwise sound.',
  },
  {
    q: 'Which areas of Thane do you cover?',
    a: 'We cover all of Thane West and the surrounding areas from our shop on Pokhran Road No. 1, Vartak Nagar — including Naupada, Panch Pakhadi, Majiwada, Wagle Estate, Louiswadi, Kopri, Kolshet, Manpada, Hiranandani Estate, Ghodbunder Road and Kasarvadavali, and across to Mulund and Bhandup. If you are just outside that, call and ask — we usually can.',
  },
  {
    q: 'Where exactly is the shop?',
    a: 'Gala No. 1-2, Pokhran Road No. 1, near Mane H.P. Gas Godown and Thirani School, Vartak Nagar, Thane West 400606. Ask for Firoz. You are welcome to walk in and go through the fabric books at the shop instead of at home if that is easier.',
  },
]

/** The three-step promise shown in the "How it works" section. */
export const PROCESS = [
  {
    step: '01',
    title: 'Call or WhatsApp',
    body:
      'Tell us what you need — curtains, blinds, a sofa that has given up. Send a photo on WhatsApp if it is easier than explaining.',
  },
  {
    step: '02',
    title: 'We measure at your home, free',
    body:
      'We come with the fabric books, measure the windows or the sofa, and you choose the material against your own wall. No charge, no obligation.',
  },
  {
    step: '03',
    title: 'Fixed price, in writing',
    body:
      'You get one clear price before anything is cut or stripped. Work only starts once you have said yes to it.',
  },
  {
    step: '04',
    title: 'Made, delivered and fitted',
    body:
      'We stitch or build it, bring it back, and fit it properly — rods levelled, blinds squared, sofa placed where you want it.',
  },
]

/** Reasons-to-choose, shown as the "Why us" grid. */
export const WHY_US = [
  {
    icon: 'Ruler',
    title: 'We make it, we do not resell it',
    body:
      'The curtains, sofas, headboards and mattresses are made in our own workshop on Pokhran Road. If something is not right, the person who fixes it is the person who made it.',
  },
  {
    icon: 'Home',
    title: 'The fabric book comes to you',
    body:
      'Choosing fabric under showroom lighting and then hating it at home is the most common regret in this trade. We bring the samples to your room instead.',
  },
  {
    icon: 'IndianRupee',
    title: 'Fixed price before we start',
    body:
      'One written number after the free measurement. No "we found something else" halfway through, and no charge for the visit if you decide not to go ahead.',
  },
  {
    icon: 'Recycle',
    title: 'Repair first, replace second',
    body:
      'If your sofa frame is sound we will tell you to re-upholster rather than sell you a new one. It costs us a bigger sale and earns us the next three.',
  },
  {
    icon: 'Ruler',
    title: 'Built to your room, not a catalogue',
    body:
      'Every sofa, mattress and headboard is cut to the wall it has to fit. Odd sizes, low ceilings, awkward corners — that is the normal job here, not the exception.',
  },
  {
    icon: 'Phone',
    title: 'You deal with Firoz directly',
    body:
      'One number, one person, from the first measurement to the last screw. No call centre and no handing you between departments.',
  },
]
