---
title: Concrete problems in AI safety
published: 2017-02-01
modified: 2017-04-01
tags: ai safety, machine learning
type: paper
showTOC: True
---

> Focus is on the empirical study of practical safety problems in modern machine learning systems, which we believe is likely to be robustly useful across a broad variety of potential risks, both short-and long-term.

Don't need to invoke extreme scenarios - which can be speculative and imprecise.

* Ready for experiment today, relevant to cutting edge AI
* Mitigating accident risk in terms of classic ML methods
* RL, broader environments suggest relevance of research
    1. RL
	2. Side effects more likely in complex environment; agent needs to be sophisticated to hack reward function dangerously.
	3. General trend towards autonomy. (ex. industrial processes)

Ex. cleaning robot

* Knock over vase to clean faster
* Disable vision, cover messes
* Throw out things unlikely to belong to anyone, put aside things that might belong to someone.
* Wet mop in outlet.
* Office vs. factory

# Wrong objective

* Bad even in presence of perfect learning and infinite data.

## Avoid negative side effects

* Specify an objective function that focuses on some task but ignores other aspects. Robot could engage in major disruptions for tiny advantage. 
* "Perform X subject to common-sense constraints/avoiding side effects."
* Expect to be negative on average because disrupt from status quo.
* Side effects conceptually similar - ex. knock over furniture

Approaches

* Impact regularizer.
    * Compare future state under current policy to passive policy (not straightforward to define).
	* Known safe but suboptimal policy
	* cf. reachability analysis, robust policy improvement
	* Sensitive to representation and metric (ex. spinning fan is constant?)
* Learn impact regularizer (over many tasks)
	* ex. of transfer learning
	* ex. avoid knocking over furniture.
	* cf. in model-based RL, transfer learned dynamics, not value function. Here, learn side effects, not dynamics.
* Penalize influence
	* Not get into positions to do things with side effects. (Ex. water into roomfull of sensitive electronics)
	* Info-theoretic measures. Empowerment: max $I$ between potential future actions and potential future state. Often maximized for reward (ex. pick up keys).
	* Empowerment measures precision of control more than total impact. Ex. cut electrical power. Someone scribbling down actions.
		* Perverse incentives: destroy vase to remove option to break.
* Multi-agent approaches. 
	* We care about avoiding negative externalities.	
	* Make sure actions don't harm other humans' interests.
	* CIRL: work together to achieve human's goals.
	* Reward autoencoder: goal transparency---infer what agent is trying to do.
* Reward uncertainty.
	* Environment is already good according to preferences; random change more likely to be bad.
	* Prior probability distribution reflects property that random changes more likely to be bad.
	* Baseline: conservative reliable policy.

Experiments

* Toy environment with simple goal (move block) and obstacles (vases). Can it avoid obstacles?

## Avoid reward hacking

* Admits clever easy (gamed) solution.
    * Ex. discover buffer overflow.
	* Ex. circuit keeping time pick up RF emissions of nearby PC. [157, 23]
	* Avoiding wireheading
	* Feedback in ML: ad placement based on counterfactual learning, contextual bandits
* Partially observed goals
	* Ex. imperfect view of cleanliness of office.
	* Rewards that represent partial or imperfect measure.
* Complicated systems
	* Probability of viable hack increases with complexity of agent.
* Abstract rewards
	* Neural nets vulnerable to adversarial examples.
* Goodhart's law
    * Correlation breaks down when objective function strongly optimized. (Learning causality?)
* Feedback loops
	* Component reinforces itself, distorts intention. Ex. enlarge ads.
* Environment embedding
	* Tamper with reward implementations.
	* (I'm not convinced this is a thing. Ex. I know that I could make myself eternally happy by wireheading, but I choose not to do it, because what I'm optimizing for is not the value in my happiness register.)
	* Concerning when human in reward loop.

Note: 

* In today's systems don't occur or can be corrected easily.
* Modern RL agents discover bugs. (Example?)
* Can be undetected.
* Once start hacking, hard to stop.
* Is remedy just to avoid choosing wrong objective? Fragile, wrong objective comes from general causes.

ML approaches

* Adversarial reward functions.
    * Reward function is own agent. Ex. find scenarios ML system claimed were high reward but human labels as low reward.
* Model lookahead
	* Reward on anticipated future states. (Ex. negative reward for replacing reward function.) (cf. my wireheading comment)
* Adversarial blinding
	* Ex. prevent from understand how reward is generated.
	* "Cross-validation for agents" [Ex. train without access to all info to get policy]
* Careful engineering
	* formal verification.
