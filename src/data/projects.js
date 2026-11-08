/**
 * Project case studies.
 *
 * RULES OBSERVED IN THIS FILE
 * 1. No fabricated metrics. Every number in `metrics` and `testing` was measured and
 *    recorded at the time, or read from a live page he publishes. Where a number is a
 *    backtest rather than a real-world outcome, it says so in the same sentence.
 * 2. No completed-feature claims for unfinished work. Each case study carries an explicit
 *    `notBuilt` list and that list is rendered on the page, not hidden.
 * 3. Private business activity is out of scope. No business, product, customer or sector
 *    detail from private commercial work appears anywhere in this file.
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
    keyPoints: [
      'Produced 20 episodes at verified 3840x2160, unattended, from structured data.',
      'An automated gate measures every delivered file and restores the previous version rather than shipping a failure.',
      'Found systemic animation defects by automated geometry scanning, after they had already passed human review.',
    ],
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
    keyPoints: [
      'A released Windows application with speech recognition, speech synthesis and a language model all running on the device in front of you.',
      'Zero dub latency achieved by scheduling against known cue times, not by faster inference.',
      'Spoiler safety enforced by what the model is given, not by what it is told.',
    ],
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
    // Added back on his instruction 2026-11-08. This is a live product page with pricing on
    // it, so it does reveal a commercial product — but not the trading work, which is what the
    // privacy scope was about. It is also the only public proof the application exists.
    links: [
      {
        label: 'hoshidub.com',
        url: 'https://hoshidub.com',
        note: 'The released application, publicly downloadable',
      },
    ],
    oneLiner:
      'A released Windows application built entirely on locally hosted speech and language models, with no network dependency at runtime.',

    metrics: [
      { label: 'Released version', value: '0.1.0', note: 'Windows 10 / 11, 115 MB installed' },
      { label: 'Models running locally', value: '3', note: 'Speech recognition, speech synthesis, language' },
      { label: 'Processing location', value: '100% on-device', note: 'No account, no upload, no video recording' },
      { label: 'Latency, primary path', value: '0 s', note: 'Achieved by scheduling, not faster inference' },
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
      'System design: the four hard constraints the application had to satisfy, fixed before any code was written.',
      'Architecture of the read-ahead synthesis scheduler that produces the zero-delay path.',
      'The dialogue-selective ducking approach that preserves music and effects.',
      'The spoiler-safety design for the companion, enforced structurally rather than by prompt.',
      'Privacy posture as an architecture decision: on-device processing, no recording, no account.',
      'Technical documentation and published support material.',
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
        body: 'The released version is labelled 0.1.0, with the GPU requirement stated up front rather than discovered after installation. Overstating the hardware story is how this class of application loses the users it has just acquired.',
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
      ],
      notBuilt: [
        'A hosted version for machines without a discrete GPU. Planned, not implemented.',
        'Spanish, Portuguese, Hindi and French. Planned; English is the only language implemented.',
        'Any adoption or usage figures. I have measured none, so I claim none.',
      ],
    },

    future: [
      'Implement the hosted path so the application works without a discrete GPU.',
      'Add the four planned languages using official subtitle tracks in each language.',
      'Publish measured latency and audio-separation figures, so the claims are checkable rather than asserted.',
      'Formal evaluation set for spoiler containment, scored rather than spot-tested.',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'hoshi-live',
    keyPoints: [
      'An AI presenter that runs a session unattended, deciding for itself when to speak and when to stay silent.',
      'Emergency stop, moderation and per-viewer data removal were built before any audience existed.',
      'Built and tested, but it has never run a real public broadcast, and this page says so throughout.',
    ],
    meta:
      'An AI presenter that hosts a stream unattended, reading chat, choosing topics and reacting to video. Built and tested, never broadcast live.',
    title: 'Project Luna',
    subtitle: 'Autonomous AI presenter and live-stream host',
    tagline:
      'A desktop application in which an animated AI character hosts a live stream unattended — reading chat, choosing topics, reacting to what is on screen and controlling her own performance, with no operator pressing buttons.',
    category: 'AI Systems & Agents',
    featured: true,
    order: 3,
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
    keyPoints: [
      'Eight agents reasoning over private knowledge, each fact carrying where it came from.',
      'An automated test fails the build if agent code reads the hidden truth it is meant to deduce.',
      '38 tests, fully deterministic from a seed, zero dependencies.',
    ],
    meta:
      'A dependency-free simulation of eight agents with private knowledge, and a test proving the reasoning code cannot read the hidden truth.',
    title: 'FRIEND//DEBT simulation engine',
    subtitle: 'Deterministic social-reasoning engine with an enforced information boundary',
    tagline:
      'A dependency-free simulation of eight characters who hold private knowledge, remember what they are told, track who owes whom, lie, and vote — with a test that proves the AI code cannot read the ground truth it is supposed to deduce.',
    category: 'AI Systems & Agents',
    featured: true,
    order: 4,
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
    slug: 'portfolio-site',
    keyPoints: [
      'A zero-dependency static site generator in Node: 16 pages, no framework, no web fonts, nothing to install.',
      'A verification gate of 16 rules that fails the build on a broken link, a missing heading or an unfilled template slot.',
      'An ATS-safe .docx written directly as WordprocessingML, and a share image from a hand-rolled PNG encoder — standard library only.',
    ],
    meta:
      'A zero-dependency static site generator with a verification gate, an ATS-safe .docx writer and a hand-rolled PNG encoder, standard library only.',
    title: 'This portfolio',
    subtitle: 'Zero-dependency static site generator and publishing toolchain',
    tagline:
      'The site you are reading, and the tooling behind it: a generator with no dependencies, a build that refuses to publish broken output, and document generation written down to the file format.',
    category: 'Web Engineering & Tooling',
    featured: true,
    order: 5,
    status: STATUS.built,
    period: 'November 2026',
    role: 'Sole designer, builder and author',
    links: [],
    oneLiner:
      'The one project here you can inspect completely — the source, the build, the gate and the output are all in front of you.',

    metrics: [
      { label: 'Runtime dependencies', value: '0', note: 'Nothing to install, builds offline' },
      { label: 'Pages generated', value: '16', note: 'From plain data files' },
      { label: 'Build time', value: '~50 ms', note: 'Measured over repeated runs' },
      { label: 'Verification rules', value: '16', note: 'Any failure fails the build' },
    ],

    overview: `This site is produced by a build system I wrote, with no framework and no
      dependencies at all. Content lives in plain data files, a generator turns them into static
      HTML, a verification step measures the output, and only if that passes does anything get
      published.

      It is included as a case study for one reason: it is the only project here a reader can
      check completely. Every other case study asks you to take my word for how something was
      built. This one is the thing you are looking at.`,

    problem: `A portfolio has to be fast, accessible, discoverable, cheap to host, and still easy
      to change in a year when I have forgotten how it works. The conventional answer is a
      framework, which brings several hundred megabytes of dependencies, a required install step,
      and a toolchain I did not choose and could not fully explain.

      There is a second problem specific to this site. Its whole argument is that I verify my own
      work before claiming it. A portfolio making that claim while shipping broken links or
      missing headings would refute itself on contact.`,

    solution: `A generator of a few hundred lines using only the Node standard library. Output is
      plain HTML, CSS and JavaScript, so it deploys by copying a folder and will still build in
      five years.

      The part that matters is the gate. A separate program walks the built output and checks
      sixteen rules: every internal link and asset resolves, every in-page anchor exists, each
      page has exactly one top-level heading and a description and a canonical URL, every image
      carries alternative text, no external link opens without the right rel attribute, and no
      placeholder marker or unfilled template slot survives. It exits non-zero on any failure,
      and the deployment workflow runs it before publishing, so a failed check leaves the
      previous version live.

      Two smaller pieces were written down to the file format rather than pulled from a library.
      The CV is generated as WordprocessingML and zipped with the standard library, so it
      contains exactly the markup I wrote and provably none of the structures that applicant
      tracking systems mangle. The social share image comes from a PNG encoder written here,
      because the alternative was a headless browser for one 1200x630 file.`,

    stack: [
      { group: 'Generator', items: ['Node.js', 'JavaScript (ESM)', 'Template literals', 'No framework'] },
      { group: 'Output', items: ['Static HTML', 'One CSS file', 'About 90 lines of JavaScript'] },
      { group: 'Documents', items: ['WordprocessingML', 'ZIP via zlib', 'Print stylesheet for PDF'] },
      { group: 'Images', items: ['Hand-written PNG encoder', 'Inline SVG diagrams'] },
      { group: 'Delivery', items: ['GitHub Actions', 'GitHub Pages', 'Gate before deploy'] },
    ],

    diagram: 'portfolio',

    responsibilities: [
      'Designed and wrote the generator, the preview server and the verification gate.',
      'Designed the visual system: tokens, type scale, layout, responsive behaviour and print styles.',
      'Wrote every word of the content, and the editorial rules that govern what may appear.',
      'Wrote the .docx generator against the WordprocessingML format directly.',
      'Wrote the PNG encoder that produces the social share image.',
      'Set up continuous deployment with verification as a release gate.',
      'Audited the repository for secrets before publication, and rewrote history when one was found.',
    ],

    process: [
      {
        title: 'Content as data, not markup',
        body: 'Every page is generated from plain data files. Changing a project, a skill or a roadmap step never means touching a template, which is what keeps the site maintainable by someone who has not looked at it for a year.',
      },
      {
        title: 'Write the gate early',
        body: 'The verification step was built before most of the content. It has since caught a broken link, a duplicate heading, several over-long meta descriptions and a skipped heading level — all of which I would otherwise have shipped.',
      },
      {
        title: 'Look at the output, do not only test it',
        body: 'The PNG encoder passed every structural check while silently failing to draw part of the image. Opening the file was the only thing that found it.',
      },
      {
        title: 'Audit before publishing, not after',
        body: 'The repository was scanned for credentials before it was ever pushed. Publishing is irreversible in practice: a secret in a public history is already compromised.',
      },
    ],

    challenges: [
      {
        title: 'A bug that no structural test could catch',
        body: `The generated share image passed everything: valid signature, correct header,
          correct dimensions, sensible file size. Opening it showed an empty box where a monogram
          should have been. The cause was that a centring calculation produced a fractional
          coordinate, and writing to a fractional index in a byte buffer is silently ignored
          rather than throwing. The fix was one line. The lesson was that "the file is valid" and
          "the file is correct" are different questions, and only one of them is cheap to
          automate.`,
      },
      {
        title: 'A checker that cried wolf',
        body: `The gate scanned for leftover placeholder text without regard to case. The CV page
          legitimately contains the phrase "leftover placeholder text", describing this very
          feature, so the build failed on correct content. The tempting fix is an exception for
          that page. The right fix was to tighten the rule, since real markers are written in
          capitals — because a checker that produces false positives is one people learn to
          ignore, which is worse than having no checker at all.`,
      },
      {
        title: 'Root-relative links break on a subpath',
        body: `Every internal link here is root-relative, which is correct at the root of a domain
          and completely broken when the site is served from a subpath, as a project-level
          GitHub Pages site is. The usual symptom is an entirely unstyled page. Rather than add a
          separate setting that has to be kept in sync, the base path is derived from the
          configured site URL, so canonical URLs, the sitemap and in-page links all follow from
          one value.`,
      },
      {
        title: 'Credentials in a file that was about to be published',
        body: `A pre-publication scan found a live server username, host, port and key filename
          sitting in the deployment guide. Removing them in a later commit would not have been
          enough, because the earlier commit still carried them in history and anyone could read
          it. The history was rewritten before anything was pushed, and the result verified by
          searching the entire history for the strings rather than assuming.`,
      },
    ],

    testing: [
      {
        title: 'Sixteen automated rules, enforced as a release gate',
        body: 'Links, assets, anchors, headings, titles, descriptions, canonical URLs, image alternative text, link rel attributes, placeholder markers and template slots. Non-zero exit on any failure, run before every deployment.',
      },
      {
        title: 'Responsive behaviour verified by measurement',
        body: 'Checked at desktop and mobile widths, with horizontal overflow measured in the browser rather than judged by eye.',
      },
      {
        title: 'Behaviour verified, not assumed',
        body: 'The mobile menu was confirmed to toggle both its ARIA state and its visibility by reading them directly, after a screenshot had made it look as though it had not worked.',
      },
      {
        title: 'Document structure validated',
        body: 'The generated .docx is opened as a ZIP, every XML part parsed, and the absence of tables, text boxes, drawings and column definitions confirmed by counting them.',
      },
    ],

    statusDetail: {
      built: [
        'Full static site generator with content, templates, diagrams and a local preview server.',
        'Verification gate of sixteen rules, wired into continuous deployment.',
        'ATS-safe .docx generator written directly against the WordprocessingML format.',
        'PNG encoder for the social share image, standard library only.',
        'Subpath-aware builds, so the same source deploys to a root domain or a project subpath.',
        'Accessibility fundamentals, and a print stylesheet that produces a clean PDF of the CV.',
      ],
      notBuilt: [
        'It is not published yet. The repository is local and the site has not been deployed, which is why this page carries no live link.',
        'No automated accessibility audit. Accessibility was built in deliberately and checked by hand, but nothing in the gate enforces it.',
        'No automated tests for the generator itself. The gate tests the output, not the code that produced it.',
        'No image optimisation pipeline, because the site currently has almost no images.',
      ],
    },

    future: [
      'Publish it. Until that is done it is the only item on this list that matters.',
      'Add an automated accessibility check to the gate, so accessibility is enforced rather than remembered.',
      'Add unit tests for the generator itself, not only checks on its output.',
      'Record page weight over time, so a size regression becomes visible rather than discovered.',
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
export const otherProjects = projects.filter((p) => !p.featured).sort((a, b) => a.order - b.order);
export const projectBySlug = (slug) => projects.find((p) => p.slug === slug);

export default projects;
