---
title: Stochastic calculus
published: 2017-03-08
modified: 2017-03-08
tags: stochastic calculus
type: notes
showTOC: True
---

# 4

Stieltjes function can be defined in terms of simple functions first, $I(f_n) = \sum_i f_n(t_i^n) (g(t_{i+1}^n) - g(t_i^n))$.

What's wrong with the Stieltjes integral? If $g$ has infinite variation on $[0,1]$, then there exist simple functions $f_n\to f$ uniformly such that $I(f_n)$ diverges.

*Proof*. Take a partition so that $\sum |g({t_{i+1}}) - g(t_i)|\to \iy$, $h_n(t_i) = \sign(g(t_{i+1})-g(t_i))$.

But when $g$ is a Wiener process, this example would have to choose $h_n$ adaptively to it. If $h_n$ is nonrandom, this is not a problem. There are certain sample paths of $W_t$ for which the integral diverges, but the set of such sample paths has probability 0! But we would like to integrate random processes.

The lemma cheated by looking into the future!

1. We only define stochastic integrals with repect to $W_t$ of stochastic processes which are $\mathcal F_t$-adapted. 
2.  Even though finite variation of $W_t$ is a.s. infinite, quadratic variation is finite, $\sum_{t_i\in \pi_n} (W_{t_{i+1}}-W_{t_i})^2\to 1$ in probability. Define stochastic integrals as limits in $L^2$. By independence of increments,
	$$
	\E [ I(f_n)^2] = \int_0^1 f_n(s)^2\,ds.
	$$

Wiener integral: $f_n\to f$ in $L^2([0,1])$. Then $\E[(I(f_n)-I(f_m))^2]\to 0$, so $I(f_n)$ converges to some $I(f)$. Note: choosing $f_n$ so $\sumo n{\iy} \int_0^1 (f_n(s)-f(s))^2\,ds<\iy$, can define as a.s. limit (CHECK). Counterexample: take wavelet, divide by $\sqrt{\ln \prc{n}}$.

## 4.2 Ito integral

!! Note the Ito integral is ITSELF a random variable over the probability measure underlying the Wiener process. You can take a $\E$ over Brownian motions.

1. Let $\{X_t^n\}_{t\in [0,T]}$ be a simple, square-integrable, $F_t$-adapted stochastic process. Define $I(X^n) = \int_0^T X_t^n \,dW_t = \sumz iN X_{t_i}^N (W_{t_{i+1}} - W_{t_i})$.
2.  Ito isometry: $X_{t_i}^n$ is independent of $W_{t_{i+1}} - W_{t_i}$, so 
    $$ \E\ba{\pa{\int_0^T X_t^n \,dW_t}^2} = \E\ba{\int_0^T (X_t^n)^2\,dt}.$$
	Succinctly, 
	$$\ve{I(X_\cdot^n)}_{2,\Pj} = \ve{X_\cdot^n}_{2,\mu_T\times \Pj}.$$
	I.e., $I:L^2(\mu_T\times \Pj)\to L^2(\Pj)$ preserves $L^2$ distance when applied to $F_t$ adapted simple integrands.
3.  Extend to $X_\cdot^n \to X_\cdot$ in $L^2(\mu_T\times \Pj)$.
4.  Let $X_\cdot\in L^2(\mu_T\times \Pj)$ be $F_t$-adapted. Then there exists a sequence of $F_t$_adapted simple $X_\cdot^n\to X$. <!--DCT-->
	* Continuous and bounded sample paths: uniform continuity, DCT.
	* Bounded and progressively measurable (?): $X^\ep_\cdot \to X^\ep$, where $X_t^\ep = \rc\ep\int_{t-\ep}^t X_{\max\{s,0\}}\,ds$.
	* Progressively measurable: $X_t I_{|X_t|\le M}$. DCT. 
	
Ex. $W_T^2 = 2\int_0^T W_t\,dW_t+T$.

Now what?

1. Consider Ito integral itself as a stochastic process, $t\mapsto \int_0^t X_s\,dW_s$.
    * For $t\le T$, define $I_t(X_\cdot^n) = I(X_\cdot^n I_{\le t})$.
	* $I_t(X_\cdot^n)$ is a $F_t$-martingale.
	* Ito integral can be chosen to have continuous sample paths. (Pf. Discontinuous paths live on null set. Use subsequence argument and Borel-Cantelli.) ...
