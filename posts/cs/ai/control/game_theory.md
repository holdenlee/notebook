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

## Books

* Game theory, Steven Tadelis
* Algorithmic game theory, Tim Roughgarden [page](http://theory.stanford.edu/~tim/books.html)

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
