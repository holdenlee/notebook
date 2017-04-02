---
title: Alignment for advanced machine learning systems
published: 2017-04-01
modified: 2017-04-01
tags: ai safety, machine learning
type: paper
showTOC: True
---

See

* [Alignment](alignment_ml.html)
* [Concrete problems](concrete.html)

[Workflowy notes (private)](https://workflowy.com/#/4296816d1051)

# Inductive ambiguity

What's the problem with KWIK?

* Too restrictive - many things with small VC dimension can take exponentially many samples with KWIK. (In some sense this is necessary, cf. if only one example is 1.)
* Requires realizability.

## Formalization

Dimensions to vary

* Supervised, then test; vs. online/active
* How do you measure supervision? KWIK penalized by 1 for each time it asks user. We can e.g. instead be content with decaying rate of asking.

Filter class $F$ and hypothesis class $H$. Suppose there exists $f,h$ such that $fh(x)=y, 1-y, \perp$ with probability $p, 0, 1-p$. We want to find $\wh f\wh h$ with $\wh f \wh h(x)=y,1-y, \perp$ with probabilities $p+\ep, \ep', 1-p-\ep-\ep'$ with $\ep'\ll \ep$.

Neural net anomaly detection: 

* RBF
* only predict around points seen
* [HG17] A BASELINE FOR DETECTING MISCLASSIFIED AND OUT-OF-DISTRIBUTION EXAMPLES IN NEURAL NETWORKS

# Environment goals

2-3 levels of problem.

1. Human can evaluate/give accurate feedback.
2. Human can evaluate, but agent can prevent human from giving feedback.
3. Human cannot evaluate.

(Lump 2 and 3 together.)

## Level 1

This is easiest for formalize and tackle as a theory problem. Assume there is a distinguishing function (conservative concept?) that excludes all bad outcomes. 

Under human distribution of actions, reward given corresponds to value.

But after gaming (ex. realizing human only checks in 1 place to check room is clean), agent leaves human distribution of actions, and inferred/represented reward stops corresponding to value. Either from maintaining multiple hypothesis of reward function, or human feedback, it realizes this.

Going back and forth, can continuously improve. Can it generalize over human pushback?

Alternative: have separate agent/part of agent that acts as predictor - holds model of world, job is to predict, e.g., whether there's a strawberry.

Question: can't you just embed the "plagiarism" problem in here?

Maybe the problem considered here is more concrete: There's a better notion of what a strawberry/plate is than a good story. 

## Level 2

Note that "putting self in simulation" is a relative term. It means "fooling all its sensors." If it has a world-model, this means the harder task of fooling the world-model. (Think of world-model itself as a sensor system.) (Maybe the world-model asks for proofs?)

Why can't you just have a world model or adversarial predictor? Problem if there is no good evaluator.

This contains the conservative concept problem and the reward hacking problem. (I think.) Solving the informed oversight problem is sufficient.

* Conservative concept: a human non-evaluable task means that every hypothesis class we could train with human-curated data, we could not distinguish between the real and fake thing. There is impossibile without access to the agent's internal state. 
* Reward hacking: how not just to keep hitting reward button. Related to shutdown problem---preventing human from changing its reward, for instance.
* Informed oversight: give human a human-understandable transcript that would help make a decision about whether value achieved (ex. "I put myself in a simulation."). This is sufficient.

## Philosophy view

It is impossible to refer to the physical world. Our mapping from physical actions to mental representations is many-to-one; many ways of moving our arm all get translated into a mental story of "picking up the strawberry." There are many ways to execute this task. 

We only live in our own conceptual space. This space is highly bound/coupled to actual physics. (There's no glitch in the universe that if I move my arm in a specific way, Konami code, I shut down the universe.) Any way I move my arm is roughly the same.

The AI solves tasks within its own conceptual space. We can evaluate that the AI is doing the right thing insofar as it is transparent, we can look at its world model, point at the concept of "strawberry" and see that it's close enough to our own. We can solve "environmental goals" if the intersection of ontologies is nonempty, and the goal is within that intersection.