2. Extend the class of integrable processes, to have nice closure properties. (Product of 2 integrals can be expressed as a integral.)
    * Note we don't want to define $I_\iy$, only for every $t\in [0,\iy)$.
	* Localization: to define on $[0,\iy)$, define it on every interval $[0,T]$. Require $X_{[0,T]}\in L^2(\mu_T\times \Pj)$ for every $T<\iy$, i.e. $X\in \bigcap_{T<\iy} L^2(\mu_T\times \Pj)$. 
	* Check local property: $I_t(X_\cdot)$ does not depend on which $T>t$ we choose.
	* Behavior under stopping: $X_t$ is $F_t$-adapted in $\bigcap_{T<\iy} L^2(\mu_T\times \Pj)$, $\tau$ is $F_t$-stopping time. Then $I_{\min(t,\tau)}(X_\cdot) = I_t(X_\cdot I_{<\tau})$. Pf. Let $\tau^n$ be $\tau$ rounded upwards to the earliest jump time.
	* Localizing sequence for $X_t$: $F_t$-stopping times $\tau_n\nearrow \iy$, $\E\ba{\int_0^{\tau_n} X_t^2\,dt}<\iy$. "Allow localization intervals to be random." This is independent of localizing sequence (4.2.10, CHECK).
	* There is a natural cloass of integrands whose elements admit localizing sequence: $A_T(X_\cdot) = \int_0^T X_t^2<\iy$ a.s. for all $T<\iy$. Let $\tau_n=\inf\set{t\le n}{A_t(X_{\cdot})\ge n}$.
	
Finally: Let $X_t$ be any $F_t$-adapted stochastic process with $\Pj\ba{\int_0^T X_t^2\,dt<\iy}=1$ for all $T<\iy$. Then Ito integral $I_t(X_\cdot)$ is uniquely defined by localization and choice of continuous modification as $F_t$-adapted stochastic process on $[0,\iy)$ with continuous sample paths.

## 4.3 Some elementary properties

1. Linearity
2. Stopping time $\int_0^{\min(t,\tau)} X_s\,dW_s = \int_0^t X_s I_{<\tau}\,dW_s$.
3. If $X\in \bigcap_{T<\iy} L^2(\mu_T\times \Pj)$ then $\E[]=0$ and $\E[()^2] = \E[\int_0^TX_t^2\,dt]$.
4. $X^n\to X$ in $L^2(\mu_T\times \Pj)$ means $I_t(X_\cdot^n) \to I_t(X_\cdot)$ in $L^2(\Pj)$. If convergence fast enough, a.s.
5. $X_t$ is $F_t$-local martingale if there exists $\tau_n\nearrow \iy$ (reducing sequence), $X_{\min(t,\tau_n)}$ is martingale. Any Ito integral is a local martingale. (Take a localizing sequence.)

## 4.4 Ito calculus

Setup 

* $(\Om, F, \{F_t\}_{t\in [0,\iy)}, \Pj)$
* $W_t$ is $m$-dimensional $F_t$-Wiener process.
* Ito process $X_t^i = X_0^i + \int_0^t F_s^i\,ds + \sumo jm \int_0^t G_s^{ij}\,dW_s^j$.
    * $\int_0^t |F_s^i|\,ds<\iy$ a.s.
	* $\int_0^t (G_s^{ij})^2\,ds<\iy$ a.s.
	* Shorthand: $X_t=X_0+\int_0^t F_s\,ds + \int_0^t G_s\,dW_s$.

