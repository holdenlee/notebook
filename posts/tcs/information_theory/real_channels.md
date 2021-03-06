---
title: Real channels
published: 2016-02-27
modified: 2016-02-27
tags: none
type: notes
showTOC: True
---

References:

* McKay Ch. 11
* Cover, Thomas Ch. 9

#Reading

##McKay

What's the model?

* Transmit a signal $x(t)$ in a channel with error at every moment in time Gaussian with variance $\si^2$.
* You are limited to using $v$ power, i.e., $\int_0^T \fc{x(t)^2}{T}\,dt\le v$.
* You are bandwidth-limited: $x$ must be a sum $x=\sum_{n=1}^{N} x_n\phi_n$ where $\phi_n$ are orthonormal basis. (i.e., $\sum x_n^2=v$.) Take the functions to be $\cos\pf{2\pi kx}{T}$ and $\sin$ for $1\le k\le TW$. We have $N=2TW$ where $W$ is the max allowable frequency.

At what (limiting) rate can you transmit information?

Note: A sum is like an integral. Take exps instead of sin/cos for simplicity. Then for $x$ a sum of exponentials $\phi_n$,
$$
\int_0^1 x(t)\phi_n(t) = a_n = \EE_{t=0}^{N-1}x\pf{t}{N} \phi_n\pf{t}{N}.
$$

Useful: $N(y;x,\si^2)N(x;0,v) = N\pa{x;\fc{v}{v+\si^2}y, \pa{\rc{v}+\rc{\si^2}}^{-1}}$. Mean is means harmonically weighted by variances (i.e. weighted by precisions). "Whenever two independent sources contribute information, via Gaussian distributions, about an unknown variable, the precisions add."

"Real continuous channel with $W$ and noise $W_0$ is $\fc{N}{T}=2W$ uses per second of Gaussian with $\si^2=N_0/2, \ol{x_n^2}\le \fc{P}{2W}$.

(How do you think of discrete bits as encoding a point in real space? Or are you transmitting analog information?)

Bandwidth is more powerful than low noise.

(Q: Why does M say that entropy can't be defined for continuous variables? I guess this should be taken to mean that the definition of $h$ wouldn't be invariant under change of coordinates.)

###Exercises

1.  (Solution p. 189/201) Use Lagrange multipliers with *functions* (calculus of variations). Use $\fc{\de F}{\de P^*}\int P(x) f(x,P) \dx = f(x^*,P) + \int P(x)\fc{\de f(x,P)}{\de P(x)}$ (cf. normal product rule). Note $P(y|x)$ is fixed (normal), but $P(y)$ depends on $P(x)$, it is really a function of $P$, $f(P)$. Simplify, and then substitute $P(y|x)$. Match coefficients in Taylor expansion.

	Question: Why does the constraint $\int P\dx=1$ become $\mu\pa{\int P\dx}$ rather than $\mu(\bullet-1)$? They disappear after differentiation!

    TAKEAWAY: Calculus of variations. Gaussian distributions is best. (Why not 2 points as far as possible?)

2.  Just calculate the integral. Mutual info is $\rc2\ln \pa{1+\fc{v}{\si^2}}$. This is the capacity (explained on p. 182) (?). The more power, the more capacity, scaling by log.


## Cover, Thomas

### Ch. 8

