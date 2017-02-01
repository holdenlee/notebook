---
title: Alignment for advanced machine learning systems
published: 2017-02-01
modified: 2017-02-01
tags: ai safety, machine learning
type: paper
showTOC: True
---

[Article](https://intelligence.org/2016/07/27/alignment-machine-learning/)

> new agenda is intended to help more in scenarios where advanced AI is relatively near and relatively directly descended from contemporary ML techniques, while our agent foundations agenda is more agnostic about when and how advanced AI will be developed.

> Where the agent foundations agenda can be said to follow the principle "start with the least well-understood long-term AI safety problems, since those seem likely to require the most work and are the likeliest to seriously alter our understanding of the overall problem space," the concrete problems agenda follows the principle "start with the long-term AI safety problems that are most applicable to systems today, since those problems are the easiest to connect to existing work by the AI research community."

# Increasing safety by reducing autonomy

1. Inductive ambiguity identification: How can we train ML systems to detect and notify us of cases where the classification of test data is highly under-determined from the training data?
2. Robust human imitation: How can we design and train ML systems to effectively imitate humans who are engaged in complex and difficult tasks?
3. Informed oversight: How can we train a reinforcement learning system to take actions that aid an intelligent overseer, such as a human, in accurately assessing the system's performance?

Ambiguity identification helps:

> We could reduce risk somewhat by building systems that are still reasonably smart and autonomous, but will pause to consult operators in cases where their actions are especially high-risk. Ambiguity identification is one approach to fleshing out which scenarios are "high-risk"

vs. human imitation.

> In practice, however, ambiguity identification is probably too mild a restriction on its own, and strict human imitation probably isn't efficiently implementable. Informed oversight considers more moderate approaches to keeping humans in the loop.

# Increasing safety without reducing autonomy

4. Generalizable environmental goals: How can we create systems that robustly pursue goals defined in terms of the state of the environment, rather than defined directly in terms of their sensory data?
5. Conservative concepts: How can a classifier be trained to develop useful concepts that exclude highly atypical examples and edge cases?
6. Impact measures: What sorts of regularizers incentivize a system to pursue its goals with minimal side effects?
7. Mild optimization: How can we design systems that pursue their goals "without trying too hard"-stopping when the goal has been pretty well achieved, as opposed to expending further resources searching for ways to achieve the absolute optimum expected score?
8. Averting instrumental incentives: How can we design and train systems such that they robustly lack default incentives to manipulate and deceive their operators, compete for scarce resources, etc.?

> ambiguity-identifying learners are designed to predict potential ways they might run into edge cases and defer to human operators in those cases, conservative learners are designed to err in a safe direction in edge cases.

Ex. cooking the cat.
