---
title: (TPGB17) The space of transferable adversarial examples
published: 2017-05-24
modified: 2017-05-24
tags: neural nets, aaml
type: paper
showTOC: True
---

<!--
See also 

* [intro to problem](adversarial.html).
* [my experiments](adversarial_experiments.html). 
* [confidence](confidence.html).
-->

# Adversarial subspaces

* Introduces methods for discovering a subspace of adversarial perturbations.
	* MNIST: 25 dimensions
* Distance traveled before reaching decision boundary is on average larger than distance separating decision boundaries of 2 models in that direction. (This doesn't seem surprising.)

Recall that FGSM is
$$
x^* = x + \ep \nv{\nb_x J(x,y)}.
$$

Techniques:

* Solve optimization problem multiple times, constraining the next direction to be orthogonal to the previous. **GAAS works well, others don't.**
	* Second-order approximation of loss function $\max_{\ve{r}\le \ep} g^T r + \rc 2 r^T H r$.
	* Convex optimization: Write an LP for the region where $f$ is piecewise linear, and throw in orthogonality condition.
	*   GAAS (gradient aligned adversarial subspace): Find orthogonal $r_1,\ldots, r_k$ with 
		$$\ve{r_i}_2\le \ep, \quad r_i^T \nb_x J(x,y)\ge \ga.$$
		(Think of a right-angled simplex with vertex at $x$. We can compute how many there are given desired $\fc{g^Tr_i}{\ve{g}_2}$: $\min\{\ff{1}{\al^2}, d\}$.)	
	*   JSMA: partition most salient features into $k$ bins; use these $k$ sets to get $k$ orthogonal perturbations.

For DNN, get 44 directions, 25 of which transfer. For CNN, get 15 directions, 2 of which transfer.

# Decision boundaries

Adversarial training does not significantly displace decision boundary.

Define unit norm directions
$$
d(f,x) := \fc{x'-x}{\ve{x'-x}}
$$
where $x'$ is defined differently in 3 cases:

1. Legitimate direction $d_{leg}$: $x'$ is closest data point with different class label.
2. Adversarial example $d_{adv}$: adversarial example generated from $x$.
3. $d_{rand}$ random $x'$ in input domain that is classified differently.

Define minimum distance
$$
MD_d(f,x) = \amin_{\ep>0} f(x+\ep \cdot d) \ne f(x)
$$
and interboundary distance as 
$$
ID_d(f_1,f_2,x) = 
|MD_d(f_1,x) - MD_d (f_2,x)|
$$

## Experiments

Transfer from

* logistic regression (LR)
* support vector machine (SVM)
* DNN

Defenses only prevent white-box attacks by reducing reliability of 1st order approximations (gradient masking).

# Limits of transferability

This hypothesis is false: If 2 models achieve low error while exhibiting low robustness, then adversarial examples transfer between models.

Ex. Adversarial examples on MNIST don't transfer between linear and quadratic models.


Model-agnostic perturbation: For a fixed feature mapping $\phi$, define $\de_\phi$ as difference in intra-class means, and the adversarial direction $r_\phi$ for $(x,y)$,
\begin{align}
\de_\phi:&=\rc 2 (\E_{\mu_{+1}} [\phi(x)]
- \E_{\mu_{-1}}[\phi(x)])\\
r_\phi:&= - \ep y \wh \de_\phi.
\end{align}

If $f(x) = w^T\phi(x)+b$, and $\De:=\wh w^T \wh\de_\phi$ is large, and $\phi$ is "pseudo-linear" ($\phi(x+r)-\phi(x)\approx r_\phi$) then $x+r$ transfers to $f$.

TLDR: shift points in direction of difference of class means; this transfers well.

Can models with access to same set of input features learn representations that don't transfer?

There's a simple (but not very informative...) example where this works: MNIST with XOR artifacts trained on linear and quadratic.
