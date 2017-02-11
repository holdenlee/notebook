---
title: Boosting
published: 2017-02-08
modified: 2017-02-08
tags: Boosting
type: notes
showTOC: True
---

Ref:

* Ch. 10 of [Machine learning theory and algorithms](http://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning)
* [notes](http://cseweb.ucsd.edu/~yfreund/papers/IntroToBoosting.pdf)
* 0306 and 0311 in COS511 lectures

Generalization of linear predictors to address 2 issues

* bias-complexity tradeoff (smooth control)
* computational complexity of learning (amplify accuracy of weak learner - ERM can be hard)

AdaBoost relies on the family of hypothesis classes obtained by composing
a linear predictor on top of simple classes.

# Weak learnability

$C$ is strongly PAC-learnable by $A$ if:

* $\forall$ distribution $D$ over $X$,
* $\forall c\in C$
* $\forall \ep>0$
* $\forall \de>0$, 
* $A$, given $m=\poly(\rc\ep,\rc \de)$ examples, computes $h$ with $\Pj[err(h)\le \ep] \ge 1-\de$.

$C$ is weakly PAC-learnable by $A$ if:

* $\exists \ga >0$
* $\forall$ distribution $D$ over $X$,
* $\forall c\in C$
* $\forall \de>0$
* $A$, given $m=\poly(\rc\de)$ examples, computes $h$ with $\Pj[err(h)\le \rc2-\ga] \ge 1-\de$.

[Q: what is an explicit example of a provable weak learner?]

Q: Is weak learning equivalent to strong learning?

A: Yes if you increase the hypothesis class.

# Boosting problem

Given $(x_i,y_i)$ with $y_i\in \{-1,+1\}$ and access to a weak learner $A$, find $H$ such $\Pj(err_D(H)\le \ep)\ge 1-\de$ (learn strongly).

# AdaBoost

Idea: produce different distributions $D$ from $\mathcal D$. Pick distributions at each round that provide info about points that are hard to learn.

*   At each step, run weak learner on $D_t$. Suppose error is 
	$$err_{D_t}(h_t) = \rc2-\ga_t=\ep_t.$$
* Set $\al_t=\ln \pf{1-\ep_t}{\ep_t}$. (If error is close to $\rc2$, this is small.)
*   Update distribution:
    \begin{align}
	D_1(i) &=\rc m\\
	D_{t+1}(i) &= \fc{D_t(i)}{Z_t}e^{\one_{h_t(x_i)=y_i}\al_t}
	\end{align}
*   Return $H(x) = \sgn \pa{\sumo tT \al_t h_t(x)}$.

Q: Can we unify this with multiplicative weights? This seems like some kind of dual. (Check multiplicative weights paper?)
