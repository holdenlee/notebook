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

# Paper

Right kind of objective function (value specification), vs. avoid unintended consequences even with imperfect objective function (error tolerance)

Codify "without doing anything drastic."

Obstacles: values of humans hard to pin down, and intelligent system wants to ensure continued existence

Solutions must be applicable to advanced AI systems. Ignorance is an unsatisfactory solution.

Extreme guarantees: "after time t, make 0 significant mistakes."

Improving a system's capability may make it exploit loopholes and do less well in the sense we care about. (And hide it from the creator)

1. Know when past experience provides insufficient evidence to make a decision. 
	* Ex. distinguish between Soviet and US tanks - Soviet tanks were taken on sunny day.
	* Recognize underspecificity and query user
	* Cf. robustness to distributional change.
	* Bayesian approaches need the right variables (features).
	* Non-Bayesian approaches do not identify ambiguities.
	* Active learning: maintain plausible hypotheses, query to rule out
	* Disagreement coefficient: overall probability of disagreement in local ball
	* Active learning usually requires simple hypothesis class, or iid test samples.
	* Ex. Soviets respond by making tanks to fool algorithm
	* Conformal predictor: give set of plasuible classifications, contain true one about 95% of time.
	* KWIK (knows what it knows): query human finitely many times and makes 0 critical errors. Make classification only when all remaining plausible hypotheses agree.
	* Only known for simple hypothesis classes
	* Directions
		* Bayesian
		* Extend active learning beyond iid, and more complex hypothesis classes (NN)
		* Relax realizability
		* More efficient way to represent ambiguity than set of hypotheses
2. Robust Human Interaction
	* Ambiguity identification can help by limiting autonomy
	* Do what a trusted human would do.
	* How to define objective?
	* Related
		* Inverse RL. 
		* Max entropy criterion to convert to opt problem
		* May not scale because human demonstrators may not be optimizing value function (irrational).
	* Directions
		* Imitate human answers to questions (NLP).
		* GAN
		* VAE - can only imitate reversible algorithms
3. Informed oversight
	* do what a trusted human would approve given time to consider (approval directed)
	* But a human may have a hard time assessing behavior of even a simpler agent (ex. plagiarism easier to execute than detect)
	* Related
		* Active learning component
		* CIRL
		* cf. scalable oversight (when possibly deceptive)
		* Making more transparent: sparsity, gradients, influence...
		* Transparency by construction
		* Make robotics systems more transparent
	* Directions
		* Output action a and report r to help overseer evaluate. Ex. a is story
4. Generalizable environment goals
	* How to not incentivize self-fooling sensors?
	* Designing more elaborate sensors doesn't scale.
	* Instead learn environment goal
	* Related
		* Learn utility over world-states. Requires specifying (1) type of world-state, (2) prior over utilities, (3) Value-learning model relating utility functions, state transitions, and observations
		* Use reward perceptions as evidence of utility function rather than direct measure.
		* Reward hacking
		* Ex. (A) make sandwich vs. (B) print photo of one. (B): if move paper, then fails.
		* Delusion box
			* Take into account past leading up to state
			* Avoid large jumps in feature space?
5. Conservative concepts
	* AI system finds strange, undesirable edge case
	* Adversarial examples
	* Inverse RL
	* Generative adversarial modeling
	* Directions
		* Dimensionality reduction
		* Anomaly detection
		* What is a "conservative concept"?
6. Impact
	* Regularizer penalizing unnecessary large scale side effects but not intended side effects.
	* Related
		* Impact measure
		* Define null policy and state of world
		* Divergence between distribution and distribution of null policy. Use model-based RL
		* How to separate follow-on and unintended side effects?
	* Directions
		* Causal counterfactual: follow-on effects are causally downstream of goal
		* Query the operator
7. Mild
	* Related
		* Regularization
		* How to measure optimization?
		* Universal intelligence metrics
		* Empowerment metric
		* Early stopping is ad-hoc mild optimization
		* Satisfice reward rather than maximize. OK if find easy strategies before extreme ones.
		* Quantilization: select action randomly from top 1%. Justified by adversarial assumptions.
			* How to define measure over actions?
	* Directions
		* regularizer for intelligence
		* design environments with exploitable glitches
		* do not self-modify or outsource computation
8. Instrumental
	* Convergent instrumental objectives
	* Difficulty: "shut down if human wants it to shut down". Then make human not want to shut it down.
	* Uncertainty about goal
	* But if confidently wrong, would have instrumental incentives
	* Related
		* Specific designs vs. general solution?
	* Directions
		* Way of combine objective functions
			* No incentive to cause/prevent shift in objective function
			* Incentivized to preserve ability to update objective function
			* Reasonable beliefs about relation between actions and mechanism that causes objective function shifts.
		* Systems that know they are flawed.

<!--bit.ly/miri-ml-agenda-->

# Presentation

[Video](https://www.youtube.com/watch?v=TSe3p1zIvVI)

## 6 problems

1. Actions hard to evaluate. Ex. plagiarize, steganography. Informed insight
2. Ambiguous test examples. Ex. train on domestic cats. Wild cats?	
3. Imitate human behavior. Produce kind of picture a human would draw. GAN. Imitator vs. distinguisher. Does distinguisher have to be smarter than imitator? How to effectively imitate humans in complex/difficult tasks.
4. Difficulty specifying goals: make a sandwich. Reward hacking.
5. Negative side effect. 99.99999% chance. Avoid plans with high estimated impact, mild optimization, avert instrumental incentives (manipulate operators, compete for scarce resources).
6. Edge cases that still satisfy the goal

## Inductive ambiguity identification

* Draw many consistent models with data
* KWIK learning. At each step output w/i epsilon, or \perp.
* Problem: realizability, only for simple hyp classes
* Bayesian: Prior Q over mappings. P unknown ture prior. Perform some classification almost as well as if we already knew P. Assumption: $\forall f, Q(f)\ge \rc k P(f)$.

## Other research agenda

* Agent foundations: theoretical foundations, agnostic about specific form, logical induction
* Concrete problems in AI safety: empirically study as ML problems. Ex. RL act safely as explore environment.
