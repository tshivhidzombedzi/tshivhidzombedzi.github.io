/**
 * The Verification page.
 *
 * This is the most important page on the site for the stated career targets (AI Quality Rater,
 * AI Evaluator, AI Trainer, AI QA Analyst). Those roles hire for one thing above all: whether a
 * person can tell a correct result from a convincing one, and whether they will say so when the
 * convincing one is their own.
 *
 * ANONYMISED, 8 November 2026, at his instruction.
 * Every case below is a real, dated instance from his own records. What has been removed is the
 * identifying context: no product names, no domain, no business, no customers, no commercial or
 * sector detail. The methodology — which is the transferable part and the whole reason this page
 * exists — is unchanged.
 *
 * Nothing here is untrue. Context is withheld, not altered. He can describe any of these in full
 * in an interview if he chooses; the point is that the public page does not do it for him.
 *
 * MAINTENANCE RULE: do not reintroduce the domain of any of these cases. If a future edit makes
 * a case clearer by naming what it was about, that edit is wrong.
 */

export const verificationIntro = {
  claim: 'I verify my own results, and I retract them when the measurement was wrong.',
  body: `A portfolio can show what someone built. It is much harder to show how someone thinks
    when their own work turns out to be wrong, and for evaluation and quality roles that is the
    part that matters.

    So this page is six cases where I was wrong. In each one the error was mine, the result
    looked good, nobody else would have caught it, and I discarded the conclusion.

    These are described without the specifics of the systems they came from, which are private
    work. The reasoning is reported exactly as it happened.`,
};

