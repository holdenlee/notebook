---
title: RL references
published: 2016-10-25
modified: 2016-10-25
tags: reinforcement learning
type: paper
showTOC: True
---

# Online

* [Deep RL](https://github.com/andrewliao11/Deep-Reinforcement-Learning-Survey/blob/master/Reinforcement-Learning-Papers.md)
* ICML presentation (David Silver)
* [CASTLE Labs](http://castlelab.princeton.edu/)
    * [Optimal learning](http://optimallearning.princeton.edu/)
	* [Approximate dynamic programming](http://adp.princeton.edu/)
		* [Intros](http://adp.princeton.edu/adpIntros.htm)
	* [Unified framework](http://castlelab.princeton.edu/jungle.htm#unifiedframework)

# Books

[Quora recommendations](https://www.quora.com/What-are-the-best-books-about-reinforcement-learning)

* (\*) Sutto Barton. [**Notes**](rl.html)
* [Puterman14](https://books.google.com/books?id=VvBjBAAAQBAJ&printsec=frontcover&dq=continuous+markov+decision+processes&hl=en&sa=X&ved=0ahUKEwjo3OLywOnPAhVHWD4KHXzgDWUQ6AEIKTAC#v=onepage&q=continuous%20markov%20decision%20processes&f=false)
* [Approximate DP, Powell](http://site.ebrary.com/lib/princeton/reader.action?docID=10501323)
* [Optimal learning, Powell](http://site.ebrary.com/lib/princeton/detail.action?docID=10560566)
* [Function approximators, Lucian Busoniu, Robert Babuska, Bart De Schutter, and Damien Ernst](http://www.crcnetbase.com/isbn/9781439821091)
* [ADP chapter, Bertsekas](http://web.mit.edu/dimitrib/www/dpchapter.pdf)
* [Bertsekas87](https://books.google.com/books?id=-6RiQgAACAAJ&dq=Dynamic+Programming:+Deterministic+and+Stochastic+Models&hl=en&sa=X&ved=0ahUKEwjc0pfAyefPAhUGFz4KHaVIDecQ6AEIHjAA)

# Papers

## Theoretical frameworks and results

* (\*) [KMN02] A Sparse Sampling Algorithm for Near-Optimal Planning in Large Markov Decision Processes [paper](http://download.springer.com/static/pdf/530/art%253A10.1023%252FA%253A1017932429737.pdf?originUrl=http%3A%2F%2Flink.springer.com%2Farticle%2F10.1023%2FA%3A1017932429737&token2=exp=1477079019~acl=%2Fstatic%2Fpdf%2F530%2Fart%25253A10.1023%25252FA%25253A1017932429737.pdf%3ForiginUrl%3Dhttp%253A%252F%252Flink.springer.com%252Farticle%252F10.1023%252FA%253A1017932429737*~hmac=6c901205464aff209a8d3ca5ba481b36b72959a0d61fc762dfc512f12c01a38c)
	* PAC formulation
* [AAKMR02] A Note on the Representational Incompatibility of Function Approximation and Factored Dynamics.pdf
    * Barrier to solving factored MDP's is not just computational ([PT87]), it is representational (there is no succinct policy)
	* DBN-MDP (factored MDP): transition law $\de$ is dynamic Bayes net. The first layer are the variables (and action) at time $t$, the second layer are the variables at time $t+1$, the graph is directed, the indegree of each second-layer node is at most constant.
	* Rewards are linear.
	* Connection with AM-games: V's state corresponds to state, P implements policy.
	* If PSPACE is not contained in P/POLY, then there is a family of DBN-MDPs, such that for any two polynomials $s,a$, there exist infinitely many $n$ such that no circuit $C$ of size $s(n)$ can compute a policy having expected reward greater than $\rc{a(n)}$ times the optimum.
	* (This is the policy optimization part. Can you learn Bayes nets? @Andrej)
	* (Note that the "drifting context vector (RANDWALK)" model can be represented by a model with $1\to 1', 2\to 2',\ldots$.)
	* What if you only compared to the best policy in a class of policies? (cf. EXP4)

## MDPs

### Convergence of classic algorithms

* [PB79] On the convergence of policy iteration in stationary dynamic programming.pdf
	* Equivalent to Newton-Kantorovich iteration procedure applied to functional equation of dynamic programming.
	* Sufficient conditions for superlinear or quadratic convergence. See [Howard].
	* Note: Does NOT apply to finite state MDPs! (Problem being that "best action" is not continuous in parameters?)
* [SR04] Convergence properties of policy iteration.pdf
	* Compare to method of successive approximations. SA is bad when $\ga\approx 1$.
* [TVR96] An Analysis of Temporal-Difference Learning with Function Approximation [paper](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.92.92&rep=rep1&type=pdf)
	* $TD(\la)$ convergence
	* What is rate??
* [B95] Residual Algorithms: Reinforcement learning with function approximation [paper](https://books.google.com/books?hl=en&lr=&id=akijBQAAQBAJ&oi=fnd&pg=PA30&dq=baird+residual+algorithms+function+approximation&ots=MJ_Hs5vMBs&sig=RTG7KgQgM4GWWIwSvg1wOYRmJDc#v=onepage&q=baird%20residual%20algorithms%20function%20approximation&f=false)
	* Q-learning instability
* [WD92] Q-learning
	* Given bounded rewards, learning rates $0\le \al_n<1$, and $\sumo i{\iy} \al_{n^i(x,a)}=\iy$ ($n^i(x,a)$ is the $i$th time $a$ is tried in state $x$) then $Q_n\to Q^*$ wp 1.
	* Doesn't address: under what $Q$? What if updating policy at same time? What's regret?

### Theory algorithms

* (\*) [AO06] UCRL
	* Maintain confidence bounds on rewards and transition probabilities.
	* Only apply to unichain MDP's (where fixing an action, any other state is reachable - I think this is unrealistic. This is unreasonable - NO, WRONG DEFINITION).
	* Right definition in KS02: the stationary distribution of any policy does not depend on the start state (this is to make things easier, can do without)
	* Other work: adversarial reward, index policies (choose action with max return in confidence region)
* [LH12] PAC bounds for discounted MDPs [paper](https://arxiv.org/pdf/1202.3890.pdf)
	* UCRL, under assumption of 2 possible next-states for each state/action pair, PAC bound of $\wt O \pa{\fc{|S\times A|}{\ep^2(1-\ga)^3}\ln \prc{\de}}$.
* [KS02] Near-optimal reinforcement learning in polynomial time
* (\*) [JOA10] Near-optimal regret bounds for reinforcement learning [paper](http://www.jmlr.org/papers/volume11/jaksch10a/jaksch10a.pdf)
	* Improved UCRL (UCRL2)
* [KN09] Near-Bayesian Exploration in Polynomial Time [paper](http://www.zicokolter.com/wp-content/uploads/2015/10/kolter-icml09a-full.pdf)
* (\*) [KAL16] Contextual-MDP, which is contextual bandits + RL.
	* Regret wrt policy class. 
	* Poly in parameters, log in number of policies, independent of size of observation space. <!--what does no dependence on numspace can represent exact-best solution, state transition dynamics are deterministic.-->
	* Unlike POMDP, optimal policy is memoryless.
	* Warning: inefficient b/c requires enumeration of policy class. (? does this contradict the poly/log time above)
* [DPWR15] Bayesian Nonparametric Methods for Partially-Observable
Reinforcement Learning [paper](http://dspace.mit.edu/handle/1721.1/97034)
	* Bayes!

## Factored MDPs, MDPs with exponential state space

* [HSMM15] Off-policy Model-based Learning under Unknown Factored Dynamics.pdf
	* Under 3 assumptions, using a greedy approach to finding parents, estimate the transition function (parameters to Bayes net) (compre with prob models literature?)
	* This is for off-policy evaluation; it doesn't tell us how to find the optimal policy.
	* (Is the model learning and policy evaluation coupled or not?)
	* (It seems to be learning the Bayes net rather than evaluating $\pi$. Ah, once you learn the Bayes net then you can evaluate just by sampling.)
	* The difference from simpling learning a Bayes net is that the samples aren't independent---they were from following a certain policy. Assumptions will ensure that you can still learn the model even if you only have samples from that policy.

## POMDPs

* (\*) [ALA16] Reinforcement Learning of POMDPs using Spectral Methods
	* Spectral parameter estimation for POMDP's
	* Combine with UCRL (exploration-exploitation framework) to get regret bounds (compared to memoryless policies) optimal in dependence on $N$ ($O(\sqrt N)$)
	* Challenges
		* Unlike HMM, consecutive observations not conditionally independent
		* Technical: Concentration inequalities for dependent rv's. Extend to marix value functions.
	* Previous/other work
		* UCRL
		* model-free algorithms ($Q$-learning)
		* policy search methods
		* separate exploration and exploitation collect examples, then estimate parameters [Guo16]. PAC in RL POMDP?
	* Open: analyze UCRL for finite horizon.
	* Stochastic policies are near-optimal in many domains (?). NP-hard to optimize but under some conditions can approximate
* [ALA16] Open Problem - Approximate Planning of POMDPs in the class of Memoryless Policies (COLT2016)
	* Find exact or approximate optimal stochastic memoryless policy for POMDP.
	* What [ALA16] don't address in other paper: planning. (Complexity considerations? i.e. is this tractable? Kaelbling98)
	* In their paper they assume access to an optimization oracle that gives best memoryless planning policy at end of each episode. - No algorithm for this right now! <!--SoS? First check if you can reduce from Nash equilibrium, etc.-->
* [GDB16] A PAC RL algorithm for episodic POMDPs [paper](http://www.jmlr.org/proceedings/papers/v51/guo16b.pdf)
	* PAC: whp, selects near-optial action on all but a number of steps poly in problem paramters (what is the definition?)
	* PAC learns in time $T(\ep)$ means: achieves an expected episodic reward of $V\ge V^*-\ep$ on all but $T(\ep)$ episodes.
	* First PAC POMDP RL algorithm for episodic domains
	* EEPORL
		* Algorithm 1:
			* In each episode, take first four steps randomly (in correlated fashion) to explore. Need to assume that have probability of being anywhere in 2 steps.
			* Take chosen policy for the rest of the steps.
		* Algorithm 2: Update estimates for POMDP parameters.
		* Algorithm 3: Find best policy for current estimates of parameters.

## Open questions

* [S99] Open Theoretical Questions in Reinforcement Learning (not sure how open these are anymore!)
	* Control with function approximation
		* TD($\la$) understood [TsVR97]
		* Q-learning unstable [Baird95]
		* Sarsa ??? (tends to oscillate close to best)
	* MC ES convergence (see update in BS?)
	* Bootstrapping more efficient than MC?
	* VC dimension over RL
		* Difficulty: different actions lead to different parts of space, so we don't have a natural "test set" that can be reused to evaluate different policies (Test set seems like it would be drawn from different policies?)
		* Proposal: trajectory trees: tree of all sample transitions
		* Extend PAC to this setting.

## Surveys

* [G] Reinforcement learning - a Tutorial Survey and Recent Advances.pdf
* [KLM96] Reinforcement Learning - A Survey.pdf
* (\*) [P14] Clearing the Jungle of Stochastic Optimization
	* 4 classes of policies
	* Dynamic vs. stochastic programs
* [P14] Energy and Uncertainty - models and algorithms for complex energy systems.pdf
* (\*) [P16] A Unified Framework for Optimization under Uncertainty.pdf
* [lin function approximators](http://people.csail.mit.edu/agf/Files/13FTML-RLTutorial.pdf)
* [optimistic principle](https://hal.archives-ouvertes.fr/hal-00747575v5/document)
* [Algorithms for RL](http://www.morganclaypool.com/doi/abs/10.2200/S00268ED1V01Y201005AIM009)


