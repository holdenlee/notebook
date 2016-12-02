---
title: (DKLPRS) Markov logic
published: 2016-05-17
modified: 2016-05-17
tags: graphical model, probabilistic model, logic, FOL
type: paper
showTOC: True
---

# Markov logic: Questions

* Consider a statement like Moral(x) $\implies$ Happy(x). Consider 2 worlds: one where most people are moral, and all but 5 moral people are happy, another where only 5 people are moral, and they are all unhappy. It seems in the Markov model they would have the same weight, when the statement is represented as $\neg\text{Moral}(x) \wedge \text{Happy}(x)$. Do we want this? I'm guessing this is easier than only restricting to moral people, because that involves dividing.
* I don't understand the terminology used in LazySAT. My understanding of `active_atoms` is that we take every clause that is not satisfied and add ALL of its atoms. (Ex. if we have a formula $Friend(A,B)\implies Happy(A) \wedge Happy(B)$, and $\text{Friend}(x,y) \wedge \neg \text{Happy}(x)\wedge \text{Happy}(y)$, then both $x,y$ are considered active atoms.)
    * But then choosing unsatisfied $x$ and $v_f\sim c$, it'salways true that $v\in$ active atoms, whereas in Algorithm 2, they consider when $v\nin$ active atoms!
	* Note DeltaCost can be easily calculated. Local flipping doesn't require recalculation of the whole cost.
	* Shouldn't DeltaCost be a function of a setting of variables, not a variable? Or is it like the derivative in the direction of variable $v$, i.e., what you'd get by flipping $v$? But you may need to flip two variables in a clause at the same time to get something better!
* I don't understand the explanation on p. 8: The initial active atoms are all those appearing in clauses that are unsatisfied if only the atoms in the database are true, and all others are false.
   * More fundamentally, I don't understand what the database is!
* At each step, take a random unsatisfied clause. Maintain a set of active atoms.
    * With probability $p$ choose a random variable from the clause.
	* Otherwise, choose the non-active variable $v$ in $c$ is lowest DeltaCost. (Why do we ignore active atoms? Isn't it true that flipping them can also decrease the cost?)
	* Add the chosen variable $v_f$ to `active_atoms` and add activated clauses. Flip $v_f$.
	* (Do we not want variables to be flipped twice?)
	* NO: we choose the variable (active OR non-acive) in $c$ with lowest DeltaCost. It's merely saying that we have to do a more involved computation if the variable is non-active. (Why? This has something to do with the DB vs. KB, no comprendo.)
	* At the beginning, only include active atoms/clauses. Think of these as the dangerous atoms---flipping them could make a clause not satisfied. These clauses are the only clauses we will need to worry about. Add clauses to the active set only if we need to worry about them.
* So what's the difference between SAT and LazySAT? I think it's just: are you summing over all possible instantiations (unnecessary!), or just looking at the differences when you flip a variable? You can ignore formulas that don't invove the current variable.

(OK to have some kind of "complexity measure" of formulae saying how amenable they are to random-walk methods?)

* Intuition about deterministic vs. non-deterministic dependencies. (Tradeoff between search and following stochasticity cf. gradient? The smaller the weights the easier the flow but the lower the probability is to find a satisfying instance?)
* MC-SAT has hard satisfiability. Look at all clauses satisfied in the last step; the larger the weight, the more likely you are to force it to be satisfied next step. It calls on a uniform SAT solver (which doesn't really exist---but there are things that do well in practice).
* p. 12. Indistinguishable objects. What if you're just strying to find a distribution that's close, ex. for at most binary relations, look at the proportion of $\{a,b\}$ with values of $u_1(a),\ldots, u_1(b),\ldots, b_1(a,b),\ldots$ where $u$ are unary and $b$ are binary relations.

Perhaps I need to learn about databases.

* What is the closed-world assumption?

Wait, you aren't flipping nodes! I thought of the nodes as the actors, and unary functions on them. But are the nodes supposed to be formulae? Like $u_1(x)$, $b_1(x,y)$, and everything not in it is false?

An atom is not a node but predicates applied to nodes!

(Note the logical contradictions is not on the level of node values, but on the formulas relating them? Don't have $A\wedge B$ as nodes, only have $A$, $B$.) Atoms are formulas without connectives like $\wedge, \implies,\forall...$

> basic inference problem in first-order logic is to determine whether a knowledge base KB entails a formula F, i.e., if F is true in all worlds where KB is true

Sparsity in the sense that only the relations in the database can be true; everything else has to be false?

Also, I don't understand how to deal with intermediate functions like $f(x,g(y))$. It seems there's too many possible values of $g$!

Approaches to get past intractability:

* The **pseudo-likelihood** is $\ln \Pj_w^*(X=x) = \sumo ln \log \Pj_w(X_l=x_l|MB_x(X_l))$ (markov blanket). (When is this a good approx?)
* **Discriminative weight learning**. Partition into evidence and query atoms and calculate conditional log-likelihood. (cf. RBM)

## 6.3 Structure learning: how do we even find the formulae?

* Inductive logic programming #lookup. But use evaluation function based on pseudo-likelihood rather than accuracy and coverage.

19 Dependencies are really probabilistic. Ex. two titles sharing a word are more likely to be the same?

Applications.

* Entity resolution (when do things refer to the same object? Include formulae like transitivity of equality.)
* Citation resolution. (Ex. which article corresponds to which citation, when are they the same? You can imagine there's some general rules which would do well.)

Lifted inference, lifted resolution in FOL #lookup

# [KSJ] A general stochastic approach to solving problems with hard and soft constraints

* My understanding of "partitioning": solve a problem hierarchically: break into smaller pieces, find a list of good solutions of each piece, and then figure out how to combine those solutions.
* Q: is there an algorithm agnostic to the encoding in some sense? (Doubtful---probably can embed crypto problems? But what if you only allow the simplest transformations?)
* WalkSAT *does* only flip one variable at a time.
* Hard constraints have greater weight than soft constraints.

I think people do MCMC in problem-solving. Try to tweak things locally. Sometimes though there's a larger restructuring---view it as a step in a more abstract space, a more abstract transformation?

#Scraps

(Patterns you construct are patterns you could have found?)

Goal in learning should be to find the formula with weights which decrease the entropy the most?

SAT refutations corresponding to reasonable mathematical statements have short proofs but not the SAT framework? (Any way to compile down?)

#Directions

* First, understand the classical results on learning and inference in graphical models.
* Understand MCMC and variational inference, and the situations where they have provable guarantees.
* Try to formulate the simplest problem where you do have some element of first-order logic (ex. a statement with $\forall$) and/or some combinatorial complexity.
* What's a test problem in this domain? They give citation resolution. Maybe this is practical but it seems like a rather boring problem!
* Understand some ideas from the logic-learning community (inductive logic programming, etc.) [ILP](https://en.wikipedia.org/wiki/Inductive_logic_programming). Machine learning $\cap$ programming languages???
