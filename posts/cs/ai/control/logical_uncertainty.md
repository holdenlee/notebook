---
title: [SF15] Questions of reasoning under logical uncertainty
published: 2016-08-19
modified: 2016-08-19
tags: ai safety
type: notes
showTOC: True
---

# Introduction

Knowing how the system behaves but not the result, because of lack of computational resources.

Standard probability theory assumes logical omniscience.

What are logically impossible possibilities? (Things that are logically incorrect, but kept as a possibility because you don't have the computational power to see they're incorrect.) Reasonable prior?

# Impossible possibilities

Consider truth values of sentences of logic.

Must preserve some structure: Ex. if probability 1 for $\phi,\phi\implies \psi$, then probability 1 for $\psi$.

2 types of logical uncertainty

1. Logical theory
2. Limited deductive capabilities

Complete logical theory: for every sentence $\phi$, either $\phi\in T$ or $\neg \phi\in T$.

Incomplete theories can be completed. (Use Zorn.)

(In what sense is there a "true arithmetic"? In the sense that you believe there is a true answer of whether a Turing machine halts!)[^f1]

[^f1]: Try to define like this. If there is no proof for "Turing machine halts" then say it is false. (This is a tie-breaker.) Now derive all logical consequences. Take some unknown statement $X$. Consider machines trying to find proofs of $X,\neg X$. Neither will halt. But this doesn't say anything about $X$! Why is there a true arithmetic?

For a deductively unlimited reasoner, an impossible possibiity is any complete theory of logic.

Deductively limited reasoners entertain inconsistent impossible possibilities.

An "impossible possibility," then, could be any assignment
of truth values to logical sentences which does not allow
a short proof of inconsistency.

No precise statements about its
performance have yet been proven.

# Logical priors

