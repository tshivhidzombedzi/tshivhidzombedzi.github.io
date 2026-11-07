/**
 * "How it works" — the mechanism behind each project, explained properly.
 *
 * WHY THIS FILE EXISTS
 * A case study says what was built and what went wrong. It does not explain how the thing
 * actually functions, and that is the part a technically curious reader wants and the part
 * that demonstrates he understands his own systems rather than having assembled them.
 *
 * HOUSE STYLE — this is a launch explainer, not marketing copy
 * The temptation with a page like this is adjectives: revolutionary, cutting-edge, seamless,
 * game-changing. Every one of them makes the page weaker, because they are claims with nothing
 * behind them and a reader discounts them automatically.
 *
 * What makes a launch page genuinely compelling is the opposite: the specific mechanism, stated
 * plainly, with the surprising part named. "Zero delay, because it already knows the line
 * before it is spoken" is more impressive than "revolutionary real-time AI", and unlike the
 * adjective it survives being questioned in an interview.
 *
 * So: concrete mechanisms, short sentences, one genuinely interesting idea per project called
 * out as `hardPart`. No superlatives, no invented capability, nothing that is not already true
 * elsewhere on this site.
 */

export const howItWorks = {
  'hoshi-nova': {
    intro: `An episode goes in as text. A finished 4K film comes out the other end, with voices,
      lip-sync, camera work, a score and credits — and nobody touches it in between. Here is what
      happens in those few hours.`,
    steps: [
      {
        t: 'The episode is data, not a timeline',
        d: 'A video editor stores an episode as a timeline: a fixed arrangement of clips you edit by hand. This stores it as structured data — scenes, who speaks, what they say, where the camera sits, the mood of each beat. That single choice is what makes everything after it possible, because data can be regenerated, compared against a previous version and re-rendered. A timeline can only be edited.',
      },
      {
        t: 'Casting resolves to actual voices',
        d: 'Each character maps to a synthetic voice, and that mapping is configuration rather than a recording session. Changing who plays a part is a one-line change, not a day in a studio. Every line in the script is synthesised, and each character keeps the same voice for the whole episode.',
      },
      {
        t: 'The set is built by script',
        d: 'The 3D environment is constructed by code talking to the engine through its own Python interface — walls, props, lighting, camera positions. Because it is scripted, the same set rebuilds identically every time, and a change to the set is a change to a file rather than an afternoon of dragging objects around.',
      },
      {
        t: 'Performance is assembled from clips and shapes',
        d: 'Dialogue drives facial shapes for lip-sync. Body movement comes from a library of acting clips. The camera moves to marks defined in the episode data. This is the stage where a scene stops being a description and becomes something you can watch.',
      },
      {
        t: 'Render, then assemble',
        d: 'Frames are rendered at 3840x2160 and written to disk, then assembled with the synthesised dialogue, the score and the effects into a single file. This is the slow part — hours, not minutes — which is exactly why no human waits for it.',
      },
      {
        t: 'The gate decides whether it ships',
        d: 'Before anything is called finished it is measured: resolution, frame rate, programme loudness, and the narration transcribed back by speech recognition and compared to the script. Pass, and it is delivered. Fail, and the previous version stays and the new one does not go out.',
      },
    ],
    hardPart: {
      t: 'The interesting part: automating refusal, not just production',
      d: `Automating production is the easy half. Anything that generates output will happily
        generate bad output faster than a person could, and a pipeline reports success simply
        because a file exists at the expected path.

        The gate is what makes the automation trustworthy. It is also what caught the embarrassing
        one: an early season shipped with a "score" that was mathematically generated sound sitting
        so far down it was effectively inaudible. The pipeline reported success. The file existed.
        Existence is not a quality check, and that is the single idea the whole system is now built
        around.`,
    },
  },

  hoshidub: {
    intro: `Press one button and every character in a show starts speaking English, in their own
      voice, exactly on cue, with the music untouched. All of it runs on the machine in front of
      you. Here is how that is possible.`,
    steps: [
      {
        t: 'It reads the line before it is spoken',
        d: 'When a show has an official subtitle track, every line and its exact timing are known in advance. The application reads ahead instead of listening along, which is the whole trick: it is not reacting to speech, it is working from a schedule.',
      },
      {
        t: 'Each character gets a voice, and keeps it',
        d: 'Lines are assigned to distinct synthetic voices, and the assignment holds for the whole episode. A character who sounds different between scenes breaks the illusion faster than a wrong translation, so consistency is treated as a correctness property, not a nice-to-have.',
      },
      {
        t: 'Speech is synthesised ahead of its cue',
        d: 'Each line is generated before the moment it is needed and held ready. When the cue arrives the audio is already waiting, so it plays on time. The delay is zero by construction rather than by being fast.',
      },
      {
        t: 'Only the original voices step back',
        d: 'Most dubbing tools lower the whole soundtrack to make room, which costs you the score and the sound design — the things people actually watch anime for. Here the original dialogue is attenuated by about 15 dB while music and effects stay within roughly 2 dB of where they started.',
      },
      {
        t: 'Without subtitles, it listens instead',
        d: 'For a show with no subtitle track, the audio is transcribed and translated live. This path does lag, because nothing can transcribe a line before it is spoken — and the interface says so rather than pretending the two paths are the same.',
      },
      {
        t: 'A companion that cannot spoil the episode',
        d: 'A character in the side panel reacts to the episode and answers questions out loud. It is given only the portion of the episode that has already played, so when asked how it ends, it genuinely does not know.',
      },
    ],
    hardPart: {
      t: 'The interesting part: a guarantee, not a promise',
      d: `The obvious way to stop an AI companion spoiling a show is to tell it not to. That
        approach fails the first time somebody asks cleverly, because an instruction is something a
        model weighs rather than something it obeys.

        The approach here removes the capability instead. The information is not in its context at
        all, so there is nothing to leak and nothing to talk it out of. The difference between a
        policy and a guarantee is whether it still holds when someone is actively trying to break
        it — and that distinction is the single design decision in this product worth defending.`,
    },
  },

  'hoshi-live': {
    intro: `An animated character hosts a live session on her own. She reads the chat, answers
      it out loud, notices when the room goes quiet, reacts to what is playing on screen, and
      picks her own expressions. There is no control panel and nobody driving her.`,
    steps: [
      {
        t: 'Everything arrives as an event',
        d: 'A chat message, a stretch of silence, a scene change in the video on the set screen — all of it enters the system as the same kind of thing: an event with a timestamp. That uniformity is what lets one loop reason about all of them together.',
      },
      {
        t: 'A director loop makes the decisions',
        d: 'The loop decides whether an event deserves a response at all, what kind, and whether the better move is to change the subject instead. This is deliberately not the language model. The model is one input to the decision, the same as the silence timer, rather than the thing in charge.',
      },
      {
        t: 'The model proposes, a filter disposes',
        d: 'A language model running locally drafts what she might say. The default register of an instruction-tuned model is a polite assistant, which is precisely wrong for a live host, so a filter rejects assistant phrasing before it ever reaches speech. Personality is a constraint on style, not a long instruction asking the model to be fun.',
      },
      {
        t: 'She can see what is on screen',
        d: 'Audio from the video playing on the set is transcribed and scene cuts are detected, so her reactions correspond to something that actually happened rather than being invented. A host reacting to nothing is worse than a host saying nothing.',
      },
      {
        t: 'Voice, face and body',
        d: 'The line is spoken by a local synthesiser, drives the mouth, and is accompanied by an expression and a movement chosen for the moment. The character is rendered against a 3D set, in portrait or landscape.',
      },
      {
        t: 'The stop button existed before the start button',
        d: 'Emergency stop, moderation with a blocked-term list, and the ability to make the system forget a specific viewer were all built before there was any thought of an audience. A system that speaks in public unsupervised needs its controls first.',
      },
    ],
    hardPart: {
      t: 'The interesting part: a development convenience that became a lie',
      d: `Simulated chat existed so the director loop could be built without an audience. During a
        real session it displayed fabricated viewers on screen.

        It was not a bug. The feature worked exactly as written. It was a test harness that became
        dishonest the moment it was visible to real people. It is now off by default and reachable
        only through an explicit environment flag that no normal launch sets — because anything
        that fabricates data must be structurally impossible to leave switched on, not merely
        switched off.`,
    },
  },

  'friend-debt-engine': {
    intro: `Eight characters, each knowing different things, each with something to gain. They
      remember, they form plans, they lie, and they vote. Nothing about the outcome is scripted.
      Here is the machinery underneath.`,
    steps: [
      {
        t: 'Knowledge carries its own history',
        d: 'A character does not simply know a fact. They know it, from a particular source, learned at a particular moment. Modelling knowledge with that provenance is what makes rumour, mistaken belief and deliberate deception representable at all — without it, each one needs its own special case.',
      },
      {
        t: 'Characters want things and make plans',
        d: 'Each has goals and forms plans to reach them, which is where behaviour starts to look deliberate rather than random. A character who needs something from another behaves differently toward them, and that falls out of the model rather than being written.',
      },
      {
        t: 'Lying is just saying something you do not believe',
        d: 'Because belief is modelled separately from truth, deception needs no special machinery. A character can assert something their own knowledge contradicts. Other characters update on what they are told, not on what is true, so a lie propagates exactly like a fact.',
      },
      {
        t: 'An automated test guards the boundary',
        d: 'The hidden truth and what each character believes live next to each other in the same system, and one convenient line of code collapses the distinction. So a test scans the character-reasoning code for any access to hidden state and fails the build if it finds one. The honesty of the simulation is enforced, not remembered.',
      },
      {
        t: 'Everything is reproducible from a seed',
        d: 'All randomness goes through a single seeded generator, so any run can be replayed exactly. This is what makes it possible to measure balance across many runs and to detect when a change has altered emergent behaviour.',
      },
      {
        t: 'Two views of the same world',
        d: 'The player sees only what their character legitimately knows. A separate developer view shows everything. They are deliberately different payloads, because a single payload filtered at the interface eventually leaks.',
      },
    ],
    hardPart: {
      t: 'The interesting part: preventing accidental omniscience',
      d: `This is the central difficulty of the whole genre. Character reasoning needs rich access
        to what a character believes, and zero access to what is actually true. Get it wrong and
        every character becomes subtly all-knowing — they argue slightly too well and suspect the
        right person slightly too early. Nothing is broken, and the whole thing feels wrong in a
        way that is very hard to trace.

        It is the same class of control as keeping a model away from its own test set, and the
        only version that survives a late-night change is the one a test enforces.`,
    },
  },

  'portfolio-site': {
    intro: `This site has no framework, no dependencies and nothing to install. It builds in
      about fifty milliseconds and refuses to publish itself if anything is broken. Here is the
      whole machine.`,
    steps: [
      {
        t: 'Content lives as data, not markup',
        d: 'Projects, skills, education, the roadmap and the CV are plain data files. Changing what the site says never means touching a template, which is what makes it maintainable by someone who has not looked at it in a year.',
      },
      {
        t: 'A generator renders it to static HTML',
        d: 'A few hundred lines using only the Node standard library turn that data into finished pages. No framework runtime is sent to the browser, there are no web fonts, and the only JavaScript on the site is about ninety lines for the menu and the contents highlight.',
      },
      {
        t: 'Documents are written down to the file format',
        d: 'The CV is generated as WordprocessingML and zipped with the standard library, so it provably contains none of the structures applicant tracking systems mangle. The social share image comes from a PNG encoder written here, because the alternative was a headless browser for one image.',
      },
      {
        t: 'A gate measures the output',
        d: 'Sixteen rules run against the built site: every link and asset resolves, every anchor exists, each page has exactly one top-level heading, a description and a canonical URL, every image has alternative text, and no placeholder or unfilled template slot survives.',
      },
      {
        t: 'Nothing publishes unless it passes',
        d: 'The deployment workflow runs the gate before publishing. A failure stops the release, and the previously published version stays live. A broken build never becomes a broken site.',
      },
    ],
    hardPart: {
      t: 'The interesting part: checking what a check cannot see',
      d: `The generated share image passed every structural test — valid signature, correct
        header, correct dimensions, sensible file size — while silently failing to draw part of
        itself. A centring calculation produced a fractional coordinate, and writing to a
        fractional index in a byte buffer is ignored rather than throwing.

        No automated check would have caught it. Opening the file did. "The file is valid" and
        "the file is correct" are different questions, and only one of them is cheap to automate —
        which is the entire argument of this portfolio, demonstrated on the portfolio itself.`,
    },
  },
};

export default howItWorks;
