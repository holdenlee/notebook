---
title: Neural net learning, Anthony and Bartlett
published: 2017-02-28
modified: 2017-02-28
tags: neural nets
type: notes
showTOC: True
---

# 9 Classification with real-valued functions

## 9.1 Intro

* VC dim grows with number of parameters
* Training set $\ll$ number of parameters, but still avoids overfitting.
* 7.1: arbitrarily small modification to activation makes VC-dimension infinite
* In theo theory model, learning algorithm is required to perform well for any probability distribution.
* Learning model not appropriate for NN learning algorithms. Many learning algorithms take into account the real output.
* Take into account the margin
* Get bounds on misclassification $\pat{error}\le \pat{estimate of error} + \pat{complexity penalty}$. Complexity parameter depends on size of parameters in the network.
* Interpret: value of the function as an estimate of the probability that the correct label is 1

## 9.2 Large margin classifiers

* $Z=X\times \{0,1\}$. Margin of $f$ on $(x,y)\in Z$ is $\sign(y) (f(x)-\rc 2)$.
* Error $err_P^\ga(f) = \Pj(\text{margin}(f(x),y)<\ga)$.
* Classification learning algorithm for real-valued functions: $err_P(L(\ga,z)) < \inf_{g\in F}err_P^\ga(g)+\ep$.
* $\wh{err}_z^\ga(f) = \rc m |\set{i}{\text{margin}(f(x_i),y_i)<\ga}|$.
* Chebyshev: if $\ep$ is $L_2$ error, $\wh{err}_z^\ga (f) < \fc{\ep}{(\rc2-\ga)^2}$.

# 10 Covering numbers and uniform convergence

* $N(\ep, W, d_\iy)$ is the minimum cardinality of a cover of $W$ by $\ep$-balls in $L^{\iy}$.
* Ex. if $F|_{x_{1:k}}$ is contained in a linear subspace of dimension $d$, then grows as $\pf k\ep^d$.
* $N_\iy(\ep, F, k) =\max_{x\in X^k} N(\ep, F|_x, d_\iy)$.

## 10.3 Uniform convergence

$$
\Pj^m [\exists f\in F, err_P(f) \ge \wh{err}_z^\ga (f) + \ep] \le 2N_\iy(\fc \ga2, F, 2m) e^{-\fc{\ep^2m}{8}}.
$$
($\max$ here signals that $L^\iy$ is the right covering.)

If covering number grows as $\poly(m)$, then this approaches 0 exponentially.

# 11 Pseudo-dimension and fat-shattering dimension

Is there a combo measure like the VC dimension to bound covering numbers?

## 11.2 Pseudo-dimension

* $F$ is a set of functions $X\to \R$, $S=\{x_1,\ldots, x_m\}\subeq X$. $S$ is **pseudoshattered** by $F$ if there are $r_i$, s.t. for all $b\in \{0,1\}^m$, there is $f_b\in F$, $\sign(f_b(x_i)-r_i)=b_i$. (Achieve all possible above/below combinations.) 
* **Pseudo-dimension** is maximum $|S|$ pseudo-shattered by $F$.
* The pseudodimension of $F$ is the VC dimension of $\set{\sign(f(x)-y)}{f\in F}$.
* Pseudoshattered iff some translate of $F|_x$ intersects all orthants.
* Composing with nondecreasing function doesn't increase.
* If $F$ is vector space, $Pdim(F)=\dim(F)$.
* $F=\set{w_0+w^Tx}{w\in \R^n}$: $P\dim(F)=n+1$.
* Poly transformations of degree $\le k$: $P\dim(F) = \binom{n+k}k$.
* Poly transformations on $\{0,1\}^k$ of degree $\le k$: $\sumz ik \binom ni$.

## 11.3 Fat-shattering dimension

*   $S$ is $\ga$-shattered by $F$ if there are $r_i$ such that for each $b\in \{0,1\}^m$, there is $f_b\in F$, 
	\begin{align}
	f_b(x_i) & \ge r_i+\ga,&b_i=1\\
	f_b(x_i) &\le r_i - \ga,&b_i=0.
	\end{align}