How to construct a weak (e.g. maximum entropy) prior over complete theories? (It's easy to place 0 probability on complete theories.)

**Hutter prior**: For each sentence,
select a model in which that sentence is
true, and in which certain desirable properties
hold (the "Gaifman condition" and the
"Cournot condition" (Hutter et al. 2013)).
Add the complete theory of that model to
the distribution with measure in proportion
to the probability of the sentence.

Demski's prior over complete theories extending $B$.

* Take initial set $B$ of known sentences. 
* Construct complete theory $T$ by starting with $B$ and selecting $\phi\in \Phi$ randomly. (Ex. $\Phi$ is simplicity prior.) 
* Add $\phi$ to $T$ if consistent, else $\neg \phi$.

Resulting prior probability is uncomputable but approximable.

Christiano uses standard ML techniques.

Undesirable: If $B=\phi$, then 0 probabilities on complete theories where PA holds---any theory not finitely axiomatizable.[^f2]

[^f2]: Induction schema consists of infinitely many axioms. What if we tried to do this with higher-order logic? What difficulties arise?

Two ways to update Demski's prior: 

1. completely regenerate from $B\cup \{\phi\}$ 
2. condition on $\phi$.

Why these are different:  Consider $\psi,\neg \psi$ consistent with $\phi$.

1. Regenerate: $\ge 2^{-|\psi|}$ probability on $\psi$.
2. Conditioned on $\phi$: may be arbitrarily low. Ex.
    * $\neg \psi \to \phi$
	* almost all theories with $\psi$ also contain $\neg \phi$.

Intuition

1. Regenerating: doesn't alter lower bound. (It learns differently from facts it always knew.)
1. Conditioning: favor explanations

Desiderata

1. Coherence: probability distribution over complete theories.
2. Computable approximation
3. Occam property: length-based lower bound on probability of consistent sentence.
4. Inductive: $\Pj(\forall n.\psi(n))\to 1$ as get more confirmations
5. PA-weakness: nonzero probability on set of complete extensions of PA.
6. Bounded regret: Regret at most constant worse than other distributions over complete theories
7. Practicality
8. Reflectivity: There is $P$ in the language which can be interpreted as representation of $\Pj$.

Note approximations must be incoherent.
Reflectivity is possible up to infinitesimal error but difficult.

* Hutter: coherent (1), inductive (4), PA-weak (5) as long as prob. dist generated from has Occam property. Not computably approximable, practical
* Demski: coherent, computably approximable (2), Occam if $\Phi$ (3).

Inductivity is the Gaifman condition: If $\Pj$ is logical prior and $\phi$ is true $\Pi_1$ sentence $\forall n:\psi(n)$, then $\Pj(\cdot |\text{true for }1,...,N)\to 1$. But must assign probability 0 to some true $\Pi_2$ sentences. These priors are not weak enough!

$\Pi_1$: $\psi$ decidable by primitive recursive function. $\Pi_2$: $\forall\exists$.

(Why do we care about statements that don't follow from PA? Toy problem for reasoning about uncertainty... is this the right problem?)

Desirable property:

* If prior conditioned on $\phi$ true for $p$ of first $L$ numbers ($L$ large), then $\phi(0)$ has probability $p$.

# Beyond logical systems

Logical sentences are not the right tool
for reasoning about the behavior of objects in the real
world.

Realistic reasoning shortcuts. (cf. regret?)

It is not clear that sentences of first order logic
are the "correct" underlying structure for logically uncertain
reasoning about the world.

Ex. billiards player (?)

# Discussion

# Logical induction, Andrew Critch (8/20)

| Domain | Agent | Minimal sufficient conditions | Desirability arguments | Feasibility |
|---|---|---|---|---|
|Rational choice | VNM utility maximizer | VNM axioms | Dutch book arguments, compelling axioms | AIXI, POMDP solvers |
| Probability | Bayesian updater | axioms of probability theory | Dutch book arguments, compelling axioms | Solomonoff induction |
| Logical uncertainty | Garrabrant inductor | ??? | Dutch book arguments, historical desiderata | LIA2016 |



1. Improve logical uncertainty theory (min conditions, more conseq)
2. Using Garrabrant inductors
3. 

Replace logical omniscience with logical uncertain.

Logical uncertainty was a roadblock to decision theory, etc.

(What would you do tomorrow if you found Critch changed $\pi$ to 4? Would you still go to work? Will pigs fly?)

Suppose you're an algorithm. What if I do x?

Algorithm: what if I did this thing I didn't do?

<!-- Gameable but works.
Bayesian updaters don't exist.
Use AI to research AI safety.
when ask question about themselves, as q about math objects. Theory about understanding place in world.
converge to paper \iy
-->

## Technical 

* $\Ga$ language for encoding and proving statements about variables and computer programs (PA)
* $\La$ all sentences expresible in $\Ga$.
* Belief state: $\La\to [0,1]$ constant outside some finite subset (of things you've thought of)
* Reasoning process: computable sequence of belief states $\set{P_n}{L\to [0,1]}$.

Put criteria for reasoning in a good language.

A good reasoning process $P$ should satisfy

1. computability of $P_n(\phi)$ for any $(n,\phi)$.
2. convergence: $P_\iy(phi) = \lim_{n\to \iy} P_n(\phi)$ exists
3. coherent limit: $P_{\iy}$ should be coherent probability distribution, $P_\iy(A\wedge B) +P_iy( A \vee B) = P(A) + P(B)$.
4. non-dogmatism: If $\Ga \not \vdash \phi$ then $P_\iy(\phi)<1$ and if $\Ga \not \vdash \neg\phi$ then $P_\iy(\phi)>0$.

There's a secret property (master criterion) that implies all 4 of these.

Conservatism (not too extreme)

* Uniform non-dogmatism: for any recursively enumerable sequence of sentences $\{\phi_n\}$ such that $\Ga \cup \{\phi_n\}$ is consistent, there is $\ep>0$ such that for all $n$, $P_\iy(\phi_n) \ge \ep$. 
* Occam bonds: $\ka$ Kolmogorov complexity, $P_\iy(phi) \ge 2^{-\ka(\phi)}$, $P_\iy(\phi)\le 1-C2^{-\ka(\phi)}$. (Occam: Simple things  shouldn't be too extreme.)

Self-reflection

Tension between Godel (can't prove soundness/consistency), vs. can notice certain things about own sanity.

* Belief in consistency: $con(t)=$ "There is no proof of $\perp$ from $\Ga$ using $t$ or fewer symbols." Then $\lim_{n\to \iy} P_n(con(n))=1$. 
* Belief in future consistency: For any encoding $\ol f$ of computable $f:\N\to \N$, 
$$
\lim_{n\to \iy} P_n(con(\ol f(n)))=1.
$$
Ex. $f(n) = Ack(n,n)$

Sequence of statements $\phi$ is polytime generable if $M(n)=\phi_n$ polytime.

Sequence of T/F questions relatively easy to generate, but can be arbitrarily difficult to answer deductively as $n$ grows. p.g. statements are easy to state, hard to verify.

<!--2nd problem hard -->

Ex. $G(\ol n)\iff$ There is no proof of $\ol G(\ol n)$ in $\le \ol f (\ol n)$ characters.

True, but can't be proven in fewer characters.

* Provability induction: Any p.g. sequence of provable theorems $\phi_n$ will eventually be believed by $P_n$ as soon as they are generated, $\lim_{n\to \iy} P_n(\phi_n)=1$. $P$ outpaces deduction.
<!-- p.g. sufficiently expressive for writing down. Failing to have makes exploitable. Can make larger class.-->

Analogy: Ramanujan vs. Hardy.

Timely manner: 
\begin{align}
x_n \simeq_n y_n \iff \lim_{n\to \iy} x_n-y_n=0\\
x_n \gtrsim_n y_n\iff \lim\inf >0\\
...
\end{align}

* Timely adoption of limits. $p$ sequence of rational probabilities. If $P_\iy(\phi_n) \simeq_n p_n$ then $P_n(\phi_n) \simeq_n p_n$. (Keep up with todo list.)
* Introspection: ask about themselves. Knows what its own beliefs are at time it has them. For any pg $\phi_n$, any $(a,b)$ (or sequence of intervals), any $\ep>0$, large enough $n$,
\begin{align}
P_n(\phi_n)&\in (a+\ep,b-\ep) &\implies P_n'P_n(\phi_n)\in (a,b)' > 1-\ep\\
P_n(\phi_n)&\nin (a-\ep,b+\ep) &\Leftarrow P_n('P_n(\phi_n)\in (a,b)') <\ep
\end{align}
(Spit out at once at time $n$. It's one static table with introspective property.)
* Liar's paradox resistance: Liar sentences $L_n$, $\Ga\vdash L_n \iff 'P_n(L_n)\le p'$. Then $\lim_{n\to \iy} P_n(L_n)=p$. (Oscillations...)

(How sure of being sure...)

Self-trust

*   Trust in future beliefs: For any computable $f(n)>n$, 
    $$''P(\phi_n | ' P_{f(n)}(\phi_n) \ge p_n') \gtrsim_n p_n''$$
	Precise statement
	<!--$$ \E_n([\phi_n \Ind_{\de_n} (' P_{f(n)}(\phi_n) \ge p_n') \gtr$$-->

Learning statistical patterns.

Learning provable relationships: 

*   case breakdowns: Let $\phi^1,\ldots, \phi^k$ be $k$ p.g. sequences of sentences such that for each $n$, $\Ga$ proves that $\phi_n^1,\ldots, \phi_n^k$ are exclusive and exhaustive. Then
    $$ \lim_{n\to \iy} \sum P (\phi_i)= 1.$$
* affine relations

No study of convergence rates. Point is that it verifies desiderata (first 9) are not contradictory. 

**Open question**: Continuum hyp, bounded by Kolm complexity. depend on how parametrized. Different versions of Garrabrant inductors. Probabilities dominate each other? All universal semimeasures dominate each other. Garrabrant dominate universal semimeasures. Are all the different good ways comparable?

(Ex. $\phi_n$: Turing machine has not halted by time $n$.)

Try not to lose a lot of money on bets. (On agents simpler than you.)

A tad under doubly exponential time.

Mentally simulate all polytime traders. Run Wall Street traders in head output algebraic expressions. Open, algorithms respond. Algorithms respond to beliefs. This is what beliefs are, this is what I wish instead. Find fixpoint. Computably approximate.

Property: can't lost too much money to polytime traders. 

Pascal's mugging. Where's your $\iy$ dollars. Bring the briefcase with the cash!

Start with finite budget, inversely proportional to complexity. By being complicated, smarter. Smart ones gain more money, larger bets, affect market prices more. Smart ones get rick and fill the market.

(Maybe that's what neurons are! jk. SoM: Competing processes.)
