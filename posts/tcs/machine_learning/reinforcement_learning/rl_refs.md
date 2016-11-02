---
title: RL references
published: 2016-10-25
modified: 2016-11-01
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
	* Poly in parameters, log in number of policies, independent of size of observation space. $\poly(M, K, H, \ep, \ln N, \ln \prc\de)$ <!--what does no dependence on numspace can represent exact-best solution, state transition dynamics are deterministic.-->
	* Unlike POMDP, optimal policy is memoryless. (Definition is just this. For simplicity, consider layered POMDP's.)
		* Ex. Disjoint contexts. Don't know which observations correspond to which contexts! (Q: for HMM with "too many" observations what can we do?)
	* Warning: inefficient b/c requires enumeration of policy class. (? does this contradict the poly/log time above)
	* Assumptions
		* $Q$ is realizable within the function class. (WHY doesn't this work in the agnostic case?)
		* Deterministic transitions
	* Algorithm (cMDP-learn)
		* DFS-learn
			* TD-elim: eliminate functions that do not approximate $Q^*$ well (that do significantly worse than the best approximator so far)
			* Consensus: Compute MC estimates for the observable in the current state (run a lot of episodes, using the same actions up to the current point; because the system is deterministic the state is the same). If they are all close in value, return true, else return false.
		* Explore-on-demand
			* Select a surviving policy, estimate $V$ at root; if highly suboptimal value, invoke DFS-learn on paths visited by $\pi_f$.
	* Idea: if a surviving policy $\pi_f$ visits only states for which TD-Elim has been invoked, it must have near-optimal reward.
	* Undesirables
		* Deterministic transition
		* Enumerate class of regression functions
		* Realizability assumptions
* [DPWR15] Bayesian Nonparametric Methods for Partially-Observable
Reinforcement Learning [paper](http://dspace.mit.edu/handle/1721.1/97034)
	* Bayes!

## Factored MDPs, MDPs with exponential/continuous state space

* [HSMM15] Off-policy Model-based Learning under Unknown Factored Dynamics.pdf
	* Under 3 assumptions, using a greedy approach to finding parents, estimate the transition function (parameters to Bayes net) (compre with prob models literature?)
	* This is for off-policy evaluation; it doesn't tell us how to find the optimal policy.
	* (Is the model learning and policy evaluation coupled or not?)
	* (It seems to be learning the Bayes net rather than evaluating $\pi$. Ah, once you learn the Bayes net then you can evaluate just by sampling.)
	* The difference from simpling learning a Bayes net is that the samples aren't independent---they were from following a certain policy. Assumptions will ensure that you can still learn the model even if you only have samples from that policy.
* [EGW05] Tree-Based Batch Mode Reinforcement Learning
	* Introduced fitted Q-iteration (see below).
* (\*) [AMS08] Fitted Q-iteration in continuous action-space MDPs
	* Fitted Q-iteration: Given a simulator, sample next actions $s'$ given $s,a$. Given $Q^{n}$, approximate $Q^{n+1}$ with these samples, then approximate $Q^{n+1}$ as $Q(s,a)=\te^T\phi(s,a)$. Use least squares: LSFQI. Then pick best $\wh \pi_{n+1}$ using the approximation of $Q^{n+1}$.
	* Space of functions can be neural networks, linear combination of selected basis functions, restriction of RKHS (cf. LS-SVM).
	* Warning: it's not just the pseudo-dimension  (related to VC dimension) of the function class $\mathcal F$ that matters, but that of $\mathcal F_{\max}^{\wedge} = \set{\max_{a\in A} Q(x,a)}{Q\in \mathcal F}$. (Actually, use the notion of [fat shattering functions](http://ttic.uchicago.edu/~tewari/lectures/lecture16.pdf).)
	* Also called "fitted actor-critic algorithm".
	* Under many assumptions, the error in $V$ can be bounded in terms of the pseudo-dimension of the function class $\mathcal F$.
* [FDMW04] Dynamic Programming for Structured Continuous Markov Decision Problems [paper](https://arxiv.org/ftp/arxiv/papers/1207/1207.4115.pdf)
	* Group together states belonging to the same "plateau" where expected reward is nearly constant.
	* Use kd-trees to store the rectangular partitions.
* [HK03] Linear Program Approximations for Factored Continuous-State Markov Decision Processes [paper](http://machinelearning.wustl.edu/mlpapers/paper_files/NIPS2003_CN19.pdf)
	*   2 settings
		* Factored MDP's: approximate $V$ within a class of functions $\spn(\{f_i\})$. (Ex. each $f_i$ depends on a small subset of variables.) Here, minimize $\sum w_i \sum_x f_i(x)$ over all $f$'s that overestimate the reward: $\sum_i w_i(f_i - \ga \sum_{x_i'} \Pj(x_i'|x_i, a)f_i(x_i'))-R(x,a)\ge 0$ forall $x,a$.
			* Problem: infinite number of constraints. Insight: only a finite subset are active at any time.
		* Continuous MDP's. Consider conjugate classes of transition models and basis functions that give closed-form expressions.
* [LL05] Lazy Approximation for Solving Continuous Finite-Horizon MDPs [paper](http://www.aaai.org/Papers/AAAI/2005/AAAI05-186.pdf)
	*   In value iteration 
	    $$V^{n+1}(x) = \max_{a\in A} \ba{R(x,a) + \int_X T(x'|x,a)V^n(x')\dx'}$$
		replace $V^n$ with a piecewise constant approximation. (Otherwise it becomes a piecewise higher order polynomial.)
* [MTT] A Fast Analytical Algorithm for MDPs with Continuous State Spaces [paper](http://www.sci.brooklyn.cuny.edu/~parsons/events/gtdt/gtdt06/marecki.pdf)
	*   Focuses on MDP's where the transition time (after an action) is governed by a exponential pdf $\la e^{-\la t'}$.
* [TS06] Probabilistic Inference for Solving Discrete and Continuous State Markov Decision Processes [paper](http://machinelearning.wustl.edu/mlpapers/paper_files/icml2006_ToussaintS06.pdf)
	* The problem of solving a MDP (with decay $\ga$) can be reduced to max likelihood estimation. (It is over a mixture of finite-time MDP's, weighted geometrically in $\ga$ in the length.)
	* Now use EM to maximize the likelihood.
* [Lecture notes](https://www.cs.utah.edu/~piyush/teaching/continuous-mdp.pdf)
	* Discretization
	* Fitted value iteration: Given a simulator, sample next actions $s'$ given $s,a$. Given $V^{n}$, approximate $V^{n+1}$ with these samples, then approximate $V^{n+1}$ as $V(s)=\te^T\phi(s)$ (ex. using least squares).
	* Can be extended to least-squares policy iteration.
* [tutorial](http://burlap.cs.brown.edu/tutorials/scd/p1.html)
* [google scholar search](https://scholar.google.com/scholar?hl=en&q=mdp+with+continuous+state+space)

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
	* Regret bounds optimal in $N$ ($\wt O(\sqrt N)$). Depends on a natural notion of "diameter" for POMDP's (different from definition for MDP's. max mean passage time using best $\pi$).
	* Idea: by restricting to memoryless policies, generate conditionally independent views. 
	* $\mathcal P$ set of all stochastic memoryless policies that have a non-zero probability to explore all actions. Assume $\pi\in \mathcal P$.
	* Method
		* Can't use spectral method for HMM's.
		* But same idea: find 3 conditionally independent views (given $x_t, a_t$), use a "symmetrization" technique, and find spectral decomposition.
	* UCRL integration
		* distribution of the views $v_1, v_2, v_3$ depends on the policy used to generate the samples. As a result, whenever the policy changes, the spectral method should be re-run using only the samples collected by that specific policy.
		* Construct set of admissible POMDP's whose T, O, R models are in confidence interval
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


