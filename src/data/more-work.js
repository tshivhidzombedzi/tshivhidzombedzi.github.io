/**
 * Smaller work — listed honestly, not inflated into case studies.
 *
 * WHY THIS IS A LIST AND NOT MORE CASE STUDIES
 * These are real and verifiable, but neither is substantial enough to carry twelve sections.
 * Writing a full case study about a prototype would stretch it, and a reader who notices that
 * discounts the six case studies that are genuinely load-bearing. A short honest list adds the
 * evidence without costing credibility.
 *
 * WHAT WAS EXCLUDED AND WHY
 * A desktop companion application has a detailed README on this machine but no verifiable
 * source alongside it, so it is not listed. If the code turns up, it can be added; a project
 * I cannot open is not a project this portfolio claims.
 *
 * Every entry below was checked on disk on 8 November 2026.
 */

export const moreWork = [
  {
    t: 'GPU fault diagnosis tooling',
    kind: 'Diagnostic tooling · PowerShell, Python',
    d: `A watchdog, a stress harness and a crash reporter written to trace a repeating
      display-driver failure on a render workstation. The watchdog samples GPU state to a
      timestamped log, the stress tool reproduces the condition on demand, and the reporter
      collects the system state at the moment of a hang.`,
    why: `It found a verified root cause instead of the usual cycle of reinstalling drivers and
      hoping. This is the most directly relevant thing here for IT support work: a real
      intermittent hardware fault, instrumented rather than guessed at.`,
    status: 'Used, and it did its job',
  },
  {
    t: 'PartDrop — dropship storefront prototype',
    kind: 'Web application · Node.js',
    d: `A shop that holds no stock. Product data and availability come from supplier feeds, a
      tiered markup is applied, and once an order is paid the admin view states exactly what to
      order and from which supplier. Includes a PC part-compatibility builder and an automated
      test suite covering pricing, compatibility, feed parsing and payment-signature
      verification.`,
    why: `The interesting part is the pricing engine: rules that have to hold simultaneously —
      tiered margin, a minimum profit after transaction fees, tax, and rounding — which is
      exactly the kind of logic that is quietly wrong until it is tested. So it has tests.`,
    status: 'Working prototype, sample data, payments simulated',
  },
];

export default moreWork;