* $\ga$-dimension is max cardinality of $S$ that is $\ga$-shattered by $F$, $fat_F(\ga)$.
* This is a scale-sensitive dimension.
* Ex. $F$ set of functions $[0,1]\to [0,1]$ with total variation $\le V$. $fat_F(\ga) = 1+\ff{V}{2\ga}$.
* $fat_F(\ga)\le P\dim(F)$. $P\dim(F) = \lim_{\ga\to 0} fat_F(\ga)$.
* If closed under scalar multiplication, $fat_F(\ga) = Pdim(F)$.

# 12 Bounding covering numbers with dimensions

* $W\subeq A$ is $\ep$-separated/packing if $\forall x,y\in P$ distinct, $d(x,y)\ge \ep$.
* $\ep$-packing number $M(\ep,W,d)$ max cardinality of $\ep$-separated subset.
* Uniform packing number $M_p(\ep, H, k) = \max_{x\in X^k} M(\ep, H|_x, d_p)$.
* $M(2\ep, W, d)\le N(\ep, W, d)\le M(\ep, W,d)$.
* If $F:\{X\to [0,B]\}$, $N_\iy(\ep, F, m)\le \sumo id \binom mi \pf B\ep^i\le \pf{emB}{\ep d}^d$.
*   (Bound covering number by fat-shattering dimension) 
	\begin{align}
	M_\iy(\ep, F, m) &< 2(mb^2)^{\ce{\lg y}}\\
	b&=\ff{2B}{\ep}\\
	d&=fat_F\pf{\ep}4\\
	y&=\sumo id \binom mi b^i.
	\end{align}
*   Fat-shattering dimension determines in a fairly precise manner the covering numbers of a function class: $F:\{X\to [0,B]\}$. $m\ge fat_F\pf{\ep}4\ge 1$.
	\begin{align}
	\fc{\lg e}8 fat_F(16\ep) \le \lg N_1(\ep, F, m) \le \lg N_\iy(\ep, F, m) \le 3fat_F\pf{\ep}4 \lg\pf{4e Bm}{\ep}^2.
	\end{align}

# 13

Large margin SEM algorithm: gives $\wh{err}_z^\ga (L(\ga, z)) = \min_{f\in F}\wh{err}_z^\ga (f)$. 

# 14 Dimensions of neural networks

We bound the covering numbers and fat-shattering dimensions for net-
works that are fully connected between adjacent layers, that have units
with a bounded activation function satisfying a Lipschitz constraint,
and that have all weights (or all weights in certain layers) constrained
to be small. 

Two types of bounds. Two notions of complexity: parameters and size of parameters

## 14.3 In terms of number of parameters

*   $F:\{X\to Y_1\}$, $G:\{Y_1\to \R\}$, $G$ is $L$-lipschitz. Let $d_\iy^\rh(y,z) = \max_{1\le i\le m}\rh(y_i,z_i)$.
	Then
	$$N_\iy(\ep, G\circ F_1, m)\le \max_{x\in X^m} N\pa{\fc{\ep}{2L}, F_1|_x, d_\iy^\rh} N(\pf \ep2, G, d_{L_\iy}).$$
* Note finite $L_\iy$ cover is very strong.
* Neural network
	* $l$ layers
	* $W$ weights
	* Computaion maps into $[-b,b]$
	* For each unit, $\ve{w}_1\le V$.
	* Activation functions $L$-Lipschitz
* $N_\iy (\ep, F, m) \le \pf{4embW(LV)^l}{\ep(LV-1)}^W$.

## 14.4 On Fat-shattering dimensions, independent of number of parameters

$fat_F(\ga)$ increases with $\rc{\ga}$, weight bound, and number of layers.

* Neural network
	* $B=b$ bound on magnitude of input values and activation function
	* $l$-layer 
	* $\ve{w}_1\le V$.
	* $s$ is $L$-Lipschitz
* $l\ge 1, b\ge 1, V\ge \rc{2L}, \ep\le VbL$. Then $\lg N_2(\ep, F_l,m) \le \rc2 \pf{2b}{\ep}^{2l} (2VL)^{l(l+1)} \lg (2n+2)$.
* $fat_{F_l}(\ep) \le 4 \pf{32b}{\ep}^{2l} (2VL)^{l(l+1)} \ln (2n+2)$.