**Theorem** (Ito rule): $u(t,x)$ is $C^1$ in $t$ and $C^2$ in $x$. Then $u(t,X_t)$ is Ito.
\begin{align}
u(t,X_t) &= u(0,X_0) + \sumo in \sumo km \int_0^t u_i(s,X_s) G_s^{ik} \,dW_s^k\\
&\quad + \int_0^t\ba{u'(s,X_s)+\sumo in u_i(s,X_s)F_s^i + \rc 2 \sum_{i,j=1}^n\sumo km u_{ij}(s,X_s)G_s^{ik}G_s^{jk}}\,ds\\
&=u(0,X_0) + \int_0^t (\nb u)^T G \,dW + \int_0^t u'(s,X_s) + (\nb u)^TF_s + \rc 2 \Tr(G_s^T (\nb^2 u) G_s)\,ds.
\end{align}

Alternate notation: $dX_t = F_t\,dt + G_t\,dW_t$, 
$$
du(t,X_t) = u'(t,X_t)\,dt + \pl u(t,X_t)\,dX_t + \rc 2 \Tr(\pl^2 u(t,X_t)dX_t(dX_t)^*),
$$
where $dW_t^i \,dW_t^j=\de_{ij}\,dt$ and other derivatives are 0.

First two terms are chain rule. When stochastic integrals are present, we evidently need to take a second-order term into account as well.

Cor. Ito processes form an algebra.

## 4.5 Girsanov's theorem

What happens to Wiener process under change of measure? We can often simplify a problem by changing to a more convenient probability measure.

**Theorem** (Girsanov). Let $W_t$ be $m$-dimensional $\mathcal F_t$-Wiener on $(\Om, \mathcal F, \{\mathcal F_t\}_{t\in [0,T]}, \Pj)$, $X_t=\int_0^t F_s\,ds + W_t$ be Ito, $F_t$ Ito integrable, 
$$
\La = \exp\pa{-\int_0^T (F_s)^* dW_s - \rc 2\int_0^T \ve{F_s}^2\,ds},
$$
Novikov's condition $\E_{\Pj} \ba{\exp\pa{\rc 2\int_0^T \ve{F_s}^2\,ds}}<\iy$. THen $\{X_t\}_{t\in [0,T]}$ is $\mathcal F_t$-Wiener under $\mathbb Q(A) = \E_\Pj (\Ga I_A)$.

Intuition (discrete case): If $d\Pj$ is the probability measure of standard gaussian, and $d\mathbb Q$ is probability measure where $a_k+\xi_k$ are standard gaussian ($a_k$ is predictable process), write $d\mathbb Q$ wrt $d\Pj$. 
$$
\fc{d\mathbb Q}{d\mathbb P} = \prod\fc{e^{-(\xi_i+a_i)^2/2}}{e^{-\xi_i^2/2}} = \exp\ba{\sumo kn \pa{-a_k \xi_k - \rc 2a_k^2}}.
$$

READ PROOF.

## 4.6 Martingale representation theorem

Gives converse to Ito integral. Every martingale $\{M_t\}_{t\in [0,T]}$ with $M_T\in L^2(\Pj)$ is the Ito integral of a unique process in $L^2(\mu_T\times \Pj)$. 

**Theorem**. 

1. (Martingale representation) Let $M_t$ be $\mathcal F_t^W = \si\set{W_s}{s\le t}$-martingale, $M_T\in L^2(\Pj)$. For a unique $\mathcal F_t^W$-adapted process $\{H_t\}_{t\in [0,T]}$ in $L^2(\mu_T\times \Pj)$, $M_t=M_0 + \int_0^t H_s\,dW_s$ a.s.
2. (Ito representation, more general) Let $X$ be $\mathcal F_T^W$-measurable rv in $L^2(\Pj)$. Then for ... $X=\E X + \int_0^T H_s\,dW_s$ a.s.  <!--can differentiate -->

*Proof*. 

1. Show that any $X$ can be approximated arbitrarily well by Ito integral, $\ve{X-I_T(H_\cdot^\ep)}_2< \ep$.
    1. Identify class of random variables that can approximatate $X$ arbitrarily well. $S=\set{f(W_{t_1},\ldots, W_{t_n})}{n<\iy, t_1,\ldots, t_n\in [0,T], f\in C_0^\iy}$.
	    * Show this holds if allow Borel-measurable $f$. Filter by slicing into intervals $2^{-n}$, $X^n = f(W_{2^{-n}T},\ldots, W_T)$. 
		    * Levy's upward theorem: let $X\in L^2(\Pj)$ be $G$-measurable, $G=\si\{G_n\}$. Then $\E[X|G_n]\to X$ a.s. and in $L^2(\Pj)$.
		* Any Borel function can be approximated arbitrarily well by $f^n\in C^\iy$.
	2. Show any rv in this class can be represented as Ito integral
		*   Ito's rule: 
			$$g(t,W_t) = g(0,0) + \int_0^t (g_s + \rc2 g_{xx}) (s,W_s)\,ds + \int_0^t g_x (s,W_s)\,dW_s.$$
			Solve the heat equation for $g$, $g = \rc{\sqrt{2\pi (t-s)}}\int_{-\iy}^{\iy} f(y) e^{-(x-y)^2/(2(t-s))} \dy$.
			Still works for multivariate.
2. Take limits.

# 5 Stochastic differential equations

Existence, uniqueness, Markov property. 

Kolmogorov forward (Fokker-Planck) and backward equations.

## 5.1 SDE existence and uniqueness

\begin{align}
dX_t &= b(t,X_t)dt + \si(t,X_t) dW_t, & X_0=x\\
\iff 
X_t &= x+\int_0^t b(s,X_s) \,ds + \int_0^t \si(s,X_s)\,dW_s.
\end{align}

Ex. $dX_t = AX_t dt + B\,dW_t$, $X_0=x$ has solution
$$
X_t = e^{At}x + \int_0^t e^{A(t-s)}B\,dW_s.
$$

**Theorem**. Suppose 

1. $X_0\in L^2(\Pj)$
2. $b,\si$ Lipschitz uniformly on $[0,T]$ (in $x$).
3. $\ve{b(t,0)}, \ve{\si(t,0)}$ bounded on $t\in [0,T]$.

Then there exists solution $X_t$, and $b(t,X_t),\si(t,X_t)\in L^2(\mu_T\times \Pj)$, and it is unique a.s.

## 5.2 Markov property and Kolmogorov's equations

A large class of Markov processes with continuous sample paths can be obtained as solution of appropriate SDE.

**Theorem**. Suppose conditions hold. Then $X_t$ is $\mathcal F_t$-Markov process. (Actually it satisfies the strong Markov property, even with random stopping times.)

*Proof*. Calculate $X_t-X_s$. Note $W_{r+s}-W_s$ is Wiener. $Y_r=X_{r+s}$ satisfies a SDE... ?

Assume $b, \si$ independent of $t$. Markov property gives $\E[f(X_t)|\mathcal F_s] = g_{t-s}(X_s)$. This suggests $\ddd t P_t f = \mathcal L P_tf$.

**Theorem** (Kolmogorov backward equation). For $g\in C^2$, 
$$
\mathcal Lg = b^T\nb g + \rc 2 \Tr(\si^T \nb^2 g \si).
$$
If $u(t,x)$ is $C^1$ in $t$, $C^2$ in $x$, $f\in C^2$ such that
$$
u_t=\mathcal L u, \quad u(0,x)=f(x)
$$
then $u(t,x)=P_tf(x)$.

(Note we can write this backwards as $v_t + \mathcal Lv = 0$, $v(T,x)=f(x)$.)

(Note: in principle we would like to define $\E[f(X_t)|\mathcal F_s] =: u(t-s,X_s)$ and show $u$ satisfies the PDE. This is more technical because we need to show smoothness or interpret the PDE in a weak sense.)

*Proof*. Ito'srule on $Y_r=v(r,X_r)$. (The Ito integral $\int_0^t (\nb v)^T G\,dW_s$ is a "local martingale" here.) Take $\E[\cdot |\mathcal F_s]$ and the martingale part disappears.

Forwards equation: If law of $X_t$ is absolutely continuous, $\E[f(X_t)] = \int_{\R^n} f(y)p_t(y)\dy$ for some $p$, and more generally, 
$$
\E[f(X_t)|\mathcal F_s] = \int_{\R^n} f(y) p_{t-s}(X_s,y)\dy.
$$
Can $p$ be obtained as solution to PDE?

"Kolmogorov forward equation is dual of backward equation": $\int fp_t = \int P_tfp_0$.

**Theorem** (Kolmogorov forward, Fokker-Planck): Assume niceness of the SDE, and $b\in C^1, \si\in C^2$, $\rh\in C^2$, 
$$
\mathcal L^* \rh = -\sumo in \pd{x^i}(b^i\rh) + \rc2 \suij n \sumo km \pd{{}^2}{x^i\pl x^j} (\si^{ik}\si^{ij}\rh),
$$
$p_t$ exists, $C^1$ in $t$, $C^2$ in $x$. Then 
$$(p_t)_t = \mathcal L^* p_t, \quad t\in [0,T].$$

*Proof*. 

1. Write Ito's rule for $f$. 
2. Take $\E$ so the martingale disappears.
3. Substitute definition of $p_t(y)$, integrate by parts to take $\mathcal L$ from $\mathcal L f$ to $\mathcal L^* p_s$. This holds for all $f$ so remove the $f$.
4. Take time derivative.

> As a rule of thumb, the backward equation is very well behaved, and will often have a solution provided only that f is sufficiently smooth; the forward equation is much less well behaved and requires stronger conditions on the coefficients
