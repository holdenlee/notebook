---
title: GANs
published: 2016-12-28
modified: 2016-12-28
tags: neural nets
type: notes
showTOC: True
---

References

* Papers
    * [InfoGAN: Interpretable Representation Learning by Information Maximizing Generative Adversarial Nets](https://arxiv.org/pdf/1606.03657v1.pdf)
	* [Improved techniques for training GANs](https://arxiv.org/abs/1606.03498)
	* [Generative adversarial nets](http://papers.nips.cc/paper/5423-generative-adversarial-nets.pdf)
	* [AdaGAN: Boosting generative models](https://arxiv.org/abs/1701.02386)
* Blog posts
    * [New perspectives, NIPS2016](http://www.inference.vc/my-summary-of-adversarial-training-nips-workshop/) [h](http://scrible.com/s/g5QQ6)
	* [How to train your generative models](http://www.inference.vc/how-to-train-your-generative-models-why-generative-adversarial-networks-work-so-well-2/) [h](http://scrible.com/s/i5AQ6)
	* [InfoGAN](http://www.inference.vc/infogan-variational-bound-on-mutual-information-twice/) [h](http://scrible.com/s/6BAQ6)
	* [OpenAI](https://openai.com/blog/generative-models/)
	* [GANs, MI, and algorithm selection](http://www.yingzhenli.net/home/blog/?p=421)
	
# GANs

Ferenc: When the goal is to train a model that can generate natural-looking samples, maximum likelihood is not a desirable training objective. Under model misspecification and finite data (that is, in pretty much every practically interesting scenario), it has a tendency to produce models that overgeneralise.

## Objective

Train 2 neural networks $D$ and $G$. $P$ generates real data, and $G=\wh P$ generates fake data. Suppose either $P$ or $\wh P$ is chosen with probability $\rc2$ and then one same $x$ is drawn. (I.e., consider $\rc2 (P+\wh P)$.)

* $G$ is generator: it tries to generate $x$ with distribution close to $P$.
* $D$ is discriminator: given $x$, it tries to output the probability that $x$ is real data.

$G$ tries to minimize the objective and $D$ tries to maximize it:
$$
V(D, G) = \E_P \ln D + \E_G \ln (1-D).
$$
(The second expectation is over $G(z)$, $z\sim p_z$ a fixed distribution.)
If the data was real, there is a loss $\ln \wh\Pj\pat{real}$, and if the data was fake, there is a loss $\ln \wh \Pj\pat{fake}$. (Penalize for mistakes.)

Note that given $G$, the optimal $D$ is $ \fc{p(x)}{p(x) + \wh p(x)}$,
\begin{align}
\max_D V(D,G) &= \EE_p \ln \fc{p}{p+\wh p} + \EE_{\wh p} \ln \fc{\wh p}{p+\wh p}\\
&= -2\ln 2 + KL\ba{p||\fc{p+\wh p}2} + KL\ba{\wh p ||\fc{p+\wh p}2}.
\end{align}

## Interpretation of objective

$$
KL[Q||P] := \EE_Q\ln \fc{Q}{P} = H(Q) - \EE_Q\ln P = H(Q) + CE(Q,P)
$$
where CE is cross-entropy.
\begin{align}
JSD[P||Q] &= \rc 2 KL\ba{P||\fc{P+Q}2}
+ \rc 2 KL\ba{Q||\fc{P+Q}2}\\
JSD[Q||P] &= \pi KL\ba{P||\pi P+(1-\pi)Q}
+ (1-\pi) KL\ba{Q||\pi P+(1-\pi)Q}
\end{align}

Let $P$ be the natural distribution and $Q$ be the estimated one.

* $KL[Q||P] = H(Q) + CE(Q,P)$, $CE(Q,P)$ is the perplexity of seeing samples from $P$ when you think the distribution is $Q$. It is maximized by a model $Q$ that deterministically picks the most likely stimulus. $H(Q)$ tries to counteract by enforcing diversity.
	* Favors undergeneralization, ex. describing the largest mode only. It's infinitely penalized in introducing probability mass when $P$ has none.
	* Hard to optimize based on a finite sample. (Why? It's not well-behaved unless $\Supp(Q)\subeq \Supp(P)$!)
* $KL[P||Q] = H(P) + CE(P,Q)$, $H(P)$ is constant and $CE(P,Q)$ is the average negative log likelihood. Optimizing this corresponds to maximizing the log likelihood.
    * Favors approximations $Q$ to overgeneralize $P$. It's allowed to introduce probability mass where $P$ has no or little mass.
* JSD is a compromise.

## Another interpretation

Let $s=0,1$ wp $\rc2$, determining whether we see real or fake data. Let $\wt p$ be combined distribution.
$$I[s;x] = KL[\wt p(s,x)||\wt p(s) \wt p(x)].$$
This is intractable to estimate. Subtract out KL divergence:
$$
L[p;q] := I[s;x] - \E_{\wt p(x)} [KL[\wt p(s|x)||q(s|x)]] = H[s] + \E_{\wt p(s,x)} [\ln q(s|x)]
$$
(CHECK THIS)
The second term is the GAN objective function. "GAN can be viewed as an augmented generative model which is trained by minimizing mutual information." [YZL](http://www.yingzhenli.net/home/blog/?p=421)

## Training

* Alternate between $k$ steps of optimizing $D$ and one step of optimizing $G$.
* At the beginning $G$ is poor so $D$ predicts close to 1, and $\ln (1-D)$ can blow up. So at the beginning train $G$ to maximize $\E_G\ln D$ instead.
* Use stochastic backprop.
* Use momentum.
* Generator nets used ReLU and sigmoid, discriminator used maxout, dropout.
* Estimate probability of test set data under $p_g$ by fitting Gaussian Parzen window. (What is this? [7])

## Notes

* No explicit representation of $p_g$.
* $D$ must be synchronized well with $G$ during training. (? Avoid "Helvetica")

Table p. 8

# Improved techniques.

"GANs are typically trained using gradient descent techniques that are designed to find a low value of a cost function, rather than to find the Nash equilibrium of a game."

*    Feature matching: new objective for generator that prevents it from overtraining on current discriminator. Train the generator to match the expected value of features $f(x)$ on intermediate layer of discriminator.
	$$ \ve{\E_{x\sim p_{\text{data}}}f(x) - \E_{z\sim p_z(z)} f(G(z))}_2^2.$$
*   Minibatch discrimination: A failure mode for GAN is for the generator to collapse to a point. So allow discriminator to look at multiple data examples in combination.
*   Historical averaging: include term $\ve{\te - \rc t \sumo it \te[i]}^2$. cf. fictitious play [16] algorithm that works for other games.
*   One-sided label smoothing. Replace positive and negative classification targets 1, 0 with $\al,\be$.  This makes it less vulnerable to adversarial examples. Actually, don't change $\be=0$.
*   Virtual batch normalization

## Semi-supervised learning

Label generated samples with "generated" class $K+1$. For unlabeled data, maximize $\ln p_{\text{model}}(y\in [K]|x)$.

# InfoGAN

* Extend the GAN objective with new term encouraging high mutual information between generated samples and subset of latent variables $c$. (Other variables are noise variables.)
* Hopefully $c$ will represent the most meaningful sources of variation.
* Use a variational lower bound to maximize mutual information. (cf. variational autoencoders)

$$L_{infoGAN}(\te) = I[x,y] - \la I[x_{\text{fake}},c].$$

Want $c$ to effectively explain most variation in fake data.

Variational bound on MI:
$$I[X,Y] = \max_q \bc{H[Y] + \EE_{x,y} \ln q(y|x)}.$$

Thus, 
$$
I[x_{\text{fake}},c]\ge \EE_{x_{\text{fake}}\sim G(z,c), c\sim C|x}[\ln \fc{Q(c|x)}] + H(c)
$$
<!-- trivial! By Bayes, we can replace the expectation with $\EE_{c\sim C, x\sim X|C}$-->
Sample using Monte Carlo. 

GANs use the variational bound in the wrong direction $I(s;x) \ge H(s) + V$. InfoGANs use it twice.
$$
\ub{I(s;x)}{\ge H(s)+V} - \la \ub{I[x_{\text{fake}}, c]}{\ge ...}
$$

Example: for MNIST, have 10 known labels and 2 latent variables which turn out to represent slant and width.

# AdaGAN: Boosting Generative Models

[Background on boosting](../boosting.html)

GANs suffer from missing modes: the model doesn't produce examples in certain regions.

Idea: combine multiple generative models into a mixture. Each step, focus on examples that the mixture has not been able to properly generate, and add another model addressing those.

This is a meta-algorithm which can be used with any implementation of generative models (e.g. GANs).

## Minimizing f-divergence with additive mixtures

$f$-divergence is
$$
D_f(Q||P):=\int f\pa{\dd QP (x)}\,dP(x)
$$
Note $D_f(P||Q) = D_{f^{\circ}}(Q||P)$ where $f^{\circ}(x) = xf(1/x)$. Adding a multiple of $x-1$ doesn't change.

$f$ is Hilbertian if $\sqrt{D_f(P||Q)}$ satisfies the triangle inequality (ex. JSD, H, TV)

Examples:

* KL $-\ln x$
* reverse KL $x\ln x$
* TV $|x-1|$
* JSD $-(x+1)\ln \fc{x+1}2 + x\ln x$

## AdaGAN derivation

*   At each step we want to combine a mixture of the current distribution $P_g$ with the new distribution $Q$ to minimize divergence with real distribution $P_d$
	$$
	\min_{Q\in \mathcal D} D_f((1-\be)P_g+\be Q||P_d).
	$$
*   If we can get a constant factor closer at each step
	$$
	D_f((1-\be)P_g + \be Q||P_d) \le c D_f(P_g||P_d)
	$$
	then we can get exponential convergence.
*   Difficulty, and where boosting comes in: we somehow need to focus attention on the mistakes.
*   What is the optimal for $Q_\be^*$? By calculation, (Theorem 1) 
	$$
	Q = \rc \be (\la^* P_d - (1-\be)P_g)_+
	$$
	for some $\la^*$.
	* How well does this optimum do? (Lemma 2)
	$$
	D_f((1-\be)P_g+\be Q_\be^* ||P_d) \le D_f((1-\be)P_g + \be P_d||P_d) \le (1-\be)D_f(P_g||P_d).
	$$
*   We show that it suffices to find $Q$ such that 
	$$D_f(Q||Q_\be^*)\le \ga D_f(P_g||P_d)$$
	where $Q_\be^*$ is optimal for the objective.
	*   Use a triangle-like inequality (Lemma 1 (10)): For Hilbertian metrics,
		$$
		D_f((1-\be)P_g + \be Q||P_d) \le (\sqrt{\ga D_f(Q||R)} + \sqrt{D_f ((1-\be)P_g + \be R||P_d)})^2.
		$$
	*   Let $R=Q_\be^*$. Corollary 3 and the calculation for $R$ then gives (Lemma 2)
		$$
		D_f((1-\be) P_g + \be Q||P_d) \le (\sqrt{\ga \be} + \sqrt{1-\be})^2 D_f(P_g||P_d).
		$$
		* Comment: this can be refined if $\dd{P_g}{P_d}$ is almost surely bounded (Lemma 3).
		* Comment: this requires a pretty strong weak learner, because we need $\ga <\fc{\be}{4}$ to get the coefficient $<1$. Often $\be\to 0$.
*   Hope is that GAN can estimate $Q_\be^*$. How to estimate $Q_\be^*$? We can reinterpret the expression for 
	$$Q_\be^*= \rc\be (\la^* P_d-(1-\be)P_g)_+$$ 
	as reweighting the samples. 
	*   How does discriminator give an estimate for $P_g$? As long as the optimal discriminator satisfies 
	    $$ \dd{P_g}{P_d}(x) =h(D(x))$$
		for some $h$. Ex. for GAN $h(y) = \fc{1-y}{y}$. Thus we get an estimate of $\dd{P_g}{P_d}$.
	*   Think about $dQ_\be^*$ as giving a weighting over sample points. For point $i$,
		$$
		w_i = \fc{p_i}{\be}(\la^* - (1-\be)h(d_i))
		$$
		where $d_i$ is the discriminator output on $x_i$, $p_i=\rc N$.
	*   Solving for $\la^*$ gives
		\begin{align}
		I(\la) &= \set{i}{\la >(1-\be) h(d_i)}\\
		\la^* &= \fc{\be}{\sum_{i\in I(\la^*)} p_i} \pa{1+\fc{1-\be}{\be} \sum_{i\in I(\la^*)} p_i h(d_i)}.
		\end{align}
		This is in terms of $\la^*$, but we can break this by noting that $I(\la^*)$ will contain $k$ smallest $d_i$'s for some $k$. Thus, initialize $k=1$; while $(1-\be)h(d_k)\ge \la$, set $k\leftarrow k+1$ and $\la \leftarrow \fc{\be}{\sumo ik p_i}(1+\fc{1-\be}\be \sumo ik p_ih(d_i))$.
* Mixture weights $\be$ can be constant, $\be_t=\rc t$ for equal weights, etc. (S3.2)
* Run GAN with modified weights at each step.

An alternate analysis:

*   Instead bound (Lemma 1 (9)) (note this doesn't require Hilbertian)
	$$
	D_f((1-\be)P_g + \be Q||P_d)\le 
	\be D(Q||R) + (1-\be) D_f\pa{P_g||\fc{P_d-\be R}{1-\be}}.
	$$
*   Minimize this upper bound instead. Assume $P_d(dP_g=0)<\be$. (Theorem 2)
	$$
	dQ_\be^{\dagger} = \rc\be (dP_d-\la^{\dagger} (1-\be)dP_g)_+
	$$
*   The optimum satisfies (Lemma 2.2)
	$$
	D_f\pa{P_g||\fc{P_d-\be Q_\be^{\dagger}}{1-\be}}\le D_f(P_g||P_d).
	$$
*   If $D_f(Q||Q_\be^{\dagger}) \le \ga D_f(P_g||P_d)$ and $P_d\pa{\dd{P_g}{P_d}=0}<\be$, then 
	$$D_f((1-\be) P_g + \be Q||P_d)\le  (1-\be(1-\ga))D_f(P_g||P_d).$$
*   The condition on $\ga$ is milder here. However, we need the extra condition that $\be$>(mass of true data missed by current model). (Else, need to increase the weight $\be$!)

Remarks:

* Convergence rate depends on the ratio of probability mass: logarithmic in $\fc{dP_1}{dP_d}$. (Corollary 1)

# Two views of GANs

1. Divergence minimization: minimize divergence between real data and implicit generative model $q_\te$. Problems
    * GAN algorithms minimize lower bounds. The discriminator must be powerful.
	* Degenerate distributions
2. Constrast function view: learn a function that takes low values on data manifold and high values everywhere else. The generator is a smart way of generating contrastive points.

# Adversarial training with maximum mean discrepancy

* [A kernel two sample test](http://www.jmlr.org/papers/volume13/gretton12a/gretton12a.pdf)
* [Training generative neural networks via Maximum Mean Discrepancy optimization](https://arxiv.org/abs/1505.03906)
* [Generative Moment Matching Networks](https://arxiv.org/pdf/1502.02761v1.pdf)