* Reward capping.
* Counterexample resistance: adversarial training.
* Multiple rewards. [cf. boosting, ensemble]
* Reward pretraining
	* Train fixed reward as supervised learning process divorced from interaction.
* Variable indifference
	* Route optimization pressure around parts of environment
	* Ex. w/o try to manipulate.
* Trip wires.
	* Introduce plausible vulnerabilities and monitor them.

Experiments

* Delusion box environments: distort perception to appear to receive high reward.
	
# Expensive objective function 

* Ex. consult a human.


## Scalable supervision

* Bad extrapolations from limited samples.
* If user spent a few hours, how happy would they be? 
* Actually use cheap approx: user happy when see office? Visible dirt?
* Limited calls to true objective with frequent calls to imperfect proxy. [When to call true objective?]
* Semi-supervised reinforcement learning
* Reward visible on random subset of timesteps.
* Incentivize communication and transparency. Ex. hiding mess breaks user reaction and real reward signal, so avoid it.

[Also explanations?]

Approaches

* Supervised reward learning: predict reward, with uncertainty estimate.
	* Many RL approaches fit estimators that resemble reward predictors.
* Semi-supervised or active reward learning: 
	* Combine with traditional
* Unsupervised value iteration (use observed transitions of unlabeled epsiodes to make Bellman updates)
* Unsupervised model learning

Ex. 

* play Atari with small number of direct reward signals (rely on visual display of score).
* ability to modify score
* take action to see score (pause)
* approximations (certain sounds)
* explicit reward requests.

More

* Distant supervision
    * Generalized expectation criteria (population-level statistics) [if you game, your statistics deviate?]
	* DeepDive: rules that generate weak labels [139]
	* see NLP
* Hierarchical reinforcement learning. 
	* Subagents
	* Top-level learn from sparse rewards.
	* Subagents dense reward signal.

Experiments

* Semisupervised in control environment: provide reward on 10% episodes.
* Atari games

# Undesirable behavior

* Make decisions from insufficient, poorly curated training data or insufficiently expressive model.

## Safe exploration

* Exploratory actions don't lead to negative/irrecoverable consequences.
* Common exploration policies make no attempt to avoid danger.
* In practice, hard-code, ex. collision avoidance sequence.
* Most well-studied.

Approaches

* Risk-sensitive performance criteria: change objective to include catastrophic events.
* Use demonstrations: inverse RL, apprenticeship learning
    * Reduce need for exploration by relying on small set of demonstrations
	* Baseline policy to default to, compare to.
* Simulated exploration
	* Explore in simulated environment to reduce opportunity for catastrophe.
	* Do safer things in real world than in catastrophe.
* Bounded exploration
	* Explore in space certified to be safe. Ex. reversible.
	* Ask whether action will take outside.
* Trusted policy oversight
	* Limit to actions the trusted policy believes we can recover from.
* Human oversight
	* Check potentially unsafe actions with human.
	* Requires scalable oversight.
	
Experiments 

Risk of catastrophes being idiosyncratic, overfit to. Need broad set of conceptually distinct pitfalls.

## Distributional shift

* Make bad decisions when given inputs very different.
* Key skill is recognizing own ignorance
* When testing differs from training distribution, ML systems may perform badly and assume their performance is good.

Approaches

* Well-specified models: covariate shift and marginal likelihood. Assume $p_0(y|x)=p^*(y|x)$. Use importance sampling; reweight $\fc{p^*(x)}{p_0(x)}$.
    * Alternative: assume well-specified model family - single optimal model predict under both $p_0,p^*$.
	* Generative model of distribution
	    * Fragile under model mis-specification.
* Partially specified models: method of moments, unsupervised risk estimation, causal identification, limited-information ML
	* Make assumptions on only some aspects of distribution.
	* Method of moments in econometrics, latent variable estimation
	* Model distribution of errors of a model. Unsupervised risk estimation.
* Train on multiple distributions
* How to respond when out-of-distribution
	* Ask humans for info.
	* Pinpoint aspects of uncertainty in model to ask about
	* In rich environments...
		* gather clarifying info (move closer to speaker)
		* engage in low-stakes experimentation when uncertainty high
		* Seek experiences that help expose to relevant distribution (ex. accents)
* Counterfactual reasoning and ML with contracts
	* Brittle contract in ML systems: only necessarily perform well if training=test.
	* Reachability analysis, model repair

Experiments

* System that knows when it is uncertain (calibrated)

# Related efforts

* Cyber-physical systems
* Futurist
* Open Letter
* Privacy, fairness, security, abuse, transparency, policy
