---
title: Non-negative matrix factorization
published: 2016-04-22
modified: 2016-04-22
tags: NMF
type: research
showTOC: True
---

#Setup

The setup for alternating minimization is as follows.

1.  (Decoding) Let $x \leftarrow \text{decode}_{A^{(t)}} y$.
2.  (Gradient step) Let
    $$A^{(t+1)} = A^{(t)} - \eta \pi(\nb L_x(A))$$
	where the loss function is the KL-divergence (negative log-likelihood)
	\begin{align}
	L_x(A) &= \sum y_i \ln \pf{y_i}{Ax_i}\\
	\nb L_x(A) &= (-y\odot \rc{Ax}) x^T
	\end{align}
	and $\pi$ is projection to the probability simplex.

The plan is to show this satisfies the conditions needed for approximate gradient descent: each step is correlated with the right direction. We want to find $\al,\be,\ep$ so that
$$ \an{g,A-A^*} \ge \al \ve{A-A^*}^2 + \be \ve{g}^2 - \ep$$
(for some norm).

We have to be careful about 2 things.

*   Uniqueness doesn't hold in general---ex. we can expand the simplex, so there would be a manifold of solutions---but it does hold under separability. We have to use this somehow.
*   The more complicated the decoding map is, the harder this is to analyze. The MLE estimator is difficult to work with because there is no explicit form. The inverse is probably easier to work with. It gives a biased estimate, but this may be OK if we only want to get close enough (ex. from $\rc{\log n}$ to $\rc{n}$).

We proceed in 2 lemmas.

* When $A\approx A^*$, the decodings satisfy $x\approx x^*$.
* When $x\approx x^*$, the descent direction for $L_x(A)$ is correlated with $A-A^*$.

As a first step, show that
$$\an{\EE_y \pa{-y\odot \pa{\rc{Ax} -\rc{A^*x}}x^T} , A-A^*}>0.$$

#Preliminary calculations

First suppose $y=A^*x$ (no noise), $x=x^*$ (perfect decoding).  Then letting $D= \diag\prc{(Ax)_i}$,
\begin{align}
\an{\EE_y \pa{-y\odot \pa{\rc{Ax} -\rc{A^*x}}x^T} , A-A^*}
&= x^T\ub{(A-A^*)^T D (A-A^*)}{=:M^2}x\\
&= \ve{x}_{M}^2.
\end{align}

Now relax $y\approx A^*x$, We get
\begin{align}
\an{\EE_y \pa{-y\odot \pa{\rc{Ax} -\rc{A^*x}}x^T} , A-A^*}
&= \EE_{y} \ve{x}_M^2 + \cancelto0{(x^TA^{*T} - y^T) D (A-A^*)x}
\end{align}
using $\E y = A^* x$.

Now relax $x\approx x^*$. (Warning: $x^*$ simply being close may not imply convergence to $A^*$ without additional assumptions on $A^*$, because of nonuniqueness.)
\begin{align}
\EE_{x,y} \an{-y^T D x^T, A-A^*}
&= \EE_{x,y} [-y^T D(A-A^*) x].
\end{align}
The dependencies of the random variables are $x^* \to y \to x$ ($\E_y = A^*x^*$). We can't simply replace $\E y = A^*x^*$ because we have to average over $x$ first, which depends on the decoding. (If we could replace $y$ like that, we get $\an{x,x-x^*}_M$.)



