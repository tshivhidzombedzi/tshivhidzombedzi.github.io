/**
 * The Verification page.
 *
 * This is the most important page on the site for his stated career targets (AI Quality
 * Rater, AI Evaluator, AI Trainer, AI QA Analyst). Those roles hire for one thing above all
 * others: whether a person can tell a correct result from a convincing one, and whether they
 * will say so when the convincing one is their own.
 *
 * Every case below is a real instance where he found the fault in his OWN work and reversed
 * his own conclusion. They are drawn from dated project records, not constructed for effect.
 */

export const verificationIntro = {
  claim: 'I verify my own results, and I retract them when the measurement was wrong.',
  body: `A portfolio can show what someone built. It is much harder to show how someone thinks
    when their own work turns out to be wrong, and for evaluation and quality roles that is the
    only thing that really matters.

    So this page is six cases where I was wrong. In each one the error was mine, the result
    looked good, nobody else would have caught it, and I threw the conclusion away. They are the
    clearest evidence I can give of how I work.`,
};

export const verificationCases = [
  {
    id: 'ohlc',
    title: 'I discarded a full day of my own results over one simulation setting',
    project: 'apex-drawdown-zero',
    projectLabel: 'Apex Drawdown Zero',
    discipline: 'Measurement validity',
    what: `A full session of parameter work — multiple sweeps, a measured frontier, several
      adoption decisions and two written analyses — had been run with the simulator interpolating
      prices inside one-minute bars instead of replaying real tick data.`,
    whyItMattered: `That setting is not a detail for this system. Its exits sit inside the bar:
      which of the stop, the partial close or the trailing stop is touched first within a minute
      decides the outcome. On interpolated data that ordering is guessed. Worse, the parameters
      adopted that day were adopted on top of each other, so each one inherited the doubt of the
      one before it.`,
    whatIDid: `Marked every figure from the session unverified in my own records, including the
      ones I liked, and queued a full re-run on real tick data. The rule is now absolute: real
      ticks, or it is not evidence.`,
    lesson: `The results were internally consistent, reproducible and wrong. Consistency is not
      validity. Before trusting any number, I now check what the measurement apparatus was
      actually doing — and I would rather lose a day's work than keep a conclusion I cannot
      defend.`,
    relevance:
      'Directly transferable: an evaluation run on the wrong data split, the wrong decode settings or a stale checkpoint produces exactly this failure, and looks exactly as convincing.',
  },

  {
    id: 'metric',
    title: 'The platform\'s own success metric was wrong, and trusting it would have cost me a real improvement',
    project: 'apex-drawdown-zero',
    projectLabel: 'Apex Drawdown Zero',
    discipline: 'Instrument validation',
    what: `The trading platform reports a trade count and a win rate. For my system both are
      inflated, because closing part of a position produces two separate records and the platform
      counts both — and the early partial close is a winner by construction.`,
    whyItMattered: `The change I was evaluating moved the platform's reported winner count DOWN
      while the true number of winning outcomes went UP. Reading the dashboard would have rejected
      a genuine improvement, and I would have had a plausible reason and no idea I was wrong.`,
    whatIDid: `Wrote a script that pairs records back into actual positions and measures outcomes
      per position. Every figure since is measured that way, and the discrepancy is documented so
      nobody — including me — reads the platform number again.`,
    lesson: `Validate the instrument before the hypothesis. A metric supplied by a tool is a
      measurement of something, and it is worth finding out exactly what before you let it decide
      anything.`,
    relevance:
      'The same failure as accepting a benchmark score without checking what it counts. Aggregate accuracy on a mislabelled set is a number, not a result.',
  },

  {
    id: 'chart',
    title: 'My own teaching chart was accurate and taught the opposite of the lesson',
    project: 'course-pipeline',
    projectLabel: 'Course production pipeline',
    discipline: 'Content evaluation',
    what: `A lesson on position sizing included a chart comparing account balance over the same
      trade sequence at a high risk setting and a low one. Because the sequence was net profitable,
      the high-risk line finished higher. Every data point was correct.`,
    whyItMattered: `The lesson was that lower risk is safer. The chart demonstrated that higher
      risk is more profitable. A viewer would take away the opposite of what the material was
      written to teach, and act on it with their own money. No fact-check would flag it, because
      there was no incorrect fact.`,
    whatIDid: `Changed what the chart measures: drawdown from peak instead of balance, which shows
      what the risk setting actually costs. Then added a review question to the pipeline — not "is
      this accurate" but "what would a viewer conclude from this".`,
    lesson: `The most dangerous content failure is not inaccuracy. It is accurate material that
      implies something false, and the only way to catch it is to evaluate the inference a reader
      will draw rather than the facts on the page.`,
    relevance:
      'This is exactly what AI content evaluation and quality rating is. Rating an output as correct because every sentence is defensible, while the whole answer misleads, is the central failure mode of the job.',
  },

  {
    id: 'falsepositive',
    title: 'My anti-abuse rule accused my two best customers',
    project: 'mcp-labs',
    projectLabel: 'MCP Labs',
    discipline: 'Testing against reality',
    what: `A licence-sharing detection rule flagged any single trading account appearing against
      more than one licence key. Run against production data it immediately flagged the two most
      valuable customers on the list.`,
    whyItMattered: `They had done nothing wrong. Each had bought three products and was running
      all of them on one account — the behaviour of an ideal customer. The rule was not buggy; the
      rule was wrong. And the test fixture passed happily, because the fixture encoded the same
      misunderstanding as the code.`,
    whatIDid: `Required more than one distinct user before anything is flagged, and made it
      standard practice to run any customer-affecting rule against production data before release.`,
    lesson: `A passing test tells you the code does what you wrote. It cannot tell you that what
      you wrote is the wrong rule. Fixtures inherit the author's assumptions, so a fixture-only
      test validates your reasoning against itself.`,
    relevance:
      'The false-positive cost here was commercial. In content moderation or safety classification it is the same mathematics with a human on the other end, which is why I treat real-data validation as mandatory rather than thorough.',
  },

  {
    id: 'carried',
    title: 'A change that produced more wins and lost money',
    project: 'apex-drawdown-zero',
    projectLabel: 'Apex Drawdown Zero',
    discipline: 'Resisting a good story',
    what: `My system skips a trading day when a position is held overnight, which looked like a
      large and obviously recoverable constraint — well over a hundred missed opportunities. I
      implemented the fix properly and verified the control reproduced the baseline exactly.`,
    whyItMattered: `It worked, in the sense that it did what it was designed to do: materially
      more trades and substantially more winners. It also made significantly less money and failed
      both halves of the split. The additional trades won at roughly half the base rate, because a
      day whose carried position has just closed is a day the move already happened.`,
    whatIDid: `Reverted it and recorded the reasoning at the relevant line of code, so a future
      version of me does not rediscover the same appealing idea. Three separate ideas in this
      product have now been tested, rejected, and re-rejected on a later attempt.`,
    lesson: `"More winners" is not "better". A change can succeed at its stated objective and
      still be a bad change, and a strong causal story is the easiest thing in the world to
      believe when it is your own.`,
    relevance:
      'The equivalent in ML is a change that improves the headline metric and degrades the thing the metric was standing in for. Keeping the rejections, with reasons, is what stops the cycle repeating.',
  },

  {
    id: 'cherrypick',
    title: 'I reproduced someone else\'s result faithfully, then tested the window they never showed',
    project: 'apex-drawdown-zero',
    projectLabel: 'Strategy research',
    discipline: 'Scope of evidence',
    what: `Rebuilding a published strategy from its author's own material, my results closely
      matched the figures they advertised — same returns, same drawdown, same win rate. The
      rebuild was faithful.`,
    whyItMattered: `Their figures covered a window of under two years. Running the identical
      implementation over the preceding three years gave a profit factor barely above break-even
      and more than double the drawdown, with two flat years. The strategy was not misrepresented
      so much as the evidence was: the window was the claim.`,
    whatIDid: `Recorded both periods together, so the favourable window can never be quoted
      without the unfavourable one beside it. Also noted that a high win rate on a strategy risking
      far more than it targets needs most of those wins just to break even — the win rate was doing
      persuasive work the arithmetic did not support.`,
    lesson: `Reproducing a result confirms the implementation, not the claim. The question is
      always what was excluded from the window, and a metric quoted without its denominator says
      very little.`,
    relevance:
      'Benchmark cherry-picking is the direct analogue. A model evaluated only on the tasks it was tuned for will look excellent, and the number will be perfectly real.',
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
    rule: 'Test against production reality, not only fixtures',
    body: 'A fixture encodes the author\'s assumptions. Anything that affects real people is exercised against real data first.',
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
