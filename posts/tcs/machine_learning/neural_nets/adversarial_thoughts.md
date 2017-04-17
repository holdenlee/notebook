---
title: Adversarial thoughts
published: 2017-04-16
modified: 2017-04-16
tags: neural nets, uncertainty, aaml
type: research
showTOC: True
---

See also 

* [intro to problem](adversarial.html).
* [my experiments](adversarial_experiments.html). 
* [confidence](confidence.html).

Some explanations for adversarial examples.

# Not surprising

Firstly, I think adversarial examples aren't very surprising: we shouldn't expect neural nets to do well against an adversary if we didn't train against it. Neural nets will do the "laziest" thing, which does not involve the "broader" conceptual class we want them to learn (ex. everything close to a '5' is also a '5'); vanilla training doesn't communicate to them this broader class.

That said, why can't neural nets do well after adversarial training? 

# A formalization

Let $A_a$ be a set of "adversarial" modifications to inputs $x$. We say that an algorithm adversarially-PAC learns $(x,y)\sim D$ if after poly samples and time, it produces $f\in F$ such that 
$$
\Pj_{x,y} (\max_a L(f(A_a(x)), y)\ne y) \le
\ep
$$
in the realizable case, or
$$
\Pj_{x,y} (\max_a L(f(A_a(x)), y)\ne y) \le
\min_{f\in F} \Pj_{x,y} (\max_a L(f(A_a(x)), y)\ne y) + \ep
$$
in the agnostic case, where $L$ is the loss function (ex. 0-1).

We probably also want to assume access to an oracle, which given $f$ and $x$, produces some $a$ that maximizes $L(f(A_a(x)),y)$.

Some work has been done here: see Yishay Mansour, Robust learning and inference. Cf. also boosting vs. game theory.

Example: $A_a(x) = x+a$, restricted to $\ve{a}\le \ep$.

Now there are settings where the adversarial setting isn't harder - for example, for SVM, in the above example, if there is still a margin $\ga$ between positive and negative examples even after adversarial perturbation, then we'll make at most $\rc{\ga^2}$ mistakes by perceptron analysis, which doesn't care about the distribution.