export const verificationCases = [
  {
    id: 'simulation',
    title: 'I discarded a full day of my own results over one simulator setting',
    discipline: 'Measurement validity',
    what: `A full session of parameter work — several sweeps, a measured performance frontier and
      a set of adoption decisions — had been run with the simulator interpolating between recorded
      data points instead of replaying the real recorded series.`,
    whyItMattered: `For this system that is not a detail. Its behaviour depends on which of
      several conditions is met first inside a single interval, and on interpolated data that
      ordering is estimated rather than observed. Worse, the parameters adopted that day were
      adopted on top of one another, so each inherited the uncertainty of the one before it.`,
    whatIDid: `Marked every figure from the session unverified in my own records, including the
      ones I liked, and queued a full re-run against the real recorded data. The rule is now
      absolute: real recorded inputs, or it is not evidence.`,
    lesson: `The results were internally consistent, reproducible, and wrong. Consistency is not
      validity. Before trusting any number I now check what the measurement apparatus was actually
      doing, and I would rather lose a day's work than keep a conclusion I cannot defend.`,
    relevance:
      'Directly transferable: an evaluation run on the wrong data split, the wrong decoding settings or a stale checkpoint fails in exactly this way, and looks exactly as convincing.',
  },

  {
    id: 'metric',
    title: 'The built-in success metric was wrong, and trusting it would have cost me a real improvement',
    discipline: 'Instrument validation',
    what: `The platform I was working in reports a count of attempts and a success rate. For my
      system both were inflated, because completing an operation in two stages produces two
      separate records and the platform counts both — and the first stage succeeds by
      construction.`,
    whyItMattered: `The change I was evaluating moved the platform's reported success count DOWN
      while the true number of successful outcomes went UP. Reading the dashboard would have
      rejected a genuine improvement, and I would have had a plausible reason and no idea I was
      wrong.`,
    whatIDid: `Wrote a script that pairs the records back into whole outcomes and measures at that
      level. Every figure since has been measured that way, and the discrepancy is documented so
      that nobody — including me — reads the platform's own number again.`,
    lesson: `Validate the instrument before the hypothesis. A metric supplied by a tool measures
      something, and it is worth finding out exactly what before letting it decide anything.`,
    relevance:
      'The same failure as accepting a benchmark score without checking what it counts. Aggregate accuracy over a mislabelled set is a number, not a result.',
  },

  {
    id: 'chart',
    title: 'My own teaching material was accurate and taught the opposite of its lesson',
    discipline: 'Content evaluation',
    what: `An instructional video I produced included a chart comparing two configurations of the
      same system over the same sequence of events. Because that particular sequence happened to
      end favourably, the more aggressive configuration finished ahead. Every data point on the
      chart was correct.`,
    whyItMattered: `The lesson was that the conservative configuration is safer. The chart
      demonstrated that the aggressive one performs better. A viewer would take away the opposite
      of what the material was written to teach, and act on it. No fact-check would flag it,
      because there was no incorrect fact.`,
    whatIDid: `Changed what the chart measures — the worst decline from a peak, rather than the
      final value — so it shows what the aggressive configuration actually costs. Then added a
      review question to the production pipeline: not "is this accurate" but "what would a viewer
      conclude from this".`,
    lesson: `The most dangerous content failure is not inaccuracy. It is accurate material that
      implies something false, and the only way to catch it is to evaluate the inference a reader
      will draw rather than the facts on the page.`,
    relevance:
      'This is what AI content evaluation and quality rating consists of. Rating an output as correct because every sentence is defensible, while the answer as a whole misleads, is the central failure mode of the job.',
  },

  {
    id: 'falsepositive',
    title: 'My own misuse-detection rule flagged the most legitimate users',
    discipline: 'Testing against reality',
    what: `I wrote a rule to detect misuse of a system I had built. It flagged any single account
      appearing in more than one place at once. Run against real usage data for the first time, it
      immediately flagged the two most active legitimate users.`,
    whyItMattered: `They had done nothing wrong. Their usage pattern was exactly what a model user
      looks like for that system. The rule was not buggy — the rule was wrong. And the test fixture
      passed happily, because the fixture encoded the same misunderstanding as the code.`,
    whatIDid: `Added the missing condition, so that pattern alone is no longer sufficient to flag,
      and made it standard practice to run any rule affecting real people against real data before
      release.`,
    lesson: `A passing test tells you the code does what you wrote. It cannot tell you that what
      you wrote is the wrong rule. A fixture inherits the author's assumptions, so a fixture-only
      test validates your reasoning against itself.`,
    relevance:
      'In content moderation or safety classification this is the same mathematics with a person on the other end of the false positive, which is why I treat real-data validation as mandatory rather than thorough.',
  },

  {
    id: 'carried',
    title: 'A change that produced more successes and performed worse',
    discipline: 'Resisting a good story',
    what: `A scheduling constraint in one of my systems made it skip opportunities after a
      long-running operation. It looked like a large and obviously recoverable inefficiency — well
      over a hundred missed cases. I implemented the fix properly and verified that the control run
      reproduced the baseline exactly.`,
    whyItMattered: `It worked, in the sense that it did what it was designed to do: substantially
      more activity and substantially more successful outcomes. It also performed materially worse
      overall, and failed both halves of the held-out split. The additional cases succeeded at
      roughly half the base rate, because the conditions that made them available were the same
      conditions that made them poor candidates.`,
    whatIDid: `Reverted it, and recorded the reasoning at the relevant line of code so a future
      version of me does not rediscover the same appealing idea. Three separate ideas in that
      system have now been tested, rejected, and rejected again on a later attempt.`,
    lesson: `"More successes" is not "better". A change can succeed at its stated objective and
      still be a bad change, and a strong causal story is the easiest thing in the world to believe
      when it is your own.`,
    relevance:
      'The equivalent in machine learning is a change that improves the headline metric and degrades the thing the metric stands in for. Keeping the rejections, with reasons, is what stops the cycle repeating.',
  },

  {
    id: 'window',
    title: 'I reproduced a published result faithfully, then tested the period the author never showed',
    discipline: 'Scope of evidence',
    what: `Rebuilding a published method from its author's own material, my results closely matched
      the figures they advertised. The rebuild was faithful — same inputs, same behaviour, same
      headline numbers.`,
    whyItMattered: `Their figures covered a window of under two years. Running the identical
      implementation over the preceding three years produced a result barely above break-even,
      with more than double the worst-case decline and two flat years. The method was not
      misrepresented so much as the evidence was: the window was the claim.`,
    whatIDid: `Recorded both periods together, so the favourable window can never be quoted without
      the unfavourable one beside it. I also established that the headline success rate was doing
      persuasive work the underlying arithmetic did not support, given how much each failure cost
      relative to each success.`,
    lesson: `Reproducing a result confirms the implementation, not the claim. The question is
      always what was excluded from the window, and a success rate quoted without the cost of
      being wrong says very little.`,
    relevance:
      'Benchmark cherry-picking is the direct analogue. A model evaluated only on the tasks it was tuned for will look excellent, and every number will be perfectly real.',
  },
];

/** The practices those cases produced. Rendered as the page's conclusion. */
export const verificationPractices = [
  {
    rule: 'Validate the instrument before the hypothesis',
    body: 'Establish what the measurement actually counts before letting it decide anything.',
  },
  {
    rule: 'Hold out a split and require both halves to improve',
    body: 'Aggregate improvement hides overfitting. A change that improves the total while failing a half is a fitted result.',
  },
  {
    rule: 'Prefer a plateau to a peak',
    body: 'Adopt a value whose neighbours also pass. A setting that works only when its neighbours do not is more likely noise than a finding.',
  },
  {
    rule: 'Fix the sources of randomness',
    body: 'Seeded generation and fixed execution settings, or successive runs are not comparable and you are measuring noise.',
  },
  {
    rule: 'Test against reality, not only fixtures',
    body: "A fixture encodes the author's assumptions. Anything that affects real people is exercised against real data first.",
  },
  {
    rule: 'Evaluate the inference, not only the facts',
    body: 'Ask what a reader would conclude. Accurate material that implies something false is the failure no fact-check catches.',
  },
  {
    rule: 'Keep the rejections, with the evidence',
    body: 'Record what was tried and why it failed, at the place in the code where someone would try it again.',
  },
  {
    rule: 'State what is not verified',
    body: 'Unverified results stay labelled unverified, including the flattering ones.',
  },
];

export default verificationCases;
