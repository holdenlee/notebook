---
title: Technical agenda
published: 2016-08-19
modified: 2016-08-19
tags: ai safety
type: notes
showTOC: True
---

[SF14] Agent Foundations for Aligning Machine Intelligence with Human Interests:
A Technical Research Agenda

# Intro

1. How can we create an agent that will reliably pursue the goals it is given? (Find an agent architecture to reliably and autonomously pursue a set of objectives.)
2. How can we formally specify beneficial goals?  
3. And how can we ensure that this agent will assist and cooperate with its programmers as they improve its design, given that mistakes in early AI systems are inevitable?

Make tolerant of human error.

Value learning: how to construct agents that learn what to value?

There are theoretical prerequisits for designing aligned AI above what is require to design misaligned AI.

Topics that are tractable, uncrowded, focused, unable to be outsourced (to machines).

# Highly reliable agent designs

It's not sufficient to verify the algorithm behaves well in test settings.

Ex. Bird and Layzell (2002) describe a genetic algorithm
which, tasked with making an oscillator, re-purposed
the printed circuit board tracks on the motherboard
as a makeshift radio to amplify oscillating signals from
nearby computers.

Ex. Chess: Trees and backtracking do not immediately yield a solution but they are the conceptual tools; you need them before you can make heuristics work.

In safety-critical applications, it is crucial that theoretical insights come first.

## Realistic world models

What is the set of/distribution over possible realities? How are agents scored?

Solomonoff induction (agent predicts, does not affect)

1. Computable environment.
2. Evaluated by simplicity
3. Scored by ability to predict next observation.

Legg and Hutter define universal measure of intelligence, but high-scoring agents may manipulate the reward function.

**Naturalized induction**: But what about an agent learning about environment when embedded within it?

Hutter, **interaction problem**: agent learns and acts upon environment. Maximize reward function.

Human goals are specified in terms of high-level notions.

**Ontology identification** (?)

## Decision theory (w/ game theory)

What does it mean for a decision to be good?

How to construct the **counterfactual** environment?

Ex. different agents logically constrained to behave identically.

Standard causal reasoning identifies "defection" as the best strategy.

**Logical counterfactuals** problem.

Updateless decision theory, Wei Dai.

Check out: Model with Haskell implementation of multi-agent games where agents have access to each others' source code and base decisions on what they can prove. Possible to achieve robust cooperation while remaining unexploitable.

## Logical uncertainty

Knowing the machine/system exactly but not knowing the action/result. ex. reasoning about environment.

What are logically **impossible possibilities**? (???)

How can probabilities be assigned to sentences? Preserving all logical implications requires the system to be deductively omnipotent.

A coherent assignment of probabilities corresponds to a probability distribution over complete, consistent logical theories.

Start with rough approximation of prior and refine.

**Logical priors**: What is a satisfactory set of priors over logical sentences that a bounded reasoner can approximate?

## Vingean reflection

Humans may specify generally intelligent systems that then create superintelligence.

A self-modifying agent (or any that constructs new
agents more intelligent than itself) must reason about
the behavior of a system that is more intelligent than
the reasoner.

Vingean principle: a parent agent cannot simply check
what its successor agent would do in all scenarios, for
if it could, then it would already know what actions its
successor will take, and the successor would not in any
way be smarter. (So it must reason abstractly.)

Study first in the domain of formal logic.

**Lobian obstacle**: How can agents gain very high confidence in agents that use similar reasoning system avoiding self-reference paradoxes?

(Carry over into probabilistic logics.)

# Error-tolerant agent designs

Intelligent systems must be amenable to correction.

Design agents which do not have incentives to escape, manipulate, or deceive. **corrigibility**

Ex. moral uncertainty frameworks still incentivize agents not to change the moral framework if it's flawed.

Toy problem: Shut-down problem: don't incentivize the agent to cause or prevent pressing the button.

**Utility indifference**. Make agents switch preferences on demand without having incentives to cause/prevent switching.

**Domesticity**. Incentivize low impact.

# Value specification

Not sufficient to construct systems smart enough to figure out intended goals.

**Multi-level world-models**

Complexities of value: ex. happiness is not smiling humans.

**Ambiguity identification**: Identify dimensions neglected by training data.

**Operator modeling**

**Normative uncertainty**: What to do when uncertain about what one should do?

# Discussion

Why progress can be made today?
