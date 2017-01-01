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

Note that given $G$, the optimal $D$ is $\ln \fc{p(x)}{p(x) + \wh p(x)}$,
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

* $KL[Q||P] = H(Q) + CE(Q,P)$, $CE(Q,P)$ is the perplexity of seeing samples from $P$ when you think the distribution is $Q$. It is maximized by a model $Q$ that deterministically picks the most likely stimulus. $H(Q)$ enforces diversity.
    * Favors approximations $Q$ to overgeneralize $P$. It's allowed to introduce probability mass where $P$ has no or little mass.
	* Hard to optimize based on a finite sample. (Why?)
* $KL[P||Q] = H(P) + CE(P,Q)$, $H(P)$ is constant and $CE(P,Q)$ is the average negative log likelihood. Optimizing this corresponds to maximizing the log likelihood.
	* Favors undergeneralization, ex. describing the largest mode only. It's infinitely penalized in introducing probability mass when $P$ has none.
* JSD is a compromise.

## Another interpretation

Let $s=0,1$ wp $\rc2$, determining whether we see real or fake data. Let $\wt p$ be combined distribution.
$$I[s;x] = KL[\wt p(s,x)||\wt p(s) \wt p(x)].$$
This is intractable to estimate. Subtract out KL divergence:
$$
L[p;q] := I[s;x] - \E_{\wt p(x)} [KL[\wt p(s|x)||w(s|x)]] = H[s] + \E_{\wt p(s,x)} [\ln q(s|x)]
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

* Extend the GAN objective with new term encouraging high mutual information between generated samples and subset of latent variables $c$.
* Hopefully $c$ will represent the most meaningful sources of variation.
* Use a variational lower bound to maximize mutual information. (cf. variational autoencoders)

$$L_{infoGAN}(\te) = I[x,y] - \la I[x_{\text{fake}},c].$$

Want $c$ to effectively explain most variation in fake data.

Variational bound on MI:
$$I[X,Y] = \max_q \bc{H[Y] + \EE_{x,y} \ln q(y|x)}.$$

GANs use this bound in the wrong direction. InfoGANs use it twice.

# Two views of GANs

1. Divergence minimization: minimize divergence between real data and implicit generative model $q_\te$. Problems
    * GAN algorithms minimize lower bounds. The discriminator must be powerful.
	* Degenerate distributions
2. Constrast function view: learn a function that takes low values on data manifold and high values everywhere else. The generator is a smart way of generating contrastive points.

# Adversarial training with maximum mean discrepancy

* [A kernel two sample test](http://www.jmlr.org/papers/volume13/gretton12a/gretton12a.pdf)
* [Training generative neural networks via Maximum Mean Discrepancy optimization](https://arxiv.org/abs/1505.03906)
* [Generative Moment Matching Networks](https://arxiv.org/pdf/1502.02761v1.pdf)
