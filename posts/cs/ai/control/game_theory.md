---
title: Game theory and decision theory
published: 2017-02-12
modified: 2017-02-12
tags: ai safety, game theory, decision theory
type: paper
showTOC: True
---

# References

Papers on game theory/decision theory:

* Andrew Critch. 2017. "Toward Negotiable Reinforcement Learning: Shifting Priorities in Pareto Optimal Sequential Decision-Making." [arXiv:1701.01302](https://arxiv.org/abs/1608.04112) [cs.AI].
* Andrew Critch. 2016. "Parametric Bounded Lob's Theorem and Robust Cooperation of Bounded Agents." [arXiv:1602.04184](http://arxiv.org/abs/1602.04184) [cs:GT].
* Jan Leike, Jessica Taylor, and Benya Fallenstein. 2016. "[A Formal Solution to the Grain of Truth Problem](http://www.auai.org/uai2016/proceedings/papers/87.pdf)." Paper presented at the 32nd Conference on Uncertainty in Artificial Intelligence.
* Benja Fallenstein, Jessica Taylor, and Paul Christiano. 2015. "Reflective Oracles: A Foundation for Classical Game Theory." [arXiv:1508.04145](http://arxiv.org/abs/1508.04145) [cs.AI]. Previously published as MIRI technical report 2015-7. Published in abridged form as "Reflective Oracles: A Foundation for Game Theory in Artificial Intelligence" in Proceedings of LORI 2015.
* Nate Soares and Benja Fallenstein. 2015. "Toward Idealized Decision Theory." [arXiv:1507.01986](http://arxiv.org/abs/1507.01986) [cs.AI]. Previously published as MIRI technical report 2014-7. Published in abridged form as "Two Attempts to Formalize Counterpossible Reasoning in Deterministic Settings" in Proceedings of AGI 2015.
* Mih'aly B'asr'asz, Paul Christiano, Benja Fallenstein, Marcello Herreshoff, Patrick LaVictoire, and Eliezer Yudkowsky. 2014. "Robust Cooperation on the Prisoner's Dilemma: Program Equilibrium via Provability Logic." [arXiv:1401.5577](http://arxiv.org/abs/1401.5577) [cs.GT].
* Tsvi Benson-Tilsen. 2014. "UDT with Known Search Order." [MIRI technical report 2014-4](https://intelligence.org/files/UDTSearchOrder.pdf)
* Patrick LaVictoire, Benja Fallenstein, Eliezer Yudkowsky, Mih'aly B'ar'asz, Paul Christiano and Marcello Herreshoff. 2014. "[Program Equilibrium in the Prisoner's Dilemma via Lob's Theorem](https://intelligence.org/files/ProgramEquilibrium.pdf)." Paper presented at the AAAI 2014 Multiagent Interaction without Prior Coordination Workshop.
* Benja Fallenstein. 2013. "[The 5-and-10 Problem and the Tiling Agents Formalism.](https://intelligence.org/files/TilingAgents510.pdf)" MIRI technical report 2013-9.
* [Problem class dominance](https://intelligence.org/wp-content/uploads/2014/10/Hintze-Problem-Class-Dominance-In-Predictive-Dilemmas.pdf)

## Online

* ADT
* [Entangled Equilibria and the Twin Prisoners' Dilemma](https://agentfoundations.org/item?id=1279)
* [UDT](http://lesswrong.com/lw/15m/towards_a_new_decision_theory/)
	* [Formalization](https://dl.dropboxusercontent.com/u/34639481/Updateless_Decision_Theory.pdf)
* [MIRI research guide](https://intelligence.org/research-guide/#four)
* [Decision theory FAQ](http://lesswrong.com/lw/gu1/decision_theory_faq/)
* [Game thepory sequence](http://lesswrong.com/lw/dbe/introduction_to_game_theory_sequence_guide/)
* [UDT with concrete prior over logical statements](http://lesswrong.com/lw/eaa/a_model_of_udt_with_a_concrete_prior_over_logical/)
* [Self-fulfilling spurious proofs](http://lesswrong.com/lw/b5t/an_example_of_selffulfilling_spurious_proofs_in/)
* [Forum digest](https://agentfoundations.org/item?id=160)
* [UDT in the land of probabilistic oracles](https://agentfoundations.org/item?id=117)
* [Using modal fixed points to formalize logical causality](https://agentfoundations.org/item?id=4) [h](http://scrible.com/s/2DR66)
* [Evil decision problems](https://agentfoundations.org/item?id=47) [h](http://scrible.com/s/2LB66)
* [Are daemons a problem for ideal agents?](https://agentfoundations.org/item?id=1281) (a.k.a. the rocket problem)

## Books

* Game theory, Steven Tadelis
* Algorithmic game theory, Tim Roughgarden [page](http://theory.stanford.edu/~tim/books.html)
*  Computability and Logic by Boolos, Burgess, and Jeffrey

# Towards idealized decision theory

But what are the available actions?
And what are the counterfactual universes correspond-
ing to what "would happen" if an action "were taken"?

(A deterministic agent could only have taken one action.)

 To fully describe the problem faced by intelligent agents making decisions, it is necessary to provide
an idealized procedure which takes a description of an
environment and one of the agents within, and identifies the best action available to that agent

## Problems with EDT, CDT

Evidential blackmail: AI researcher knows whether the AI will lose \$150 mil from an investment (scandal). If either is true, the AI researcher sends the info and asks for \$100 mil:

* No scandal, will pay
* Scandal, won't pay

Conditioned on refusing, loses \$150 mil.

Counterfactual blackmail: Developer has developed computer virus which would cause both to lose \$150 mil. Once deployed, only way to prevent activation 1 day later is to wire \$100 mil. Researcher would only deploy if quite sure agent will pay.

### Why not recursively improve from EDT/CDT?

CDT prescribes that an agent resist certain attempts to improve its decision procedures.

Retro blackmail: AI researcher has access to original source code. Can self-modify after researcher acquires original source code but before researcher decides whether to deploy.

Self-modify to not give in to demands.

But CDT and any decision procedure to which CDT would self-modify would lose money.

## Policy selection

CDT: Alas, the virus has been deployed. I would
have preferred that the virus not be deployed, but since it has been, I must now
decide whether or not to pay up. Paying up
is bad, but refusing is worse, so I'll pay up.

Policy selection: The optimal policy is to refuse to pay up
upon observing that the virus has been deployed. I now observe that the virus has
been deployed. Therefore, I refuse to pay.

## Logical counterfactuals

Consider Prisoner's dilemma when 

* opponent's action guaranteed to match your own. (dependent)
* some probability $p$ opponent defects. (independent)

However, CDT evaluates actions according to a physical counterfactual where the action is changed but everything causally separated from the
action is held constant. It is not the physical output of the agent's hardware
which must be modified to construct a counterfactual, it is the logical output of the agent's decision algorithm.

Cf. $10 \E a - a$.

 UDT chooses the best action according to a world-model which represents not only
causal relationships in the world, but also the logical effects of algorithms upon the world.

### Graphical UDT.

How to encode logical relations in graph? Underspecified: constructing graph is difficult. Graph for UDT further requires some ability
to identify and separate "algorithms" from the physical
processes that implement them.
How is UDT supposed
to recognize that the agent and its opponent implement
the same algorithm?

To illustrate, consider UDT identify-
ing the best action available to an agent playing a Pris-
oner's Dilemma against an opponent that does exactly
the same thing as the agent 80% of the time, and takes
the opposite action otherwise.

(Problem seems to be identifying what something is doing logically - it might be obfuscated. Also, graph loses info from algorithm.)

### Proof-based UDT

Evaluate  logical implications of the
agent's algorithm selecting the policy $\pi$.

Graph is unnecessary: the environment itself is an algorithm. 

evaluates policies by searching for formal proofs, using some mathematical theory such as Peano Arithmetic (PA), of how much utility is attained in the world-model if A() selects the policy $\pi$.

But: requires halting oracle.  can only
identify the best policy if there exists a proof that ex-
ecuting that policy leads to a good outcome

Problem in stochastic environments (? if can model prior, seems ok)

Ex. agent uses UDT, play game with human. If numbers written sum to $\$10$, each paid, else 0.

UDT misidentifies best policy:

Human: I don't quite know how UDT works, but I
remember hearing that it's a very powerful
predictor. So if I decide to write down 9,
then it will predict this, and it will decide
to write 1. Therefore, I can write down 9
without fear.

But agent with superior predictive power loses to the dumber agent!
Human's lack of power to predict UDT gives an advantage!

Problem: not guaranteed to work.  As soon as proof-based UDT proves that an agent will not take a certain policy, it concludes that taking that policy leads to the best possible outcome (because from a contradiction, anything follows).

(I don't get this...)
$$
A() = UDT(\ce{E()}, \ce{A()}).
$$

(What is an embedding of an agent?)

# Lob's Theorem in MIRI Research

Why Lob? The short answer is that this theorem illustrates the basickind of self-reference involved when an algorithm considers its own output as part of theuniverse, and it is thus germane to many kinds of research involving self-modifying agents,especially when formal verification is involved or when we want to cleanly prove things inmodel problems.

Problem: How can Deep Thought 1.0 build Deep Thought 2.0 with guarantee of good consequences?

 DT1 can't actually figure out what actions DT2 is going to take. Naively, it seems as if it should be enough for DT1 toknow that DT2 has the same goals as DT1, that DT2's deductions are reliable, and that DT2 only takes actions that it deduces to have good consequences on balance.

If we tryand model DT1 and DT2 as proving statements in two formal systems (one stronger thanthe other), then the only way that DT1 can make such a statement about DT2's reliability is if DT1 (and thus both) are in fact unreliable!

## Lob

One (anachronistic) way of stating Godel's key insight is that you can use computer pro-grams to search for proofs, and you can prove statements about computer programs

This makes it more intuitive that we can embed self-reference in mathematics, because we can embed self-reference in computer code!

Quines: programs can be made which perform arbitrary tasks using their own source code we can have a program G which refers to itself in this way, and searches for proofs inarithmetic related to its own source code.

G searches for a proof of "G runs forever". G never finds a proof, but we can never prove that G runs forever.

We can add "G never halts" or "G halts" as a new axiom.

**First incompleteness**.  If the theory of arithmetic is consistent, then there exist undecidable statements in the theory of arithmetic.

Lob's Theorem:

* $X$ logical statement
* ProofSeeker(X) searches for proofs of $X$.
* $L(X)=$"if ProofSeeker(X) halts, then X"

Intuition: if $L(X)$ were provable for every $X$, you can prove consistency.

1. If $X$ is provable, ProofSeeker(X) halts, and $L(X)$ is true.
2. If $X$ is disprovable, then ProofSeeker(X) does not halt, but you can't prove it---because that would be like proving consistency! (cf. second inconsistency. Lob implies 2nd inconsistency.)
3. If $X$ is neither provable nor disprovable, then does not halt. (Also can't prove it.)

Also a finite version of Lob's theorem, controls length of proof of $\phi$ in terms of $\square \phi\to \phi$.

## Applications

### Lobstacle

DT1 trusts DT2: if the action is deduced to be good, then it must actually be good.

(It can't even trust itself?)

a simple agent with a utility function will only create successors whose formal systems are strictly weaker thanits own, since only those are fully trusted by the current system.

References:  Tiling Agents for Self-Modifying AI, and the Lobian Obstacle [18] and Problems of self-reference in self-improving space-time embedded intelligence [9].

### Lobian cooperation

algorithm and theirs get to read the opponent's source code, calculate for as long as they like, and then play only once.

Cooperate iff source code identical: fragile.

FairBot: search through all proofs of length $\le N$ to see if valid proofs of $X(FairBot)=C$. If yes, output $C$.

Intuitively, it seems like both mutual cooperation and mutual defection are stable fixed points of the situation. However, a Lobian statement breaks the deadlock in favor of cooperation!

Proof: L("FairBot(FairBot)=C") follows. By Lob, there must be a proof of FairBot(FairBot=C). (! This is a case where Lob actually helps prove something!)

See Program Equilibrium in the Prisoner's Dilemma via Lob's Theorem.

### 3.3 Spurious counterfactuals

Note on model:

* If universe was computable (with agent's resources) and extensionally fair, then the problem is simple: A simply selects the function that maximizes its expected utility. (Suppose A has a time limit it must halt by.)
* Problem: Nesting - what if they keep calling one another? (I think this is not an issue if you enforce time limit.)
* Problem: It doesn't make sense for agent to have enough computing power to simulate the universe. In general we want to allow the universe to have more computing power. "Agent simulates universe" is not the shape of things we want.
* Problem: May examine source code.

When agent and universe are quined, you can't "run the universe" on $A$ or $A'$. You search for proofs of $A()=x\to U()=c$. Problem: ordering matters. If you prove $x$ is better you choose $x$, even though it could be worse, because $A()=\neg x\to U()=c$ is true for any $c$.

(Why can't extensional work? Search for proofs in universe quined with $A'$, then choose $A'$.)

careful ordering of which proofs it pays attention to, and that agent can be shown to make thecorrect decisions (given enough deductive power). The idea was originally due to Benja Fal-lenstein; Tsvi Benson-Tilson's paper UDT with Known Search Order 

## Model theory

the same theory can have many models, some of them not at all what you were thinking of when you made the axioms. Notes: to get Peano Arithmetic need

* $\forall x\in \N, Sx\ne O$ to avoid mod $n$.
* But what about $\N\cup \{\text{Bob}\}$? In order to express induction in the language (which doesn't have variables for properties, only for numbers), we must resort to an infinite family of new axioms. 

 There are models of Peano arithmetic where G holds, and other models where G fails to hold. In Robinson arithmetic "Bob" might satisfy the formula G is checking. In PA nonstandard models are weirder.
 
The key to understanding these is that G never halts at any finite number, but we can't actually define in our formal language what "finite" means. Thenonstandard models of Peano Arithmetic are those which have all the usual numbers butalso lots of extra numbers that are "too large" to ever be written as lots of S's followed by an O, but which nonetheless are swept along in any inductive statement.

Remark: nonstandard analysis

Ponder for a moment the formal system which has all the axioms of PA, plus the axiom that PA is consistent, plus the axiom that "the systemwhich has all the axioms of PA, plus the axiom that PA is consistent" is inconsistent. As it turns out, this is a perfectly consistent system (What happens if you take the recursively axiomatizable "consistency${}^n$, $n\in \N$?)

We might want to endorse some particular model as the "true" one (for instance, our standard model of the natural numbers, without all of those weird nonstandard numbers), and say that logical statements are true if they hold in that model and false if they don't. This truth predicate exists outside the language, and so the logical statements can't talk about the truth predicate, only about weaker notions like provability.

The trouble comes when we try to construct a language that contains its own truth predicate such that $T(\phi)\lra \phi$. $T(X)\lra T(\neg X)$.

if P isn't allowed to make exact statements about its own values, but only arbitrarily precise approximations, then everything can work out consistently.

P can't rule out the possibility that reciprocals of nonstandard natural numbers (infinitesimals) exist.

followup paper by Christiano on computationally tractable approxima-tions of probabilistic logic: Non-Omniscience, Probabilistic Inference, and Metamathematics

## Godel-Lob Modal Logic

We're interested in a particular modal logic that constitutes a reflection of Lobian phenomena in PA, etc.

GL axiom: $\square (\square A \to A)\to \square A$.

(What about things like $\forall x, \square P(x)$?)

some special cases where there are efficient algorithms for deducing provability in GL.

## Fixed points of modal statements

All sorts of formulas that refer to themselves and each other by quining. Formulas $p\lra \phi(p,q_1,\ldots, q_k)$ modalized in $p$: every $p$ in $\phi$ is in scope of some $\square$.

When $p$ equivalent to formula modalized in $p$, then $p$ is equivalent to something which doesn't use $p$. Godel statement $\lra$ inconsistency of arithmetic $\square (p\lra \square \neg p) \lra \square (p\lra \square \perp)$.

 formula is provable in the modal logic if and only if a corresponding property holds for every Kripke frame in that class.

## Applications of GL modal logic

 Robust Cooperation in the Prisoner's Dilemma: Program Equilibrium via Provability Logic.
 
 One embarrassing thing about FairBot is that it doesn't check whether its potential cooperation would actually make any difference. (ex. it cooperates against a rock.)
 
 Ex. PrudentBot
 
 if we assume infinite computational power (i.e. the ability to consult a halting oracle about proof searches in Peano Arithmetic), then they can be written out as simple statements in modal logic

Find what happens using efficient algorithm!

Modal agents of rank 0: $p\lra \phi(p,q)$, modalized in both $p$ and $q$ (don't run, only prove). Equivalent to something $p\lra \phi(q)$.

# Reflective oracles as foundation

# Reflective oracles and Solomonoff induction

[AIXI](https://en.wikipedia.org/wiki/AIXI)