* **Differential entropy** $h=-\int f\lg f\dx$. "differential entropy is the logarithm of the equivalent side length of the smallest set that contains most of the probability."
    * How differential entropy and entropy are related: Let $X^{\De}$ be $X$ quantized to $\De$. Then $\lim_{\De\to 0}H(X^{\De})+\lg \De = h(X)$.
    * Note mutual info is limit of quantized mutual info (the $\lg \De$'s cancel).
	* **KL divergence**: $D(f||g)=\int f \lg \fc{f}{g}\ge 0$.
* Basic calculations
    * $h(N(0,\si^2)) = \rc2 \lg (2\pi e\si^2)$
	* $\rh$-correlated Gaussians: $I(X:Y) = -\rc2 \lg(1-\rh^2)$.
* Basic inequalities
	* By LoLN, AEP holds for continuous random variables ($\log f$ needs to be $L^1$?).
	* (Hadamard) $\det(K)\le \prod K_{ii}$ by subadditivity of entropy.
	* $h(AX)=h(X)+\lg |\det(A)|$.
* Normal maximizes entropy over distributions with same variance. Proof: $0\le D(g||\phi_K) = -h(g)+h(\phi_K)$ where the second term follows from the fact that $g,\phi_K$ have the same second moments and $\log \phi_K$ is a quadratic form (write it out!).
* Estimation version of Fano: $\E[(X-\hat X)^2]\ge \rc{2\pi e}e^{2h(X)}$, equality only if $X$ Gaussian and $\hat X = \E X$. Proof: use that Gaussian distribution has max entropy for given variance.
    * Cor: $\E[(X-\hat X(Y))^2] \ge \rc{2\pi e} e^{2h(X|Y)}$.

Nice summary on p. 282.

### Ch. 9

* A Gaussian channel with power $P$ can be converted to a binary symmetric channel with error $1-\Phi\pa{\sfc{P}{\si^2}}$.
* 9.1: A more conceptual way to upper-bound the mutual information: $Y=X+Z$ where $Z$ is noise.
    * Theorem 8.6.5: normal maximizes the entropy for a given variance. (cf. entropy-maximizing distributions. Use CoV here?) Then $I(X:Y)=h(Y)-h(Z)\le \rc2 \log \pa{1+\fc PN}$, equality only when $X$ is Gaussian.
* Model of Gaussian channel: Encoding, Gaussian noise, decoding, $[M]\xra{x}\mathcal{X}^n \xra{N}\mathcal{Y}^n \xra{g} [M]$.
* **Theorem 9.1.1**: Capacity of Gaussian channel is $\rc 2 \lg\pa{1+\fc{P}N}$.
    * Heuristic proof: Pack spheres of radius $\sqrt{nN}$ in $\sqrt{n(P+N)}$.
    * Think of mutual info as a limit achievable in infinite dimensions. It doesn't make sense to encode a discrete set with a probability distribution, but in large dimensions you can approximate it!
    * Proof of achievability: (1) generate codewords iid (2) search for jointly typical. (3) It's rare that either it's far from the codeword, or it's close to another one.
    * Proof of necessity: Take uniform distribution over inputs. Use Fano's inequality to relate probability of error and mutual info.
		* **Fano's inequality** says that for $X\to Y\to \wh X$, $P_e=\Pj(X\ne \wh X)$, $H(P_e)+P_e\lg |\mathcal X| \ge H(X|\wh X) \ge H(X|Y)$.
		* Applied here, $H(W|\hat W)\le H(P_e) + P_e\lg |\mathcal X|\le 1 + (nR) P_e^{(n)}=o(n)$. Since $nR=H(W)$, we get that $I(W:\hat W) \ge \asymp nR$ and hence $\sum I(X_i:Y_i) \ge \asymp nR$. But this sum can be bounded by the power (use Jensen on the $P_i$).
* 6.3 Bandlimited channels: "Rate $\rc{2W}$ is sufficient to reconstruct the signal because it cannot change substantially in $<\rc2$ a cycle." Proof: Note that the Fourier transform is 0 outside $[-W,W]$. $f\pf{n}{2W}$ are the Fourier coefficients of $F(\om)$. ("a bandlimited function has only 2W degrees of freedom per second")[^f1]
	* Note band-limitation can be expressed as convolution by $\mathcal F^{-1} 1_{\le W}$.
	* The characteristic-function basis for sampling at $\fc{n}{2W}$ are the translates of $\text{sinc}(Wt) = \sin(Wt)/(Wt)$.
* Relating the 2 models.
    * In the Gaussian noise model, $C=\rc 2 \log\pa{1+\fc{P_G}{N_G}}$ where $P$ is power (average magnitude) and $N$ is variance.
	* In the band-limited model, suppose $W$ is bandwidth, $P$ is power, and $\fc{N_0}2$ is variance (power spectral density - I don't understand this).
	*   Match up by $P_G=\fc{P}{2W}$ (divide by sampling rate) and $N_G=N_0/2$ to get $\rc2\lg\pa{1+\fc{P}{N_0W}}$ per sample. Multiply by $2W$. ($\fc{P}{N_0W}$ is SNR.)
        \begin{equation} C= W\lg\pa{1+\fc{P}{N_0W}}.\end{equation}
		With infinite bandwidth, $C=\fc{P}{N_0}\lg e$.
* 9.4 Parallel Gaussian channels: set of Gaussian channels in parallel with common (total) power constraint $P$. How to distribute.
    * Maximize $\sum \rc2\lg\pa{1+\fc{P_i}{N_i}}$ subject to $\sum P_i=P$. By Lagrange multipliers, the best solution is water-filling, p. 277.
* 9.5 Channels with colored (correlated) Gaussian noise (SKIP)
* 9.6 Gaussian channels with feedback: for channels with memory, where the noise is correlated from time instant to time instant, feedback does increase capacity. (SKIP)

#### Exercises

9.10 looks interesting.

# Scraps

* In the presence of noise, doesn't it help to sample $>2W$ times per second? Can't you approach the true average with more samples?
* 
[^f1]: I thought that this meant the $f$ live in a finite-dimensional space. No? This confuses me. Are we taking infinitely many samples spaced $\rc{2W}$ apart? Because $F$ is not in a finite dimensional space.
