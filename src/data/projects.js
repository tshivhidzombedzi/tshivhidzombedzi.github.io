/**
 * Project case studies.
 *
 * RULES OBSERVED IN THIS FILE
 * 1. No fabricated metrics. Every number in `metrics` and `testing` was measured and
 *    recorded at the time, or read from a live page he publishes. Where a number is a
 *    backtest rather than a real-world outcome, it says so in the same sentence.
 * 2. No completed-feature claims for unfinished work. Each case study carries an explicit
 *    `notBuilt` list and that list is rendered on the page, not hidden.
 * 3. No trading performance claims. The Apex case study deliberately contains no return,
 *    win-rate or profit figure, because those figures are simulated and he sells the product.
 * 4. No invented screenshots. Where there is no asset, the page shows an authored
 *    architecture diagram instead, which is a description of a real system, not a mock-up.
 */

export const STATUS = {
  shipping: { label: 'Live · shipping', tone: 'live' },
  operational: { label: 'Operational', tone: 'live' },
  beta: { label: 'Released · early version', tone: 'beta' },
  built: { label: 'Built · not yet proven live', tone: 'built' },
  active: { label: 'In active development', tone: 'active' },
  delivered: { label: 'Delivered', tone: 'live' },
};

export const projects = [
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'hoshi-nova',
    meta:
      'AI-assisted animation platform that produced 20 episodes at verified 4K from structured data, unattended, behind an automated delivery gate.',
    title: 'Hoshi Nova',
    subtitle: 'AI-assisted animation production platform',
    tagline:
      'A desktop application that turns a written episode into a finished 4K animated video: script, cast, voices, lip-sync, camera, render, score, mix and credits.',
    category: 'AI Product Development',
    featured: true,
    order: 1,
    status: STATUS.operational,
    period: 'September 2026 – present',
    role: 'Sole builder, director and operator',
    links: [
      {
        label: 'Hoshi & Aiko on YouTube',
        url: 'https://www.youtube.com/@HoshiandAiko',
        note: 'The channel both produced seasons were published to',
      },
      {
        label: 'The Long Way Up, episode 1',
        url: 'https://youtu.be/naexacvgwbY',
        note: 'Season 2 opener — produced by this pipeline',
      },
      {
        label: 'FRIEND//DEBT, episode 1',
        url: 'https://youtu.be/OOZ3h98MmCs',
        note: 'Season 1 opener',
      },
    ],
    oneLiner:
      'Twenty episodes across two seasons were produced end-to-end with this pipeline and published.',

    metrics: [
      { label: 'Episodes produced', value: '20', note: 'Two 10-episode seasons' },
      { label: 'Output resolution', value: '3840×2160', note: 'Verified per master with ffprobe' },
      { label: 'Longest episode verified', value: '11:02', note: 'The Long Way Up, episode 1' },
      { label: 'Render time per episode', value: '≈1.5–4 h', note: 'Depends on temporal sampling' },
    ],

    overview: `Hoshi Nova is a standalone Windows application that produces finished animated
      episodes with as little manual intervention as possible. An episode is defined as structured
      data — scenes, characters, dialogue, camera marks, moods. The application resolves that into
      a cast with synthesised voices, drives a 3D engine to render the frames, assembles and mixes
      the audio, applies a score and credits, and writes a single delivered master file.

      The design constraint that shaped everything is that it must run unattended. I direct an
      episode, start a queue, and the machine finishes it without an AI assistant in the loop —
      because a ten-episode season is roughly a day and a half of continuous rendering and nothing
      that needs supervision at 03:00 is a production tool.`,

    problem: `Independent animation is gated by labour, not by ideas. A ten-minute animated episode
      conventionally needs a writer, a voice cast, an animator, a compositor, a sound designer and
      an editor. For one person that is not a scheduling problem, it is an impossibility.

      The second problem is quality drift. Generative tools make it trivially easy to produce
      something that is technically a video and obviously worthless — wrong resolution, flat vocal
      delivery, limbs passing through torsos, a soundtrack that is really a sine wave. Automating
      production without automating quality control just produces failure faster.`,

    solution: `A pipeline where every stage is a separate, inspectable program with a defined
      input and output, plus an automated gate before delivery.

      Episodes are data, not timelines, so they can be regenerated, diffed and re-rendered. Voice
      synthesis is pluggable, so a character's voice is a configuration value rather than a
      recording session. The 3D stage is driven by script through the engine's own Python API,
      which means set construction and camera work are reproducible. And nothing is delivered until
      it has been measured: resolution, frame rate, audio levels, and narration checked back against
      the written script by speech recognition.`,

    stack: [
      { group: 'Application', items: ['Electron', 'Node.js', 'JavaScript'] },
      { group: 'Rendering', items: ['Unreal Engine 5.8', 'Blender', 'Unreal Python API'] },
      { group: 'Speech & audio', items: ['Kokoro TTS', 'Chatterbox TTS', 'Whisper ASR', 'ffmpeg / ffprobe'] },
      { group: 'Assets', items: ['VRM / glTF characters', 'Mixamo skeletons', 'Meshy-generated models'] },
      { group: 'Orchestration', items: ['Python queue scripts', 'Resumable job logs'] },
    ],

    diagram: 'hoshiNova',

    responsibilities: [
      'Defined the episode data format and the stage boundaries of the pipeline.',
      'Built and maintained the Electron application, the render orchestrator and the CLI.',
      'Directed all twenty episodes: story structure, casting, dialogue, camera and pacing.',
      'Wrote the automated quality gate and the verification scripts that approve a master.',
      'Managed render scheduling, GPU contention and the storage lifecycle of intermediates.',
      'Diagnosed and fixed pipeline defects found in delivered output, including animation faults.',
    ],

    process: [
      {
        title: 'Smallest working version first',
        body: 'One episode, rendered badly, end to end — before any attempt at a season. The first delivered pass was accidentally 1080p, which is exactly the kind of error an end-to-end run surfaces and a component test does not.',
      },
      {
        title: 'Make every stage separately runnable',
        body: 'Voice, render, mix, credits and finalise are individually invokable. A failure in the mix does not cost four hours of rendering, and a fix can be verified on one stage in seconds.',
      },
      {
        title: 'Then automate the queue',
        body: 'A resumable queue with a per-episode log. It survives the session that started it, so a crash or a closed terminal does not lose a night of rendering.',
      },
      {
        title: 'Gate before delivery',
        body: 'Each master is probed for resolution, frame rate and audio level, contact-sheeted for visual review, and narration-checked against the script. A failed gate restores the previous master rather than shipping the new one.',
      },
    ],

    challenges: [
      {
        title: 'Intermediates filled the disk',
        body: `4K frame sequences are enormous. Rendering a single episode to PNG costs roughly 221 GB,
          and frames for ten delivered episodes were never cleared — about 620 GB of output for work
          that had already shipped, leaving the drive with under 5 GB free and blocking all further
          rendering. Two changes came out of it: frames are written as JPEG from 1440p upward, and
          intermediate cleanup is now part of the delivery step rather than an afterthought. The
          lesson generalised: in a media pipeline, storage lifecycle is a feature, not housekeeping.`,
      },
      {
        title: 'Animation that looked fine in review and was broken on inspection',
        body: `A collision scan of the clip library found that 61 of 70 animation clips had limbs
          intersecting the character body, by as much as 16 cm. None of it was obvious at playback
          speed. I wrote a Blender correction pass and a scanner that measures the closest approach
          between characters across an entire episode — the measured minimum separation came out at
          0.92 m, which also proved that scripted beats involving physical contact had no contact
          animation at all and had to be staged as cutaways instead.`,
      },
      {
        title: 'The score was not music',
        body: `The first ten episodes shipped with what the pipeline called a score and was in fact
          mathematically generated sound effects sitting about 29 dB down — effectively inaudible and
          not music by any definition. The owner-facing lesson was mine to learn: the pipeline reported
          success because a file existed at the expected path. Existence is not a quality check. The
          hosted music API I reached for next returned a payment-required error on a free plan, so the
          fallback is a built-in composer, with licensed tracks mixed roughly 8 dB under dialogue.`,
      },
      {
        title: 'A quality gate that measured against the wrong geometry',
        body: `The pre-render checker validates that characters and cameras sit inside the set. It
          was written against one production's wall geometry and, run against a different production,
          "corrected" scenes to the wrong walls — a destructive automated fix. It is now explicitly
          scoped to the production it was built for, and that constraint is documented at the call
          site. An automated fixer needs a narrower contract than an automated checker.`,
      },
    ],

    testing: [
      {
        title: 'Container and signal verification',
        body: 'Every delivered master is probed: 3840×2160, 24 fps, AAC stereo, programme level near −18 dB. A master that misses any of these is not delivered.',
      },
      {
        title: 'Narration against script',
        body: 'Speech recognition transcribes the rendered narration and the result is compared to the written line, which catches synthesis dropouts and wrong-take errors that no one hears on a first listen.',
      },
      {
        title: 'Geometry and collision scanning',
        body: 'Automated scans for character self-intersection and inter-character overlap across every scene of every episode, rather than spot checks.',
      },
      {
        title: 'Visual contact sheets',
        body: 'A frame grid per episode for human review — the cheapest way to catch a lighting or camera fault across eleven minutes.',
      },
    ],

    statusDetail: {
      built: [
        'End-to-end production of a 4K episode from structured data, unattended.',
        'Twenty episodes delivered and published across two seasons.',
        'Voice synthesis with per-character assignment and lip-sync.',
        'Scripted set construction and camera work through the engine Python API.',
        'Automated delivery gate with rollback on failure.',
        'Resumable render queue independent of the controlling session.',
      ],
      notBuilt: [
        'Local music generation — the model install never completed on the available connection; the built-in composer is the current path.',
        'A systematic voice-emotion audit. Delivery mood versus line intent is still judged by ear.',
        'The redesigned set. It conflicts with existing standing staging and needs supervised import.',
        'Any multi-user or cloud rendering capability. This is a single-workstation tool.',
      ],
    },

    future: [
      'Replace by-ear voice direction with a measurable prosody check against the intended mood per line.',
      'Treat intermediates as a managed cache with a size budget, rather than relying on a cleanup step.',
      'Extend the delivery gate to cover subtitle timing and loudness normalisation to a broadcast standard.',
      'Distribute rendering across a second machine — the groundwork exists but the node is switched off.',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'hoshidub',
    meta:
      'Released Windows app giving every anime character its own English voice in real time, processed on-device, with a spoiler-safe AI companion.',
    title: 'Hoshidub',
    subtitle: 'Live AI dubbing for anime, running locally',
    tagline:
      'A Windows application that gives every character in a show their own English voice as they speak, with the soundtrack left intact and an AI watch companion that cannot spoil the episode.',
    category: 'AI Product Development',
    featured: true,
    order: 2,
    status: STATUS.beta,
    period: '2026 – present',
    role: 'Sole builder and product owner',
    links: [{ label: 'hoshidub.com', url: 'https://hoshidub.com', note: 'Live product site' }],
    oneLiner:
      'A released, downloadable product with published pricing, built on local speech and language models.',

    metrics: [
      { label: 'Released version', value: '0.1.0', note: 'Windows 10 / 11, 115 MB' },
      { label: 'Pricing published', value: 'Free · $6.99/mo · $49/yr', note: 'A cloud tier is announced for 2027' },
      { label: 'Processing location', value: '100% on-device', note: 'No account, no video recording' },
      { label: 'Languages', value: '1 live, 4 announced', note: 'English now; ES, PT, HI, FR announced' },
    ],

    overview: `Hoshidub watches a show alongside the viewer and speaks it in English in real time.
      It assigns a distinct synthetic voice to each character, keeps that voice consistent for the
      whole episode, lowers only the original Japanese dialogue, and leaves music and effects at
      full level. A side-panel companion character reacts to the episode and answers questions about
      it out loud.

      It runs entirely on the user's own machine. There is no account, nothing is uploaded, and the
      application never records or decrypts video — it plays the service the user already subscribes
      to, in that service's own player.`,

    problem: `Most of the world's anime is released in Japanese first and dubbed much later, or never.
      Subtitles work, but reading a screen is not the same as watching it, and viewers who want both
      the original performance and an understandable one have no good option.

      The existing automated approaches have two failures. They lower the entire soundtrack to make
      the synthetic voice audible, which destroys the thing people actually watch anime for — the
      score and the sound design. And they lag, because they transcribe, translate and synthesise
      after the line has already been spoken.`,

    solution: `Two insights carry the product.

      First, latency is a scheduling problem, not a speed problem. When a show has an official
      subtitle track, the timing of every line is known in advance. Hoshidub reads ahead, synthesises
      each line before its cue, and plays it on time — so the delay is zero by construction rather
      than by optimisation. Shows without a subtitle track fall back to listening and translating,
      which does lag, and the interface says so instead of pretending otherwise.

      Second, only the voices need to move. Rather than ducking the whole mix, the original Japanese
      dialogue is attenuated by about 15 dB while music and effects stay within roughly 2 dB of where
      they started. The result is a dub that does not cost you the soundtrack.

      The companion character is a constrained language-model application: it is given only what has
      already played, so it is structurally unable to spoil what is coming. That is an architectural
      guarantee rather than an instruction in a prompt, which matters, because an instruction can be
      talked around and a missing context window cannot.`,

    stack: [
      { group: 'Application', items: ['Electron', 'Node.js', 'Embedded browser view'] },
      { group: 'Speech', items: ['Local ASR (Whisper-class)', 'Local neural TTS', 'Per-character voice assignment'] },
      { group: 'Language', items: ['Local LLM companion', 'Spoiler-safe context windowing'] },
      { group: 'Audio', items: ['Real-time dialogue-selective ducking', 'Multi-track mixing'] },
      { group: 'Platform', items: ['Windows 10/11', 'NVIDIA GPU acceleration', 'Stripe billing'] },
    ],

    diagram: 'hoshidub',

    responsibilities: [
      'Product definition, pricing structure and public positioning.',
      'Architecture of the read-ahead synthesis scheduler that produces the zero-delay path.',
      'The dialogue-selective ducking approach that preserves music and effects.',
      'The spoiler-safety design for the companion, enforced structurally rather than by prompt.',
      'Privacy and legal posture: on-device processing, no recording, no decryption, no account.',
      'Marketing site, structured data, pricing page and support documentation.',
    ],

    process: [
      {
        title: 'Work out what the product must never do',
        body: 'Before building: never record video, never decrypt a stream, never require an account, never spoil an episode. Those four constraints eliminated most of the obvious architectures and left a defensible one.',
      },
      {
        title: 'Solve the hard case with the easy data',
        body: 'The zero-delay path only exists where an official subtitle track does. Rather than treating that as a limitation, I made it the primary path and the listen-and-translate route the documented fallback.',
      },
      {
        title: 'Ship an honest 0.1.0',
        body: 'The released version is labelled 0.1.0 with a GPU recommendation stated up front and the free tier capped at 30 minutes a day. A product page that overstates the hardware story produces refunds, not customers.',
      },
    ],

    challenges: [
      {
        title: 'Zero delay is a scheduling guarantee, and only sometimes available',
        body: `Pre-synthesising from a known subtitle track gives exact cueing. Listening live does not
          — speech recognition cannot transcribe a line before it is spoken. Rather than average the
          two into a vague claim, the product documents both paths separately: zero delay with official
          subtitles, translate-by-ear without them. Being specific about where a guarantee applies is
          more valuable than a stronger claim that fails on some shows.`,
      },
      {
        title: 'Keeping the soundtrack while removing the voices',
        body: `Separating dialogue from music in a finished mix is the whole difficulty. Attenuating
          everything is trivial and ruins the show. The product's audio targets are explicit — Japanese
          dialogue down about 15 dB, music and effects within about 2 dB of original — which makes the
          behaviour testable rather than subjective.`,
      },
      {
        title: 'A companion that cannot be tricked into spoiling',
        body: `A prompt instruction not to reveal the ending fails the first time a viewer asks
          cleverly. The design answer was to withhold the information entirely: the companion's context
          contains only what has already played. When asked how the episode ends it genuinely does not
          know. The distinction matters: a policy can be argued with, a missing context window
          cannot.`,
      },
      {
        title: 'Staying on the right side of the line',
        body: `A tool in this category can very easily become a piracy tool. The posture is deliberate
          and stated publicly: it plays the service the user pays for, inside that service's player,
          and listens to the audio the way a person in the room would. Nothing is captured, stored or
          decrypted. The product's legal position is a design output, not a disclaimer.`,
      },
    ],

    testing: [
      {
        title: 'Cue accuracy',
        body: 'Measured offset between a subtitle cue and the start of the synthesised line on the zero-delay path.',
      },
      {
        title: 'Audio target verification',
        body: 'Level measurement confirming dialogue attenuation and that music and effects stay inside the stated tolerance.',
      },
      {
        title: 'Voice consistency across an episode',
        body: 'A character keeps one voice for a whole episode; drift between scenes is a defect, not a variation.',
      },
      {
        title: 'Spoiler containment',
        body: 'Adversarial questioning of the companion about events later in the episode, verifying the context boundary holds.',
      },
    ],

    statusDetail: {
      built: [
        'Released version 0.1.0 for Windows 10 and 11, publicly downloadable.',
        'Zero-delay dubbing from official subtitle tracks.',
        'Translate-by-ear fallback for shows without subtitles.',
        'Per-character voice assignment with consistency across an episode.',
        'Dialogue-selective ducking that preserves music and effects.',
        'Local AI companion with structural spoiler containment.',
        'Ad and tracker blocking, on-device processing, no account required.',
        'Public product site with pricing, FAQ and structured data.',
      ],
      notBuilt: [
        'The cloud tier. It is announced for 2027 and priced on the site, but not implemented — the page says "Coming 2027" and collects notification interest only.',
        'Spanish, Portuguese, Hindi and French. Announced as planned; English is the only language live.',
        'Any adoption, revenue or retention figures. I have not published user numbers and will not until there are audited ones to publish.',
      ],
    },

    future: [
      'Implement the announced cloud tier so the product works without a discrete GPU.',
      'Add the four announced languages using official subtitle tracks in each language.',
      'Publish measured latency and audio-separation figures as a technical page, so the claims are checkable by a buyer.',
      'Formal evaluation set for spoiler containment, scored rather than spot-tested.',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'mcp-labs',
    meta:
      'A live PHP storefront, licensing API with account binding and sharing detection, customer portal and beta programme, with real paying customers.',
    title: 'MCP Labs',
    subtitle: 'Independent technology lab, storefront and licensing platform',
    tagline:
      'The commercial operation behind my products: a live PHP storefront, a software licensing API with account binding and sharing detection, a customer portal, a free beta-testing programme and the business operations around them.',
    category: 'Product Development & Operations',
    featured: true,
    order: 3,
    status: STATUS.shipping,
    period: '2025 – present',
    role: 'Founder, developer and support',
    links: [
      { label: 'mcpautomation.io', url: 'https://mcpautomation.io', note: 'Live storefront' },
      { label: 'Beta Lab', url: 'https://mcpautomation.io/beta', note: 'Free tester programme' },
      { label: 'MQL5 verified seller', url: 'https://www.mql5.com/en/users/mbedzimz1/seller', note: 'Third-party marketplace profile' },
    ],
    oneLiner:
      'A real storefront with real customers, a licensing API that commercial software depends on, and the operational work that comes with both.',

    metrics: [
      { label: 'Registered users', value: '23', note: 'Measured 16 Oct 2026. A small list, stated honestly.' },
      { label: 'Holding a paid licence', value: '12', note: 'Same measurement date' },
      { label: 'Domains in production', value: '8', note: 'All verified responding on 31 Oct 2026' },
      { label: 'Server dependencies', value: '0 frameworks', note: 'PHP 8.3 + SQLite, no Composer' },
    ],

    overview: `MCP Labs is the entity my commercial work ships under. Practically it is a live
      storefront on shared hosting that sells downloadable software, issues and validates licences,
      runs a customer portal, publishes technical content for search, and handles the support that
      follows a sale.

      I want to be precise about scale, because a portfolio that implies otherwise is worthless: as
      of the last measurement there were 23 registered users, 12 of whom hold a paid licence. It is a
      small business. What makes it portfolio-relevant is not its size but that it is genuinely in
      production — people have paid money, software in the field depends on the licensing API
      responding, and when it breaks the support request comes to me.`,

    problem: `Selling downloadable software alone means owning every part of the chain: the storefront,
      payment, licence issuing, anti-sharing enforcement, the customer's self-service needs, the
      documentation, discoverability in search, and support. Each of those has an off-the-shelf
      service, and buying all of them for a business this size costs more than the business makes.

      There is a second problem specific to software licensing. A licence has to be strict enough that
      one purchase is not shared across a forum, and loose enough that a legitimate customer moving
      between their own machines is never locked out or accused.`,

    solution: `A deliberately small stack: PHP 8.3 with no framework, SQLite for storage, a single
      front controller, and all application code outside the web root. No Composer, no build step, no
      dependency upgrade treadmill on a shared host I do not fully control.

      Licensing runs through one validation endpoint. On every check the client reports its broker,
      server, account type, terminal build and a hashed machine identifier, which gives an admin view
      of exactly which keys are running where, and makes sharing detectable without any second
      protocol.

      The free beta programme reuses that same mechanism rather than inventing a parallel one: a
      volunteer tester is issued a genuine licence row against a hidden product with beta status. The
      existing validation endpoint then does all the work, and a helper function excludes beta
      products from the definition of "customer" so a volunteer is never mistaken for a buyer.`,

    stack: [
      { group: 'Server', items: ['PHP 8.3', 'SQLite', 'Shared hosting (Linux)', 'No framework, no Composer'] },
      { group: 'Architecture', items: ['Single front controller', 'Application code outside web root', 'One-off migration scripts'] },
      { group: 'Commerce', items: ['Card and crypto checkout', 'Licence issuing', 'Customer portal', 'Account binding'] },
      { group: 'Discoverability', items: ['JSON-LD structured data', 'IndexNow submission', 'Sitemap management', 'Canonical consolidation'] },
      { group: 'Operations', items: ['SSH deployment with retry', 'Timestamped file backups', 'Server-side lint gate'] },
    ],

    diagram: 'mcpLabs',

    responsibilities: [
      'Built and operate the storefront, customer portal and admin tooling.',
      'Designed the licensing model: issuing, account binding, expiry, revocation and sharing detection.',
      'Designed and built the Beta Lab tester programme on top of the existing licence primitives.',
      'All customer support, including licence rebinding and installation help.',
      'Product catalogue decisions, pricing and promotion mechanics.',
      'Technical SEO: structured data, indexing, canonical strategy and content.',
      'Deployment, backups and the operational discipline around a host I cannot fully trust.',
    ],

    process: [
      {
        title: 'Reuse the primitive instead of adding a protocol',
        body: 'The beta programme could have been a separate system with its own keys and its own validation path. Issuing a real licence against a hidden product meant zero new surface area and zero new code in the field clients. Choosing not to build is a design decision.',
      },
      {
        title: 'Back up before every edit, on a host with no version control',
        body: 'Every file is copied to a dated, labelled backup before it is changed, and the server-side lint is run before anything is considered deployed. It is primitive compared with a proper pipeline and it is appropriate to the constraint.',
      },
      {
        title: 'Write scripts that can be run twice',
        body: 'The SSH connection to this host drops frequently, so every deployment and migration script is idempotent and wrapped in retries. A script that is only safe to run once is not safe on an unreliable link.',
      },
      {
        title: 'Measure the live system, not the fixture',
        body: 'Features that touch customer data are validated against the production database before being trusted. The reason is in the challenges below, and it was an expensive lesson.',
      },
    ],

    challenges: [
      {
        title: 'Anti-sharing detection that accused my two best customers',
        body: `The first version of the licence-sharing rule flagged any single trading account seen
          against more than one licence key. It immediately flagged the two most valuable customers on
          the list. They had done nothing wrong: they had bought three products each and were running
          all of them on one account, which is exactly what a good customer looks like.

          The rule now requires more than one distinct user before anything is flagged. The part worth
          keeping is how it was caught — the test fixture passed happily, and the fault only appeared
          when the detection was run against live data. A correctness test confirmed the code did what
          I wrote; it could not tell me that what I wrote was the wrong rule.`,
      },
      {
        title: 'A promotion that would have been a fake discount',
        body: `The requirement was a Black Friday offer with prices unchanged. A sale banner over an
          unchanged price is a misleading prior-price claim and is regulated — South African consumer
          protection law and the equivalent UK and EU rules all treat it as an offence. Rather than
          running it or simply refusing, I changed the mechanism: the promotion doubles the number of
          machine seats on every licence sold in the window and the price genuinely does not change.
          Customers get something real, the claim is true, and there is no prior-price problem. The
          offer is live on the site in exactly that form.`,
      },
      {
        title: 'Four pages competing for the same search result',
        body: `The same live trading account had been written up four separate times, each page frozen
          at whatever the balance was that week. They cannibalised each other's ranking and three of
          them were permanently out of date by construction. I consolidated to a single evergreen URL
          with no date in the slug, regenerated by one idempotent script, and redirected the strongest
          of the old pages into it. Refreshing the figures is now editing one script and re-running it,
          which is the only version of this that does not decay.`,
      },
      {
        title: 'Infrastructure that lies to you',
        body: `Three unglamorous production facts that cost real time. The CDN in front of the host
          caches uploads for seven days with no purge available over SSH, so replacing an image in place
          keeps serving the old bytes — new filenames are the only reliable fix. Page titles are
          truncated to 60 characters after the site name is appended, so a title that looks fine in the
          database renders cut mid-word. And three global stylesheets already define generic class names
          like .card and .hero, so any new page must namespace its own classes or render half-broken.
          None of it appears in any documentation.`,
      },
    ],

    testing: [
      {
        title: 'Validation against production data',
        body: 'Customer-facing rules are exercised against the live database before release, because the false-positive above proved fixtures insufficient.',
      },
      {
        title: 'Server-side lint as a deployment gate',
        body: 'No PHP runtime exists on my workstation, so the interpreter on the server is the only available check and it runs before anything is live.',
      },
      {
        title: 'Live endpoint verification',
        body: 'The licensing API is exercised against the real deployment, including binding, expiry and revocation paths — not only against a local stub.',
      },
      {
        title: 'Rendered-output checks',
        body: 'Titles, structured data and page markup are verified on the live URL, since truncation and stylesheet conflicts only appear once rendered.',
      },
    ],

    statusDetail: {
      built: [
        'Live storefront with card and crypto checkout, in production with paying customers.',
        'Licensing API with issuing, account binding, expiry, revocation and sharing detection.',
        'Admin licence-control view showing which keys are active, on which terminal and broker.',
        'Customer self-service portal including account rebinding.',
        'Beta Lab free tester programme built on the existing licence primitives.',
        'Structured data, indexing submission and canonical consolidation across 8 production domains.',
      ],
      notBuilt: [
        'Cryptographic signing of licence responses. The client-side support is in place; completing it end to end is the remaining piece of the licensing work, which is why I list licence integrity as unfinished rather than done.',
        'Grouping of indexing submissions by hostname. Submissions for the secondary domain are currently handled by a second explicit payload rather than properly fixed in the shared helper.',
        'Any automated test suite or CI. Verification here is manual and scripted, not continuous.',
      ],
    },

    future: [
      'Complete the cryptographic signing work, so a licence response is signed as well as validated.',
      'Replace the manual backup convention with real version control on the server.',
      'Add cache-busting at the URL-generation layer rather than working around the CDN by renaming files.',
      'Automate the parts of support that are currently me answering the same question.',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'apex-drawdown-zero',
    meta:
      'A commercial MT5 trading product presented for its engineering and testing discipline. It contains no performance claims, deliberately.',
    title: 'Apex Drawdown Zero',
    subtitle: 'Commercial automated trading product',
    tagline:
      'A MetaTrader 5 Expert Advisor sold as a licensed commercial product: strategy configuration, a disciplined testing methodology, version management, technical documentation and customer support.',
    category: 'Product Development & Testing',
    featured: true,
    order: 4,
    status: STATUS.shipping,
    period: '2025 – present',
    role: 'Developer, tester, documenter and support',
    links: [
      { label: 'apexdrawdownzero.com', url: 'https://apexdrawdownzero.com', note: 'Live product site' },
      { label: 'Independently tracked account', url: 'https://www.myfxbook.com/portfolio/apex-drawdown-zero-live-200/11897367', note: 'Third-party verification — figures are not reproduced here' },
    ],
    oneLiner:
      'A product I present for its engineering and testing discipline, not its returns — which is also how I present it to customers.',

    disclaimer:
      'This case study contains no performance, profitability or win-rate figures. All strategy results I hold are simulations, simulated results are not indicative of future performance, and I sell this product. The engineering and testing practice is the subject here. A live account is tracked by an independent third party and linked above for anyone who wants to inspect it directly.',

    metrics: [
      { label: 'Public version', value: 'v9.21', note: 'Version on the live product site' },
      { label: 'Configuration presets', value: '4 + manual', note: 'Each independently verified to load exactly' },
      { label: 'Supported symbols', value: '3', note: 'XAUUSD, EURUSD, EURJPY' },
      { label: 'Changes rejected on evidence', value: 'documented', note: 'See the Verification page' },
    ],

    overview: `Apex Drawdown Zero is a trading automation product for MetaTrader 5. It takes at most
      one qualified trade a day, always places a stop-loss at order time, sizes every position from a
      fixed risk percentage and the actual stop distance, moves the stop to break-even once a trade
      has run most of the way to target, restricts entries to a session window, and refuses to enter
      when the spread is too wide. There is no grid and no martingale.

      My work on it spans the whole product rather than only the strategy: the parameter presets, the
      testing methodology that decides whether a change ships, build and rollback management, the
      licensing integration, the prop-firm documentation, marketplace compliance, and the support that
      follows every sale.`,

    problem: `Two problems, and the second is the real one.

      The surface problem is that most retail trading automation is built to produce an impressive
      backtest. Grids and martingales do that reliably, right up until the account is gone, because
      the drawdown is deferred rather than removed. A product that has to survive contact with a real
      account needs the opposite bias: a hard stop on every position, fixed fractional sizing, and a
      hard cap on activity.

      The deeper problem is epistemic. Every number available to me about this strategy comes from a
      simulation, and a simulation can be made to say almost anything. The genuine engineering
      challenge is not finding a profitable configuration — it is building a testing discipline strict
      enough that I can tell the difference between an improvement and a result I fitted by accident.`,

    solution: `For the product: explicit, conservative mechanics, all of which are stated on the sales
      page rather than hidden. One trade a day, a stop on every entry, risk-based sizing, break-even
      management, session control, spread protection, an optional hard lot cap. Where the product
      cannot do something — there is no built-in daily-loss halt and no prop-firm mode — the page says
      so plainly, because a customer who discovers that after a failed challenge is a refund and a
      complaint.

      For the testing: a methodology with four non-negotiable rules, each of which exists because
      breaking it once produced a wrong answer. Simulate on real tick data, never on interpolated bar
      data. Split the period in half and require a change to improve both halves, not the total.
      Measure outcomes per position, not per broker-reported trade. Fix the simulator's execution
      delay, or runs are not reproducible and you are comparing noise. These are described in detail
      on the Verification page, because that methodology is the transferable part of this work.`,

    stack: [
      { group: 'Implementation', items: ['MQL5', 'MetaTrader 5', 'Expert Advisor architecture'] },
      { group: 'Testing', items: ['MT5 Strategy Tester (real-tick mode)', 'Split-half validation', 'Python analysis scripts'] },
      { group: 'Product', items: ['Licence client integration', 'Account binding', 'Preset configuration system'] },
      { group: 'Release', items: ['Checksum-stamped builds', 'Explicit rollback artefacts', 'Versioned presets'] },
    ],

    diagram: 'apex',

    responsibilities: [
      'Strategy implementation and the parameter preset system that makes it configurable without code.',
      'The testing methodology that decides whether a change is adopted or rejected.',
      'Build and release management: checksummed builds, kept rollback artefacts, versioned presets.',
      'Technical documentation, including the honest prop-firm limitations page.',
      'Marketplace compliance work for third-party distribution.',
      'Licensing integration and all customer support.',
    ],

    process: [
      {
        title: 'Change one thing, measure it in both halves',
        body: 'A candidate change is accepted only if it improves the in-sample and out-of-sample halves. Most do not. A change that improves the total while failing a half is a fitted result, and the total is what hides it.',
      },
      {
        title: 'Prefer a plateau to a peak',
        body: 'Where a parameter is adopted, I look for a range of neighbouring values that all pass, and take the middle of it. A value that only works when its neighbours do not is more likely noise than a finding.',
      },
      {
        title: 'Verify the configuration loads as intended',
        body: 'Each shipped preset is run and confirmed to reproduce its documented result to the cent. This caught a real discrepancy between two configuration paths that had been quietly disagreeing.',
      },
      {
        title: 'Keep the rejections',
        body: 'Rejected changes are recorded with the evidence that killed them, in the code at the relevant line. Three separate ideas in this product have been re-tested and re-rejected; the note is what stops a fourth attempt.',
      },
    ],

    challenges: [
      {
        title: 'A whole day of results invalidated by one simulator setting',
        body: `An entire session of parameter work — several sweeps and a set of adoption decisions —
          was run with the simulator interpolating inside one-minute bars instead of using real tick
          data. That matters enormously for this strategy, because its exits sit inside the bar: which
          of the stop, the partial close or the trailing stop is touched first within a minute is
          guessed rather than observed. Every conclusion from that session was marked unverified and
          re-run. The rule is now absolute: real ticks, or it is not evidence.`,
      },
      {
        title: 'The platform reports a win rate that is wrong for this product',
        body: `Because the strategy closes part of a position early, one position produces two separate
          records and the platform counts both. Its reported trade count and win rate are therefore
          inflated, and the early partial close is a winner by construction. I now pair records back
          into positions before measuring anything. This nearly cost a correct decision: the change I
          eventually adopted moves the platform's reported winner count down while the real number of
          winning positions goes up. Trusting the dashboard would have rejected an improvement.`,
      },
      {
        title: 'A structurally appealing change that lost money',
        body: `The strategy burns a trading day when a position is carried overnight, which looked like
          a large recoverable constraint — well over a hundred lost opportunities. I implemented the fix
          properly, verified the control reproduced exactly, and measured it: more trades, more winners,
          and materially worse overall, failing both halves. The added trades won at roughly half the
          base rate, because a day whose carried trade has just closed is a day the move already
          happened. It was reverted and the reasoning is recorded at the relevant line of code.`,
      },
      {
        title: 'The ceiling question, answered with numbers instead of optimism',
        body: `Asked whether returns could be pushed several times higher, I measured the whole
          risk frontier rather than arguing. The answer is that the apparently achievable extreme
          requires position sizes that exceed the instrument's own volume ceiling — the simulation
          silently clips them — alongside a drawdown that would take an account down to a small
          fraction of its peak. It is reachable in a backtest and unreachable in reality, and it is
          recorded in that form for a product I sell.`,
      },
    ],

    testing: [
      {
        title: 'Real tick data only',
        body: 'Simulations run against stored tick data covering the full test window. Interpolated bar modelling is treated as producing no evidence at all for this strategy.',
      },
      {
        title: 'Split-half in-sample / out-of-sample',
        body: 'Every candidate change must improve both halves independently. Improvement in the total with a failing half is treated as overfitting.',
      },
      {
        title: 'Per-position measurement',
        body: 'Platform records are paired back into positions before any outcome is counted, because partial closes double-count and inflate the reported win rate.',
      },
      {
        title: 'Reproducibility control',
        body: 'The simulator\'s execution-delay setting defaults to a random value, which makes runs non-reproducible. It is fixed explicitly before any comparison.',
      },
      {
        title: 'Preset load verification',
        body: 'Each shipped configuration is run and confirmed to reproduce its documented result exactly, which has already caught one silent configuration-path discrepancy.',
      },
    ],

    statusDetail: {
      built: [
        'Commercial product on sale with licensing, account binding and instant delivery.',
        'Four configuration presets plus manual control, each load-verified.',
        'Core mechanics: one trade a day, mandatory stop-loss, risk-based sizing, break-even management, session control, spread protection.',
        'Checksum-stamped builds with kept rollback artefacts for prior versions.',
        'Technical documentation including an explicit statement of what the product does not do.',
        'Marketplace compliance work for third-party distribution.',
      ],
      notBuilt: [
        'A built-in daily-loss or maximum-drawdown halt. There is none, and the product page says so rather than implying a prop-firm safety net that does not exist.',
        'Any verified forward-tested performance claim from me. The only third-party evidence is the independently tracked account linked above; I do not reproduce its figures.',
        'Published real-tick confirmation of the most recent development builds. Those numbers exist only as bar-interpolated runs and are therefore marked unverified in my own records.',
      ],
    },

    future: [
      'Complete real-tick re-verification of the current development build before any of its parameters are considered settled.',
      'Publish the testing methodology as customer-facing documentation, so a buyer can judge the process rather than only the marketing.',
      'Automate the split-half adoption test so a change cannot be adopted without producing both halves.',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'hoshi-live',
    meta:
      'An AI presenter that hosts a stream unattended, reading chat, choosing topics and reacting to video. Built and tested, never broadcast live.',
    title: 'Project Luna',
    subtitle: 'Autonomous AI presenter and live-stream host',
    tagline:
      'A desktop application in which an animated AI character hosts a live stream unattended — reading chat, choosing topics, reacting to what is on screen and controlling her own performance, with no operator pressing buttons.',
    category: 'AI Systems & Agents',
    featured: false,
    order: 5,
    status: STATUS.built,
    period: 'October 2026 – present',
    role: 'Sole builder',
    links: [],
    oneLiner:
      'Built and functional in testing. It has never run a real public broadcast, and this page says so throughout.',

    metrics: [
      { label: 'Operator actions required', value: '0', note: 'By design: no buttons during a stream' },
      { label: 'Models running locally', value: 'LLM + TTS + ASR', note: 'Language, speech synthesis and audio understanding' },
      { label: 'Platforms integrated', value: '2', note: 'Live chat ingestion from two services' },
      { label: 'Public broadcasts', value: '0', note: 'Stated plainly — it has not gone live' },
    ],

    overview: `Project Luna is an attempt at a genuinely autonomous presenter. A rigged 3D character
      hosts a stream: she reads the live chat, answers it out loud, opens a new topic when chat goes
      quiet, reacts to video playing on the virtual set, and selects her own expressions and movements.
      There is no control surface to operate during a broadcast, which is the point — an AI host that
      needs a human driver is a puppet, not an agent.

      Around it sits the operator tooling you need before you would ever point this at an audience:
      an emergency stop, moderation with a blocked-term list, the ability to make the system forget a
      specific viewer, and session recording that produces an event log and a report afterwards.`,

    problem: `An autonomous presenter is an agent problem wearing a costume. It has to decide what to
      respond to, when to speak, when to stay quiet, what it is allowed to say, and how to behave when
      nothing is happening — all in real time, in public, with no undo. Most "AI streamer" projects
      solve the character and skip the agency, so a person ends up choosing what she reacts to.

      It also raises a problem I had not expected to be the hardest one, which is honesty about the
      audience.`,

    solution: `A director loop that owns the decisions, with the model as one input rather than the
      whole system. Chat arrives as events; the director decides whether an event deserves a response,
      what kind, and whether the moment calls for a topic change instead. Personality is a constraint
      on style, not a free-form instruction, and stiff assistant phrasing is filtered out before it is
      spoken, because the failure mode of a language model in this role is sounding like a help desk.

      Everything runs locally — language, voice and audio understanding — so a broadcast does not
      depend on a metered API and a viewer's message does not leave the machine. Video awareness comes
      from transcribing the audio of what is on the set screen and detecting scene cuts, so her
      reactions are tied to something real rather than invented.`,

    stack: [
      { group: 'Application', items: ['Electron', 'Node.js'] },
      { group: 'Language', items: ['Local LLM (Qwen3-4B) on GPU', 'Scripted fallback layer'] },
      { group: 'Speech', items: ['Kokoro TTS', 'Whisper ASR', 'Loudness-driven lip sync'] },
      { group: 'Presentation', items: ['VRM avatar', 'Unreal Engine set render', '16:9 and 9:16 layouts'] },
      { group: 'Integration', items: ['Live chat ingestion', 'Moderation', 'DPAPI-encrypted credential storage'] },
    ],

    diagram: 'luna',

    responsibilities: [
      'Designed the director loop that gives the character autonomy over her own performance.',
      'Built the local model stack so no broadcast depends on a paid API.',
      'Built the video-awareness path so reactions correspond to real on-screen events.',
      'Built the operator safety tooling: emergency stop, moderation, per-viewer forget.',
      'Built session recording, event logging and post-session reporting.',
      'Made the integrity decision described below, and set the default accordingly.',
    ],

    process: [
      {
        title: 'Autonomy first, polish second',
        body: 'The director loop was built before the presentation layer, because a beautiful character with no agency is a different and much easier project than the one I wanted to attempt.',
      },
      {
        title: 'Local by default',
        body: 'Every model runs on the machine. A streamer that stops working when an API key hits its quota, mid-broadcast, is not viable, and viewer messages should not leave the host.',
      },
      {
        title: 'Build the stop button before the start button',
        body: 'Emergency stop, moderation and viewer-forget exist because this is a system that speaks in public without supervision. The controls came before any thought of a real audience.',
      },
      {
        title: 'Test quietly and sparingly',
        body: 'Test launches run silenced and with simulated chat behind an explicit environment flag, so a test can never be mistaken for or leak into a broadcast.',
      },
    ],

    challenges: [
      {
        title: 'A simulated-audience feature that was dishonest the moment it was visible',
        body: `Simulated chat existed so the director loop could be developed without an audience. During
          a real stream it displayed fabricated viewers. That is not a bug in the ordinary sense — the
          feature worked exactly as written — it is a feature that was fine as a test harness and became
          a lie the moment it was on screen in front of real people.

          It is now off by default and only enabled by an explicit environment flag that no normal launch
          sets. The general lesson is the one I keep relearning: a development convenience that
          fabricates data must be structurally impossible to leave on, not merely switched off.`,
      },
      {
        title: 'Making a language model not sound like a language model',
        body: `The default register of an instruction-tuned model is a polite assistant, which is
          precisely wrong for a live host. The fix was not a better prompt but a filtering layer that
          rejects assistant phrasing before it reaches speech, and a personality defined as a constraint
          on style rather than as a long instruction asking the model to be fun.`,
      },
      {
        title: 'An integration that is a licensing liability',
        body: `Live chat from one platform relies on an unofficial, read-only community library under a
          strong copyleft licence. It works. It also means that if this application is ever sold, that
          module must be removed or the whole source published under the same licence. That is recorded
          as a condition on the project rather than discovered later by someone else.`,
      },
      {
        title: 'Built is not proven',
        body: `The honest status: this works in testing and has never hosted a real public broadcast.
          The live-chat path for one platform has never been exercised against a real stream at all. I
          have deliberately not written anything on this page that implies otherwise, because the gap
          between "works on my machine, unattended, for an hour" and "ran a public stream" is exactly
          where projects like this fail.`,
      },
    ],

    testing: [
      {
        title: 'Per-module unit tests',
        body: 'Each module is runnable and tested in isolation under a timeout, so a hang is a failure rather than a wait.',
      },
      {
        title: 'Simulated-chat harness',
        body: 'The director loop is exercised against synthetic chat behind an explicit flag, which is how autonomy was developed without an audience.',
      },
      {
        title: 'Screenshot verification',
        body: 'Rendered output is captured and inspected rather than assumed, since a layout fault is invisible to a log.',
      },
      {
        title: 'Session reports',
        body: 'Every recorded session produces an event log and a report, which is what makes a run reviewable after the fact.',
      },
    ],

    statusDetail: {
      built: [
        'Autonomous director loop: chat response, topic initiation, expression and movement selection.',
        'Local language, speech-synthesis and speech-recognition stack on the GPU.',
        'Video awareness via audio transcription and scene-cut detection.',
        'Portrait and landscape stream layouts with a 3D rendered set.',
        'Operator tooling: emergency stop, moderation, blocked terms, per-viewer forget.',
        'Session recording with event log, report and highlight clip extraction.',
        'Encrypted local credential storage.',
      ],
      notBuilt: [
        'It has never run a real public broadcast. Zero.',
        'One platform\'s live-chat integration is untested against a real live stream.',
        'Lip sync follows loudness only; it is not phoneme-accurate.',
        'The 3D set is a blockout, not a finished environment.',
        'The analytics dashboard and any learning-from-past-streams capability are not built.',
      ],
    },

    future: [
      'Run an actual broadcast. Everything else on this list is secondary to that.',
      'Replace loudness-driven lip sync with phoneme-aligned visemes.',
      'Remove or relicense the copyleft chat module before any commercial use.',
      'Score the director loop against a rubric — response appropriateness, silence handling, repetition — rather than judging it by watching.',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'friend-debt-engine',
    meta:
      'A dependency-free simulation of eight agents with private knowledge, and a test proving the reasoning code cannot read the hidden truth.',
    title: 'FRIEND//DEBT simulation engine',
    subtitle: 'Deterministic social-reasoning engine with an enforced information boundary',
    tagline:
      'A dependency-free simulation of eight characters who hold private knowledge, remember what they are told, track who owes whom, lie, and vote — with a test that proves the AI code cannot read the ground truth it is supposed to deduce.',
    category: 'AI Systems & Agents',
    featured: false,
    order: 6,
    status: STATUS.delivered,
    period: 'October 2026',
    role: 'Sole builder',
    links: [],
    oneLiner:
      'The engine was built as a game, validated by 38 tests, and ended up as the story generator for a published ten-episode season.',

    metrics: [
      { label: 'Automated tests', value: '38', note: 'Runnable with one command, no dependencies' },
      { label: 'Runtime dependencies', value: '0', note: 'Plain JavaScript by deliberate constraint' },
      { label: 'Simulated characters', value: '8', note: 'Each with private knowledge and goals' },
      { label: 'Measured outcome balance', value: '≈60% / ≈45%', note: 'Rate at which the group identifies the saboteur / clears its target' },
    ],

    overview: `FRIEND//DEBT simulates a group of people under social pressure. Each character holds
      private information, knows where they learned it, remembers interactions, maintains relationships
      and debts to the others, pursues goals through plans, and can deceive. The simulation produces
      the dialogue acts, the tells and the votes; the outcome is not scripted.

      The architectural decision that matters is that the simulation is completely separate from its
      presentation. It is plain JavaScript with no dependencies, it is deterministic given a seed, and
      it runs and is tested without any graphics at all. The 3D engine is only a client that talks to
      it.`,

    problem: `A social deduction system is easy to fake and hard to build. The faked version is a
      branching script: characters appear to scheme because an author wrote the scheming. It produces
      one good playthrough and nothing after that.

      The real version has a specific technical hazard. If the code driving a character can see the
      hidden truth it is meant to be deducing, every character becomes subtly omniscient — they argue
      slightly too well, suspect the right person slightly too early, and the whole thing feels wrong
      in a way that is very hard to trace, because nothing is broken.`,

    solution: `Model knowledge explicitly, with provenance. A character does not know a fact; a
      character knows a fact, from a source, learned at a time — and that chain is what makes
      deception, mistaken belief and second-hand rumour representable at all rather than requiring
      special cases.

      The information boundary is then enforced by a test. An automated check scans the character-reasoning
      code for any access to the hidden-state structures, and fails the build if it finds one. The
      honesty of the simulation is a test assertion rather than a convention I remember to follow,
      which is the only version of that discipline that survives a late-night change.

      Determinism is enforced the same way: all randomness goes through one seeded generator, so any
      run can be reproduced exactly from its seed. This was tightened after a bug revealed that
      consecutive seeds produced correlated runs.`,

    stack: [
      { group: 'Engine', items: ['Plain JavaScript (no dependencies)', 'Seeded deterministic RNG', 'Node.js test runner'] },
      { group: 'Model', items: ['Knowledge with source chains', 'Episodic memory', 'Relationship and debt graph', '14 dialogue acts', 'Goal and plan system'] },
      { group: 'Interface', items: ['Local HTTP bridge', 'Save / load', 'Separate player and developer views'] },
      { group: 'Presentation', items: ['Unreal Engine 5.8 client', 'Transparent overlay UI'] },
    ],

    diagram: 'friendDebt',

    responsibilities: [
      'Designed the knowledge model with explicit provenance, which is what makes deception representable.',
      'Built the engine, the dialogue act system, the goal and plan layer and the debt graph.',
      'Wrote the information-boundary test that enforces the simulation\'s honesty automatically.',
      'Enforced determinism through a single seeded generator after finding correlated-seed behaviour.',
      'Built the separation between the player\'s view and the developer\'s view so hidden state cannot leak to the interface.',
      'Repurposed the engine as the story generator for a produced season.',
    ],

    process: [
      {
        title: 'Separate the simulation from the spectacle',
        body: 'No graphics dependency, no engine dependency, no editor required. The practical reason was that this machine has no C++ toolchain; the better reason is that a simulation you can only observe through a renderer is a simulation you cannot test.',
      },
      {
        title: 'Make the integrity constraint executable',
        body: 'Rather than a rule in a document saying reasoning code must not read hidden state, a test asserts it. Documented conventions decay; a failing test does not.',
      },
      {
        title: 'Measure balance rather than guessing it',
        body: 'Running many seeded simulations gives the actual rate at which the group identifies the saboteur and clears its target. Those numbers are design feedback, not flavour text.',
      },
      {
        title: 'Follow the evidence to a different product',
        body: 'The engine produced better narrative than interaction. Rather than defend the original plan, it became the story generator for a produced and published season — which is a real outcome instead of an unfinished game.',
      },
    ],

    challenges: [
      {
        title: 'Preventing accidental omniscience',
        body: `This is the central difficulty of the whole genre. Character reasoning needs rich access
          to what a character believes and zero access to what is actually true. Those two live next to
          each other in the same data structures, and a single convenient property access collapses the
          distinction. An automated scan of the reasoning code for ground-truth access is what keeps the
          boundary real. It is the same class of control as preventing a model from seeing its test
          set.`,
      },
      {
        title: 'Determinism that was not quite deterministic',
        body: `Seeded runs are the basis of every balance measurement here. A defect meant consecutive
          seeds produced correlated results — so a batch of runs across a seed range was measuring far
          less variation than it appeared to. All randomness was routed through a single generator and
          the correlation went away. The uncomfortable part is that the measurements looked perfectly
          reasonable while they were wrong.`,
      },
      {
        title: 'Hidden state leaking through the interface',
        body: `Separating engine from client does not by itself protect the player: a debug view and a
          player view drawing from the same payload will eventually show something they should not. They
          are explicitly separate views over the state, and the player view is constrained to what that
          player legitimately knows.`,
      },
      {
        title: 'Knowing when to stop building the game',
        body: `The engine, its tests, the dialogue system and the first scenario were finished. Five
          further scenarios, the whole interactive client, voice and multiplayer were not. Rather than
          present a half-built game, the engine was pointed at a different outcome and shipped as a
          season. The unbuilt parts are listed below as unbuilt.`,
      },
    ],

    testing: [
      {
        title: '38 automated tests',
        body: 'Covering knowledge propagation, memory, relationship and debt mechanics, dialogue acts and save/load, runnable with a single command and no install.',
      },
      {
        title: 'Information-boundary assertion',
        body: 'An automated scan fails the suite if character-reasoning code touches hidden ground truth.',
      },
      {
        title: 'Seeded reproducibility',
        body: 'Any run reproduces exactly from its seed, which is what makes a regression in emergent behaviour detectable at all.',
      },
      {
        title: 'Balance measurement over many runs',
        body: 'Outcome rates measured across batches of seeded simulations rather than inferred from a few playthroughs.',
      },
    ],

    statusDetail: {
      built: [
        'Complete simulation engine with knowledge provenance, memory, relationships, debt, deception, goals and plans.',
        'First scenario fully playable through to a resolved outcome.',
        'Eight original characters with private knowledge and individual goals.',
        '38 passing automated tests including the information-boundary assertion.',
        'Save/load, local HTTP bridge, and separated player and developer views.',
        'Repurposed successfully as the story generator for a published ten-episode season.',
      ],
      notBuilt: [
        'Five of the six planned scenarios.',
        'The interactive game client — menus, rooms, interface and cameras. What exists is a presentation layer for the produced episodes.',
        'Voice, language-model-driven dialogue and multiplayer. All three were planned and none were started.',
      ],
    },

    future: [
      'Introduce a language model for dialogue surface only, with the information boundary extended to cover it and enforced by the same test.',
      'Build the remaining scenarios on the existing primitives.',
      'Publish the balance measurement harness, since the methodology is more broadly useful than the game.',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'course-pipeline',
    meta:
      'Thirty educational videos generated, fact-checked and published from source data, with narration verified automatically by speech recognition.',
    title: 'Automated course production pipeline',
    subtitle: 'Thirty educational videos built, fact-checked and published from source data',
    tagline:
      'A pipeline that turns a written lesson into a finished narrated video with charts, chapters, a thumbnail, a PDF worksheet, a vertical short and publication metadata — then verifies the narration against the script before it is allowed out.',
    category: 'AI Workflow Automation',
    featured: false,
    order: 7,
    status: STATUS.delivered,
    period: 'October 2026',
    role: 'Sole builder, writer and fact-checker',
    links: [
      { label: 'MCP LABS FOREX', url: 'https://www.youtube.com/@KidosExpertsTrading', note: 'Publishing channel' },
    ],
    oneLiner:
      'Thirty lessons and thirty shorts, all generated, verified and scheduled — and the most valuable part was catching my own charts teaching the wrong lesson.',

    metrics: [
      { label: 'Lessons produced', value: '30', note: 'Plus 30 vertical shorts' },
      { label: 'Runtime per lesson', value: '6:31 – 9:42', note: 'Verified per output' },
      { label: 'Artefacts per lesson', value: '6', note: 'Video, short, thumbnail, PDF sheet, metadata, chapters' },
      { label: 'Narration verification', value: 'Automated', note: 'Speech recognition against the written script' },
    ],

    overview: `A complete course had to be produced by one person: thirty lessons of eight to twelve
      minutes, each with narration, charts built from real market data, chapter markers, a question
      section, a thumbnail, a printable worksheet, a vertical short cut from the hook, and publication
      metadata.

      The pipeline makes a lesson a data file. A build command synthesises the narration, verifies it
      by speech recognition against the written script, renders the visuals, generates every secondary
      artefact and writes a finished folder. Thirty lessons went through it and were scheduled for
      release across ten weeks.`,

    problem: `Producing thirty videos by hand is roughly a month of full-time work and the thirtieth
      will not match the first. Consistency is the actual deliverable in a course — same voice, same
      visual language, same structure — and consistency is what a human doing repetitive work loses
      first.

      There is a second problem that turned out to matter more. This is educational material about
      financial risk. A chart that is technically accurate and pedagogically backwards does real harm
      to someone who believes it.`,

    solution: `A content pipeline with a verification stage, plus an editorial rule that every number
      is computed before it is written.

      Each lesson is a data file describing narration and visuals. Visuals are generated from real
      historical market data rather than drawn to illustrate a point, which means a chart cannot flatter
      the argument it is supporting. Narration is synthesised with a consistent local voice, and then —
      this is the stage that earns its place — transcribed back by speech recognition and compared to
      the source script, so a synthesis dropout or a wrong take is caught automatically rather than by
      someone watching all thirty videos.

      Publication is automated by driving the publishing interface directly rather than through the
      platform API, because an unverified API project forces every upload private, which would have
      made the automation useless.`,

    stack: [
      { group: 'Generation', items: ['Python', 'Kokoro TTS', 'Matplotlib-style chart generation', 'ffmpeg'] },
      { group: 'Verification', items: ['Speech recognition narration check', 'Duration and sync validation'] },
      { group: 'Data', items: ['Real historical market data', 'Computed figures only'] },
      { group: 'Publishing', items: ['Browser automation over the DevTools protocol', 'Idempotent upload state'] },
    ],

    diagram: 'course',

    responsibilities: [
      'Built the lesson build pipeline and every generator in it.',
      'Wrote and fact-checked all thirty lesson scripts.',
      'Built the narration verification stage.',
      'Built the publishing automation and the state tracking that makes it resumable.',
      'Caught and corrected the pedagogical and factual errors described below.',
    ],

    process: [
      {
        title: 'One lesson end to end first',
        body: 'A single lesson taken all the way to a finished folder before any attempt at thirty, which is what exposed the structural problems while they were cheap.',
      },
      {
        title: 'Compute every number before writing it',
        body: 'No figure goes into a script from memory or estimate. Each one is derived from the data first. This rule is why the two errors below were caught at all.',
      },
      {
        title: 'Verify narration automatically',
        body: 'Machine transcription against the source script. A human reviewer watching thirty videos for synthesis faults will miss some, and will be bored by lesson four.',
      },
      {
        title: 'Make publication resumable',
        body: 'Upload state is tracked so an interrupted run continues rather than duplicating. Thirty videos plus thirty shorts is too many for a process that cannot be restarted.',
      },
    ],

    challenges: [
      {
        title: 'A chart that was accurate and taught the opposite of the lesson',
        body: `The lesson was about position sizing. The chart plotted account balance over the same
          trade sequence at a high risk setting and a low one, and because the sequence was net
          profitable, the high-risk line finished higher. Every number on it was correct. What a viewer
          took from it was that more risk is better, which is the precise opposite of the lesson and
          genuinely dangerous advice.

          The fix was to change the measure: plot drawdown from peak instead of balance, so the chart
          shows what the risk setting actually costs you. Technically correct content can be pedagogically harmful, and that
          failure is invisible to any factual check — you only catch it by asking what someone would
          conclude, which is exactly the question content evaluation exists to ask.`,
      },
      {
        title: 'A figure I had estimated instead of computed',
        body: `A script cited a loss-streak figure that was roughly 60% off the real one, because it
          had been reasoned about rather than measured. It was caught by the compute-everything rule and
          corrected. Worth stating plainly because it is the ordinary failure mode of content work: the
          wrong number was plausible, nobody would have questioned it, and it was wrong.`,
      },
      {
        title: 'The platform API was the wrong tool',
        body: `The official publishing API locks uploads from unverified projects to private
          visibility, which would have meant manually publishing sixty items. Driving the publishing
          interface through browser automation was the approach that actually worked. It is more
          fragile, so the selectors are narrowly scoped, each item gets a fresh context, and the run
          confirms the published state rather than assuming it.`,
      },
      {
        title: 'Honest length over padded length',
        body: `Several lessons came in under the duration that unlocks extra advertising slots. Padding
          them was available and obvious. They shipped short, because padding a free lesson to earn a
          mid-roll is a tax on the student, and the course exists to be trusted.`,
      },
    ],

    testing: [
      {
        title: 'Automated narration verification',
        body: 'Speech recognition transcript compared against the source script for every lesson.',
      },
      {
        title: 'Narration-to-visual sync validation',
        body: 'Checked per lesson so a chart appears when it is being discussed, not thirty seconds later.',
      },
      {
        title: 'Figure derivation review',
        body: 'Every quoted number traced back to the data it came from before the script was accepted.',
      },
      {
        title: 'Artefact completeness check',
        body: 'Each finished lesson folder verified to contain all six required deliverables.',
      },
    ],

    statusDetail: {
      built: [
        'All thirty lessons built, verified and published on schedule across ten weeks.',
        'Thirty vertical shorts cut from the lesson hooks.',
        'Per-lesson thumbnail, PDF worksheet, chapter markers and publication metadata.',
        'Automated narration verification by speech recognition.',
        'Resumable publishing automation with tracked state.',
        'A structured course playlist with all thirty lessons in order.',
      ],
      notBuilt: [
        'Hosting for the PDF worksheets. The descriptions reference them and they need a stable home.',
        'Pinned question comments, which remain manual.',
        'The final case-study lesson, which should be rebuilt once more months of real data exist.',
        'Any measured learning outcome. I know the videos were produced and published; I do not claim they taught anyone anything.',
      ],
    },

    future: [
      'Add a pedagogical review stage to the pipeline — an explicit check on what a viewer would conclude, not only on whether the facts are right.',
      'Host the worksheets properly and link them from the descriptions.',
      'Rebuild the final lesson with a longer data window.',
      'Measure retention per lesson and feed it back into the structure.',
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
export const otherProjects = projects.filter((p) => !p.featured).sort((a, b) => a.order - b.order);
export const projectBySlug = (slug) => projects.find((p) => p.slug === slug);

export default projects;