But this is not the case for neural nets. (The fact that we can get training error to 0 suggests that there may be some "margin" at play (cf. Telgarsky). However, we *can't* get to 0 training error if we include adversarial examples!)

Can we study a toy example here like dictionary learning? Generate $Ah = x$, there is a SVM $\sign(w^Th)=y$. Make it robust to $+a$. 

(This doesn't seem to capture what's going on though in $L^2$ - here the adversary's best bet is to change in the direction $a_i$ where $i=\amax_i |w_i|$, which would in fact change the sign of $w^Th$.)

# A key question

It's not surprising that adversarial examples exist. A better question is why we can't "train them away" by normal training methods, and what can we do to fix this. 

I think there are 2 possibilities.

1. There exists a neural network, with reasonable parameter sizes (under whatever regularization we are using), that can do well on most adversarial inputs. The issue is that using our optimization methods aren't finding these parameters.
2. There is something fundamentally limited about the (typical) neural net architecture that doesn't capture human concept boundaries.

The "margin" analysis above is in favor of (2). (1) could still be true if there are e.g. exponentially more choices of parameters that would do well on normal examples than choices that also do well on the adversarial examples. But this isn't enough to explain it, because adversarial training stalls eventually.

# Several subproblems

We can talk about $L^\iy$ or $L^2$ adversarial examples. Also whatever threshold we choose, there shouldn't be human-adversarial examples below that threshold. (I don't think this is so much of an issue now.)

# Hypotheses and approaches

## Glue approach

Just take a hodgepodge of things that reduce adversarial examples, including things that detect and reject adversarial examples. For example, 

* check if it has abnormally large coefficients for singular vectors for small singular values.
* train a detector for adversarial examples on the internal representation.

However, this would be an arms race: likely, for many of these, you can find adversarial examples that pass the test (ex. restrict search to top singular vectors). If this were not the case, that would be *very interesting*.

Are there things like clipping, normalizing, that you do on input before feeding into the network that could help? (Ex. can damping the smaller singular vectors help?)

These are interesting questions but not as satisfying an approach.

## Mixture

This doesn't seem to help. 

One question: after doing adversarial training for a while, does the NN still do well against the *original* adversarial examples? If not, then it's catastrophically forgetting. If it is forgetting, this should be easy to fix.

## Sampling from NN's

Train a bunch of NN's on the real examples and then use majority vote.

Problem: this doesn't work.

Are we somehow not exploring the space of NN's which do well on the real examples? Can we use Fisher information, Langevin to sample better?

Probably we can't do much better. Also the existence of a universal perturbation and the fact that adversarial examples from a "linear" model transfer suggest that most NN's which do well on real examples suffer from the same adversarial examples. (cf. there being exponentially more NN's which are weak against these adversarial examples, then good.)

## Regularization

The objective/regularization is wrong. Ex. we should be encouraging sparsity, using exponentiated gradient/multiplicative weights, etc.

## Conditioning

Perhaps the Lipschitz constant is just really large. Can we train a NN to have small Lipschitz constant in the correct norm? (Note this can be challenging because for example the $\iy\to 2$ norm is difficult to compute; even approximating it takes a linear program, which is too computationally intensive to do at every step.)

Also if we can't find a NN with small Lipschitz constant why not? Does it not exist or is there something wrong with the geometry of the optimization problem?

Path norm, batch normalization seem attractive here.

## Thresholding and quantization

ReLUs seem like a very bad idea - the adversary can just keep increasing. But is the problem more for

* ReLU(x) where $x$ is large, or
* ReLU(x) where $x$ is small?

The first suggests capping - having $y=ReLU(x)$ grow unlimitedly is a bad idea. (We still have the same problem for sigmoids.) The second suggests that we are getting past thresholds by adding a lot of correlated noise, so we should zero out small ReLU(x)'s.

In the brain we don't have thresholds exceeded by contributions from hundreds of neurons - there's some kind of attenuation or normalization (of activations because of limited energy?) that prevents this. What if we just take the top $k$ activations? (During training or testing?)

What about quantization/binarization? For MNIST, binarizing all pixels to be 0 or 1 is fine, and helps against adversarial examples (because small norm changes don't have much effect - although you should consider other attacks here!). But this is in some sense cheating because MNIST is basically black-white. Can we binarize/quantize intermediate features?

## Is the first layer the problem?

I.e. are we just screwed after the first layer because it somehow destroyed the input?

Ex. consider the toy problem of dictionary learning. If the layers of a NN were *really* doing sparse coding, would this be a problem? I.e. does sparse coding suffer from the same problem? Or are NN really *not* doing sparse coding? While we sort-of say it is, I don't think it is at all! For the convolutional NN, the convolution *isn't* computing $h$ such that $Ah=x$. In fact, the overlaps between different patches might make things badly conditioned. 

If we actually did DL on the first layer, then solved the sparse recovery problem for every input, would we still have the same problem?

## Conservative concepts and detection

Have the network be able to "abstain" (like a confidence score). This should be similar in principle to training detection between real and adversarial examples.

What if we use RBF's on the first layer? Even something like pretraining to find the right RBF's, and keeping them fixed. The idea is that RBF's are very conservative. Maybe we'll need the $L^\iy$ analogue if we're protecting against that...

## More human approaches

A vital thing that's missing in current NN's is back-and-forth between higher and lower layers. Humans can reinterpret lower-level data when they see a higher-level pattern.

Also humans have some kind of idea of a "prototype" of a digit - another instance must have its curves match up with that prototype in some fashion. There are these ideas of strokes, etc. Something hierarchical, probabilistic model? cf. Tenenbaum.

It may be that there needs to be something fundamentally new in the architecture - something more principled. Anything from neuroscience?


