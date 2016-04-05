---
title: Maximum entropy distributions
published: 2016-04-04
modified: 2016-04-04
tags: none
type: concept
showTOC: True
---

#References

* [Keith Conrad's notes](http://www.math.uconn.edu/~kconrad/blurbs/analysis/entropypost.pdf)
* [ML vs. ME](http://www.ski.org/Rehab/Coughlan_lab/General/TutorialsandReference/MaxEnt.pdf)
* [Wikipedia](https://en.wikipedia.org/wiki/Maximum_entropy_probability_distribution)

Many naturally occurring distributions are the maximal entropy distribution under some constraint. Here is a table.

Constraint | Distribution | Entropy (base e)
---
Mean $\mu$, variance $\si^2$ | Normal$(\mu,\si^2)$ | $\rc2 (1+\ln (2\pi \si^2))$
Support $[0,\iy)$, mean $la$ | Exponential $\rc{\la} e^{-\fc x\la}$ | $1+\ln \la$
$\E X= \mu$, $\E |X - \E X| = \la$ | Laplace$(\mu,2\la^2)$ | $1+\ln(2\la)$
Energy $\sum p_iE_i = \ol E$ | Boltzmann $\Pj(i) = \fc{e^{-\be E_i}}{Z}$, $Z=\sum_i e^{-\be E_i}$ | $\E(-\be E) - \ln Z$

Note that in the continuous case, the Boltzmann formula encompasses everything! For example, for the normal distribution, energy is $(x-\mu)^2$.

A systematic way to show this is Lagrange multipliers.

A more elegant way is to do the following:

*   Note that by nonnegativity of KL divergence,
    $$\int_{\Om} p \ln p \ge \int_{\Om} p \ln q.$$
*   For $F(p)$ the property of the distribution you're interested in and $q$ equal to the maximizing distribution, find that
	$$-\int_{\Om} p \ln q = g(F(p))$$
	for some function $g$.
*   Conclude that if $F(p)=F(q)$ then $-\int_{\Om} p\ln q = -\int_{\Om} q\ln q$. Hence
	$$H(p) = -\int p\ln p \ge -\int p\ln q = -\int q\ln q = H(q).$$

Here is an example. For $q=\rc{\sqrt{2\pi}}e^{-\fc{x^2}{2\si^2}}$, 
$$-\int_{\R} p \ln q \dx = \rc2 \ln(2\pi \si^2) + \int_{\R}p\cdot \rc2 \pf{x}{\si^2}^2\dx = \rc2 \ln(2\pi \si^2) + \rc{2}\fc{\Var(q)}{\si^2}.$$

Question: why is the maximum entropy distribution the best choice in statistical problems?
